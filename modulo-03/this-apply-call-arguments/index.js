"use sctrict";

const {
  watch,
  promises: { readFile },
} = require("fs");

class File {
  watch(event, filename) {
    console.log("this", this);
    console.log("arguments", Array.prototype.slice.call(arguments));
    this.showContent(filename);
  }

  async showContent(filename) {
    const content = await readFile(filename);

    console.log(content.toString());
  }
}

const file = new File();
//dessa forma ele ignora o this da classe File
//herda  o this do watch
// watch(__filename, file.watch);

//formas de contornar:
// arrow function
// watch(__filename, (event, filename) => file.watch(event, filename));

//podemos deixar explicito o contexto a se seguir
// o bind retorna uma funcao com o this que se mantem a do file
// ignorando o watch
// watch(__filename,file.watch.bind(file))

//a diferença entre um e outro é que um voce passa os argumentos como array,
// no outro uma lista de argumentos
file.watch.call(
  { showContent: () => console.log("call: hey sinon!") },
  null,
  __filename
);

const argument = [[null, __filename]];
file.watch.apply(
  { showContent: () => console.log("call: hey sinon!") },
  argument
);
