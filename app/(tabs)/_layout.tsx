import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

const Layout = () => {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor:"#E53935",
            tabBarInactiveTintColor:"#B0B0B0",
            tabBarStyle:{
                backgroundColor:"#121212",
                paddingTop:8
            }
        }}>
            <Tabs.Screen name='index' options={{
                title:"",
                headerShown:false,
               tabBarIcon:({color,size})=>(
                <Ionicons name='home' color={color} size={size}></Ionicons>
               )
            }}></Tabs.Screen>
             <Tabs.Screen name='Discover' options={{
                title:"",
                headerShown:false,
               tabBarIcon:({color,size})=>(
                <Ionicons name='compass' color={color} size={size}></Ionicons>
               )
            }}></Tabs.Screen>
             <Tabs.Screen name='Fav' options={{
                title:"",
                headerShown:false,
               tabBarIcon:({color,size})=>(
                <Ionicons name='heart' color={color} size={size}></Ionicons>
               )
            }}></Tabs.Screen>
            
        </Tabs>
    );
}

const styles = StyleSheet.create({})

export default Layout;
