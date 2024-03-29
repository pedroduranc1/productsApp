import React, { useState } from 'react'
import { List,Layout } from "@ui-kitten/components";
import { ProductCard } from './ProductCard';
import { RefreshControl } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';

export const ProductList = ({products,fetchNextPage}) => {

  const queryClient = useQueryClient()

  const [IsRefreshing, setIsRefreshing] = useState(false)

  const onPullToRefresh = async () => {
    setIsRefreshing(true);

    await new Promise(resolve => setTimeout(resolve,200));
    queryClient.invalidateQueries({
      queryKey:['products','infinite']
    })

    setIsRefreshing(false);
  }
  return (
    <List
        data={products}
        numColumns={2}
        keyExtractor={(item,index)=> `${item.id}=${index}`}
        renderItem={({item})=>(
            <ProductCard product={item}/>
        )}
        ListFooterComponent={()=><Layout style={{height:150}}/>}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.8}
        refreshControl={
          <RefreshControl
            refreshing={IsRefreshing}
            onRefresh={onPullToRefresh}
          />
        }
    />
  )
}