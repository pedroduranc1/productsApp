import React from 'react'
import { Layout, TopNavigation, Divider,Text,TopNavigationAction } from "@ui-kitten/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';

export const MainLayout = ({ title, subtitle, rightActions, children, rightActionsIcon }) => {

    const { top } = useSafeAreaInsets()

    const {canGoBack,goBack} = useNavigation()

    const renderBackAction = () => {
        <TopNavigationAction 
        icon={<><Text>Back</Text></>}
        onPress={goBack} 
        />
    }

    const RenderRightAction = () => {

        if(rightActions === undefined || rightActionsIcon === undefined) return null

        return (
            <TopNavigationAction
            onPress={rightActions}
            icon={<><Text>Algo</Text></>}
        />
        )
        
    }

    return (
        <Layout style={{ paddingTop: top }}>
            <TopNavigation
                title={title}
                subtitle={subtitle}
                alignment='center'
                accessoryLeft={canGoBack ? renderBackAction : undefined}
                accessoryRight={()=> <RenderRightAction/>}
            />

            <Divider />

            <Layout style={{height:"100%"}}>
                {children}
            </Layout>

        </Layout>
    )
}