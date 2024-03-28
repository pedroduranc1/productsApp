import React from 'react'
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./presentation/navigation/StackNavigator";
import { useColorScheme } from 'react-native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AuthProvider } from "./presentation/providers/AuthProviders";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

export const ProductApp = () => {

    const colorScheme = useColorScheme();
    const theme = colorScheme === "dark" ? eva.dark : eva.light;
    const backgroundColor = (colorScheme === 'dark')
        ? theme['color-basic-800']
        : theme['color-basic-100']

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ApplicationProvider {...eva} theme={theme}>
                    <IconRegistry icons={EvaIconsPack} />
                    <NavigationContainer theme={{
                        dark: colorScheme === "dark",
                        colors: {
                            primary: theme['color-primary-500'],
                            background: backgroundColor,
                            card: theme['color-basic-100'],
                            text: theme['color-basic-100'],
                            border: theme['color-basic-800'],
                            notification: theme['color-primary-500']
                        }
                    }}>
                        <AuthProvider>
                            <StackNavigator />
                        </AuthProvider>
                    </NavigationContainer>
                </ApplicationProvider>
            </QueryClientProvider>
        </>
    )
}