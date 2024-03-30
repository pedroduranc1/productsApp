import React, { useState } from 'react'
import { Layout, Text, Input, Button } from "@ui-kitten/components";
import { Alert, ScrollView, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../store/auth/AuthStore';
import { Lock, Mail } from 'lucide-react-native';

export const LoginScreen = () => {

  const {login} = useAuthStore()

  const [isPosting, setisPosting] = useState(false)

  const [form, setForm] = useState({
    email:"",
    password:""
  })

  const onLogin = async () => {
    if(form.email.length ===0 || form.password.length ===0){
      return;
    }

    setisPosting(true)

    const wasSuccess = await login(form.email,form.password);

    setisPosting(false)
    if(wasSuccess) return;

    Alert.alert("Error","usuario o contra incorrectos")
  }

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
        <Layout style={{ paddingTop: height * 0.35 }}>
          <Text category="h1">
            Ingresar
          </Text>
          <Text category="p2">
            Por favor, ingrese para continuar
          </Text>
        </Layout>

        {/* Inputs */}
        <Layout style={{
          marginTop: 20
        }}>
          <Input
            placeholder='Correo Electronico'
            keyboardType='email-address'
            accessoryLeft={()=><><Mail color="black"/></>}
            autoCapitalize='none'
            value={form.email}
            onChangeText={(email)=>setForm({...form,email})}
            style={{ marginBottom: 10 }}
          />

          <Input
            placeholder='Password'
            autoCapitalize='none'
            accessoryLeft={()=><><Lock color="black"/></>}
            secureTextEntry
            onChangeText={(password)=>setForm({...form,password})}
            style={{ marginBottom: 10 }}
          />

        </Layout>

        {/* Space */}

        <Layout style={{ height: 20 }} />

        {/* Button */}
        <Layout>
          <Button
            disabled={isPosting}
            onPress={() => { 
              onLogin()
            }}
          >
            Ingresar
          </Button>
        </Layout>

        {/* Space */}

        <Layout style={{ height: 50 }} />

        {/* Info */}
        <Layout style={{ alignItems: "flex-end", flexDirection: "row", justifyContent: "center" }}>
          <Text>No tienes cuenta?</Text>
          <Text status='primary' category='s1'
            onPress={()=>{

              navigation.navigate("RegisterScreen")
            }}
          >crea una</Text>
        </Layout>
      </ScrollView>
    </Layout>
  )
}