import {API_HOST} from '@env';

import {validateResponse} from '../helpers/response';

const fetchAllLeagues = async accessToken => {
  try {
    const responseIncludeFields = 'id,name,sport_kind,background_url';
    const response = await fetch(
      `${API_HOST}/api/v1/leagues?response_include_fields=${responseIncludeFields}&api_access_token=${accessToken}`,
      {
        method: 'GET',
      },
    );

    validateResponse(response);
    const jsonResponse = await response.json();
    return jsonResponse.leagues.data.map(element => element.attributes);
  } catch (error) {
    if (error.name === 'AuthError') {
      throw error;
    }

    return [];
  }
};

export {fetchAllLeagues};
