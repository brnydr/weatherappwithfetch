export default class GiphyService {
  static async getGif(input) {
    try {
      const response = fetch(`http://api.giphy.com/v1/gifs/search?q=${input}&api_key=${process.env.GIPHY_API_KEY}&limit=5`);
      if(!response.ok) {
        const err = `${response.status} ${response.statusText}`;
        throw new Error(err);
      }
        const jsonResponse = await response.json;
        return jsonResponse;
      }
      catch (err) {
        return err;
    }
  }
}
