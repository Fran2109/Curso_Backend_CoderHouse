import assert from 'assert'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/products';

describe("Products", () => {
    describe("POST", () => {
        it("should create a new product", async () => {
            const productInsert = {
                title: "Product 1",
                price: 100,
                thumbnail: "https://cdn2.iconfinder.com/data/icons/social-media-and-payment/64/-04-128.png"
            };
            const { data, status } = await axios.post('/', productInsert);
            assert.strictEqual(status, 200);
            assert.deepEqual(data, { ...productInsert, id: data.id }, "Product not created");
        });
        it("should not create a new product", async () => {
            const productInsert = {
                title: "Product 2",
                price: 200
            };
            assert.rejects(async() => await axios.post('/', productInsert), { status: 400 });
        });
    });
    describe("GET", () => {
        it("Should return 200", async() => {
            const {status} = await axios.get('');
            assert.strictEqual(status, 200);
        });
        it("Should be an array", async() => {
            const {data} = await axios.get('');
            assert.strictEqual(Array.isArray(data), true);
        })
        it("Should be an array of Products", async() => {
            const {data} = await axios.get('');
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
            const {data} = await axios.get('');
            const { status } = await axios.get(`/${data[0].id}`);
            assert.strictEqual(status, 200);
        });
        it("Should return 404", async() => {
            assert.rejects(async() => {
                await axios.get('/123456789012345678901234');
            }, { status: 404 }, 'Product not found');
        });
        it("Should return a Product", async() => {
            const {data} = await axios.get('');
            const {data: product} = await axios.get(`/${data[0].id}`);
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
            const {data} = await axios.get('');
            const { status } = await axios.put(`/${data[data.length-1].id}`, {title: 'Product 1 Updated'});
            assert.strictEqual(status, 200);
        });
        it("Should return 404", async() => {
            assert.rejects(async() => {
                await axios.put('/123456789012345678901234', {title: 'Product 1 Updated'});
            }, { status: 404 }, 'Product not found');
        });
        it("Should return a Product", async() => {
            const {data} = await axios.get('');
            const {data: product} = await axios.put(`/${data[data.length-1].id}`, {title: 'Product 1 Updated'});
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
            const {data} = await axios.get('');
            const { status } = await axios.delete(`/${data[data.length-1].id}`);
            assert.strictEqual(status, 200, "Product not deleted");
        });
        it("Should return 404", async() => {
            assert.rejects(async() => {
                await axios.delete('/123456789012345678901234');
            }, { status: 404 }, 'Product not found');
        });
    })
});