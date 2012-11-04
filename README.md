# listenex

Turns this awful piece of code:

```javascript
server.listen(process.argv[2] || process.env.PORT || 8080, process.argv[3] || process.env.HOST || 'localhost', function () {
  var address = this.address()
  console.log('%s mode', process.env.NODE_ENV || 'development')
  console.log('listening %s:%d', address.address, address.port)
})
```

to this:

```javascript
var listenex = require('listenex')

server.listen()
```

### MIT licence
