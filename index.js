var express = require('express')
var bodyParser = require('body-parser')

var app = express()

var magnitude = 1;
var angle = 1;

var count = 1;
var magX = 1;
var magY = 1;



var seen = new Set()

app.set('port', (process.env.PORT || 5000))
app.use(bodyParser.raw())
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
response.sendFile(__dirname + '/index.html')
  //response.send('Hello World!' + magnitude + " direction: "+ angle);
})

app.get('/current', function(request, response) {
  response.send(getCurrent());
})

function getCurrent() {
	if (angle == null ) {
		angle = 0;
	}

	if (magnitude == null) {
		magnitude = 0;
	}
	return {"angle": angle, magnitude: magnitude}
}

app.get('/send', function(request, response) {
	if (Number.isNaN(request.query.oldAngle) 
		|| Number.isNaN(request.query.oldMagnitude) 
		||Number.isNaN(request.query.magnitude)
		|| Number.isNaN(request.query.angle) ||
		request.query.angle > Math.PI * 2 ||
		request.query.angle < 0) {
		response.send(getCurrent());
		return;
	}
	ident = request.query.clientId

	if (!seen.has(ident)) {
		seen.add(ident)
		count += count
		console.log("NEW IDENTFIER, INCREASING COUNT")
	}

	newMagX =  (request.query.magnitude * Math.cos(request.query.angle)) / count;
	magX += newMagX

	oldMagX =  (request.query.oldMagnitude * Math.cos(request.query.oldAngle)) / count;
	magX -= oldMagX

	newMagY =  (request.query.magnitude * Math.sin(request.query.angle)) / count;
	magY += newMagY
	oldMagY =  (request.query.oldMagnitude * Math.sin(request.query.oldAngle)) / count;
	magY -= oldMagY


	magnitude = Math.sqrt(Math.pow(magX, 2) + Math.pow(magY, 2))

	if (magX == 0 || Number.isNaN(magX)) {
		angle = 0
	} else {
		angle = Math.atan(magY / magX)
	}

	console.log("inputed magnitude " + request.query.magnitude)
	console.log("inputed direction " + request.query.angle)
	console.log("inputed Old magnitude " + request.query.oldMagnitude)
	console.log("inputed Old angle " + request.query.oldAngle)

	console.log("new direction " + angle)
	console.log("new magnitude " + magnitude)

	response.send(getCurrent())
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
