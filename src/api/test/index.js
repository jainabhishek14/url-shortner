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

//Our parent block
describe("Url", () => {
    beforeEach((done) => { //Before each test we empty the database
        Url.deleteMany({}, (err) => {
            done();
        });
    });

    /**
     * Test /GET url Route 
     */
    describe("/GET ", () => {
        it("it should GET all the items", (done) => {
            chai.request(server)
                .get("/list")
                .end((err, res) => {
                    res.should.be.json;
                    res.should.have.status(200);
                    res.body.should.be.an("array").lengthOf(0);
                    done();
                });
        });
    });


    /**
     * Test /POST short route
     */
    describe("/POST short", () => {
        it("it should not shorten then url without url field", (done) => {
            const req = {};
            chai.request(server)
                .post("/short")
                .send(req)
                .end((err, res) => {
                    res.should.be.json;
                    res.should.have.status(400);
                    res.body.should.be.an("object");
                    res.body.should.have.property("message").a("string").eql("Invalid Url");
                    done();
                });
        });
    });
});