import httpClient from "../httpClient";
import Product from "../models/Product";

const BASE_PATH = "/products";
//async means that it is not going to happen right away, wait to get response
//we need to await our request to our product endpoint. If await is removed response is just a promise
//await can only be used in an async method
const productsService = {
    getAllProducts: async(): Promise<Product[]> => {
       const response = await httpClient.get(BASE_PATH);
       return response.data;
    },

    createProduct: async(product: Product): Promise<Product> => {
        const response = await httpClient.post(BASE_PATH, product);
        return response.data;
    },

    deleteProduct: async(productId: number): Promise<void> =>{
        await httpClient.delete(`${BASE_PATH}/${productId}`)
    },

    updateProduct:  async (product: Product): Promise<Product> => {
        const response = await httpClient.put(`${BASE_PATH}/${product.id}`, product);
        return response.data;
    },
};

export default productsService;