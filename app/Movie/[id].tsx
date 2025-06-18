import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';

const Movie = () => {
    const {id}=useLocalSearchParams();
    return (
        <SafeAreaView style={styles.container}>
            <Text>{id}</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        paddingTop:Platform.OS==="android" ? StatusBar.currentHeight:0
    }
})

export default Movie;
