const getSeasons = async (accessToken) => {
  try {
    const host = "http://localhost:5000";
    const responseIncludeFields = "id,uuid,name,league_id";
    const response = await fetch(`${host}/api/v1/seasons?response_include_fields=${responseIncludeFields}&api_access_token=${accessToken}`, {
      method: "GET"
    });
    const jsonResponse = await response.json();
    return jsonResponse.seasons.data.map((element) => element.attributes);
  } catch (error) {
    console.error(error);
  }
};

export { getSeasons };
