const chatHelper = require('./helper/chatHelper')


const socketServer = (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on('online', (data) => {
        console.log(data, socket.id, 'online')
        data.userId !== '' && chatHelper.registerOnline(data.userId, socket.id).
            then(data => console.log('online'))
            .catch(err => console.log(err))
    })

    socket.on("join_room", ({ roomId }) => {
        socket.join(roomId);
        console.log(`User with ID: ${socket.id} joined room: ${roomId}`);
    });

    socket.on('client-to-server', (chat) => {
        chatHelper.addChat(chat)
            .then(data => console.log('chat added'))
            .catch(err => console.log(err))
        socket.to(chat.roomId).emit('server-to-client', chat);
    });

    socket.on('offline', (data) => {
        console.log(data, 'offline')

        data.userId !== '' && chatHelper.registerOffline(data.userId).
            then(data => console.log('ofline'))
            .catch(err => console.log(err))
    })

    
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);


    });
}


module.exports = socketServer