import service from "./../service/index.js";

export function getAllProducts() {
    return service.getAllProducts();
}
export function getProductById({id}) {
    return service.getProductById(id);
}
export function createProduct({product}){
    return service.insertProduct(product);
}
export function updateProduct({id, product}){
    return service.updateProductById(id, product);
}
export function deleteProduct({id}){
    return service.deleteProductById(id);
}
export function deleteAllProducts(){
    return service.deleteAllProducts();
}
export function getAllMessages(){
    return service.getAllMessages();
}
export function deleteAllMessages(){
    return service.deleteAllMessages();
}
export function insertMessage({message}){
    return service.insertMessage(message);
}
export function getInfo(){
    return service.getInfO();
}