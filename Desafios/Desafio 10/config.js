import mongoose from "mongoose"

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
    knex: {
        config: {
            client: "sqlite3",
            connection: {
                filename: "./data/knex/ecommerce.sqlite"
            },
            useNullAsDefault: true
        },
        carts: {
            table: "carts",
            createTable: (knex, tabla) => {
                knex.schema.hasTable(tabla)
                    .then(exists => {
                        if (!exists) {
                            knex.schema.createTable(tabla, tabla => {
                                tabla.increments('id'),
                                tabla.string('timespan', 100).notNullable()
                            }).then(() => {
                                console.log(`Tabla ${tabla} creada!`)
                            })
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        },
        products: {
            table: "products",
            createTable: (knex, tabla) => {
                knex.schema.hasTable(tabla)
                    .then(exists => {
                        if (!exists) {
                            knex.schema.createTable(tabla, tabla => {
                                tabla.increments('id'),
                                tabla.string("title"),
                                tabla.decimal('price', 8, 2),
                                tabla.string("thumbnail")
                                tabla.integer("cartId").references('id').inTable("carts").onDelete("SET NULL")
                            }).then(() => {
                                console.log(`Tabla ${tabla} creada!`)
                            })
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        }
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
                    timestamp: { type: String, require: true },
                    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }]
                }
            }
        }
    },
    persistence: 'knex',
    type: 'sql'
}