import ContainerKnex from "../../containers/ContainerKnex.js"

class cartDaoKnex extends ContainerKnex {
    constructor(config, tabla, createTable) {
        super(config, tabla, createTable);
    }
}

export default cartDaoKnex