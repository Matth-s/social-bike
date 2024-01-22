const Group = require('../database/models/group.model');
const {
  diacriticSensitiveRegex,
} = require('../helpers/diacriticSensitiveRegex');
const transformGroupResponse = require('../helpers/transformResponse');

const createGroup = async (req, res) => {
  const body = req.body;

  try {
    const checkName = await Group.findOne({ name: body.name });

    if (checkName) {
      return res
        .status(409)
        .json({ message: 'Ce nom de groupe est déjà utilisé' });
    }

    const { id, ...rest } = body;

    const group = new Group(rest);

    group.createdAt = Date.now();

    const groupSaved = await group.save();

    const groupReponse = transformGroupResponse(groupSaved);

    res.status(201).json({
      message: 'Votre groupe a été créé avec succès',
      data: { group: groupReponse },
    });
  } catch (err) {
    res.status(500).json({ message: 'Une erreur est survenue' });
  }
};

const getGroups = async (req, res) => {
  const { limit, name } = req.query;

  try {
    let query = {};

    if (name) {
      query.name = {
        $regex: diacriticSensitiveRegex(name),
        $options: 'i',
      };
    }

    const groups = await Group.find(query)
      .sort({ createdAt: -1 })
      .limit(limit);

    const groupsResponse = groups.map((group) =>
      transformGroupResponse(group)
    );

    res.status(200).json({
      message: 'Requête reçue',
      data: { groups: groupsResponse },
    });
  } catch (err) {
    res.status(500).json({ message: 'Une erreur est survenue' });
  }
};

const getJoinedGroups = async (req, res) => {
  const { name, limit, userId, filtre } = req.query;

  try {
    let query = {};

    if (filtre === 'groupe') {
      query.name = {
        $regex: diacriticSensitiveRegex(name),
        $options: 'i',
      };
    } else if (filtre === 'ville') {
      query.city = {
        $regex: diacriticSensitiveRegex(name),
        $options: 'i',
      };
    }

    if (userId) {
      query.members = { $elemMatch: { id: userId } };
    }

    const groups = await Group.find(query)
      .sort({ createdAt: -1 })
      .limit(limit);

    const groupsResponse = groups.map((group) =>
      transformGroupResponse(group)
    );

    res.status(200).json({
      message: 'Requête reçue',
      data: { groups: groupsResponse },
    });
  } catch (error) {
    res.status(500).json({ message: "Une erreur s'est produite" });
  }
};

const getCreatedGroups = async (req, res) => {
  const { userId, limit } = req.query;

  try {
    if (!userId) {
      return res
        .status(400)
        .json({ message: 'Une erreur est survenue' });
    }

    const groups = await Group.find({ ownerId: userId }).limit(limit);

    const groupsResponse = groups.map((group) =>
      transformGroupResponse(group)
    );

    res.status(200).json({
      message: 'Requête reçue',
      data: { groups: groupsResponse },
    });
  } catch (error) {
    res.status(500).json({ message: "Une erreur s'est produite" });
  }
};

const askToJoin = async (req, res) => {
  const { groupId, user } = req.body;

  try {
    const findGroup = await Group.findOne({ _id: groupId });

    if (!findGroup) {
      return res
        .status(400)
        .json({ message: "Ce groupe n'existe pas" });
    }

    const { waitingList } = findGroup;

    const isAlreadyIsList = waitingList.find(
      (list) => list.id === user.id
    );

    if (isAlreadyIsList) {
      return res
        .status(409)
        .json({ message: "Vous êtes déjà dans la liste d'attente" });
    }

    const groupUpdated = await Group.findOneAndUpdate(
      { _id: groupId },
      { $push: { waitingList: user } },
      { new: true }
    );

    const reponse = transformGroupResponse(groupUpdated);

    res.status(201).json({
      message: 'requete recue',
      data: {
        group: reponse,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Une erreur est survenue' });
  }
};

const joinGroup = async (req, res) => {
  const { groupId, user } = req.body;

  try {
    const findGroup = await Group.findOne({ _id: groupId });

    if (!findGroup) {
      return res
        .status(400)
        .json({ message: "Ce groupe n'existe pas" });
    }

    const { members } = findGroup;

    const isAlreadyMember = members.find(
      (member) => member.id === user.id
    );

    if (isAlreadyMember) {
      return res
        .status(409)
        .json({ message: 'Vous êtes déjà dans ce groupe' });
    }

    const groupUpdated = await Group.findOneAndUpdate(
      { _id: groupId },
      { $push: { members: user } },
      { new: true }
    );

    const reponse = transformGroupResponse(groupUpdated);

    res.status(201).json({
      message: 'requete recue',
      data: {
        group: reponse,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survnue' });
  }
};

module.exports = {
  createGroup,
  getGroups,
  askToJoin,
  joinGroup,
  getJoinedGroups,
  getCreatedGroups,
};
