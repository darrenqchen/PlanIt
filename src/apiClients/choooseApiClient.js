const authClientId = '77d144e8-d0d9-4d33-a20a-c0a86be8ca37';
const authClientSecret = '4~RT84Bbj4q~RQ0tL.hE_DXUGDaj1DdWb5';
const authAudience = 'https://partner-test.api.chooose.today/';

export default class ChooseApiClient {
  constructor() {
    this.accessToken = this.getAccessToken(
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
