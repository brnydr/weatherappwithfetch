export default class WeatherService {  
  static async getWeather(city) {
    try {
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`);
      const jsonResponse = await response.json();
      if(!response.ok) {
        const errorMessage = `${response.status} ${response.statusText} ${jsonResponse.message}`;
        throw new Error (errorMessage);
      } 
      return jsonResponse;
    }
    catch(error) {
      return error;
    }
  }
}
