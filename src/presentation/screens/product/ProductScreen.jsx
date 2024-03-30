import React, { useRef } from 'react'
import { MainLayout } from '../../layouts/MainLayout'
import { Button, ButtonGroup, Input, Layout, Text, useTheme } from "@ui-kitten/components";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProductById } from '../../../actions/products/get-product-by-id';
import { ScrollView } from 'react-native';
import { Formik } from "formik";
import { updateCreateProduct } from '../../../actions/products/update-create-product';
import { ProductImages } from '../../components/products/ProductImages';
import { genders, sizes } from '../../constants';
import { ProductSizes } from '../../components/products/ProductSizes';
import { ProductGenres } from '../../components/products/ProductGenres';
import { CameraAdapter } from '../../../config/adapters/camera.adapter';

export const ProductScreen = ({ route }) => {

  const productIdRef = useRef(route.params.productId)

  const theme = useTheme()
  const queryClient = useQueryClient()

  const { data: product } = useQuery({
    queryKey: ['product',productIdRef.current],
    queryFn: () => getProductById(productIdRef.current)
  })

  const mutation = useMutation({
    mutationFn: (data) => updateCreateProduct({...data,id:productIdRef.current}),
    onSuccess(data){
      productIdRef.current = data.id;
      
      queryClient.invalidateQueries({
        queryKey:["product",'infinite']
      })

      queryClient.invalidateQueries({
        queryKey:['product',data.id]
      })
    }
  })

  if (!product) {
    return (
      <MainLayout
        title="Cargando..."
      >
        <Text>No se encontro el Producto</Text>
      </MainLayout>)
  }

  return (
    <Formik
      initialValues={product}
      onSubmit={values => mutation.mutate(values)}
    >
      {
        ({ handleChange,handleSubmit,values,errors,setFieldValue }) => (
          <MainLayout
            title={values.title}
            subtitle={`Precio ${values.price}`}
            rightActions={ async()=>{
              const photos = await CameraAdapter.getPicturesFromLibrary();
              
              setFieldValue('images',[...values.images,...photos])
            }}
            rightActionsIcon="camera"
          >
            <ScrollView style={{ flex: 1 }}>
              {/* Imagenes del product */}
              <Layout style={{
                marginVertical:10,
                justifyContent:'center',
                alignItems:"center"
              }}>
                {/* TODO: tener en consideracion cuando no hay imagenes */}
                
                <ProductImages images={values.images}/>
              </Layout>

              {/* Formulario */}
              <Layout
                style={{ marginHorizontal: 10 }}
              >
                <Input
                  label="Titulo"
                  value={values.title}
                  onChangeText={handleChange("title")}
                  style={{ marginVertical: 5 }}
                />
                <Input
                  label="Slug"
                  value={values.slug}
                  onChangeText={handleChange("slug")}
                  style={{ marginVertical: 5 }}
                />
                <Input
                  label="Descripcion"
                  value={values.description}
                  onChangeText={handleChange("description")}
                  multiline
                  numberOfLines={5}
                  style={{ marginVertical: 5 }}
                />
              </Layout>

              {/* PRECIO E INVENTARIO */}

              <Layout style={{
                marginHorizontal: 10,
                flexDirection: "row",
                gap: 10
              }}>
                <Input
                  label="Precio"
                  value={values?.price.toString()}
                  keyboardType='number-pad'
                  onChangeText={handleChange('price')}
                  style={{ flex: 1 }}
                />

                <Input
                  label="Inventario"
                  value={values?.stock.toString()}
                  keyboardType='number-pad'
                  onChangeText={handleChange('stock')}
                  style={{ flex: 1 }}
                />
              </Layout>

              {/* SELECTORES */}
              
              {/* Tallas */}
              <ProductSizes setFieldValue={setFieldValue} values={values}/>

              {/* Generos */}
              <ProductGenres setFieldValue={setFieldValue} values={values} />

              {/* Boton de guardar */}
              <Button
                onPress={() => handleSubmit()}
                disabled={mutation.isPending}
                style={{ margin: 15 }}
              >
                Guardar
              </Button>

              <Text>
                {JSON.stringify(values, null, 2)}
              </Text>

              <Layout style={{ height: 200 }} />
            </ScrollView>
          </MainLayout>
        )
      }
    </Formik>

  )
}