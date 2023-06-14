const { readFile } = require("fs/promises");
const { error } = require("./constanst");

const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"],
};

class File {
  static async csvToJSON(filePath) {
    const content = await readFile(filePath, "utf8");
    const validation = this.isValid(content);

    if (!validation.valid) {
      throw new Error(validation.error);
    }
    const result = this.parseCSVToJSON(content);
    return result;
  }

  static isValid(csvString, option = DEFAULT_OPTIONS) {
    const [header, ...fileWithoutHeader] = csvString.split(/\r?\n/);

    const isHeaderValid = header === option.fields.join(",");

    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false,
      };
    }

    if (
      !fileWithoutHeader.length ||
      fileWithoutHeader.length > option.maxLines
    ) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false,
      };
    }
    return {
      valid: true,
    };
  }

  static parseCSVToJSON(csvString) {
    const lines = csvString.split(/\r?\n/);

    // remove the first line from array
    // and returns it
    const firstLine = lines.shift();
    const header = firstLine.split(",");

    const users = lines.map((line) => {
      const columns = line.split(",");
      const user = {};

      for (const index in columns) {
        const key = header[index];
        const value = columns[index].trim();
        user[key] = value;
      }

      return user;
    });

    return users;
  }
}

module.exports = { File };
