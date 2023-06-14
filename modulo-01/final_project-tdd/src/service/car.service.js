const { BaseRepository } = require("../repository/baseRepository");

class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars });
  }

  findById(id) {
    return this.carRepository.findById(id);
  }

  async getAvailableCar(carCategory) {
    const carId = this.chooseRadomCar(carCategory);
    const car = await this.carRepository.findById(carId);

    return car;
  }
  getRandomPositionFromArray(list) {
    const listLength = list.length;

    return Math.floor(Math.random() * listLength);
  }
  chooseRadomCar(carCategory) {
    const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds);

    const carId = carCategory.carIds[randomCarIndex];
    return carId;
  }
}

module.exports = { CarService };
