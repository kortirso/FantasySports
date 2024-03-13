const getOraculs = async (accessToken) => {
  try {
    const host = "http://localhost:5000";
    const responseIncludeFields = "uuid,name,oracul_place_id";
    const response = await fetch(`${host}/api/v1/oraculs?response_include_fields=${responseIncludeFields}&api_access_token=${accessToken}`, {
      method: "GET"
    });
    const jsonResponse = await response.json();
    return jsonResponse.oraculs.data.map((element) => element.attributes);
  } catch (error) {
    console.error(error);
  }
};

export { getOraculs };
