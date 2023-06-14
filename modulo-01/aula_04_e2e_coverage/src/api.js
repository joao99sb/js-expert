const http = require("http");
const { once } = require("events");
const DEFAULT_USER = {
  username: "joao victor",
  password: "1234",
};

const routes = {
  default(request, response) {
    response.writeHead(404);
    return response.end("not found");
  },
  "/contact:get": (request, response) => {
    response.write("contact us");
    return response.end();
  },

  //curl -i  -X POST --data '{"username":"joao victor","password":"1234"}' localhost:3030/login
  "/login:post": async (request, response) => {
    const user = JSON.parse(await once(request, "data"));

    if (
      user.username !== DEFAULT_USER.username ||
      user.password !== DEFAULT_USER.password
    ) {
      response.writeHead(401);
      return response.end("loggin failed");
    }
    return response.end("logado");
  },
};

function handler(request, response) {
  const { url, method } = request;

  const routKey = `${url}:${method.toLowerCase()}`;

  const chosenRoute = routes[routKey] || routes.default;

  return chosenRoute(request, response);
}

const app = http.createServer(handler);

app.listen(3030);
module.exports = app;
