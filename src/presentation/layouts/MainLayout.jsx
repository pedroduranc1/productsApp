import React from 'react'
import { Layout, TopNavigation, Divider,Text,TopNavigationAction } from "@ui-kitten/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Camera, ImagePlus, PictureInPicture } from "lucide-react-native";

export const MainLayout = ({ title, subtitle, rightActions, children, rightActionsIcon }) => {

    const { top } = useSafeAreaInsets()

    const {canGoBack,goBack} = useNavigation()

    const RenderBackAction = () => {
        return <TopNavigationAction 
        icon={<ArrowLeft color="black" />}
        onPress={goBack} 
        />    
    }

    const RenderRightAction = () => {

        if(rightActions === undefined || rightActionsIcon === undefined) return null

        return (
            <TopNavigationAction
            onPress={rightActions}
            icon={<ImagePlus color="black"/>}
        />
        )
        
    }

    return (
        <Layout style={{ paddingTop: top }}>
            <TopNavigation
                title={title}
                subtitle={subtitle}
                alignment='center'
                accessoryLeft={()=>canGoBack ? <RenderBackAction/> : undefined}
                accessoryRight={()=> <RenderRightAction/>}
            />

            <Divider />

            <Layout style={{height:"100%"}}>
                {children}
            </Layout>

        </Layout>
    )
}