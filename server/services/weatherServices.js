const axios = require('axios');

const apiUrl =`http://api.wunderground.com/api/${process.env.API_KEY}/forecast10day/q/`;

function getWeather(state, city){
  let url = `${apiUrl}${state}/${city}.json`;
  return axios.get(url)
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.warn(error)
    })
}

module.exports ={
  getWeather,
}