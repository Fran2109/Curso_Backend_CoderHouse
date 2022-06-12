import ContainerFirebase from "../../containers/ContainerFirebase.js"

class cartDaoFirebase extends ContainerFirebase {
    constructor(url, collection) {
        super(url, collection);
    }
}

export default cartDaoFirebase