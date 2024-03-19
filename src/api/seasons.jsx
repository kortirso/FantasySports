import { API_HOST } from "@env";

import { validateResponse } from "../helpers/response";

const fetchAllSeasons = async (accessToken) => {
  try {
    const responseIncludeFields = "id,name,league_id";
    const response = await fetch(`${API_HOST}/api/v1/seasons?response_include_fields=${responseIncludeFields}&api_access_token=${accessToken}`, {
      method: "GET"
    });

    validateResponse(response);
    const jsonResponse = await response.json();
    return jsonResponse.seasons.data.map((element) => element.attributes);
  } catch (error) {
    if (error.name == "AuthError") throw error;
    
    return [];
  }
};

export { fetchAllSeasons };
