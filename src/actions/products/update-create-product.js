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

        const checkedImages = prepareImages(images);

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

        const checkedImages = prepareImages(images);

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

const prepareImages = (images) => {

    //TODO revisar los FILES

    return images.map(
        image => image.split('/').pop()
    )

}