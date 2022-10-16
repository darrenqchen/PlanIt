import ChoooseApiClient from '../apiClients/choooseApiClient';

const avgFlightKmh = 900;
const trainTicketPriceCoeff = 0.05;
const avgRailKph = 90;
const avgCarKph = 99;
const gasPrice = 3.9;

export default class Graph {
  constructor(minData, userTime, userCarbon, userDollars) {
    this.initGraph(minData, userTime, userCarbon, userDollars);
  }

  static getDistanceFromFlightTime = (time) => {
    return time * avgFlightKmh;
  };

  initGraph = (minData, userTime, userCarbon, userDollars) => {
    const chooseApiClient = new ChoooseApiClient();
    const ugraph = {};
    minData.forEach(async (flight) => {
      const flightPricePerLeg = Number(flight.price) / flight.links.length;
      const flightTimePerLeg = Number(flight.time) / flight.links.length;
      const distancePerLeg = Graph.getDistanceFromFlightTime(flightTimePerLeg);
      const railPricePerLeg = trainTicketPriceCoeff * distancePerLeg;
      const railTimePerLeg = distancePerLeg / avgRailKph;
      const carPricePerLeg = gasPrice * distancePerLeg;
      const carTimePerLeg = distancePerLeg / avgCarKph;
      const carEmissionsPerLeg =
        chooseApiClient.getCarFootprintMock(678).kilosCo2e;
      const railEmissionsPerLeg =
        chooseApiClient.getTrainFootprintMock(678).kilosCo2e;
      const flightEmissionsPerLeg =
        chooseApiClient.getFlightFootprintByDistanceMock(678).kilosCo2e;

      const flightUserEdge =
        flightEmissionsPerLeg * (userCarbon / 100) +
        flightTimePerLeg * (userTime / 100) +
        flightPricePerLeg * (userDollars / 100);
      const carUserEdge =
        carEmissionsPerLeg * (userCarbon / 100) +
        carTimePerLeg * (userTime / 100) +
        carPricePerLeg * (userDollars / 100);
      const railUserEdge =
        railEmissionsPerLeg * (userCarbon / 100) +
        railTimePerLeg * (userTime / 100) +
        railPricePerLeg * (userDollars / 100);

      this.emissions = flightEmissionsPerLeg;
      this.time = flightTimePerLeg;
      this.cost = flightPricePerLeg;

      const start = flight.links[0].departure;
      const end = flight.links[flight.links.length - 1].arrival;
      ugraph['start'] = start;
      ugraph[`${end}`] = {};
      ugraph['finish'] = end;
      flight.links.map((links) => {
        const arrival = links.arrival;
        ugraph[links.departure] = {};
        ugraph[links.departure][arrival] = Math.min(
          flightUserEdge,
          carUserEdge,
          railUserEdge
        );
      });
    });
    this.ugraph = ugraph;
  };

  graphPath = () => {
    try {
      const visited = [];
      let startN = this.ugraph['start'];
      const history = [];
      while (!visited.includes(this.ugraph['finish'])) {
        const minA = [];
        Object.keys(this.ugraph[startN]).forEach((ele) => {
          minA.push(this.ugraph[ele]);
          visited.push(ele);
        });
        history.push(startN);
        startN = visited[minA.indexOf(Math.min(minA))];
        return visited;
      }
    } catch (err) {
      return Object.keys(this.ugraph);
    }
  };

  getReturnJson = () => {
    return {
      links: this.graphPath(),
      carbon: this.emissions,
      cost: this.cost,
      time: this.time
    };
  };
}
