import { Button, Text } from '@ui-kitten/components'
import { Plus } from 'lucide-react-native'
import React from 'react'


export const FAB = ({style,onPress}) => {
  return (
    <Button style={[style,{
        shadowColor:'black',
        shadowOffset:{
            width:0,
            height:10,
        },
        shadowOpacity:0.4,
        shadowRadius:10,
        elevation:3,
        borderRadius:13
    }]}
    accessoryLeft={<><Plus color="white"/></>}
    onPress={onPress}
    />
  )
}