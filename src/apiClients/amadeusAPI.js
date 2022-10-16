const shashId = 'qiRQ4A4LAMr9GwGHGvnGR8IvDMG8jb3G';
const benId = 'A5JtqFrFWxN59X8JtyTrV7rYcdLQWK9R';
const shashSecret = '8y9nYPW3Bi7o1tRn';
const benSecret = 'HyzdsGP59q32cySg';

export default class AmadeusAPI {
  constructor(accessToken) {
    this.accessToken = accessToken;
    console.log(this.accessToken);
  }

  static getAccessToken = async () => {
    return fetch(
      'https://cors-anywhere.herokuapp.com/https://test.api.amadeus.com/v1/security/oauth2/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=client_credentials&client_id=${benId}&client_secret=${benSecret}`
      }
    ).then(async (res) => {
      const resJson = await res.json();
      if (resJson.state === 'approved') {
        return resJson.access_token;
      } else {
        throw resJson;
      }
    });
  };

  getTravelRecommendations = (cityCode) => {
    return fetch(
      `https://cors-anywhere.herokuapp.com/https://test.api.amadeus.com/v1/reference-data/recommended-locations?cityCodes=${cityCode}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.accessToken}`
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

  getNearestAirportByCoords = (lat, long) => {
    return fetch(
      `https://cors-anywhere.herokuapp.com/https://test.api.amadeus.com/v1/reference-data/locations/airports?latitude=${lat}&longitude=${long}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      }
    ).then(async (res) => {
      const resJson = await res.json();
      console.log(resJson);
      return resJson;
    });
  };

  getNearestAirportByCoordsMock = (lonOrPar) => {
    if (lonOrPar === 'paris') {
      return {
        meta: {
          count: 60,
          links: {
            self: 'https://test.api.amadeus.com/v1/reference-data/locations/airports?latitude=48.85349504454055&longitude=2.3483914659676657&sort=relevance',
            next: 'https://test.api.amadeus.com/v1/reference-data/locations/airports?latitude=48.85349504454055&longitude=2.3483914659676657&sort=relevance&page%5Boffset%5D=10',
            last: 'https://test.api.amadeus.com/v1/reference-data/locations/airports?latitude=48.85349504454055&longitude=2.3483914659676657&sort=relevance&page%5Boffset%5D=50'
          }
        },
        data: [
          {
            type: 'location',
            subType: 'AIRPORT',
            name: 'ORLY',
            detailedName: 'PARIS/FR:ORLY',
            timeZoneOffset: '+02:00',
            iataCode: 'ORY',
            geoCode: {
              latitude: 48.72528,
              longitude: 2.35945
            },
            address: {
              cityName: 'PARIS',
              cityCode: 'PAR',
              countryName: 'FRANCE',
              countryCode: 'FR',
              regionCode: 'EUROP'
            },
            distance: {
              value: 14,
              unit: 'KM'
            },
            analytics: {
              flights: {
                score: 26
              },
              travelers: {
                score: 23
              }
            },
            relevance: 182.60245
          },
          {
            type: 'location',
            subType: 'AIRPORT',
            name: 'CHARLES DE GAULLE',
            detailedName: 'PARIS/FR:CHARLES DE GAULLE',
            timeZoneOffset: '+02:00',
            iataCode: 'CDG',
            geoCode: {
              latitude: 49.01278,
              longitude: 2.55
            },
            address: {
              cityName: 'PARIS',
              cityCode: 'PAR',
              countryName: 'FRANCE',
              countryCode: 'FR',
              regionCode: 'EUROP'
            },
            distance: {
              value: 23,
              unit: 'KM'
            },
            analytics: {
              flights: {
                score: 41
              },
              travelers: {
                score: 42
              }
            },
            relevance: 179.4697
          },
          {
            type: 'location',
            subType: 'AIRPORT',
            name: 'HEATHROW',
            detailedName: 'LONDON/GB:HEATHROW',
            timeZoneOffset: '+01:00',
            iataCode: 'LHR',
            geoCode: {
              latitude: 51.4775,
              longitude: -0.46138
            },
            address: {
              cityName: 'LONDON',
              cityCode: 'LON',
              countryName: 'UNITED KINGDOM',
              countryCode: 'GB',
              regionCode: 'EUROP'
            },
            distance: {
              value: 354,
              unit: 'KM'
            },
            analytics: {
              flights: {
                score: 39
              },
              travelers: {
                score: 45
              }
            },
            relevance: 11.03552
          },
          {
            type: 'location',
            subType: 'AIRPORT',
            name: 'GATWICK',
            detailedName: 'LONDON/GB:GATWICK',
            timeZoneOffset: '+01:00',
            iataCode: 'LGW',
            geoCode: {
              latitude: 51.15612,
              longitude: -0.17805
            },
            address: {
              cityName: 'LONDON',
              cityCode: 'LON',
              countryName: 'UNITED KINGDOM',
              countryCode: 'GB',
              regionCode: 'EUROP'
            },
            distance: {
              value: 313,
              unit: 'KM'
            },
            analytics: {
              flights: {
                score: 27
              },
              travelers: {
                score: 27
              }
            },
            relevance: 8.53005
          },
          {
            type: 'location',
            subType: 'AIRPORT',
            name: 'FRANKFURT INTL',
            detailedName: 'FRANKFURT/DE:FRANKFURT INTL',
            timeZoneOffset: '+02:00',
            iataCode: 'FRA',
            geoCode: {
              latitude: 50.04056,
              longitude: 8.55612
            },
            address: {
              cityName: 'FRANKFURT',
              cityCode: 'FRA',
              countryName: 'GERMANY',
              countryCode: 'DE',
              regionCode: 'EUROP'
            },
            distance: {
              value: 468,
              unit: 'KM'
            },
            analytics: {
              flights: {
                score: 37
              },
              travelers: {
                score: 38
              }
            },
            relevance: 7.98445
          },
          {
            type: 'location',
            subType: 'AIRPORT',
            name: 'DUESSELDORF',
            detailedName: 'DUESSELDORF/DE:DUESSELDORF',
            timeZoneOffset: '+02:00',
            iataCode: 'DUS',
            geoCode: {
              latitude: 51.28056,
              longitude: 6.76723
            },
            address: {
              cityName: 'DUESSELDORF',
              cityCode: 'DUS',
              countryName: 'GERMANY',
              countryCode: 'DE',
              regionCode: 'EUROP'
            },
            distance: {
              value: 415,
              unit: 'KM'
            },
            analytics: {
              flights: {
                score: 19
              },
              travelers: {
                score: 16
              }
            },
            relevance: 4.59724
          },
          {
            type: 'location',
            subType: 'AIRPORT',
            name: 'STANSTED',
            detailedName: 'LONDON/GB:STANSTED',
            timeZoneOffset: '+01:00',
            iataCode: 'STN',
            geoCode: {
              latitude: 51.885,
              longitude: 0.23501
            },
            address: {
              cityName: 'LONDON',
              cityCode: 'LON',
              countryName: 'UNITED KINGDOM',
              countryCode: 'GB',
              regionCode: 'EUROP'
            },
            distance: {
              value: 369,
              unit: 'KM'
            },
            analytics: {
              flights: {
                score: 16
              },
              travelers: {
                score: 15
              }
            },
            relevance: 4.33287
          },
          {
            type: 'location',
            subType: 'AIRPORT',
            name: 'BEAUVAIS TILLE',
            detailedName: 'PARIS/FR:BEAUVAIS TILLE',
            timeZoneOffset: '+02:00',
            iataCode: 'BVA',
            geoCode: {
              latitude: 49.45445,
              longitude: 2.11278
            },
            address: {
              cityName: 'PARIS',
              cityCode: 'PAR',
              countryName: 'FRANCE',
              countryCode: 'FR',
              regionCode: 'EUROP'
            },
            distance: {
              value: 69,
              unit: 'KM'
            },
            analytics: {
              flights: {
                score: 3
              },
              travelers: {
                score: 2
              }
            },
            relevance: 3.88002
          },
          {
            type: 'location',
            subType: 'AIRPORT',
            name: 'LUTON',
            detailedName: 'LONDON/GB:LUTON',
            timeZoneOffset: '+01:00',
            iataCode: 'LTN',
            geoCode: {
              latitude: 51.87473,
              longitude: -0.36833
            },
            address: {
              cityName: 'LONDON',
              cityCode: 'LON',
              countryName: 'UNITED KINGDOM',
              countryCode: 'GB',
              regionCode: 'EUROP'
            },
            distance: {
              value: 387,
              unit: 'KM'
            },
            analytics: {
              flights: {
                score: 11
              },
              travelers: {
                score: 10
              }
            },
            relevance: 2.90248
          },
          {
            type: 'location',
            subType: 'AIRPORT',
            name: 'SAINT EXUPERY',
            detailedName: 'LYON/FR:SAINT EXUPERY',
            timeZoneOffset: '+02:00',
            iataCode: 'LYS',
            geoCode: {
              latitude: 45.72639,
              longitude: 5.09084
            },
            address: {
              cityName: 'LYON',
              cityCode: 'LYS',
              countryName: 'FRANCE',
              countryCode: 'FR',
              regionCode: 'EUROP'
            },
            distance: {
              value: 404,
              unit: 'KM'
            },
            analytics: {
              flights: {
                score: 11
              },
              travelers: {
                score: 7
              }
            },
            relevance: 2.687
          }
        ]
      };
    } else if (lonOrPar === 'london') {
      return {
        meta: {
          count: 47,
          links: {
            self: 'https://test.api.amadeus.com/v1/reference-data/locations/airports?latitude=51.5072&longitude=0.1276&radius=500&sort=relevance&page%5Boffset%5D=0&page%5Blimit%5D=10',
            next: 'https://test.api.amadeus.com/v1/reference-data/locations/airports?latitude=51.5072&longitude=0.1276&radius=500&sort=relevance&page%5Boffset%5D=10&page%5Blimit%5D=10',
            last: 'https://test.api.amadeus.com/v1/reference-data/locations/airports?latitude=51.5072&longitude=0.1276&radius=500&sort=relevance&page%5Boffset%5D=37&page%5Blimit%5D=10'
          }
        },
        data: [
          {
            type: 'location',
            subType: 'AIRPORT',
            name: 'CITY AIRPORT',
            detailedName: 'LONDON/GB:CITY AIRPORT',
            timeZoneOffset: '+01:00',
            iataCode: 'LCY',
            geoCode: {
              latitude: 51.50528,
              longitude: 0.05528
            },
            address: {
              cityName: 'LONDON',
              cityCode: 'LON',
              countryName: 'UNITED KINGDOM',
              countryCode: 'GB',
              regionCode: 'EUROP'
            },
            distance: {
              value: 5,
              unit: 'KM'
            },
            analytics: {
              flights: {
                score: 8
              },
              travelers: {
                score: 4
              }
            },
            relevance: 152.72125
          },
          {
            type: 'location',
            subType: 'AIRPORT',
            name: 'HEATHROW',
            detailedName: 'LONDON/GB:HEATHROW',
            timeZoneOffset: '+01:00',
            iataCode: 'LHR',
            geoCode: {
              latitude: 51.4775,
              longitude: -0.46138
            },
            address: {
              cityName: 'LONDON',
              cityCode: 'LON',
              countryName: 'UNITED KINGDOM',
              countryCode: 'GB',
              regionCode: 'EUROP'
            },
            distance: {
              value: 40,
              unit: 'KM'
            },
            analytics: {
              flights: {
                score: 39
              },
              travelers: {
                score: 45
              }
            },
            relevance: 95.40705
          },
          {
            type: 'location',
            subType: 'AIRPORT',
            name: 'GATWICK',
            detailedName: 'LONDON/GB:GATWICK',
            timeZoneOffset: '+01:00',
            iataCode: 'LGW',
            geoCode: {
              latitude: 51.15612,
              longitude: -0.17805
            },
            address: {
              cityName: 'LONDON',
              cityCode: 'LON',
              countryName: 'UNITED KINGDOM',
              countryCode: 'GB',
              regionCode: 'EUROP'
            },
            distance: {
              value: 44,
              unit: 'KM'
            },
            analytics: {
              flights: {
                score: 27
              },
              travelers: {
                score: 27
              }
            },
            relevance: 60.11732
          },
          {
            type: 'location',
            subType: 'AIRPORT',
            name: 'STANSTED',
            detailedName: 'LONDON/GB:STANSTED',
            timeZoneOffset: '+01:00',
            iataCode: 'STN',
            geoCode: {
              latitude: 51.885,
              longitude: 0.23501
            },
            address: {
              cityName: 'LONDON',
              cityCode: 'LON',
              countryName: 'UNITED KINGDOM',
              countryCode: 'GB',
              regionCode: 'EUROP'
            },
            distance: {
              value: 42,
              unit: 'KM'
            },
            analytics: {
              flights: {
                score: 16
              },
              travelers: {
                score: 15
              }
            },
            relevance: 37.46034
          },
          {
            type: 'location',
            subType: 'AIRPORT',
            name: 'LUTON',
            detailedName: 'LONDON/GB:LUTON',
            timeZoneOffset: '+01:00',
            iataCode: 'LTN',
            geoCode: {
              latitude: 51.87473,
              longitude: -0.36833
            },
            address: {
              cityName: 'LONDON',
              cityCode: 'LON',
              countryName: 'UNITED KINGDOM',
              countryCode: 'GB',
              regionCode: 'EUROP'
            },
            distance: {
              value: 53,
              unit: 'KM'
            },
            analytics: {
              flights: {
                score: 11
              },
              travelers: {
                score: 10
              }
            },
            relevance: 21.09122
          },
          {
            type: 'location',
            subType: 'AIRPORT',
            name: 'CHARLES DE GAULLE',
            detailedName: 'PARIS/FR:CHARLES DE GAULLE',
            timeZoneOffset: '+02:00',
            iataCode: 'CDG',
            geoCode: {
              latitude: 49.01278,
              longitude: 2.55
            },
            address: {
              cityName: 'PARIS',
              cityCode: 'PAR',
              countryName: 'FRANCE',
              countryCode: 'FR',
              regionCode: 'EUROP'
            },
            distance: {
              value: 326,
              unit: 'KM'
            },
            analytics: {
              flights: {
                score: 41
              },
              travelers: {
                score: 42
              }
            },
            relevance: 12.6692
          },
          {
            type: 'location',
            subType: 'AIRPORT',
            name: 'ORLY',
            detailedName: 'PARIS/FR:ORLY',
            timeZoneOffset: '+02:00',
            iataCode: 'ORY',
            geoCode: {
              latitude: 48.72528,
              longitude: 2.35945
            },
            address: {
              cityName: 'PARIS',
              cityCode: 'PAR',
              countryName: 'FRANCE',
              countryCode: 'FR',
              regionCode: 'EUROP'
            },
            distance: {
              value: 348,
              unit: 'KM'
            },
            analytics: {
              flights: {
                score: 26
              },
              travelers: {
                score: 23
              }
            },
            relevance: 7.50171
          },
          {
            type: 'location',
            subType: 'AIRPORT',
            name: 'MANCHESTER AIRPORT',
            detailedName: 'MANCHESTER/GB:MANCHESTER AIRPO',
            timeZoneOffset: '+01:00',
            iataCode: 'MAN',
            geoCode: {
              latitude: 53.35362,
              longitude: -2.275
            },
            address: {
              cityName: 'MANCHESTER',
              cityCode: 'MAN',
              countryName: 'UNITED KINGDOM',
              countryCode: 'GB',
              regionCode: 'EUROP'
            },
            distance: {
              value: 262,
              unit: 'KM'
            },
            analytics: {
              flights: {
                score: 18
              },
              travelers: {
                score: 17
              }
            },
            relevance: 6.87772
          },
          {
            type: 'location',
            subType: 'AIRPORT',
            name: 'BIRMINGHAM',
            detailedName: 'BIRMINGHAM/GB:BIRMINGHAM',
            timeZoneOffset: '+01:00',
            iataCode: 'BHX',
            geoCode: {
              latitude: 52.45389,
              longitude: -1.74805
            },
            address: {
              cityName: 'BIRMINGHAM',
              cityCode: 'BHX',
              countryName: 'UNITED KINGDOM',
              countryCode: 'GB',
              regionCode: 'EUROP'
            },
            distance: {
              value: 166,
              unit: 'KM'
            },
            analytics: {
              flights: {
                score: 10
              },
              travelers: {
                score: 8
              }
            },
            relevance: 6.17616
          },
          {
            type: 'location',
            subType: 'AIRPORT',
            name: 'DUESSELDORF',
            detailedName: 'DUESSELDORF/DE:DUESSELDORF',
            timeZoneOffset: '+02:00',
            iataCode: 'DUS',
            geoCode: {
              latitude: 51.28056,
              longitude: 6.76723
            },
            address: {
              cityName: 'DUESSELDORF',
              cityCode: 'DUS',
              countryName: 'GERMANY',
              countryCode: 'DE',
              regionCode: 'EUROP'
            },
            distance: {
              value: 461,
              unit: 'KM'
            },
            analytics: {
              flights: {
                score: 19
              },
              travelers: {
                score: 16
              }
            },
            relevance: 4.13645
          }
        ]
      };
    }
  };

  getPointsOfInterest = (north, south, east, west) => {
    return fetch(
      `https://cors-anywhere.herokuapp.com/https://test.api.amadeus.com/?north=${north}&west=${west}&south=${south}&east=${east}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.accessToken}`
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

  getFlights = (origin, destination, departureDate, adults) => {
    return fetch(
      `https://cors-anywhere.herokuapp.com/https://test.api.amadeus.com/v2/shopping/flight-offers
        ?originLocationCode=${origin}&destinationLocationCode=${destination}
        &departureDate=${departureDate}&adults=${adults}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.accessToken}`
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

  getFlightsMock = (origin, destination, departureDate) => {
    return {
      meta: {
        count: 2
      },
      data: [
        {
          id: '1',
          source: `${origin}`,
          itineraries: [
            {
              duration: '14.25',
              segments: [
                {
                  departure: {
                    iataCode: `${origin}`
                  },
                  arrival: {
                    iataCode: 'MNL'
                  }
                },
                {
                  departure: {
                    iataCode: 'MNL'
                  },
                  arrival: {
                    iataCode: `${destination}`
                  }
                }
              ]
            }
          ],
          price: {
            currency: 'EUR',
            grandTotal: '355.34'
          }
        },
        {
          id: '2',
          source: `${origin}`,
          itineraries: [
            {
              duration: '16.55',
              segments: [
                {
                  departure: {
                    iataCode: `${origin}`
                  },
                  arrival: {
                    iataCode: 'MNL'
                  }
                },
                {
                  departure: {
                    iataCode: 'MNL'
                  },
                  arrival: {
                    iataCode: `${destination}`
                  }
                }
              ]
            }
          ],
          price: {
            currency: 'EUR',
            grandTotal: '355.34'
          },
          pricingOptions: {
            fareType: ['PUBLISHED'],
            includedCheckedBagsOnly: true
          },
          validatingAirlineCodes: ['PR']
        }
      ]
    };
  };

  // Uses IATA table code
  getHotels = async (iataCode) => {
    return fetch(
      `https://cors-anywhere.herokuapp.com/https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${iataCode}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.accessToken}`
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
}
