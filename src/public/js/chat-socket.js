const socket = io();

//FRONT ATAJA "msg_server_to_front"
socket.on("msg_server_to_front", (msg) => {
    console.log(msg)
})

//FRONT EMITE 'msg_front_to_back'
socket.emit('msg_front_to_back', { 
    author: "Usuario anonimo (front)", 
    msg: "Hola Server!!!" 
})
 