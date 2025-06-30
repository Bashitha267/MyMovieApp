import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import "../global.css";
const Layout = () => {
    return (
       <Stack>
        <Stack.Screen name='(tabs)' options={{
            headerShown:false
        }}></Stack.Screen>
        <Stack.Screen name='Movie/[id]' options={{
            
 
  
     
     headerShown:false
  }}></Stack.Screen>
  <Stack.Screen name='TV/[id]' 
  options={{
    headerShown:false
  }}></Stack.Screen>
       </Stack>
    );
}

const styles = StyleSheet.create({})

export default Layout;
