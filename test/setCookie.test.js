const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app"); // Import your Express app

// Configure Chai to work with HTTP
chai.use(chaiHttp);
const expect = chai.expect;

describe("setting Cookies", () => {
  it("should return cookies", (done) => {
    chai
      .request(app)
      .get("/getUser/setCookies")
      .end((err, res) => {
        const cookies = res.headers["set-cookie"];
        const userCookie = cookies.find((cookie) =>
          cookie.startsWith("isLoggedIn=")
        );
        let flag = userCookie.length > 0;
        expect(res).to.have.status(200);
        expect(flag).to.equal(true);
        done();
      });
  });
});
