import config from '../config.js';

let cartsController;
let productsController;

switch (config.type) {
    case 'sql':
        const { default : cartsControllerSql } = await import('./cartsControllerSql.js');
        cartsController = cartsControllerSql;
        const { default : productsControllerSql } = await import('./productsControllerSql.js');
        productsController = productsControllerSql;
        break;
    case 'nosql':
        const { default : cartsControllerNoSql } = await import('./cartsControllerNoSql.js');
        cartsController = cartsControllerNoSql;
        const { default : productsControllerNoSql } = await import('./productsControllerNoSql.js');
        productsController = productsControllerNoSql;
        break;
    default:
        throw new Error('Persistence not supported');
}

export { cartsController, productsController }