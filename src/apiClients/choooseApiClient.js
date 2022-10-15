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

  // abstracts out the GET
  fetchGet = (url) => {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      },
    }).then((async (res) => {
      const resJson = await res.json()
      if (resJson.status === 200) {
        console.log(resJson)
        return resJson
      } else {
        throw resJson
      }
    }))
  }

  getFlightPrintByDistance = (km, travelClass, passengers ) => {
    return fetchGet(`https://cors-anywhere.herokuapp.com/https://partner-test.api.chooose.today/v1/footprint/flights/distance?km=${km}&travelClass=${travelClass}&passengers=${passengers}`)
  }

  getFlightPrintByRoute = (src, dst, travelClassType) => {
    return fetchGet(`https://cors-anywhere.herokuapp.com/https://partner-test.api.chooose.today/v1/footprint/flights/icao/${src}/${dst}?travelClassType=${travelClassType}`)
  }

  getPrintBySpecificFlightAndDate = (src, dst, flightnumber, date, travelClass, passengers) => {
    return fetchGet(`https://cors-anywhere.herokuapp.com/https://partner-test.api.chooose.today/v1/footprint/flights/${src}/${dst}/${flightnumber}/${date}?travelClass=${travelClass}&passengers=${passengers}`)
  }

  getPrintBySpecificFlight = (src, dst, flightnumber, travelClass, passengers) => {
    return fetchGet(`https://cors-anywhere.herokuapp.com/https://partner-test.api.chooose.today/v1/footprint/flights/${src}/${dst}/${flightnumber}?travelClass=${travelClass}&passengers=${passengers}`)
  }

  getCargoPrintBySpecificFlight = (src, dst, flightnumber, cargoKilos) => {
    return fetchGet(`https://cors-anywhere.herokuapp.com/https://partner-test.api.chooose.today/v1/footprint/flights/${src}/${dst}/${flightnumber}/?cargoKilos=${cargoKilos}`)
  }

  getCarFootprint = (km) => {
    return fetchGet(`https://cors-anywhere.herokuapp.com/https://partner-test.api.chooose.today/v1/footprint/cars?km=${km}`)
  }

  getCoachBusFootprint = (km, passengers) => {
    return fetchGet(`https://cors-anywhere.herokuapp.com/https://partner-test.api.chooose.today/v1/footprint/busses/coach?km=${km}&passengers=${passengers}`)
  }

  getTrainFootprint = (km, passengers) => {
    return fetchGet(`https://partner-test.api.chooose.today/v1/footprint/trains?km=${km}&passengers=${passengers}`)
  }

  getHotelStayFootprint = (countryOrRegion, rooms, days) => {
    return fetchGet(`https://cors-anywhere.herokuapp.com/https://partner-test.api.chooose.today/v1/footprint/hotels/${countryOrRegion}?rooms=${rooms}&days=${days}`)
  }
}
