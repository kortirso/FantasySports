const fetchAllOraculs = async (accessToken) => {
  try {
    const host = "http://localhost:5000";
    const responseIncludeFields = "id,name,oracul_place_id";
    const response = await fetch(`${host}/api/v1/oraculs?response_include_fields=${responseIncludeFields}&api_access_token=${accessToken}`, {
      method: "GET"
    });
    const jsonResponse = await response.json();
    return jsonResponse.oraculs.data.map((element) => element.attributes);
  } catch (error) {
    console.error(error);
  }
};

const createOracul = async (oraculPlaceId, params, accessToken) => {
  try {
    const host = "http://localhost:5000";
    const responseIncludeFields = "id,name,oracul_place_id";
    const response = await fetch(`${host}/api/v1/oraculs?response_include_fields=${responseIncludeFields}&api_access_token=${accessToken}`, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ oracul_place_id: oraculPlaceId, oracul: params }),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export { fetchAllOraculs, createOracul };
