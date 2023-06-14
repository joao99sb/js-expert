const { join } = require("path");
const { describe, it, beforeEach, afterEach } = require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");
const { CarService } = require("../../src/service/car.service");

const carsDatabase = join(__dirname, "./../../database", "cars.json");

const mocks = {
  validCarCategory: require("./../mocks/valid-carCategory.json"),
  validCar: require("./../mocks/valid-car.json"),
  validCustomer: require("./../mocks/valid-customer.json"),
};
describe("CarService Suite Tests", () => {
  let carService = {};

  let sandBox = {};
  before(() => {
    carService = new CarService({
      cars: carsDatabase,
    });
  });

  beforeEach(() => {
    sandBox = sinon.createSandbox();
  });

  afterEach(() => {
    sandBox.restore();
  });

  it("should retrieve random position from an array", () => {
    const data = [0, 1, 2, 3, 4];

    const result = carService.getRandomPositionFromArray(data);
    expect(result).to.be.lte(data.length).and.to.be.gte(0);
  });

  it("should choose the first id from carIds in carCategory", async () => {
    const carCategory = mocks.validCarCategory;
    const carIndex = 0;

    sandBox
      .stub(carService, carService.getRandomPositionFromArray.name)
      .returns(0);

    const result = carService.chooseRadomCar(carCategory);

    const expected = carCategory.carIds[carIndex];
    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok;
    expect(result).to.be.deep.equal(expected);
  });

  it("given a carCategory it should return an available car", async () => {
    const car = mocks.validCar;
    const carCategory = Object.create(mocks.validCarCategory);

    carCategory.carids = [car.id];

    sandBox
      .stub(carService.carRepository, carService.carRepository.findById.name)
      .resolves(car);

    sandBox.spy(carService, carService.chooseRadomCar.name);
    
    const result = await carService.getAvailableCar(carCategory);

    const expected = car;


    expect(carService.chooseRadomCar.calledOnce).to.be.ok;
    expect(carService.carRepository.findById .calledOnce).to.be.ok;
    expect(result).to.be.deep.equal(expected);
  });
});
