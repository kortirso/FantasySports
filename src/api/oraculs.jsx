import {API_HOST} from '@env';

import {validateResponse} from '../helpers/response';

const fetchAllOraculs = async accessToken => {
  try {
    const responseIncludeFields = 'id,name,oracul_place_id';
    const response = await fetch(
      `${API_HOST}/api/v1/oraculs?response_include_fields=${responseIncludeFields}&api_access_token=${accessToken}`,
      {
        method: 'GET',
      },
    );

    validateResponse(response);
    const jsonResponse = await response.json();
    return jsonResponse.oraculs.data.map(element => element.attributes);
  } catch (error) {
    if (error.name === 'AuthError') {
      throw error;
    }

    return [];
  }
};

const createOracul = async (oraculPlaceId, params, accessToken) => {
  try {
    const responseIncludeFields = 'id,name,oracul_place_id';
    const response = await fetch(
      `${API_HOST}/api/v1/oraculs?response_include_fields=${responseIncludeFields}&api_access_token=${accessToken}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oracul_place_id: oraculPlaceId,
          oracul: params,
        }),
      },
    );

    validateResponse(response);
    return await response.json();
  } catch (error) {
    if (error.name === 'AuthError') {
      throw error;
    }
  }
};

export {fetchAllOraculs, createOracul};
