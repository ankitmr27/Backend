const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app"); // Import your Express app

// Configure Chai to work with HTTP
chai.use(chaiHttp);
const expect = chai.expect;

describe("log out functionality", () => {
  it("should return json", (done) => {
    chai
      .request(app)
      .get("/auth/logout")
      .set(
        "Cookie",
        "isLoggedIn=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiNjUxNWZmY2Q5ZGYxYzZiYzUxZTkwNzBiIiwiaWF0IjoxNjk2MTMzNjEyfQ.dxkKHSqsK86I1wv2REtg92gzjEkpPR7wkAYxa659fUQ"
      )
      .end((err, res) => {
        //console.log(res.header["set-cookie"]);
        const cookies = res.headers["set-cookie"];
        const userCookie = cookies.find((cookie) =>
          cookie.startsWith("isLoggedIn=")
        );
        const cookieArray = userCookie.split(";");
        //console.log(cookieArray);
        const cookieObject = {};
        for (const cookie of cookieArray) {
          const [name, value] = cookie.split("=");
          cookieObject[name] = decodeURIComponent(value);
        }
        //console.log(cookieObject);
        expect(cookieObject["isLoggedIn"]).to.equal("-");
        done();
      });
  });
});
