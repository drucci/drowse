var express = require('express')
var bodyParser = require('body-parser')

var app = express()

var magnitude = 0;
var direction = 0;

app.set('port', (process.env.PORT || 5000))
app.use(bodyParser.raw())
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!' + magnitude + " direction: "+ direction);
})

app.get('/current', function(request, response) {
  response.send(getCurrent());
})

function getCurrent() {
return {"direction": direction, magnitude: magnitude}

}

app.post('/', function(request, response) {
	console.log(request)

	direction = direction - parseInt(request.query.oldDirection)
	magnitude = magnitude - parseInt(request.query.oldMag)
	
	direction = direction + parseInt(request.query.direction)
	magnitude = magnitude + parseInt(request.query.magnitude)

	console.log("inputed magnitude " + request.query.magnitude)
	console.log("inputed direction " + request.query.direction)
	console.log("inputed magnitude " + request.query.magnitude)
	console.log("new direction " + direction)
	console.log("new magnitude " + magnitude)
	response.send(getCurrent())
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
