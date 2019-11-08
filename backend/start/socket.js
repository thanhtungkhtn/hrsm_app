'use strict'

/*
|--------------------------------------------------------------------------
| Websocket
|--------------------------------------------------------------------------
|
| This file is used to register websocket channels and start the Ws server.
| Learn more about same in the official documentation.
| https://adonisjs.com/docs/websocket
|
| For middleware, do check `wsKernel.js` file.
|
*/

const Ws = use('Ws')

Ws.channel('chat', 'ThongBaoController')

// Ws.channel('chat', 'ThongBaoController' ,(socket) => {
//   console.log('user joined with %s socket id', socket.id)
// }) //.middleware(['auth'])

// Ws.channel('chat', 'ThongBaoController', ({ socket }) => {
//   console.log("Topic: " + socket.topic)
//   console.log("ID: " + socket.id)
//   console.log('a new subscription for news topic')
// })
