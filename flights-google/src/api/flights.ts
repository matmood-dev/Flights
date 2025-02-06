import axios from 'axios';

const API_KEY = 'e8bbc68562mshb8b79a354c66f9fp1e1ecbjsndfbf17eda3ed';
const API_HOST = 'sky-scrapper.p.rapidapi.com';

const fetchAirportIds = async (location: string) => {
  const options = {
    method: 'GET',
    url: `https://${API_HOST}/api/v1/flights/searchAirport`,
    params: { query: location },
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': API_HOST
    }
  };

  try {
    const response = await axios.request(options);
    const airports = response.data.data;
    if (airports.length > 0) {
      return {
        skyId: airports[0].navigation.relevantFlightParams.skyId,
        entityId: airports[0].navigation.entityId
      };
    } else {
      throw new Error('No airports found');
    }
  } catch (error) {
    console.error('Error fetching airport IDs:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch airport IDs');
  }
};

const fetchFlights = async (origin: string, destination: string, date: string) => {
  try {
    const originIds = await fetchAirportIds(origin);
    const destinationIds = await fetchAirportIds(destination);

    const options = {
      method: 'GET',
      url: `https://${API_HOST}/api/v1/flights/searchFlights`,
      params: {
        originSkyId: originIds.skyId,
        destinationSkyId: destinationIds.skyId,
        originEntityId: originIds.entityId,
        destinationEntityId: destinationIds.entityId,
        date,
        adults: '1',
        currency: 'USD',
        locale: 'en-US',
        market: 'en-US',
        cabinClass: 'economy',
        countryCode: 'US'
      },
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST
      }
    };

    const response = await axios.request(options);
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching flights:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch flights');
  }
};

export { fetchFlights };
