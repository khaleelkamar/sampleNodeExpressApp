import chai from "chai";
import request from "supertest";
import Server from "../server";
const chaiHttp = require("chai-http");
let token = "some_authorization_token";

const expect = chai.expect;
chai.use(chaiHttp);


var multipleReg = [
  {
    userName: "testName1",
    userEmail: "1test1@email.com",
    userPhone: 9812345671,
  },
  {
    userName: "testName2",
    userEmail: "test3@email.com",
    userPhone: 9815345642,
  },{
    userName: "testName2",
    userEmail: "test4@email.com",
    userPhone: 9812345652,
  },{
    userName: "testName2",
    userEmail: "test5@email.com",
    userPhone: 9812345674,
  },{
    userName: "testName2",
    userEmail: "test6@email.com",
    userPhone: 9812345676,
  },{
    userName: "testName2",
    userEmail: "test7@email.com",
    userPhone: 9812345677,
  },
  {
    userName: "testName2",
    userEmail: "test8@email.com",
    userPhone: 9812345678,
  },
  {
    userName: "testName2",
    userEmail: "test9@email.com",
    userPhone: 9812345679,
  },
  {
    userName: "testName2",
    userEmail: "test11@email.com",
    userPhone: 9812345611,
  },
  {
    userName: "testName2",
    userEmail: "test12@email.com",
    userPhone: 9812345612,
  },
  {
    userName: "testName2",
    userEmail: "test13@email.com",
    userPhone: 9812345613,
  },
  {
    userName: "testName2",
    userEmail: "test14@email.com",
    userPhone: 9812345614,
  },
  {
    userName: "testName2",
    userEmail: "test2@email.com",
    userPhone: 9812345672,
  },
  {
    userName: "testName2",
    userEmail: "test2@email.com",
    userPhone: 9812345672,
  },{
    userName: "testName2",
    userEmail: "test2@email.com",
    userPhone: 9812345672,
  },{
    userName: "testName2",
    userEmail: "test2@email.com",
    userPhone: 9812345672,
  },{
    userName: "testName2",
    userEmail: "test2@email.com",
    userPhone: 9812345672,
  },{
    userName: "testName2",
    userEmail: "test2@email.com",
    userPhone: 9812345672,
  },{
    userName: "testName2",
    userEmail: "test2@email.com",
    userPhone: 9812345672,
  },{
    userName: "testName2",
    userEmail: "test2@email.com",
    userPhone: 9812345672,
  },{
    userName: "testName2",
    userEmail: "test2@email.com",
    userPhone: 9812345672,
  },{
    userName: "testName2",
    userEmail: "test2@email.com",
    userPhone: 9812345672,
  },{
    userName: "testName2",
    userEmail: "test2@email.com",
    userPhone: 9812345672,
  }

];

var singleReg = [
  {
    userName: "testName",
    userEmail: "",
    userPhone: 9812345678,

  },
];

describe("createUser", async () => {
  await multipleReg.forEach(function (regData, index) {

    it("Registration user", () =>
      request(Server)
        .post("/api/v1/createUser")
        .expect("Content-Type", /json/)
        .send(regData)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .set({ "x-access-token": `${token}` })
        .set({ "api-token": `${apitoken}` })
        .then((r) => {
          console.log("\n", "createUser===>" + index, r.text, "\n");
          expect(r.error).to.have.status(200).to.throw('Property does not exist in model schema.');
        })
        .catch((err) => console.log(err

        )));
  });

  return;

});
