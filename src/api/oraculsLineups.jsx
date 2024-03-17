const fetchOraculsLineup = async (oraculId, weekId, accessToken) => {
  try {
    const host = "http://localhost:5000";
    const responseIncludeFields = "id,periodable_id,periodable_type,forecasts,points,lineups_data";
    const response = await fetch(`${host}/api/v1/oraculs/lineup?oracul_id=${oraculId}${weekId ? `&week_id=${weekId}` : ''}&response_include_fields=${responseIncludeFields}&api_access_token=${accessToken}`, {
      method: "GET"
    });
    const jsonResponse = await response.json();
    return jsonResponse.oraculs_lineup.data.attributes;
  } catch (error) {
    console.error(error);
  }
};

export { fetchOraculsLineup };
