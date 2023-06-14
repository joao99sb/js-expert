const assert = require("assert");

const { File } = require("./src/file");
const { error } = require("./src/constanst");

(async () => {
  //Variables created inside the block only exist inside the block.
  //Therefore, I can use the same name for multiple variables.
  {
    const filePath = "./mock/emptyFile-invalid.csv";
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJSON(filePath);

    await assert.rejects(result, expected);
    console.log("test 1 - passed");
  }

  {
    const filePath = "./mock/header-invalid.csv";
    const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
    const result = File.csvToJSON(filePath);

    await assert.rejects(result, expected);
    console.log("test 2 - passed");
  }

  {
    try {
      const filePath = "./mock/fiveItens-invalid.csv";

      // error in error message to test failed log
    //   const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
      const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
      const result = File.csvToJSON(filePath);

      await assert.rejects(result, expected);
      console.log("test 3 - passed");
    } catch (error) {
      console.log("test 3 - failed X");
    }
  }
  {
    const filePath = "./mock/threeItems-valid.csv";
    const expected = [
      {
        id: 1,
        name: "joao",
        profession: "developer",
        age: 23,
      },
      {
        id: 2,
        name: "jones",
        profession: "historiador",
        age: 42,
      },
      {
        id: 3,
        name: "santina",
        profession: "advogada",
        age: 21,
      },
    ];
    const result = await File.csvToJSON(filePath);

    assert.deepEqual(result, expected);
    console.log("test 4 - passed");
  }
})();
