import shortid from 'shortid';

export const hubId = () => {
  let id = shortid();

  // HubSpot does not allow for dashes in field names.
  // We replace dashes with underscores.
  id = id.replace(/-/g, '_');

  return id;
};
