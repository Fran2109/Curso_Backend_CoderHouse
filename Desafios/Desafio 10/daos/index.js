import config from '../config.js'

let productDao;
let cartDao;

switch (config.persistence) {
    case 'fileSystem':
        const { default : productDaoFileSystem } = await import('./product/productDaoFileSystem.js');
        productDao = new productDaoFileSystem(config.fileSystem.products);
        const { default : cartDaoFileSystem } = await import('./cart/cartDaoFileSystem.js');
        cartDao = new cartDaoFileSystem(config.fileSystem.carts);
        break
    case 'firebase':
        const { default : productDaoFirebase } = await import('./product/productDaoFirebase.js');
        productDao = new productDaoFirebase(config.firebase.tokenUrl, config.firebase.products);
        const { default : cartDaoFirebase } = await import('./cart/cartDaoFirebase.js');
        //cartDao = new cartDaoFirebase(config.firebase.tokenUrl);
        break
    case 'memory':
        const { default : productDaoMemory} = await import('./product/productDaoMemory.js')
        productDao = new productDaoMemory();
        const { default : cartDaoMemory} = await import('./cart/cartDaoMemory.js')
        cartDao = new cartDaoMemory();
        break
    case 'mongoose':
        const { default : productDaoMongoose} = await import('./product/productDaoMongoose.js')
        productDao = new productDaoMongoose(config.mongoose.collections.products, config.mongoose.url, config.mongoose.options);
        const { default : cartDaoMongoose} = await import('./cart/cartDaoMongoose.js')
        cartDao = new cartDaoMongoose(config.mongoose.collections.carts, config.mongoose.url, config.mongoose.options);
        break
    default:
        throw new Error('Persistence not supported');
}

export { productDao, cartDao }