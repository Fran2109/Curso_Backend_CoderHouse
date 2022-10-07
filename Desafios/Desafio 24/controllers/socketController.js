import service from "./../service/index.js";

export default class socketController {
    #io
    constructor(io){
        this.#io = io;
    }
    async start(socket){
        socket.emit("connectionToServer", {
            messages: await service.getAllMessages(),
        });
        socket.on("sendMessage", async (data) => {
            await service.insertMessage(data);
            this.#io.sockets.emit("updateMessages", {
                messages: await service.getAllMessages(),
            });
        });
    }
}