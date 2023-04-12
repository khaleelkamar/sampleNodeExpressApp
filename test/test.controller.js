

import request from "supertest";
import app from "../server";
const chaiHttp = require("chai-http");
const chai = require('chai');


const expect = chai.expect;
chai.use(chaiHttp);
const user = {
  userName: 'userNameOneTwo',
  userPassword: 'Password@98'
};

let token="";
let contatctId=1;

describe('Create new User', () => {
  describe('/api/v1/createUser', () => {
    it('should create a new user', (done) => {

      chai.request(app)
        .post('/api/v1/createUser')
        .send(user)
        .end((err, res) => {
          console.log("createUser OutPut==>", res.body)
          expect(res.body).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status').that.equals(200);
          expect(res.body).to.have.property('message').that.equals('Success');
          // expect(res.body.result).to.have.property('userName').that.equals(user.userName);
          // expect(res.body.result).to.have.property('userEmail').that.equals(user.userEmail);
          // expect(res.body.result).to.have.property('userPhone').that.equals(user.userPhone);
          // expect(res.body.result).to.have.property('userAddress').that.equals(user.userAddress);
          
          done();
        });
    });
  });
});

describe('User Authentication', () => {
  it('should authenticate user with valid credentials', (done) => {
    const userData = {
      "userName": user.userName,
      "userPassword": user.userPassword
    }
    chai.request(app)
      .post('/api/v1/userLogin')
      .send(userData)
      .end((err, res) => {
        if(res.body.accessToke)
        token=res.body.accessToke;
        expect(res).to.have.status(200);
       // expect(res.body).to.have.property('token');
        done();
      });
  });
});


describe("Create New Contacts", () => {

        // Test POST route to create a contact
        describe("POST /contacts", () => {
          it("should create a new contact", (done) => {
            const newContact = {
              "firstName": "userName",
              "lastName": "test@gmail.com",
              "email": "t@gmail.com",
              "phone": "9847952210",
              "address": "string",
              "city": "test@gmail.com",
              "state": "kerala",
              "country": "userAddress",
              "zipCode": "string"
            }
            chai.request(app)
              .post('/api/v1/contacts')
              .set({ "x-access-token": token })
              .send(newContact)
              .end((err, res) => {
                console.log("OutPut==>", res.body)
                if(res.body.data){
                  console.log(res.body.data)
                contatctId = res.body.data.id;
                }
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status').eql(200);
                expect(res.body).to.have.property('message').eql('Contact Details added successfully');
                // expect(res.body.result).to.have.property('firstName').eql(newContact.firstName);
                // expect(res.body.result).to.have.property('lastName').eql(newContact.lastName);
                // expect(res.body.result).to.have.property('email').eql(newContact.email);
                // expect(res.body.result).to.have.property('phone').eql(newContact.phone);
                // expect(res.body.result).to.have.property('address').eql(newContact.address);
                // expect(res.body.result).to.have.property('city').eql(newContact.city);
                // expect(res.body.result).to.have.property('state').eql(newContact.state);
                // expect(res.body.result).to.have.property('country').eql(newContact.country);
                // expect(res.body.result).to.have.property('zipCode').eql(newContact.zipCode);
                
                done();
              });
          });
        });

  // Test GET route for a single contact
  describe("GET Contacts by id", () => {
    it("should return a single contact", (done) => {
      const id = contatctId;
      chai.request(app)
        .get(`/api/v1/contacts/${id}`)
        .set({ "x-access-token": token })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status').that.equals(200);
          expect(res.body).to.have.property('message').to.equal('Success');
          //res.body.result.should.have.property('id').eql(id);
          done();
        });
    });
  });

    // Test GET route for a list of contacts
    describe("GET ALL contacts", () => {
      it("should return a list of contacts", (done) => {
        chai.request(app)
          .get('/api/v1/contacts')
          .set({ "x-access-token": token })
          .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.result).to.be.an('array');
          expect(res.body).to.have.property('status').that.equals(200);
          expect(res.body).to.have.property('message').to.equal('Success');
            done();
          });
      });
    });


});