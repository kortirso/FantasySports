import {API_HOST} from '@env';

import {validateResponse} from '../helpers/response';

const fetchOraculsLineup = async (oraculId, weekId, accessToken) => {
  try {
    const responseIncludeFields =
      'id,periodable_id,periodable_type,forecasts,points,lineups_data';
    const response = await fetch(
      `${API_HOST}/api/v1/oraculs/lineup?oracul_id=${oraculId}${
        weekId ? `&week_id=${weekId}` : ''
      }&response_include_fields=${responseIncludeFields}&api_access_token=${accessToken}`,
      {
        method: 'GET',
      },
    );

    validateResponse(response);
    const jsonResponse = await response.json();
    return jsonResponse.oraculs_lineup.data.attributes;
  } catch (error) {
    if (error.name === 'AuthError') {
      throw error;
    }
  }
};

export {fetchOraculsLineup};
