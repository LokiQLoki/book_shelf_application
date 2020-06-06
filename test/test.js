var supertest = require("supertest")
var should = require("should")

var server = supertest.agent("http://localhost:3002")

//Unit testing

describe("Sample Unit Test", function(){
    it("should return home page", function(done){
        server
            .get("/")
            .expect("Content-type", /json/)
            .expect(200)
            .end(function(error, response){
                response.status.should.equal(200)
                response.body.error.should.equal(false)
                done()
            })
    })

    it("should return book_name and author", function(done){
        server
            .get("/books")
            .expect("Content-type", /json/)
            .expect(200)
            .end(function(error, response){
                response.status.should.equal(200)
                
            })
    })
})

