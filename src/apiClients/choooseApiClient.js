const authClientId = '77d144e8-d0d9-4d33-a20a-c0a86be8ca37';
const authClientSecret = '4~RT84Bbj4q~RQ0tL.hE_DXUGDaj1DdWb5';
const authAudience = 'https://partner-test.api.chooose.today/';
const authAudience2 = 'https://partner-test.api.chooose.today/.default';
const accessToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJodHRwczovL3BhcnRuZXItdGVzdC5hcGkuY2hvb29zZS50b2RheSIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzA0MzAwZmMyLThmMDQtNDU1NS05YTVkLWM2ZmFjN2YyM2QwYy8iLCJpYXQiOjE2NjU5MTMxMzksIm5iZiI6MTY2NTkxMzEzOSwiZXhwIjoxNjY1OTE3MDM5LCJhaW8iOiJFMlpnWUpnVmZiRC8vOW5FMVlwVFQ1dGRtdlZyUGdBPSIsImFwcGlkIjoiNzdkMTQ0ZTgtZDBkOS00ZDMzLWEyMGEtYzBhODZiZThjYTM3IiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMDQzMDBmYzItOGYwNC00NTU1LTlhNWQtYzZmYWM3ZjIzZDBjLyIsInJoIjoiMC5BVHdBd2c4d0JBU1BWVVdhWGNiNnhfSTlESXVDcVZyU3pGTkxtb3Axekw1QkJDNDhBQUEuIiwidGlkIjoiMDQzMDBmYzItOGYwNC00NTU1LTlhNWQtYzZmYWM3ZjIzZDBjIiwidXRpIjoiSHpBa3dtdmJPMHFPQWJVX0wxTXNBQSIsInZlciI6IjEuMCJ9.fEhDQk80e_mdyM_k1K1AvBYvalDu7Iz1ZtTBFYfjv9RHDYaBxNWI52xfX6lr6MV5SwpE3IJF0fImPUowNDAHC28JXM2ooBToqNBZI9SMbcO6Zn68a8SKxutslEiC1gEffIgAExej5W5s-s3SDIpo_S9pVAomjBUYoAy2vZJDMyJz8_TsLCW2FbQzL0QTwhQmCWK75au-PKEgGhRnlLPWgtokfHqc4wy2qmwRXqhQ4GS4IZ9OIHj1C9P6HSbX8N6zSyqSw4YImz8Kb_qB-RgBU12ztsURng3AGyN6nwKB670R9h1K_Kq9NO_xIBtnNOwA1lBu-9GToou_t_VMuIKnpQ';

export default class ChoooseApiClient {
  constructor() {}

  getAccessToken = (authClientId, authClientSecret, authAudience) => {
    return fetch(
      `https://login.microsoftonline.com/04300fc2-8f04-4555-9a5d-c6fac7f23d0c/oauth2/v2.0/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: {
          grant_type: 'client_credentials',
          client_id: authClientId,
          client_secret: authClientSecret,
          resource: authAudience2
        }
      }
    ).then(async (res) => {
      const resJson = await res.json();
      console.log(resJson);
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
        Authorization: `Bearer ${accessToken}`
      }
    }).then(async (res) => {
      const resJson = await res.json();
      if (resJson.kilosCo2e) {
        return resJson.kilosCo2e;
      } else {
        throw resJson;
      }
    });
  };

  getFlightFootprintByDistance = (km, travelClass, passengers) => {
    return this.fetchGet(
      `https://partner-test.api.chooose.today/v1/footprint/flights/distance?km=${km}&travelClass=${travelClass}&passengers=${passengers}`
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
    return this.fetchGet(
      `https://partner-test.api.chooose.today/v1/footprint/flights/icao/${src}/${dst}?travelClassType=${travelClassType}`
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
    return this.fetchGet(
      `https://partner-test.api.chooose.today/v1/footprint/flights/${src}/${dst}/${flightnumber}/${date}?travelClass=${travelClass}&passengers=${passengers}`
    );
  };

  getPrintBySpecificFlight = (
    src,
    dst,
    flightnumber,
    travelClass,
    passengers
  ) => {
    return this.fetchGet(
      `https://partner-test.api.chooose.today/v1/footprint/flights/${src}/${dst}/${flightnumber}?travelClass=${travelClass}&passengers=${passengers}`
    );
  };

  getCargoPrintBySpecificFlight = (src, dst, flightnumber, cargoKilos) => {
    return this.fetchGet(
      `https://cors-anywhere.herokuapp.com/https://partner-test.api.chooose.today/v1/footprint/flights/${src}/${dst}/${flightnumber}/?cargoKilos=${cargoKilos}`
    );
  };

  getCarFootprint = (km) => {
    return this.fetchGet(
      `https://partner-test.api.chooose.today/v1/footprint/cars?km=${km}`
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
    return this.fetchGet(
      `https://partner-test.api.chooose.today/v1/footprint/busses/coach?km=${km}&passengers=${passengers}`
    );
  };

  getTrainFootprint = (km, passengers) => {
    return this.fetchGet(
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
    return this.fetchGet(
      `https://partner-test.api.chooose.today/v1/footprint/hotels/${countryOrRegion}?rooms=${rooms}&days=${days}`
    );
  };
}
