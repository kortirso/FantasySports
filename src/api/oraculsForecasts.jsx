import {API_HOST} from '@env';

import {validateResponse} from '../helpers/response';

const updateOraculsForecast = async (id, params, accessToken) => {
  try {
    const response = await fetch(
      `${API_HOST}/api/v1/oraculs/forecasts/${id}.json?api_access_token=${accessToken}`,
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oraculs_forecast: params,
        }),
      },
    );
    validateResponse(response);
  } catch (error) {
    if (error.name === 'AuthError') {
      throw error;
    }
  }
};

export {updateOraculsForecast};
