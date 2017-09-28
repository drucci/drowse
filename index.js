var express = require('express')
var bodyParser = require('body-parser')

var app = express()

var magnitude = 0;
var angle = 0;

var count = 0;
var magX = 0;
var magY = 0;


var seen = new Set()

app.set('port', (process.env.PORT || 5000))
app.use(bodyParser.raw())
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!' + magnitude + " direction: "+ angle);
})

app.get('/current', function(request, response) {
  response.send(getCurrent());
})

function getCurrent() {
	return {"direction": angle, magnitude: magnitude}
}

app.get('/send', function(request, response) {
	console.log(request)

	ident = request.query.clientId
	if (!seen.has(ident)) {
		seen.add(ident)
		count += count
		console.log("NEW IDENTFIER, INCREASING COUNT")
	}

	newMagX =  (request.query.magnitude * Math.cos(request.query.angle)) / count;
	magX += newMagX
	oldMagX =  (request.query.oldMag * Math.cos(request.query.oldDirection)) / count;
	magX -= oldMagX

	newMagY =  (request.query.magnitude * Math.sin(request.query.angle)) / count;
	magY += newMagY
	oldMagY =  (request.query.oldMag * Math.sin(request.query.oldDirection)) / count;
	magY -= oldMagY


	magnitude = Math.sqrt(Math.pow(magX,2) + Math.pow(magY,2))
	angle = Math.atan(magY/magX)

	console.log("inputed magnitude " + request.query.magnitude)
	console.log("inputed direction " + request.query.angle)
	console.log("inputed magnitude " + request.query.magnitude)
	console.log("new direction " + direction)
	console.log("new magnitude " + magnitude)
	response.send(getCurrent())
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
