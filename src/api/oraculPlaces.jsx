import {API_HOST} from '@env';

import {validateResponse} from '../helpers/response';

const fetchAllOraculPlaces = async accessToken => {
  try {
    const responseIncludeFields = 'id,name,placeable_id,placeable_type';
    const response = await fetch(
      `${API_HOST}/api/v1/oracul_places?response_include_fields=${responseIncludeFields}&api_access_token=${accessToken}`,
      {
        method: 'GET',
      },
    );

    validateResponse(response);
    const jsonResponse = await response.json();
    return jsonResponse.oracul_places.data.map(element => element.attributes);
  } catch (error) {
    if (error.name === 'AuthError') {
      throw error;
    }

    return [];
  }
};

export {fetchAllOraculPlaces};
