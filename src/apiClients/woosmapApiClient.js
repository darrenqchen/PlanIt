const privateKey = '8bfa08f1-2962-457a-89a5-818a97a24f20';
const publicKey = 'woos-bbefc515-9121-3c19-866a-1d63ab476604';

const components = [];

export default class WoosMapApiClient {
  getLocalityLocation = (localityName) => {
    return fetch(
      `https://cors-anywhere.herokuapp.com/https://api.woosmap.com/localities/autocomplete/?input=${localityName}&components=country:fr|country:us&key=${publicKey}`,
      {
        method: 'GET',
        redirect: 'follow'
      }
    ).then(async (res) => {
      const resJson = await res.json();
      if (resJson.localities) {
        return resJson;
      } else {
        throw resJson;
      }
    });
  };

  getDistanceByLatLong = (slat, slong, dlat, dlong) => {
    return fetch(
      `https://cors-anywhere.herokuapp.com/https://api.woosmap.com/distance/distancematrix/json?origins=${slat},${slong}&destinations=${dlat},${dlong}&key=${publicKey}`,
      {
        method: 'GET',
        redirect: 'follow'
      }
    ).then(async (res) => {
      const resJson = await res.json();
      if (resJson.status === 'OK') {
        return resJson;
      } else {
        throw resJson;
      }
    });
  };
}
