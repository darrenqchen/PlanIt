import ChoooseApiClient from '../apiClients/choooseApiClient';

const avgFlightKmh = 900;

export default class Graph {
  constructor() {
    this.initData = {
      london: { frankfurt: 678 },
      frankfurt: { paris: 478 },
      paris: {}
    };
  }

  getDistanceFromFlightTime = (time) => {
    return time * avgFlightKmh;
  };

  getUserGraph = (userTime, userCarbon, userDollarCost) => {
    const chooseApi = new ChoooseApiClient();
    const graph = {};
    Object.keys(this.initData).forEach((source) => {
      const edges = {};
      Object.keys(source).forEach((dest) => {
        const flightCarbonCost = chooseApi.getFlightFootprint(source[dest]);
        const flightTimeCost = source[dest] / avgFlightKmh;
        const flightDollarCost = source[dest] * avgFlightTicketPriceCoeff;

        const flightEdge =
          flightCarbonCost * (userCarbon / 100) +
          flightTimeCost * (userTime / 100) +
          (flightDollarCost * (userDollarCost / 100)) / 3;

        const railCarbonCost = chooseApi.getRailFootprintByDistanceMock(
          source[dest]
        );
        const railTimeCost = source[dest] / avgTrainKmh;
        const railDollarCost = avgTrainTicketPriceCoeff;

        const railEdge =
          railCarbonCost * (userCarbon / 100) +
          railTimeCost * (userTime / 100) +
          (railDollarCost * (userDollarCost / 100)) / 3;

        const carCarbonCost = chooseApi.getCarFootprintByDistanceMock(
          source[dest]
        );
        const carTimeCost = source[dest] / avgCarKmh;
        const carDollarCost = (source[dest] / avgKmpg) * avgGasPrice;

        const carEdge =
          carCarbonCost * (userCarbon / 100) +
          carTimeCost * (userTime / 100) +
          (carDollarCost * (userDollarCost / 100)) / 3;

        edges[dest] = {
          name: source,
          distance: flightEdge,
          carbon: flightCarbonCost,
          time: flightTimeCost,
          dollar: flightDollarCost
        };
        edges[dest] = {
          name: source,
          distance: railEdge,
          carbon: railCarbonCost,
          time: railTimeCost,
          dollar: railDollarCost
        };
        edges[dest] = {
          name: source,
          distance: carEdge,
          carbon: carCarbonCost,
          time: carTimeCost,
          dollar: carDollarCost
        };
      });
      graph[source] = edges;
    });
    return graph;
  };

  getCarbonGraph = () => {
    const chooseApi = new ChoooseApiClient();
    const graph = {};
    Object.keys(this.initData).forEach((source) => {
      const edges = {};
      Object.keys(source).forEach((dest) => {
        const flightCarbonCost = chooseApi.getFlightFootprintByDistanceMock(
          source[dest]
        );
        const flightTimeCost = source[dest] / avgFlightKmh;
        const flightDollarCost = source[dest] * avgFlightTicketPriceCoeff;

        const railCarbonCost = chooseApi.getRailFootprintByDistanceMock(
          source[dest]
        );
        const railTimeCost = source[dest] / avgTrainKmh;
        const railDollarCost = avgTrainTicketPriceCoeff;

        const carCarbonCost = chooseApi.getCarFootprintByDistanceMock(
          source[dest]
        );
        const carTimeCost = source[dest] / avgCarKmh;
        const carDollarCost = (source[dest] / avgKmpg) * avgGasPrice;

        edges[dest] = {
          name: source,
          distance: flightCarbonCost,
          carbon: flightCarbonCost,
          time: flightTimeCost,
          dollar: flightDollarCost
        };
        edges[dest] = {
          name: source,
          distance: railCarbonCost,
          carbon: railCarbonCost,
          time: railTimeCost,
          dollar: railDollarCost
        };
        edges[dest] = {
          name: source,
          distance: carCarbonCost,
          carbon: carCarbonCost,
          time: carTimeCost,
          dollar: carDollarCost
        };
      });
      graph[source] = edges;
    });
    return graph;
  };

  getTimeGraph = () => {
    const chooseApi = new ChoooseApiClient();
    const graph = {};
    Object.keys(this.initData).forEach((source) => {
      const edges = {};
      Object.keys(source).forEach((dest) => {
        const flightCarbonCost = chooseApi.getFlightFootprintByDistanceMock(
          source[dest]
        );
        const flightTimeCost = source[dest] / avgFlightKmh;
        const flightDollarCost = source[dest] * avgFlightTicketPriceCoeff;

        const railCarbonCost = chooseApi.getRailFootprintByDistanceMock(
          source[dest]
        );
        const railTimeCost = source[dest] / avgTrainKmh;
        const railDollarCost = avgTrainTicketPriceCoeff;

        const carCarbonCost = chooseApi.getCarFootprintByDistanceMock(
          source[dest]
        );
        const carTimeCost = source[dest] / avgCarKmh;
        const carDollarCost = (source[dest] / avgKmpg) * avgGasPrice;

        edges[dest] = {
          name: source,
          distance: flightTimeCost,
          carbon: flightCarbonCost,
          time: flightTimeCost,
          dollar: flightDollarCost
        };
        edges[dest] = {
          name: source,
          distance: railTimeCost,
          carbon: railCarbonCost,
          time: railTimeCost,
          dollar: railDollarCost
        };
        edges[dest] = {
          name: source,
          distance: carTimeCost,
          carbon: carCarbonCost,
          time: carTimeCost,
          dollar: carDollarCost
        };
      });
      graph[source] = edges;
    });
    return graph;
  };

  getCostGraph = () => {
    const chooseApi = new ChoooseApiClient();
    const graph = {};
    Object.keys(this.initData).forEach((source) => {
      const edges = {};
      Object.keys(source).forEach((dest) => {
        const flightCarbonCost = chooseApi.getFlightFootprintByDistanceMock(
          source[dest]
        );
        const flightTimeCost = source[dest] / avgFlightKmh;
        const flightDollarCost = source[dest] * avgFlightTicketPriceCoeff;

        const railCarbonCost = chooseApi.getRailFootprintByDistanceMock(
          source[dest]
        );
        const railTimeCost = source[dest] / avgTrainKmh;
        const railDollarCost = avgTrainTicketPriceCoeff;

        const carCarbonCost = chooseApi.getCarFootprintByDistanceMock(
          source[dest]
        );
        const carTimeCost = source[dest] / avgCarKmh;
        const carDollarCost = (source[dest] / avgKmpg) * avgGasPrice;

        edges[dest] = {
          name: source,
          distance: flightDollarCost,
          carbon: flightCarbonCost,
          time: flightTimeCost,
          dollar: flightDollarCost
        };
        edges[dest] = {
          name: source,
          distance: railDollarCost,
          carbon: railCarbonCost,
          time: railTimeCost,
          dollar: railDollarCost
        };
        edges[dest] = {
          name: source,
          distance: carDollarCost,
          carbon: carCarbonCost,
          time: carTimeCost,
          dollar: carDollarCost
        };
      });
      graph[source] = edges;
    });
    return graph;
  };

  instantiateGraphsWithFootprints = (userTime, userCarbon, userDollarCost) => {
    const ugraph = getUserGraph(userTime, userCarbon, userDollarCost);
    const cgraph = getCarbonGraph();
    const tgraph = getTimeGraph();
    const costgraph = getCostGraph();
    this.graphKey = {
      user: ugraph,
      carbon: cgraph,
      time: tgraph,
      cost: costgraph
    };
  };

  runGraphs = () => {
    const paths = Object.keys(this.graphKey).map((graph) => {
      return dijkstras(graph);
    });
  };

  dijkstras = (graph) => {
    let distances = {};

    let prev = {};
    let pq = new PriorityQueue(this.nodes.length * this.nodes.length);

    // Set distances to all nodes to be infinite except startNode
    distances[startNode] = 0;
    pq.enqueue(startNode, 0);
    this.nodes.forEach((node) => {
      if (node !== startNode) distances[node] = Infinity;
      prev[node] = null;
    });

    while (!pq.isEmpty()) {
      let minNode = pq.dequeue();
      let currNode = minNode.data;
      let weight = minNode.priority;
      this.edges[currNode].forEach((neighbor) => {
        let alt = distances[currNode] + neighbor.weight;
        if (alt < distances[neighbor.node]) {
          distances[neighbor.node] = alt;
          prev[neighbor.node] = currNode;
          pq.enqueue(neighbor.node, distances[neighbor.node]);
        }
      });
    }
    return distances;
  };
}
