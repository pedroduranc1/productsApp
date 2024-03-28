import React from 'react'
import { Text,Card } from "@ui-kitten/components";
import { Image } from 'react-native';
import { FadeInImage } from '../ui/FadeInImage';

export const ProductCard = ({product}) => {

  return (
    <Card
        style={{flex:1,backgroundColor:'#f9f9f9',margin:3}}
    >
        {
            product.images.length === 0 
            ? <Image style={{width:"100%",height:"100%"}} source={require("../../../assets/nofoto.png")} />
            : <FadeInImage uri={product.images[0]}
                style={{flex:1,height:200,width:"100%"}}
            />
        }

        <Text 
        numberOfLines={2}
        style={{
            textAlign:"center"
        }}>
            {product.title}
        </Text>
    </Card>
  )
}