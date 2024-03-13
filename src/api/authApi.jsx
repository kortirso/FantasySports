const createUser = async (email, password, passwordConfirmation) => {
  try {
    const response = await fetch("http://localhost:5000/api/v1/users?response_include_fields=email,confirmed,banned,access_token,gravatar", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ user: { email: email, password: password, password_confirmation: passwordConfirmation } }),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

const getAccessToken = async (email, password) => {
  try {
    const response = await fetch("http://localhost:5000/api/v1/users/access_tokens?response_include_fields=email,confirmed,banned,access_token,gravatar", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ user: { email: email, password: password } }),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export { createUser, getAccessToken };
