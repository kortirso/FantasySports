const fetchAllCupsPairs = async (cupsRoundId, accessToken) => {
  try {
    const host = "http://localhost:5000";
    const responseIncludeFields = "id,points,predictable,start_at,home_name,visitor_name";
    const response = await fetch(`${host}/api/v1/cups/pairs?cups_round_id=${cupsRoundId}&response_include_fields=${responseIncludeFields}&api_access_token=${accessToken}&sort_by=start_at&sort_direction=asc`, {
      method: "GET"
    });
    const jsonResponse = await response.json();
    return jsonResponse.cups_pairs.data.map((element) => element.attributes);
  } catch (error) {
    console.error(error);
  }
};

export { fetchAllCupsPairs };
