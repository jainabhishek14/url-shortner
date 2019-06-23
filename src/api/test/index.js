const mongoose = require("mongoose");
const shortid = require("shortid");
const Url = require("../app/models/Url");

//Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

const should = chai.should();

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
describe("/list endpoint", () => {
    beforeEach((done) => { //Before each test we empty the database
        Url.deleteMany({}, (err) => {
            done();
        });
    });

    /**
     * Test /POST list Route
     */
    describe("/POST list", () => {
        it("it should throw an error; Endpoint not found.", (done) => {
            chai.request(server)
                .post("/list")
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
     * Test /PUT list Route
     */
    describe("/PUT list", () => {
        it("it should throw an error; Endpoint not found.", (done) => {
            chai.request(server)
                .put("/list")
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
     * Test /DELETE list Route
     */
    describe("/DELETE list", () => {
        it("it should throw an error; Endpoint not found.", (done) => {
            chai.request(server)
                .delete("/list")
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
     * Test /GET url Route 
     */
    describe("/GET list", () => {
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
});

//Our parent block
describe("/short endpoint", () => {
    beforeEach((done) => { //Before each test we empty the database
        Url.deleteMany({}, (err) => {
            done();
        });
    });

    /**
     * Test /GET short Route
     */
    describe("/GET short", () => {
        it("it should throw an error; Invalid URL", (done) => {
            chai.request(server)
                .get("/short")
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.an("object");
                    res.body.should.have.property("message");
                    res.body.message.should.be.a("string");
                    res.body.message.should.be.eql("Invalid URL");
                    done();
                });
        });
    });

    /**
     * Test /PUT short Route
     */
    describe("/PUT short", () => {
        it("it should throw an error; Endpoint not found.", (done) => {
            chai.request(server)
                .put("/short")
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
    describe("/DELETE short", () => {
        it("it should throw an error; Endpoint not found.", (done) => {
            chai.request(server)
                .delete("/short")
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

    /**
     * Test /POST short route
     */
    describe("/POST short itisarandom text", () => {
        it("it should not shorten then url which is invalid", (done) => {
            const req = {
                url: "itisarandom text"
            };
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

    /**
     * Test /POST short route
     */
    describe("/POST short www.abhishek.com", () => {
        it("it should not shorten then url without hypertext protocols http or https", (done) => {
            const req = {
                url: "www.abhishek.com"
            };
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

    /**
     * Test /POST short route
     */
    describe("/POST short saml://www.abhishek.com", () => {
        it("it should not shorten then url with invalid hypertext protocols", (done) => {
            const req = {
                url: "saml://www.abhishek.com"
            };
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

    /**
     * Test /POST short route
     */
    describe("/POST short http://www.abhishek.com", () => {
        it("it should shorten then url with http protocols", (done) => {
            const req = {
                url: "http://www.abhishek.com"
            };
            chai.request(server)
                .post("/short")
                .send(req)
                .end((err, res) => {
                    res.should.be.json;
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.should.have.property("uniqueUrl");
                    done();
                });
        });
    });

    /**
     * Test /POST short route
     */
    describe("/POST short httpd://www.abhishek.com", () => {
        it("it should not shorten then url with invalid hypertext protocols", (done) => {
            const req = {
                url: "httpd://www.abhishek.com"
            };
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

    /**
     * Test /POST short route
     */
    describe("/POST short https://www.abhishek.com", () => {
        it("it should shorten then url with https protocols", (done) => {
            const req = {
                url: "https://www.abhishek.com"
            };
            chai.request(server)
                .post("/short")
                .send(req)
                .end((err, res) => {
                    res.should.be.json;
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.should.have.property("uniqueUrl");
                    done();
                });
        });
    });

    /**
     * Test /POST short route
     */
    describe("/POST short httpss://www.abhishek.com", () => {
        it("it should not shorten then url with invalid hypertext protocols", (done) => {
            const req = {
                url: "httpss://www.abhishek.com"
            };
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

    /**
     * Test /POST short route
     */
    describe("/POST short http://abhishek.com", () => {
        it("it should shorten then url with http protocol and without www", (done) => {
            const req = {
                url: "http://abhishek.com"
            };
            chai.request(server)
                .post("/short")
                .send(req)
                .end((err, res) => {
                    res.should.be.json;
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.should.have.property("uniqueUrl");
                    done();
                });
        });
    });

    /**
     * Test /POST short route
     */
    describe("/POST short https://abhishek.com", () => {
        it("it should shorten then url with https protocol and without www", (done) => {
            const req = {
                url: "https://abhishek.com"
            };
            chai.request(server)
                .post("/short")
                .send(req)
                .end((err, res) => {
                    res.should.be.json;
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.should.have.property("uniqueUrl");
                    done();
                });
        });
    });
});

describe("When user clicks on shorten link", () => {
    beforeEach((done) => { //Before each test we empty the database
        Url.deleteMany({}, (err) => {
            done();
        });
    });

    /**
     * Test /POST list Route
     */
    describe("/POST", () => {
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
     */
    describe("/PUT", () => {
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
    describe("/DELETE", () => {
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

    /**
     * Test /GET invalid shortid
     */
    describe("/GET invalid shortid", () => {
        it("it should throw an error; Invalid URL", (done) => {
            chai.request(server)
                .get("/12345")
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.an("object");
                    res.body.should.have.property("message");
                    res.body.message.should.be.a("string");
                    res.body.message.should.be.eql("Invalid URL");
                    done();
                });
        });
    });

    /**
     * Test /GET valid shortid but non-existent in db
     */
    describe("/GET valid shortid but non-existent in db", () => {
        it("it should throw an error; Invalid URL", (done) => {
            chai.request(server)
                .get(`/${shortid.generate()}`).redirects(0)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.an("object");
                    res.body.should.have.property("message");
                    res.body.message.should.be.a("string");
                    res.body.message.should.be.eql("Invalid URL");
                    done();
                });
        });
    });

    /**
     * Test /GET Route 
     */
    describe("/GET", () => {
        it("it should redirect to the original url", (done) => {
            let url = new Url({
                url: "http://google.com"
            });
            url.save((err, doc) => {
                chai.request(server)
                    .get(`/${doc.uniqueUrl}`).redirects(0)
                    .end((err, res) => {
                        res.should.redirectTo("http://google.com")
                        done();
                    });
            });
        });
    });

});