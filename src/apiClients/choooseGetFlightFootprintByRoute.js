// {{chooose_api_url}}/footprint/flights/route/OSL/LAX?travelClassType=economy
/*
    https://partner-test.api.chooose.today/footprint/flights/route/ + "flight 1" + / + "flight 2"
*/

class ChooseApiClient {
  constructor() {
    this.routeFootprint = this.getAccessToken(
      authClientId,
      authClientSecret,
      authAudience
    );
  }

  getAccessToken = (authClientId, authClientSecret, authAudience) => {
    return fetch(
      'https://login.microsoftonline.com/04300fc2-8f04-4555-9a5d-c6fac7f23d0c/oauth2/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: {
          grant_type: 'client_credentials',
          client_id: authClientId,
          client_secret: authClientSecret,
          resource: authAudience
        }
      }
    ).then(async (res) => {
      const resJson = await res.json();
      if (resJson.status === 200) {
        console.log(resJson);
        return resJson;
      } else {
        throw resJson;
      }
    });
  };
}
