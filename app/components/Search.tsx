import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const Search = () => {
    return (
        <View className='flex-row items-center rounded-full bg-[#1E1E1E] mx-9 mb-5 mt-2 px-2 py-2'>
            <Ionicons name='search-outline' size={24} color="white" className='ml-8 mr-2 mt-1 mb-1'></Ionicons>
            <TextInput placeholder='Search' className='text-xl text-white ml-1  mb-1 font-bold' placeholderTextColor="white"></TextInput>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Search;
