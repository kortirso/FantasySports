import {API_HOST} from '@env';

const createUser = async (email, password, passwordConfirmation) => {
  try {
    const response = await fetch(
      `${API_HOST}/api/v1/users?response_include_fields=email,confirmed,banned,access_token,gravatar,locale`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
          },
        }),
      },
    );
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

const destroyUser = async accessToken => {
  try {
    const response = await fetch(
      `${API_HOST}/api/v1/users?api_access_token=${accessToken}`,
      {
        method: 'DELETE',
      },
    );
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

const getAccessToken = async (email, password) => {
  try {
    const response = await fetch(
      `${API_HOST}/api/v1/users/access_tokens?response_include_fields=email,confirmed,banned,access_token,gravatar,locale`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
          },
        }),
      },
    );
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export {createUser, destroyUser, getAccessToken};
