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

module.exports = { createGroup, getGroups };
