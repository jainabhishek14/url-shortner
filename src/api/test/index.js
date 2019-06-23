let mongoose = require("mongoose");
let Url = require("../app/models/Url");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");

let should = chai.should();

chai.use(chaiHttp);


describe("Common", () => {

	/**
	 * Test /GET Route
	 * 
	 */
	describe("/GET ", () => {
		it("it should pass get request", (done) => {
			chai.request(server)
				.get("/")
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.an("object");
					done();
				});
		});
	});

	/**
	 * Test /POST Route
	 * 
	 */
	describe("/POST ", () => {
		it("it should throw an error; Endpoint not found.", (done) => {
			chai.request(server)
				.post("/")
				.end((err, res) => {
					res.should.have.status(404);
					res.body.should.be.an("object");
					res.body.should.have.property("message");
					res.body.message.should.be.a("string");
					res.body.message.should.be.eql("Endpoint not found.");
					done();
				});
		});
	});

	/**
	 * Test /PUT Route
	 * 
	 */
	describe("/PUT ", () => {
		it("it should throw an error; Endpoint not found.", (done) => {
			chai.request(server)
				.put("/")
				.end((err, res) => {
					res.should.have.status(404);
					res.body.should.be.an("object");
					res.body.should.have.property("message");
					res.body.message.should.be.a("string");
					res.body.message.should.be.eql("Endpoint not found.");
					done();
				});
		});
	});


	/**
	 * Test /DELETE Route
	 */
	describe("/DELETE ", () => {
		it("it should throw an error; Endpoint not found.", (done) => {
			chai.request(server)
				.delete("/")
				.end((err, res) => {
					res.should.have.status(404);
                    res.body.should.be.an("object");
                    res.body.should.have.property("message");
                    res.body.message.should.be.a("string");
                    res.body.message.should.be.eql("Endpoint not found.");
					done();
				});
		});
	});

});