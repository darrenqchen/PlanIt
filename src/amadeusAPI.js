const id = 'qiRQ4A4LAMr9GwGHGvnGR8IvDMG8jb3G'
const secret = '8y9nYPW3Bi7o1tRn'

export default class AmadeusAPI {
    constructor() {
        //this.accessToken = this.getAccessToken(id, secret)
    }
    getAccessToken = (id, secret) => {
        return fetch('https://cors-anywhere.herokuapp.com/https://test.api.amadeus.com/v1/security/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 
                `grant_type=client_credentials&client_id=${id}&client_secret=${secret}`,
        }).then((async (res) => {
            const resJson = await res.json()
            if (resJson.state === 'approved') {
                return resJson.access_token
            } else {
                throw resJson
            }
        }))
    }
    getTravelRecommendations = async (cityCode) => {
        const access_token = await this.getAccessToken(id, secret)
        return fetch(`https://cors-anywhere.herokuapp.com/https://test.api.amadeus.com/v1/reference-data/recommended-locations?cityCodes=${cityCode}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
        }).then((async (res) => {
            const resJson = await res.json()
            if (resJson.state === 'approved') {
                return resJson
            } else {
                throw resJson
            }
        }))
    }
    getPointsOfInterest = async (north, south, east, west) => {
        const access_token = await this.getAccessToken(id, secret)
        return fetch(`https://cors-anywhere.herokuapp.com/https://test.api.amadeus.com/?north=${north}&west=${west}&south=${south}&east=${east}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
        }).then((async (res) => {
            const resJson = await res.json()
            if (resJson.state === 'approved') {
                console.log(resJson)
                return resJson
            } else {
                throw resJson
            }
        }))
    }
    getFlights = async (origin, destination, departureDate, adults) => {
        const access_token = await this.getAccessToken(id, secret)
        return fetch(`https://cors-anywhere.herokuapp.com/https://test.api.amadeus.com/v2/shopping/flight-offers
        ?originLocationCode=${origin}&destinationLocationCode=${destination}
        &departureDate=${departureDate}&adults=${adults}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        }).then((async (res) => {
            const resJson = await res.json()
            if (resJson.state === 'approved') {
                console.log(resJson)
                return resJson
            } else {
                throw resJson
            }
        }))
    }
}