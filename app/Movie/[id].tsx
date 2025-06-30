import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
type Genre = {
  id: number;
  name: string;
};
type stills={
  file_path:string;
  
}
type Cast={
  name:string,
  profile_path:string,
  character:string;
}
type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  original_language: string;
  overview: string;
  genres: Genre[];
  backdrop_path: string;
  tagline:string;
  adult:boolean;
  runtime:string;
};
const Movie = () => {
  const {height,width}=Dimensions.get("window")
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [cloading, setcLoading] = useState(false);
  const [cast,setCast]=useState<Cast[]|null>(null)
  const[images,setImages]=useState<stills[]|null>(null)
  const [Imgloading,setImgLoading]=useState(false);
  const apiKey = "b595089bbce12e3f85f4b29ba3bab776";
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const results = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
        );
        const data = await results.json();
        // console.log(data);
        setMovie(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [id]);
  useEffect(()=>{
    const getCast=async()=>{
      setcLoading(true)
      try{
        const results=await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`)
        const data=await results.json()
       setCast(data.cast.slice(0,10))
        
      }
      catch(e){
        console.log(e)
      }
      finally{
        setcLoading(false)
      }

    }
getCast()



  },[id])
  useEffect(()=>{
    const getImages= async ()=>{
      setImgLoading(true)
      try{
        const results=await fetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${apiKey}`)
        const data=await results.json()
       if (data.backdrops && Array.isArray(data.backdrops)) {
  setImages(data.backdrops.slice(0, 5));
  
} else {
  setImages([]);
}
      }
      catch(e){
        console.log(e)
      }
      finally{
        setImgLoading(false)
      }
    }
    getImages();
  },[id])
  if (loading||cloading||Imgloading) {
    return <ActivityIndicator size="large"></ActivityIndicator>;
  }
  return (
    <ScrollView className="bg-black" showsVerticalScrollIndicator={false}>
      <StatusBar hidden={true} />
      <View style={styles.container} className="flex-col ">
        <View>
          <View>
             <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w780/${movie?.backdrop_path}`,
            }}
            style={{
              width:width,
              height:height*0.5,
              resizeMode: "cover",
            }}
          ></Image>
          </View>
         <View className="absolute bottom-0   mb-4 flex-col  p-1 mx-auto justify-center items-center" style={{
          width:width
         }}>
          <Text className=" text-center text-white mb-1" style={{
            fontWeight:700,
            fontSize:45,
            
          }}>{movie?.title}</Text>
          <View className="flex flex-row justify-center items-center  gap-4 mt-1 mb-2" style={{
            width:width
          }}>
           {
            movie?.genres.map((item)=>(
              <Text key={item.id} className="text-[#dae1e9]" style={{
                fontWeight:700,
                fontSize:16,
                
                
              }}><MaterialIcons name="fiber-manual-record" size={8} color="grey"></MaterialIcons>{item.name}</Text>
            ))
           }
          </View>
          {/* <Text className="text-white" style={{
            fontWeight:500,
            fontSize:17
          }}>{movie?.tagline}</Text> */}

         </View>
        </View>
        <View className="flex-col mt-5 mx-4">
          {/* tags line */}
          <View className="flex-row justify-between">   
            {(movie?.adult) && (
              <TouchableOpacity className="border border-gray-500 px-3 py-1 items-center"><Text className="text-white">18+</Text></TouchableOpacity>
            )}
            <View className="border border-gray-500 px-3 py-1 items-center"><Text className="text-white ">{movie?.release_date.slice(0,4)}</Text></View>
            <View className="border border-gray-500 px-3 py-1 items-center"><Text className="text-white" >{movie?.original_language.toUpperCase()}</Text></View>
            <View className="border border-gray-500 px-3 py-1 items-center"><Text className="text-white">{movie?.runtime} min</Text></View>

          </View>
              <View className="flex-col mt-8 mx-1">
            <View className="  "><Text className=" border-l-8 border-red-600  ml-2 text-white text-2xl mb-4 pl-3 py-2" style={{
              fontWeight:600,
              fontSize:29
            }}>Overview</Text></View>
            <View className=" " style={{
              
            }}><Text className="text-white text-justify font-serif px-2" style={{
              fontSize:18,
              fontWeight:300,
              
            }}> {movie?.overview}</Text></View>
          </View>
          {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} className="mx-2 mt-6 flex-row">
            {movie?.genres.map((item)=>(
                <TouchableOpacity key={item.id} className="border border-gray-500 px-3 py-1 items-center mx-4"><Text className="text-white">{item.name}</Text></TouchableOpacity>
            ))}
          </ScrollView> */}
          <View  className="flex-col">
            <View className="mt-8 mx-1 "><Text className=" border-l-8 border-red-600  ml-2 text-white text-2xl mb-4 pl-3 py-2" style={{
              fontWeight:600,
              fontSize:29
            }}>Quick Clicks</Text></View>
            <ScrollView horizontal className="mx-4">
              {
                images?.map((item)=>(
                  <Image source={{uri:`https://image.tmdb.org/t/p/original${item.file_path}`}}    style={{ width: 200, height: 200 }}
      resizeMode="cover" key={item.file_path} className="mx-4"></Image>
                ))
              }
            </ScrollView>

          </View>
              
          



          
          <View>
            <Text className=" mt-6 border-l-8 border-red-600  ml-2 text-white text-2xl mb-4 pl-3 py-2" style={{
              fontWeight:600,
              fontSize:29
            }}>Cast</Text>
            <ScrollView horizontal className="mt-6 " >
             {
              cast?.map((item)=>(
                <TouchableOpacity className="flex-col mx-4 mb-8 " key={item.character}>
                  <Image  className="rounded-full border-gray-400 border-2" source={{uri:`https://image.tmdb.org/t/p/w500${item.profile_path}`}} style={{
                    height:120,
                    width:120,
                    resizeMode:"contain"
                  }}></Image>
                  <Text className="text-white mt-5 text-center text-lg">{item.name}</Text>
                  <Text className="text-gray-500 mt-1 text-center" style={{
                    width:150
                  }}>{item.character}</Text>

                </TouchableOpacity>
              ))
             }
            </ScrollView>
          </View>


        </View>

        <View className="flex-row justify-between mx-4 absolute top-0 left-0 right-0 mt-10 ">
          <TouchableOpacity
            style={{
              backgroundColor: "transparent",
              borderColor: "gray",
            }}
            className="rounded-full px-1 py-1"
            onPress={() => {
              router.push("/");
            }}
          >
            <Ionicons name="chevron-back" size={30} color="white"></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "transparent",
            }}
            className="rounded-full px-1 py-1"
          >
            <Ionicons
              name="ellipsis-horizontal"
              size={30}
              color="white"
            ></Ionicons>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default Movie;
