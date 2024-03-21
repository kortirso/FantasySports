import {API_HOST} from '@env';

import {validateResponse} from '../helpers/response';

const fetchAllCupsPairs = async (cupsRoundId, accessToken) => {
  try {
    const responseIncludeFields =
      'id,points,predictable,start_at,home_name,visitor_name';
    const response = await fetch(
      `${API_HOST}/api/v1/cups/pairs?cups_round_id=${cupsRoundId}&response_include_fields=${responseIncludeFields}&api_access_token=${accessToken}&sort_by=start_at&sort_direction=asc`,
      {
        method: 'GET',
      },
    );

    validateResponse(response);
    const jsonResponse = await response.json();
    return jsonResponse.cups_pairs.data.map(element => element.attributes);
  } catch (error) {
    if (error.name === 'AuthError') {
      throw error;
    }

    return [];
  }
};

export {fetchAllCupsPairs};
