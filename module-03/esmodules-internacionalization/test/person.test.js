import mocha from "mocha";
const { describe, it } = mocha;
import chai from "chai";
const { expect } = chai;
import { Person } from "../src/person.js";

describe("Person", () => {
  it("should return a person instance from a string", () => {
    const person = Person.generateInstanceFromString(
      "1 Bike 20000 2020-02-03 2020-02-03 "
    );

    const expected = {
      from: "2020-02-03",
      to: "2020-02-03",
      vehicles: ["Bike"],
      id: "1",
      kmTraveled: "20000",
    };
    expect(person).to.be.deep.equal(expected);
  });

  it("should format values", () => {
    const person = new Person({
      from: "2020-02-03",
      to: "2020-02-03",
      vehicles: ["Bike"],
      id: "1",
      kmTraveled: "20000",
    });

    const result = person.fromatted("pt-br");

    const expected = {
      from: "03 de fevereiro de 2020",
      to: "03 de fevereiro de 2020",
      vehicles: "Bike",
      id: 1,
      kmTraveled: "20.000 km",
    };

    expect(result).to.be.deep.equal(expected);
  });
});
