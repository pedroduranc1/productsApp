import { isAxiosError } from "axios";
import { tesloApi } from "../../config/api/tesloApi";


export const updateCreateProduct = (product) => {

    product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
    product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

    if (product.id && product.id !== 'new') {
        return updateProduct(product)
    }

    return createProduct(product);
}

//TODO Revisar si viene el usuario
const updateProduct = async (product) => {
    try {
        const { id, images = [], ...rest } = product

        const checkedImages = await prepareImages(images);

        const { data } = await tesloApi.patch(`/products/${id}`, {
            images: checkedImages,
            ...rest
        })

        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            console.log(error.response?.data)
        }
        throw new Error(`Error al actualizar el producto`)
    }
}

const createProduct = async (product) => {
    try {
        const { id, images = [], ...rest } = product

        const checkedImages = await prepareImages(images);

        const { data } = await tesloApi.post(`/products/`, {
            images: checkedImages,
            ...rest
        })

        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            console.log(error.response?.data)
        }
        throw new Error(`Error al crear el producto`)
    }
}

const prepareImages = async (images) => {

    //TODO revisar los FILES
    const fileImages = images.filter(image => image.includes("file://"))
    const currentImages = images.filter(image => !image.includes("file://"))

    if(fileImages.length >0){
        const uploadPromises = fileImages.map(image => uploadImages(image));

        const uploadedImages = await Promise.all(uploadPromises)

        currentImages.push(...uploadedImages);
    }

    return currentImages.map(
        image => image.split('/').pop()
    )

}

const uploadImages = async (image) => {
    const formData = new FormData();
    formData.append('file',{
        uri:image,
        type:"image/jpeg",
        name:image.split('/').pop()
    });

    const {data} = await tesloApi.post('/files/product',formData,{
        headers:{
            'Content-Type':"multipart/form-data"
        }
    })

    return data.image;
}