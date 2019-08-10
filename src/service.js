export default {
  getWeather(payload) {
    return fetch(
      'https://api.apixu.com/v1/forecast.json?key=b26ac48768b64da2aae125932190705&q=' +
        payload
    ).then(res => res.json());
  }
};
