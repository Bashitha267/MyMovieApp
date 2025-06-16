import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
type Genre = {
  id: number;
  name: string;
};
const MovieCate = () => {
    const [cate,setCate]=useState<Genre[]>([])
    const [loading,setLoading]=useState(false)
     const [active, setActive] = useState<string | null>(null)
    const apiKey="b595089bbce12e3f85f4b29ba3bab776"
    useEffect(()=>{
        setLoading(true)
        const fetchCate=async()=>{
            try{
                const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`);
                const data=await res.json()
                const updatedData=data.genres.slice(0,6)
            setCate(updatedData)    
            if (updatedData.length > 0) setActive(updatedData[0].name);      

            
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
      if (loading) {
    return <ActivityIndicator size="large" />;
  }
    return (
        <View className='flex-col '>
            <View className=' flex-row justify-between mr-4 ml-4 my-2 border-l-8 border-red-500 px-2 mb-10 mt-5 items-end'>
                <Text className='ml-2 text-white  font-bold' style={{
                    fontSize:30,
                    fontWeight:"600",
                    
                }}>
                    Movie Categories
                </Text>
                <Text className='text-white border-2  rounded-2xl px-2 py-1' style={{
                    fontSize:15,
                    fontWeight:"600",
                    
                }}>See All</Text>
            </View>
        <ScrollView horizontal className='' showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            {cate.length>0 && cate.map((item)=>(
                <TouchableOpacity onPress={()=>(
                    setActive(item.name)
                )} key={item.id} className={`mx-4 border-2  rounded-xl px-3 py-1  ${active===item.name ? 'bg-red-600' : 'border-2 border-white'}`}><Text className='text-white px-2 py-1 text-xl'>{item.name}</Text></TouchableOpacity>
            ))}
        </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({})

export default MovieCate;
