import assert from 'assert'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080';

describe("Products", () => {
    describe("POST", () => {
        it("should create a new product", async () => {
            const productInsert = {
                title: "Product 1",
                price: 100,
                thumbnail: "https://cdn2.iconfinder.com/data/icons/social-media-and-payment/64/-04-128.png"
            };
            const { data, status } = await axios.post('/products', productInsert);
            assert.strictEqual(status, 200);
            assert.deepEqual(data, { ...productInsert, id: data.id }, "Product not created");
        });
        it("should not create a new product", async () => {
            const productInsert = {
                title: "Product 2",
                price: 200
            };
            assert.rejects(async() => await axios.post('/products', productInsert), { status: 400 });
        });
    });
    describe("GET", () => {
        it("Should return 200", async() => {
            const {status} = await axios.get('/products');
            assert.strictEqual(status, 200);
        });
        it("Should be an array", async() => {
            const {data} = await axios.get('/products');
            assert.strictEqual(Array.isArray(data), true);
        })
        it("Should be an array of Products", async() => {
            const {data} = await axios.get('/products');
            data.map((product) => {
                assert.strictEqual(typeof product, 'object', 'Product is not an object');
                assert.strictEqual(product.hasOwnProperty('id'), true, 'Product has no Id');
                assert.strictEqual(product.hasOwnProperty('title'), true, 'Product has no Title');
                assert.strictEqual(product.hasOwnProperty('price'), true, 'Product has no Price');
                assert.strictEqual(product.hasOwnProperty('thumbnail'), true, 'Product has no Thumbnail');
                assert.deepEqual(Object.keys(product), ['id', 'title', 'price', 'thumbnail'], 'Product has extra keys');
            })
        })
    });
    describe("GET/:id", () => {
        it("Should return 200", async() => {
            const {data} = await axios.get('/products');
            const { status } = await axios.get(`/products/${data[0].id}`);
            assert.strictEqual(status, 200);
        });
        it("Should return 404", async() => {
            assert.rejects(async() => {
                await axios.get('/products/123456789012345678901234');
            }, { status: 404 }, 'Product not found');
        });
        it("Should return a Product", async() => {
            const {data} = await axios.get('/products');
            const {data: product} = await axios.get(`/products/${data[0].id}`);
            assert.strictEqual(typeof product, 'object', 'Product is not an object');
            assert.strictEqual(product.hasOwnProperty('id'), true, 'Product has no Id');
            assert.strictEqual(product.hasOwnProperty('title'), true, 'Product has no Title');
            assert.strictEqual(product.hasOwnProperty('price'), true, 'Product has no Price');
            assert.strictEqual(product.hasOwnProperty('thumbnail'), true, 'Product has no Thumbnail');
            assert.deepEqual(Object.keys(product), ['id', 'title', 'price', 'thumbnail'], 'Product has extra keys');
        })
    });
    describe("PUT/:id", () => {
        it("Should return 200", async() => {
            const {data} = await axios.get('/products');
            const { status } = await axios.put(`/products/${data[data.length-1].id}`, {title: 'Product 1 Updated'});
            assert.strictEqual(status, 200);
        });
        it("Should return 404", async() => {
            assert.rejects(async() => {
                await axios.put('/products/123456789012345678901234', {title: 'Product 1 Updated'});
            }, { status: 404 }, 'Product not found');
        });
        it("Should return a Product", async() => {
            const {data} = await axios.get('/products');
            const {data: product} = await axios.put(`/products/${data[data.length-1].id}`, {title: 'Product 1 Updated'});
            assert.strictEqual(typeof product, 'object', 'Product is not an object');
            assert.strictEqual(product.hasOwnProperty('id'), true, 'Product has no Id');
            assert.strictEqual(product.hasOwnProperty('title'), true, 'Product has no Title');
            assert.strictEqual(product.hasOwnProperty('price'), true, 'Product has no Price');
            assert.strictEqual(product.hasOwnProperty('thumbnail'), true, 'Product has no Thumbnail');
            assert.deepEqual(Object.keys(product), ['id', 'title', 'price', 'thumbnail'], 'Product has extra keys');
        })
    });
    describe("DELETE/:id", () => {
        it("Should return 200", async() => {
            const {data} = await axios.get('/products');
            const { status } = await axios.delete(`/products/${data[data.length-1].id}`);
            assert.strictEqual(status, 200, "Product not deleted");
        });
        it("Should return 404", async() => {
            assert.rejects(async() => {
                await axios.delete('/products/123456789012345678901234');
            }, { status: 404 }, 'Product not found');
        });
    })
});
describe("Messages", () => {
    describe("GET", () => {
        it("Should return 200", async() => {
            const {status} = await axios.get('/messages');
            assert.strictEqual(status, 200);
        });
        it("Should be an array", async() => {
            const {data} = await axios.get('/messages');
            assert.strictEqual(Array.isArray(data), true);
        });
        it("Should be an array of Messages", async() => {
            const {data} = await axios.get('/messages');
            data.map((product) => {
                assert.strictEqual(typeof product, 'object', 'Message is not an object');
                assert.strictEqual(product.hasOwnProperty('id'), true, 'Message has no Id');
                assert.strictEqual(product.hasOwnProperty('author'), true, 'Message has no Author');
                assert.strictEqual(product.hasOwnProperty('text'), true, 'Message has no Text');
                assert.strictEqual(product.hasOwnProperty('dateString'), true, 'Message has no DateString');
                assert.deepEqual(Object.keys(product), ['id', 'author', 'text', 'dateString'], 'Message has extra keys');
                assert.deepEqual(Object.keys(product.author), ['email', 'nombre', 'apellido', 'edad', 'alias', 'avatar'], 'Author has extra keys');
            })
        })
    });
    describe("POST", () => {
        it("Should return 200", async() => {
            const message = {
                author: {
                    email: 'prueba',
                    nombre: 'prueba',
                    apellido: 'prueba',
                    edad: 1,
                    alias: 'prueba',
                    avatar: 'prueba'
                },
                text: 'prueba',
                dateString: 'prueba'
            }
            const { status } = await axios.post('/messages', message);
            assert.strictEqual(status, 200);
        });
        it("Should return 400", async() => {
            assert.rejects(async() => {
                await axios.post('/messages', {});
            }, { status: 400 }, 'Message not created');
        });
    });
});