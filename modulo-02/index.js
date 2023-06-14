const item = {
  name: "joao",
  age: 23,

  toString() {
    return "transform this object in string";
  },

  //transform in number
  valueOf() {
    return 21;
  },

  // prioridade

  [Symbol.toPrimitive](coercionType) {
    console.log("trying to convert to", coercionType);

    const types = {
      string: JSON.stringify(this),
      number: "004",
    };
    return types[coercionType] || types.string;
  },
};

console.log("to String", String(item));
console.log("to Number", Number(item));
//chamada a conversao default!
console.log("Date", new Date(item));
