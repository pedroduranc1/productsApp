import React from 'react'
import { useAuthStore } from '../../store/auth/AuthStore'
import { getProductsByPage } from "../../../actions/products/get-products-by-page";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { MainLayout } from '../../layouts/MainLayout';
import { FullScreenLoader } from "../../components/ui/FullScreenLoader";
import { ProductList } from '../../components/products/ProductList';
import { FAB } from '../../components/ui/FAB';
import { useNavigation } from '@react-navigation/core';


export const HomeScreen = () => {

  const { logout } = useAuthStore()

  // const {isLoading,data:products = []} = useQuery({
  //   queryKey:['products','infinite'],
  //   staleTime:1000 * 60 *60,//1hora
  //   queryFn: () => getProductsByPage(0)
  // })

  const navigation = useNavigation()

  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60,//1hora
    initialPageParam: 0,
    queryFn: async (params) => {
      return await getProductsByPage(params.pageParam);
    },
    getNextPageParam: (lastPage, allPages) => allPages.length
  })

  return (
    <>
      <MainLayout
        title="TestloShop - Products"
        subtitle="Aplicacion administrativa"
      >
        {
          isLoading
            ? (<FullScreenLoader />)
            : (<ProductList products={data.pages.flat() ?? []} fetchNextPage={fetchNextPage} />)
        }

      </MainLayout>
      <FAB 
      style={{
        position:"absolute",
        bottom:30,
        right:20
      }} 
      onPress={
        ()=>navigation.navigate('ProductScreen',{productId:'new'})
      }
      />
    </>

  )
}