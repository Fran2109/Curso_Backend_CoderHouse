const socket = io();

socket.emit('connectionToTest');

socket.on('sendTest', async ({ productsTest }) => {
    await mostrar('formProducts', 'templates/form.handlebars', {});
    actualizarProductos(productsTest);
});