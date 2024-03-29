import React from 'react'
import { sizes } from '../../constants'
import { Button, ButtonGroup, useTheme } from '@ui-kitten/components'

export const ProductSizes = ({setFieldValue,values}) => {
    
    const theme = useTheme()

    return (
        <ButtonGroup
            style={{ margin: 2, marginTop: 30, marginHorizontal: 15 }}
            size='small'
            appearance='outline'
        >
            {
                sizes.map(size => (
                    <Button
                        onPress={() => setFieldValue('sizes',
                            values.sizes.includes(size)
                                ? values.sizes.filter(s => s !== size)
                                : [...values.sizes, size]
                        )}
                        key={size}
                        style={{
                            flex: 1,
                            backgroundColor: values.sizes.includes(size) ? theme['color-primary-200'] : undefined
                        }}
                    >{size.toUpperCase()}</Button>
                ))
            }
        </ButtonGroup>
    )
}