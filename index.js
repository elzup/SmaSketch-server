'use strict'

const io = require('socket.io')(8080)

io.sockets.on('connection', (socket) => {
	console.log('connected')

	socket.on('draw', (data) => {
		console.log(data)
		socket.broadcast.emit('draw', data)
	})

	socket.on('color', (color) => {
		console.log(color)
		socket.broadcast.emit('color', color)
	})

	socket.on('lineWidth', (width) => {
		console.log(width)
		socket.broadcast.emit('lineWidth', width)
	})
})
