import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

const Movie = () => {
    const {id}=useLocalSearchParams();
    return (
        <SafeAreaView className=''>
            <Text>{id}</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default Movie;
