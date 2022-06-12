import ContainerFirebase from "../../containers/ContainerFirebase.js"

class productDaoFirebase extends ContainerFirebase {
    constructor(url, collection) {
        super(url, collection);
    }
}

export default productDaoFirebase