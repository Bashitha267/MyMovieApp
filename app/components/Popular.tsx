import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
type Movie={
    title:string,
    backdrop_path:string,
    id:number
}
const Popular = () => {
    const [movies,setMovies]=useState<Movie[]>([])
    const[loading,setLoading]=useState(false)
    const ApiKey="b595089bbce12e3f85f4b29ba3bab776"
    const router=useRouter()
    useEffect(()=>{
        const fetchMovies=async ()=>{
            setLoading(true)
            try{
                const result=await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${ApiKey}`)
                const data=await result.json()
                const updated=data.results.slice(0,8)
                setMovies(updated)
            }
            catch(e){
                console.log(e)
            }
            finally{
                setLoading(false)
            }
        }
        fetchMovies()
    },[])
    if(loading==true){
        return(
            <ActivityIndicator size={'large'}></ActivityIndicator>
        )
    }
    return (
       <View style={styles.container} className=''>
        <View className=' flex-row  mr-4 ml-4 my-2 border-l-8 border-red-500 px-2 mb-5 mt-5 items-end justify-between'>
            <Text className='ml-2 text-white  font-bold' style={{
                    fontSize:30,
                    fontWeight:"600",
                    
                }}>Popular Movies</Text>
            <Text className='text-white border-2  rounded-2xl px-2 py-1' style={{
                    fontSize:15,
                    fontWeight:"600",
                    
                }}>See All</Text>

        </View>
        <ScrollView className='flex-row' horizontal showsVerticalScrollIndicator={false}>
                {
                    movies.map((item)=>(
                        <TouchableOpacity key={item.id}>
                            <Text className='text-white'>{item.title}</Text>
                        </TouchableOpacity>
                    ))
                }
        </ScrollView>
       </View>
    );
}

const styles = StyleSheet.create({
    container:{
        paddingTop:Platform.OS==="android" ? StatusBar.currentHeight :0
    }
})

export default Popular;
