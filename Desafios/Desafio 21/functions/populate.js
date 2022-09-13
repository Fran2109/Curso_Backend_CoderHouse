import dtoProduct from "./../DTO/dtoProductMongo.js";

const populate = (generateObject, cant) => {
    const array = [];
    for (let i = 0; i < cant; i++) {
        array.push(new dtoProduct(generateObject()));
    }
    return array;
}

export default populate;