export default {
    fileSystem: {
        products: "./data/fileSystem/products.txt",
        carts: "./data/fileSystem/carts.txt"
    },
    firebase: {
        tokenUrl: "./data/firebase/fleet-breaker-326218-firebase-adminsdk-mcopn-416a64a4ee.json",
        products: "products",
        carts: "carts"
    },
    mongoose: {
        url: "mongodb://localhost:27017/ecommerce",
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        collections: {
            products: {
                name: "products",
                schema: {
                    title: { type: String, require: true },
                    price: { type: Number, require: true },
                    thumbnail: { type: String, require: true }
                }
            },
            carts: {
                name: "carts",
                schema: {
                    items: []
                }
            }
        }
    },
    persistence: 'memory',
}