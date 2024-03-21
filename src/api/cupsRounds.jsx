import {API_HOST} from '@env';

import {validateResponse} from '../helpers/response';

const fetchCupsRound = async (id, accessToken) => {
  try {
    const responseIncludeFields = 'id,position,name,previous_id,next_id';
    const response = await fetch(
      `${API_HOST}/api/v1/cups/rounds/${id}?response_include_fields=${responseIncludeFields}&api_access_token=${accessToken}`,
      {
        method: 'GET',
      },
    );

    validateResponse(response);
    const jsonResponse = await response.json();
    return jsonResponse.cups_round.data.attributes;
  } catch (error) {
    if (error.name === 'AuthError') {
      throw error;
    }
  }
};

export {fetchCupsRound};
