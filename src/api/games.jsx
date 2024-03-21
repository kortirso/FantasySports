import {API_HOST} from '@env';

import {validateResponse} from '../helpers/response';

const fetchAllGames = async (weekId, accessToken) => {
  try {
    const responseIncludeFields =
      'id,points,predictable,start_at,home_team,visitor_team';
    const response = await fetch(
      `${API_HOST}/api/v1/games?week_id=${weekId}&response_include_fields=${responseIncludeFields}&api_access_token=${accessToken}&sort_by=start_at&sort_direction=asc`,
      {
        method: 'GET',
      },
    );

    validateResponse(response);
    const jsonResponse = await response.json();
    return jsonResponse.games.data.map(element => element.attributes);
  } catch (error) {
    if (error.name === 'AuthError') {
      throw error;
    }

    return [];
  }
};

export {fetchAllGames};
