'use strict'

const io = require('socket.io')(8080)

io.sockets.on('connection', (socket) => {
	console.log('new connection: ' + socket.id)
	const _id = {id: socket.id}
	socket.broadcast.emit('new', _id)

	socket.on('new:sub', (data) => {
		Object.assign(data, _id)
		console.log(data)
		socket.broadcast.emit('new:sub', data)
	})

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

	socket.on('disconnect', () => {
		console.log('disconnect: ' + _id)
		socket.broadcast.emit('remove', _id)
	});
})
