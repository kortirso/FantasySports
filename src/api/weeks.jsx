const fetchWeek = async (id, accessToken) => {
  try {
    const host = "http://localhost:5000";
    const responseIncludeFields = "id,position,previous_id,next_id";
    const response = await fetch(`${host}/api/v1/weeks/${id}?response_include_fields=${responseIncludeFields}&api_access_token=${accessToken}`, {
      method: "GET"
    });
    const jsonResponse = await response.json();
    return jsonResponse.week.data.attributes;
  } catch (error) {
    console.error(error);
  }
};

export { fetchWeek };
