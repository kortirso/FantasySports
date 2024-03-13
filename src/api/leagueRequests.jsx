const getLeagues = async (accessToken) => {
  try {
    const host = "http://localhost:5000";
    const responseIncludeFields = "id,name,sport_kind,background_url";
    const response = await fetch(`${host}/api/v1/leagues?response_include_fields=${responseIncludeFields}&api_access_token=${accessToken}`, {
      method: "GET"
    });
    const jsonResponse = await response.json();
    return jsonResponse.leagues.data.map((element) => element.attributes);
  } catch (error) {
    console.error(error);
  }
};

export { getLeagues };
