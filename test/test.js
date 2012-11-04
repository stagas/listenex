var http = require('http')
var should = require('chai').Should()
var listenex = require('../listenex')
listenex.log = false

describe("starting server", function () {
  beforeEach(function () {
    this.server = http.createServer(function (req, res) {
      res.writeHead(200)
      res.end('hello')
    })
  })

  afterEach(function () {
    this.server.close()
  })

  it("should run the callback function", function (done) {
    process.argv = []
    this.server.listen(function () {
      var address = this.address()
      address.address.should.equal("0.0.0.0")
      address.port.should.equal(8080)
      done()
    })
  })

  it("should run on 127.0.0.1 port 3000", function (done) {
    this.server.listen('127.0.0.1', 3000, function () {
      var address = this.address()
      address.address.should.equal("127.0.0.1")
      address.port.should.equal(3000)
      done()
    })
  })

  it("should run on default host port 3000", function (done) {
    this.server.listen(3000, function () {
      var address = this.address()
      address.address.should.equal("0.0.0.0")
      address.port.should.equal(3000)
      done()
    })
  })

  it("env arguments should work", function (done) {
    process.env.HOST = "127.0.0.1"
    process.env.PORT = 3000
    this.server.listen(function () {
      var address = this.address()
      address.address.should.equal("127.0.0.1")
      address.port.should.equal(3000)
      done()
    })
  })

  it("cmd arguments should work", function (done) {
    process.argv = ['','','3000','127.0.0.1']
    this.server.listen(function () {
      var address = this.address()
      address.address.should.equal("127.0.0.1")
      address.port.should.equal(3000)
      done()
    })
  })
})
