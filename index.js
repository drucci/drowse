var express = require('express')
var bodyParser = require('body-parser')

var app = express()

var mag = 0;
var direction = 0;

app.set('port', (process.env.PORT || 5000))
app.use(bodyParser.raw())
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!' + mag + " direction: "+ direction);
})


app.post('/', function(request, response) {
	console.log(request)

	direction = direction - parseInt(request.query.oldDirection)
	mag = mag - parseInt(request.query.oldMag)
	
	direction = direction + parseInt(request.query.direction)
	mag = mag + parseInt(request.query.mag)


	console.log("inputed magnitude " + request.query.mag)

	console.log("inputed direction " + request.query.direction)
	console.log("inputed magnitude " + request.query.mag)

	console.log("new direction " + direction)
	console.log("new magnitude " + mag)


})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
