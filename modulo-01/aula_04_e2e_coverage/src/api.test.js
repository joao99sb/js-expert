const assert = require("assert");

const { describe, it, before, after } = require("mocha");
const supertest = require("supertest");

describe("Api suite test", () => {
  let app;
  before((done) => {
    app = require("./api");
    app.once("listening", done);
  });

  after((done) => app.close(done));

  describe("/contact:get", () => {
    it("should request the contact page and return HTTP status 200", async () => {
      const response = await supertest(app).get("/contact").expect(200);

      assert.strictEqual(response.text, "contact us");
    });
  });

  describe("/login:post", () => {
    it("should request the login and return HTTP status 200", async () => {
      const response = await supertest(app)
        .post("/login")
        .send({ username: "joao victor", password: "1234" })
        .expect(200);

      assert.strictEqual(response.text, "logado");
    });
  });

  describe("/login:post", () => {
    it("should request the login and return HTTP status 401", async () => {
      const response = await supertest(app)
        .post("/login")
        .send({ username: "joao victor", password: "122qweq" })
        .expect(401);

      assert.ok(response.unauthorized);
      assert.strictEqual(response.text, "loggin failed");
    });
  });
  describe("/hi:get", () => {
    it("should request an unexisting pange and return HTTP status 404", async () => {
      const response = await supertest(app)
        .get("/hi")
        .expect(404);

      assert.strictEqual(response.text, "not found");
    });
  });
});
