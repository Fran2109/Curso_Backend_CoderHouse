import ContainerKnex from "../../containers/ContainerKnex.js"

class productDaoKnex extends ContainerKnex {
    constructor(config, tabla, createTable) {
        super(config, tabla, createTable);
    }
}

export default productDaoKnex