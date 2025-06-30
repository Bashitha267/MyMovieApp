import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
type Movie={
    name:string,
    poster_path:string,
    id:number
}

const PopularTV = () => {
    const [movies,setMovies]=useState<Movie[]>([])
    const[loading,setLoading]=useState(false)
    const ApiKey="b595089bbce12e3f85f4b29ba3bab776"
    const router=useRouter()
    useEffect(()=>{
        const fetchMovies=async ()=>{
            setLoading(true)
            try{
                const result=await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${ApiKey}`)
                const data=await result.json()
                const updated=data.results.slice(0,12)
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
            <ActivityIndicator size={'large'} style={{
                backgroundColor:"black"
            }}></ActivityIndicator>
        )
    }
    return (
       <View  className=''>
        <View className=' flex-row  mr-4 ml-4 my-2 border-l-8 border-red-500 px-2 mb-5 mt-2 items-end justify-between'>
            <Text className='ml-2 text-white  font-bold' style={{
                    fontSize:25,
                    fontWeight:"600",
                    
                }}>Popular TV Series</Text>
            <Text className='text-white border-2  rounded-2xl px-2 py-1' style={{
                    fontSize:14,
                    fontWeight:"600",
                    
                }}>See All</Text>

        </View>
        <ScrollView className='flex-row mx-4 mb-16' horizontal showsVerticalScrollIndicator={false}>
                {
                    movies.map((item)=>(
                        <TouchableOpacity className="mx-6" key={item.id} onPress={()=>
                                    router.push(`/TV/${item.id}`)
                        }>
                            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}}  style={{
                                width: 120,
                                height: 180,
                                borderRadius: 10,
                            }}
                            resizeMode="cover"></Image>
              <Text className='text-white text-center mt-1' style={{
                width:120
              }}>{item.name}</Text>  
                        </TouchableOpacity>
                    ))
                }
        </ScrollView>
       </View>
    );
}

const styles = StyleSheet.create({
   
})

export default PopularTV;
