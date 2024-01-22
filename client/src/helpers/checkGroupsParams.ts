import { groupParamsInterface } from '@/types/group';

export const checkGroupsParams = (object: {
  name?: any;
  filtre?: any;
  limit?: any;
}) => {
  let params: groupParamsInterface = {
    filtre: 'groupe',
    limit: 0,
    name: '',
  };

  const { name, filtre, limit } = object;

  if (!name && !filtre && !limit) {
    params.filtre = 'groupe';
    params.limit = 10;
    params.name = '';
  }

  switch (name) {
    case undefined:
      params.name = '';
      break;
    default:
      params.name = name.replaceAll('-', ' ');
      break;
  }

  if (!filtre) {
    params.filtre = 'groupe';
  } else if (filtre !== 'groupe' && filtre !== 'ville') {
    params.filtre = 'groupe';
  } else {
    params.filtre = filtre;
  }

  if (!limit || isNaN(parseInt(limit))) {
    params.limit = 10;
  } else {
    params.limit = parseInt(limit, 10);
  }

  return params;
};
