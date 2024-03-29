import { tesloApi } from "../../config/api/tesloApi"
import { ProductMapper } from "../../infrastructure/mappers/product.mapper"

const emptyProduct ={
    id:'',
    title:'Nuevo producto',
    description:"",
    price:0,
    images:[],
    slug:'',
    gender:'unisex',
    sizes:[],
    stock:0,
    tags:[]
}

export const getProductById = async (id) => {

    if(id==='new') return emptyProduct;

    try {
        
        const {data} = await tesloApi.get(`/products/${id}`)

        return ProductMapper.tesloProductToEntity(data);

    } catch (error) {
        console.log(error)
        throw new Error(`Error getting product by id: ${id}`)
    }
}