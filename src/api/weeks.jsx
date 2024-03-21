import {API_HOST} from '@env';

import {validateResponse} from '../helpers/response';

const fetchWeek = async (id, accessToken) => {
  try {
    const responseIncludeFields = 'id,position,previous_id,next_id';
    const response = await fetch(
      `${API_HOST}/api/v1/weeks/${id}?response_include_fields=${responseIncludeFields}&api_access_token=${accessToken}`,
      {
        method: 'GET',
      },
    );

    validateResponse(response);
    const jsonResponse = await response.json();
    return jsonResponse.week.data.attributes;
  } catch (error) {
    if (error.name === 'AuthError') {
      throw error;
    }
  }
};

export {fetchWeek};
