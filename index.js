'use strict'
const http = require('http')
const socketIO = require('socket.io')
const fs = require('fs')

// node.jsでWebServerを作ります。
// アクセスされたら、クライアントに表示するsyncCanvas.htmlを返します。
const server = http.createServer((req, res) => {
	res.writeHead(200, {'Content-Type': 'text/html'})
	const output = fs.readFileSync('./syncCanvas.html', 'utf-8')
	res.end(output)
})
server.listen(8080)

// socket.IOを用いたリアルタイムWebを実装します。
const io = socketIO.listen(server)

// 接続されたら、connected!とコンソールにメッセージを表示します。
io.sockets.on('connection', (socket) => {
	console.log('connected')

	// 描画情報がクライアントから渡されたら、接続中の他ユーザーへ
	// broadcastで描画情報を送ります。
	// ちなみに、最近のsocket.IOでは、イベント名(以下だとdraw)は
	// 自由にネーミング出来るようになったようです。便利！！
	socket.on('draw', (data) => {
		console.log(data)
		socket.broadcast.emit('draw', data)
	})

	// 色変更情報がクライアントからきたら、
	// 他ユーザーへ変更後の色を通知します。
	socket.on('color', (color) => {
		console.log(color)
		socket.broadcast.emit('color', color)
	})

	// 線の太さの変更情報がクライアントからきたら、
	// 他ユーザーへ変更後の線の太さを通知します。
	socket.on('lineWidth', (width) => {
		console.log(width)
		socket.broadcast.emit('lineWidth', width)
	})
})
