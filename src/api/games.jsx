const fetchAllGames = async (weekId, accessToken) => {
  try {
    const host = "http://localhost:5000";
    const responseIncludeFields = "id,points,predictable,start_at,home_team,visitor_team";
    const response = await fetch(`${host}/api/v1/games?week_id=${weekId}&response_include_fields=${responseIncludeFields}&api_access_token=${accessToken}&sort_by=start_at&sort_direction=asc`, {
      method: "GET"
    });
    const jsonResponse = await response.json();
    return jsonResponse.games.data.map((element) => element.attributes);
  } catch (error) {
    console.error(error);
  }
};

export { fetchAllGames };
