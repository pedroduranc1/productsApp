import { Button, ButtonGroup, useTheme } from '@ui-kitten/components'
import React from 'react'
import { genders } from '../../constants'

export const ProductGenres = ({setFieldValue,values}) => {

    const theme = useTheme()

    return (
        <ButtonGroup
            style={{ margin: 2, marginTop: 30, marginHorizontal: 15 }}
            size='small'
            appearance='outline'
        >
            {
                genders.map(gender => (
                    <Button
                        onPress={() => setFieldValue("gender", gender)}
                        key={gender}
                        style={{
                            flex: 1,
                            backgroundColor: values.gender.startsWith(gender)
                                ? theme['color-primary-200']
                                : undefined
                        }}
                    >{gender.toUpperCase()}</Button>
                ))
            }
        </ButtonGroup>
    )
}