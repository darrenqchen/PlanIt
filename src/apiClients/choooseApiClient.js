const authClientId = '77d144e8-d0d9-4d33-a20a-c0a86be8ca37';
const authClientSecret = '4~RT84Bbj4q~RQ0tL.hE_DXUGDaj1DdWb5';
const authAudience = 'https://partner-test.api.chooose.today/';

export default class ChoooseApiClient {
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
        Authorization: `Bearer ${this.accessToken}`
      }
    }).then(async (res) => {
      const resJson = await res.json();
      if (resJson.status === 200) {
        return resJson;
      } else {
        throw resJson;
      }
    });
  };

  getFlightFootprintByDistance = (km, travelClass, passengers) => {
    return fetchGet(
      `https://cors-anywhere.herokuapp.com/https://partner-test.api.chooose.today/v1/footprint/flights/distance?km=${km}&travelClass=${travelClass}&passengers=${passengers}`
    );
  };

  getFlightFootprintByDistanceMock = (km) => {
    if (km === 678) {
      return {
        radiativeForcingFactor: 1.9,
        distanceKm: 678,
        distanceMiles: 421,
        roundTrip: false,
        flights: 1.0,
        passengers: 2.0,
        travelClass: 'Economy',
        sourceMethodology: null,
        kilosCo2: 204.837024,
        kilosCo2e: 206.798052,
        lbsCo2: 451.58833690258061439613721897,
        lbsCo2e: 455.91166359345947551983733765,
        source: 'BEIS 2022: International outside UK, Economy class'
      };
    } else
      return {
        radiativeForcingFactor: 1.9,
        distanceKm: 478,
        distanceMiles: 297,
        roundTrip: false,
        flights: 1.0,
        passengers: 2.0,
        travelClass: 'Economy',
        sourceMethodology: null,
        kilosCo2: 144.393312,
        kilosCo2e: 145.775676,
        lbsCo2: 318.33276207886830195137541665,
        lbsCo2e: 321.38035302489766307136074623,
        source: 'BEIS 2022: International outside UK, Economy class'
      };
  };

  // Uses the 3 digit IATA code for src, dst
  getFlightFootprintByRoute = (src, dst, travelClassType) => {
    return fetchGet(
      `https://cors-anywhere.herokuapp.com/https://partner-test.api.chooose.today/v1/footprint/flights/icao/${src}/${dst}?travelClassType=${travelClassType}`
    );
  };

  getFootprintBySpecificFlightAndDate = (
    src,
    dst,
    flightnumber,
    date,
    travelClass,
    passengers
  ) => {
    return fetchGet(
      `https://cors-anywhere.herokuapp.com/https://partner-test.api.chooose.today/v1/footprint/flights/${src}/${dst}/${flightnumber}/${date}?travelClass=${travelClass}&passengers=${passengers}`
    );
  };

  getPrintBySpecificFlight = (
    src,
    dst,
    flightnumber,
    travelClass,
    passengers
  ) => {
    return fetchGet(
      `https://cors-anywhere.herokuapp.com/https://partner-test.api.chooose.today/v1/footprint/flights/${src}/${dst}/${flightnumber}?travelClass=${travelClass}&passengers=${passengers}`
    );
  };

  getCargoPrintBySpecificFlight = (src, dst, flightnumber, cargoKilos) => {
    return fetchGet(
      `https://cors-anywhere.herokuapp.com/https://partner-test.api.chooose.today/v1/footprint/flights/${src}/${dst}/${flightnumber}/?cargoKilos=${cargoKilos}`
    );
  };

  getCarFootprint = (km) => {
    return fetchGet(
      `https://cors-anywhere.herokuapp.com/https://partner-test.api.chooose.today/v1/footprint/cars?km=${km}`
    );
  };

  getCarFootprintMock = (km) => {
    if (km == 678) {
      return {
        inputParameters: {
          area: null,
          year: null,
          make: null,
          model: null,
          derivative: null,
          fuelType: null,
          testMethod: 'WltpWithNedcConversionFallback'
        },
        resultParameters: {
          area: null,
          year: null,
          make: null,
          model: null,
          derivative: null,
          fuelType: null,
          testMethod: 'WltpWithNedcConversionFallback'
        },
        km: 678.0,
        miles: 421.0,
        cars: 1,
        kilosCo2: null,
        kilosCo2e: 103.38875535593765597639159539,
        lbsCo2: null,
        lbsCo2e: 227.93318890248893731698263662,
        source:
          'EEA 2010-2019 car emission data, EU JCR 2017 NEDC to WLTP correlation data, EEA 2017 EU electricity emission data'
      };
    } else if (km == 478) {
      return {
        inputParameters: {
          area: null,
          year: null,
          make: null,
          model: null,
          derivative: null,
          fuelType: null,
          testMethod: 'WltpWithNedcConversionFallback'
        },
        resultParameters: {
          area: null,
          year: null,
          make: null,
          model: null,
          derivative: null,
          fuelType: null,
          testMethod: 'WltpWithNedcConversionFallback'
        },
        km: 478.0,
        miles: 297.0,
        cars: 1,
        kilosCo2: null,
        kilosCo2e: 72.890597433832152738517968434,
        lbsCo2: null,
        lbsCo2e: 160.69626002269869032082256683,
        source:
          'EEA 2010-2019 car emission data, EU JCR 2017 NEDC to WLTP correlation data, EEA 2017 EU electricity emission data'
      };
    }
  };

  getCoachBusFootprint = (km, passengers) => {
    return fetchGet(
      `https://cors-anywhere.herokuapp.com/https://partner-test.api.chooose.today/v1/footprint/busses/coach?km=${km}&passengers=${passengers}`
    );
  };

  getTrainFootprint = (km, passengers) => {
    return fetchGet(
      `https://partner-test.api.chooose.today/v1/footprint/trains?km=${km}&passengers=${passengers}`
    );
  };

  getTrainFootprintMock = (km, passengers) => {
    if (km == 678) {
      return {
        km: 678.0,
        miles: 421.0,
        passengers: 2,
        roundTrip: false,
        kilosCo2: null,
        kilosCo2e: 38.49684,
        lbsCo2: null,
        lbsCo2e: 84.87100433369282644679406755,
        source: 'EEA 2014'
      };
    } else if (km == 478) {
      return {
        km: 478.0,
        miles: 297.0,
        passengers: 2,
        roundTrip: false,
        kilosCo2: null,
        kilosCo2e: 27.14084,
        lbsCo2: null,
        lbsCo2e: 59.835309839978128379893162666,
        source: 'EEA 2014'
      };
    }
  };

  // countryOrRegion = "USA, Europe, World"
  getHotelStayFootprint = (countryOrRegion, rooms, days) => {
    return fetchGet(
      `https://cors-anywhere.herokuapp.com/https://partner-test.api.chooose.today/v1/footprint/hotels/${countryOrRegion}?rooms=${rooms}&days=${days}`
    );
  };
}
