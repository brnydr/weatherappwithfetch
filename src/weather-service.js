export default class WeatherService {  
  static getWeather(city) {
   return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`)
   .then((response)=> {
    if(!response.ok) {
      const errorMessage = `${response.status} ${response.statusText}`;
      throw new Error (errorMessage)
    } else {
      return response.json();
    }
   })
   .catch((error) => {
    return error;
   });
  }
}
