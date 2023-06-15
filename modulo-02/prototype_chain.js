const assert = require("assert");

const obj = {};
const arr = [];
const fn = () => {};

console.log("new Object is {}?", new Object().__proto__ === {}.__proto__);
//verificar se não esta avendo alguma conversão coercitiva
assert.deepStrictEqual(new Object().__proto__, {}.__proto__);
// __proto__ is a object reference that has his properties

console.log(
  "obj.__prot__ === Object.prototype",
  obj.__proto__ === Object.prototype
);
assert.deepStrictEqual(obj.__proto__, Object.prototype);

console.log(
  "arr.__proto__ === Array.prototype",
  arr.__proto__ === Array.prototype
);
assert.deepStrictEqual(arr.__proto__, Array.prototype);

console.log(
  "fn.__proto__ === Function.prototype",
  fn.__proto__ === Function.prototype
);
assert.deepStrictEqual(fn.__proto__, Function.prototype);

console.log("--------");

function Employee() {}
Employee.prototype.salary = () => "salary**";

function Supervisor() {}
//herda a instancia de employee
Supervisor.prototype = Object.create(Employee.prototype);
Supervisor.prototype.profitShare = () => "profitShare**";

function Manager() {}
Manager.prototype = Object.create(Supervisor.prototype);
Manager.prototype.monthlyBonuses = () => "monthlyBonuses**";

// podemos chamar via prototype, mas se tentar chamar direto da erro
console.log("Manager.prototype.salary()", Manager.prototype.salary());
// console.log('Manager.salary()',Manager.salary())

// se não chamar o 'new', o primeiro __proto__ vai ser
// sempre instacia de Funtion, sem herdar nossas classes
// para assessar as classes sem new, pode assessar direto via prorotype

console.log(
  "Manager.prototype.__proto__ === Supervisor.prototype",
  Manager.prototype.__proto__ === Supervisor.prototype
);
assert.deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype);

console.log("--------");

//quando chamamos com 'new' o __proto__ recebe o prototype
console.log(
  "manager.__proto__: %s, manager.salary(): %s",
  new Manager().__proto__,
  new Manager().salary()
);
console.log(
  "Supervisor.prototype === new Manager().__proto__.__proto__",
  Supervisor.prototype === new Manager().__proto__.__proto__
);
assert.deepEqual(Supervisor.prototype, new Manager().__proto__.__proto__);

console.log("--------");

const manager = new Manager();
console.log("manager.salary()", manager.salary());
console.log("manager.profitShare()", manager.profitShare());
console.log("manager.monthlyBonuses()", manager.monthlyBonuses());

assert.deepStrictEqual(manager.__proto__, Manager.prototype);
assert.deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype);
assert.deepStrictEqual(
  manager.__proto__.__proto__.__proto__,
  Employee.prototype
);
assert.deepStrictEqual(
  manager.__proto__.__proto__.__proto__.__proto__,
  Object.prototype
);
assert.deepStrictEqual(
  manager.__proto__.__proto__.__proto__.__proto__.__proto__,
  null
);

console.log("--------");
class T1 {
  ping() {
    return "ping";
  }
}
class T2 extends T1 {
  pong() {
    return "pong ";
  }
}

class T3 extends T2 {
  shoot() {
    return "shoot";
  }
}

const t3 = new T3();

console.log(
  "t3 inherits null?",
  t3.__proto__.__proto__.__proto__.__proto__.__proto__ === null
);

console.log("te3.ping()", t3.ping());
console.log("te3.ping()", t3.pong());
console.log("te3.ping()", t3.shoot());

assert.deepEqual(t3.__proto__, T3.prototype);
assert.deepEqual(t3.__proto__.__proto__, T2.prototype);
assert.deepEqual(t3.__proto__.__proto__.__proto__, T1.prototype);
assert.deepEqual(t3.__proto__.__proto__.__proto__.__proto__, Object.prototype);
assert.deepEqual(t3.__proto__.__proto__.__proto__.__proto__.__proto__, null);
