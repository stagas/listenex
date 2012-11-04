var http = require('http')

exports.log = true

var listen = http.Server.prototype.listen

http.Server.prototype.listen = function () {
  var cb
  var log = exports.log
  var host = '0.0.0.0'
  var port = 'production' == process.env.NODE_ENV
    ? 80
    : 8080

  // parse args
  ;[
    arguments
  , [process.env.PORT, process.env.HOST]
  , process.argv.slice(2)
  ]
  .forEach(function (args) {
    for (var i = args.length, arg, type; i--;) {
      arg = args[i]
      type = typeof arg
      if ('function' == type)
        cb = arg
      else if (Number(arg) == arg)
        port = arg
      else if ('boolean' == type)
        log = arg
      else if ('string' == type)
        if ('-' == arg[0]) {}
        else if ('--quiet' == arg)
          log = false
        else
          host = arg
    }
  })
  
  if (log) {
    var inner = cb
    cb = function () {
      var address = this.address()
      console.log('%s mode', process.env.NODE_ENV || 'development')
      console.log('listening %s:%d', address.address, address.port)
      inner && inner.call(this)
    }.bind(this)
  }

  return listen.call(this, port, host, cb)
}
