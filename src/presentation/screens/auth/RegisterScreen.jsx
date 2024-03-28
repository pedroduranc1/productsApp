import React from 'react'
import { Layout, Text, Input, Button } from "@ui-kitten/components";
import { ScrollView, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const RegisterScreen = () => {

  const { height } = useWindowDimensions()
  const navigation = useNavigation()

  return (
    <Layout
      style={{
        flex: 1,
      }}
    >
      <ScrollView style={{ marginHorizontal: 40 }}>
        {/*  */}
        <Layout style={{ paddingTop: height * 0.30 }}>
          <Text category="h1">
            Crear cuenta
          </Text>
          <Text category="p2">
            Por favor, crea una cuenta para continuar
          </Text>
        </Layout>

        {/* Inputs */}
        <Layout style={{
          marginTop: 20
        }}>

          <Input
            placeholder='Nombre completo'
            style={{ marginBottom: 10 }}
          />

          <Input
            placeholder='Correo Electronico'
            keyboardType='email-address'
            autoCapitalize='none'
            style={{ marginBottom: 10 }}
          />

          <Input
            placeholder='Password'
            autoCapitalize='none'
            secureTextEntry
            style={{ marginBottom: 10 }}
          />

        </Layout>

        {/* Space */}

        <Layout style={{ height: 20 }} />

        {/* Button */}
        <Layout>
          <Button>
            Crear
          </Button>
        </Layout>

        {/* Space */}

        <Layout style={{ height: 50 }} />

        {/* Info */}
        <Layout style={{ alignItems: "flex-end", flexDirection: "row", justifyContent: "center" }}>
          <Text>Ya tienes cuenta?</Text>
          <Text status='primary' category='s1'
            onPress={() => {

              navigation.pop()
            }}
          >ingresar</Text>
        </Layout>
      </ScrollView>
    </Layout>
  )
}