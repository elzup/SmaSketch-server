'use strict'

const port = parseInt(process.argv[1]) || 8080
const io = require('socket.io')(port)

io.sockets.on('connection', socket => {
	console.log('new connection: ' + socket.id)
	const _id = {id: socket.id}
	socket.broadcast.emit('new', _id)

	socket.on('new:sub', data => {
		Object.assign(data, _id)
		console.log(data)
		socket.broadcast.emit('new:sub', data)
	})

	socket.on('new:sub:sync', (data) => {
		console.log(data)
		socket.to(data.id).emit('new:sub:sync', data)
	})

	socket.on('draw', data => {
		console.log(data)
		socket.broadcast.emit('draw', data)
	})

	socket.on('color', color => {
		console.log(color)
		socket.broadcast.emit('color', color)
	})

	socket.on('lineWidth', width => {
		console.log(width)
		socket.broadcast.emit('lineWidth', width)
	})

	socket.on('disconnect', () => {
		console.log('disconnect: ' + _id)
		socket.broadcast.emit('remove', _id)
	})
})
