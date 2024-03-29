import React from 'react'
import { Text, Card } from "@ui-kitten/components";
import { Image } from 'react-native';
import { FadeInImage } from '../ui/FadeInImage';
import { useNavigation } from '@react-navigation/native';

export const ProductCard = ({ product }) => {

    const navigation = useNavigation()

    return (
        <Card
            onPress={() => navigation.navigate("ProductScreen", { productId: product.id })}
            style={{ flex: 1, backgroundColor: '#f9f9f9', margin: 3 }}
        >
            {
                product.images.length === 0
                    ? <Image style={{ width: "100%", height: 200 }} source={require("../../../assets/nofoto.png")} />
                    : <FadeInImage uri={product.images[0]}
                        style={{ flex: 1, height: 200, width: "100%" }}
                    />
            }

            <Text
                numberOfLines={2}
                style={{
                    textAlign: "center"
                }}>
                {product.title}
            </Text>
        </Card>
    )
}