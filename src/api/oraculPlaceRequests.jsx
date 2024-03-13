const getOraculPlaces = async (accessToken) => {
  try {
    const host = "http://localhost:5000";
    const responseIncludeFields = "id,uuid,name,placeable_id,placeable_type";
    const response = await fetch(`${host}/api/v1/oracul_places?response_include_fields=${responseIncludeFields}&api_access_token=${accessToken}`, {
      method: "GET"
    });
    const jsonResponse = await response.json();
    return jsonResponse.oracul_places.data.map((element) => element.attributes);
  } catch (error) {
    console.error(error);
  }
};

export { getOraculPlaces };
