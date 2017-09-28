var express = require('express')
var bodyParser = require('body-parser')

var app = express()

var magnitude = 0;
var direction = 0;

var count = 100;

var magX = 0;
var magY = 0;


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

	newMagX =  (request.query.magnitude * Math.cos(request.query.direction)) / count;
	magX += newMagX
	oldMagX =  (request.query.oldMag * Math.cos(request.query.oldDirection)) / count;
	magX -= oldMagX

	newMagY =  (request.query.magnitude * Math.sin(request.query.direction)) / count;
	magY += newMagY
	oldMagY =  (request.query.oldMag * Math.sin(request.query.oldDirection)) / count;
	magY -= oldMagY


	magnitude = Math.sqrt(Math.pow(magX,2) + Math.pow(magY,2))
	direction = Math.atan(magY/magX)

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
