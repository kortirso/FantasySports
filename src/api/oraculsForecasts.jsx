const updateOraculsForecast = async (id, params, accessToken) => {
  try {
    const host = "http://localhost:5000";
    fetch(`${host}/api/v1/oraculs/forecasts/${id}.json?api_access_token=${accessToken}`, {
      method: "PATCH",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ oraculs_forecast: params }),
    });
  } catch (error) {
    console.error(error);
  }
};

export { updateOraculsForecast };
