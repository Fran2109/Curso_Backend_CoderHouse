const mongoose = {
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
        messages:{
            name: "messages",
            schema: {
                email: { type: String, require: true },
                message: { type: String, require: true },
                dateString: { type: String, require: true }
            }
        }
    }
}

export default mongoose;