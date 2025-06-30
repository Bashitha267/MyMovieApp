import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
type Genres = {
  id: number;
  name: string;
};
type Movie={
    id:number,
    title:string,
    poster_path:string

}
const Discover = () => {
    const router=useRouter()
  const [cate, setCate] = useState<Genres[]>([]);
  const [cateLoading, setCateLoading] = useState(false);
  const [active, setActive] = useState('');
  const [activeId, setActiveId] = useState<number>();
  const apiKey = "b595089bbce12e3f85f4b29ba3bab776";
  const [movies,setMovies]=useState<Movie[]>([]);
  const [movieLoading,setMovieLoading] =useState(false)
  const[activeSearch,setActiveSearch]=useState(false)
  useEffect(() => {
    const getcate = async () => {
      setCateLoading(true);
      try {
        const results = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
        );
        const data = await results.json();

        setCate(data.genres);
        setActiveId(data.genres[0].id)
        setActive(data.genres[0].name)
      } catch (e) {
        console.log(e);
      } finally {
        setCateLoading(false);
      }
    };
    getcate();
  }, []);
useEffect(()=>{
const getMovies=async ()=>{
    setMovieLoading(true)
    try{
        const results=await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${activeId}`);
        const data=await results.json()
        setMovies(data.results)
        
    }
    catch(e){
        console.log(e)
    }
    finally{
        setMovieLoading(false)
    }
}
getMovies()
},[activeId])






  if (cateLoading == true||movieLoading==true)
    return ( console.log("loading")                                                                                                                                                   );
  return (
    <SafeAreaView style={styles.container} className="flex-col ">
      <ScrollView className="flex-col">
        <View className=" mr-4 ml-4 my-2 border-l-8 border-red-500 px-2 mb-5 mt-5 justify-between flex flex-row items-center">
          <Text
            className="pl-3 text-white"
            style={{
              fontSize: 25,
              fontWeight: 600,
            }}
          >
            Discover
          </Text>
          <TouchableOpacity onPress={()=>{
            setActiveSearch(true)
            console.log(activeSearch)
          }}><Text><Ionicons name="search" size={25} color="white"></Ionicons></Text></TouchableOpacity>
        </View>             
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-2 mb-4"
        >
          {cate.length > 0 &&
            cate.map((item) => (
              <TouchableOpacity
                onPress={() => {
                  setActive(item.name);
                  setActiveId(item.id);
                }}
                key={item.id}
                className={`mx-4  rounded-xl px-3 py-1  ${
                  active === item.name
                    ? "bg-red-600 border-2"
                    : "border-2 border-white"
                }`}
              >
                <Text className="text-white px-2 py-1 ">{item.name}</Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
        <View className=" ml-2 flex-row flex-wrap" style={{
            
        }} >
          {movies.length>0 && movies.map((item)=>(
            <TouchableOpacity key={item.id} 
            onPress={()=>(
                        router.push(`/Movie/${item.id}`)
            )}
            
            style={{
                width:'48%'
            }} className="flex-col px-2 mb-8">
                <Image source={{uri:`https://image.tmdb.org/t/p/w500${item.poster_path}`}} style={
                    {
                        height:250,
                        width:150
                    }
                } className="rounded-xl" 
                resizeMode="cover"></Image>
                <Text className="text-white text-center">{item.title}</Text>
            </TouchableOpacity>


          ))}  
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 5,
    backgroundColor: "black",
  },
});

export default Discover;
