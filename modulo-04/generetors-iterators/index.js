const assert = require("assert");

function* calculation(x, y) {
  yield x * y;
}
function* main() {
  yield "hello";
  yield "-";
  yield "world";
  yield* calculation(3, 1);
}

const generator = main();

// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());
assert.deepStrictEqual(generator.next(), { value: "hello", done: false });
assert.deepStrictEqual(generator.next(), { value: "-", done: false });
assert.deepStrictEqual(generator.next(), { value: "world", done: false });
assert.deepStrictEqual(generator.next(), { value: 3, done: false });
assert.deepStrictEqual(generator.next(), { value: undefined, done: true });

// console.log('Array.from',Array.from(main()))

assert.deepStrictEqual(Array.from(main()), ["hello", "-", "world", 3]);
assert.deepStrictEqual([...main()], ["hello", "-", "world", 3]);

// --- async operators
const { readFile, stat, readdir } = require("fs/promises");

function* promisified() {
  yield readFile(__filename);
  yield Promise.resolve("Hey man");
}

async function* systemInfo() {
  const file = await readFile(__filename);
  yield { file: file.toString() };

  const { size } = await stat(__filename);
  yield { size };

  const dir = await readdir(__dirname);
  yield { dir };
}

(async () => {
  for await (const item of systemInfo()) {
    console.log("systemInfo", item);
  }
})();
