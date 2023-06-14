class Service {
  async makeRequest(url) {
    const data = await fetch(url);
    const dataParsedToJSON = await data.json();

    return dataParsedToJSON;
  }

  async gerPlanets(url) {
    const data = await this.makeRequest(url);
    return {
      name: data.name,
      surfaceWater: data.surface_water,
      appeardIn: data.films.length,
    };
  }
}

module.exports = Service;
