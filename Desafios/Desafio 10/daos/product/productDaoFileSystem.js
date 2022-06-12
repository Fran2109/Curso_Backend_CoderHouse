import ContainerFileSystem from "../../containers/ContainerFileSystem.js"

class productDaoFileSystem extends ContainerFileSystem {
    constructor(filePath) {
        super(filePath);
    }
}

export default productDaoFileSystem