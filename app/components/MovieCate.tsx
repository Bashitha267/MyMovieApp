import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
type Genre = {
  id: number;
  name: string;
};
type Results={
    title:string,
    poster_path:string
    id:string
}
const MovieCate = () => {
    const router=useRouter()
    const [cate,setCate]=useState<Genre[]>([])
    const [loading,setLoading]=useState(false)
    const[movLoading,setMovieloading]=useState(false)
    const [movies,setmovies]=useState<Results[]>([])
     const [active, setActive] = useState<string | null>(null)
     const[activeId,setActiveId]=useState<number | null>(null)
    const apiKey="b595089bbce12e3f85f4b29ba3bab776"
    useEffect(()=>{
        setLoading(true)
        const fetchCate=async()=>{
            try{
                const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`);
                const data=await res.json()
                const updatedData=data.genres.slice(0,6)
            setCate(updatedData)    
            
            if (updatedData.length > 0) {
                setActive(updatedData[0].name)
                setActiveId(updatedData[0].id)

            };      

            
            }
            catch(e){
                console.log(e)
            }
            finally{
                setLoading(false)
            }
        }
        fetchCate()
    },[])
    

    useEffect(()=>{
        setMovieloading(true)
        const fetchMovies=async ()=>{
            try{
                const result=await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${activeId}`)
                const data=await result.json()
                const updated=data.results.slice(0,8)
                setmovies(updated)
            }
            catch(e){
                console.log(e)
            }
            finally{
                setMovieloading(false)
            }
        }
        fetchMovies()
    },[activeId])
      if (loading||movLoading) {
    return <ActivityIndicator size="large" />;
  }
    return (
        <View className='flex-col flex-1 '>
            <View className=' flex-row justify-between mr-4 ml-4 my-2 border-l-8 border-red-500 px-2 mb-5 mt-5 items-end'>
                <Text className='ml-2 text-white  font-bold' style={{
                    fontSize:25,
                    fontWeight:"600",
                    
                }}>
                    Movie Categories
                </Text>
                <Text className='text-white border-2  rounded-2xl px-2 py-1' style={{
                    fontSize:14,
                    fontWeight:"600",
                    
                }}>See All</Text>
            </View>
        <ScrollView horizontal className='' showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            {cate.length>0 && cate.map((item)=>(
                <TouchableOpacity onPress={()=>{
                    setActive(item.name);
                    setActiveId(item.id);
                   
                }} key={item.id} className={`mx-4 border-2  rounded-xl px-3 py-1  ${active===item.name ? 'bg-red-600' : 'border-2 border-white'}`}><Text className='text-white px-2 py-1 '>{item.name}</Text></TouchableOpacity>
            ))}
        </ScrollView>
        <ScrollView className='flex  mx-4 mt-8' horizontal showsVerticalScrollIndicator={false}>
           {movies.map((item)=>(
            <TouchableOpacity key={item.title} style={{
                
            }} className='mx-6 flex-col' onPress={()=>router.push(`/Movie/${item.id}`)
               
            }>
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}}  style={{
                                width: 120,
                                height: 180,
                                borderRadius: 10,
                            }}
                            resizeMode="cover"></Image>
              <Text className='text-white text-center mt-1' style=
              {{
                width:120,
              }}>{item.title}</Text>  
            </TouchableOpacity>
           ))}
        </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({})

export default MovieCate;
