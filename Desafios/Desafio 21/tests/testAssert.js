import assert from 'assert'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/products';

describe("Products", () => {
    describe("POST", () => {
        it("should create a new product", async () => {
            const product = {
                name: "Product 1",
                price: 100,
                thumbnail: "https://cdn2.iconfinder.com/data/icons/social-media-and-payment/64/-04-128.png"
            }; 
            const { data } = await axios.post('/', product);
            console.log(data);
        });
    });
    describe("GET", async() => {
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
});






/*
id: '62eb36229fd7b9d94c29ec63',
title: 'Payment',
price: 450,
thumbnail: 'https://cdn2.iconfinder.com/data/icons/social-media-and-payment/64/-04-128.png'
*/