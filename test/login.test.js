const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app"); // Import your Express app

// Configure Chai to work with HTTP
chai.use(chaiHttp);
const expect = chai.expect;

describe("login function", () => {
  it("should return json", (done) => {
    const user = {
      email: "puma@gmail.com",
      password: "8627",
    };
    chai
      .request(app)
      .post("/auth/login")
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.message).to.equal("User Found");
        done();
      });
  }).timeout(5000);
});
