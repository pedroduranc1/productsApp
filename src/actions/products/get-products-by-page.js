import { tesloApi } from "../../config/api/tesloApi";
import { ProductMapper } from "../../infrastructure/mappers/product.mapper";

export const getProductsByPage = async (page,limit =20) =>{
    try {
        const {data} = await tesloApi.get(`/products?offset=${page*10}&limit=${limit}`)
    
        const products = data.map(tesloProduct => ProductMapper.tesloProductToEntity(tesloProduct))
        
        return products;
    } catch (error) {
        console.log(error)
        throw new Error('Error getting products')
    }
}