export default {
  getWeather(payload) {
    return fetch(
      `https://api.apixu.com/v1/forecast.json?key=989e6bc7286b4832855180934192008&q=
        ${payload}`
    ).then(res => res.json());
  }
};
