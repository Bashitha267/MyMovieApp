import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
type Genre = {
  id: number;
  name: string;
};

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  original_language: string;
  overview: string;
  genres: Genre[];
  backdrop_path: string;
  tagline: string;
  adult: boolean;
  runtime: string;
};
const Fav = () => {
  const [bookmarks, setBookmarks] = useState<Movie[]>([]);
    const router=useRouter()
useFocusEffect(
  useCallback(() => {
    const fetchBookmarks = async () => {
      try {
        const data = await AsyncStorage.getItem("bookmarks");
        const parsed: Movie[] = data ? JSON.parse(data) : [];
        setBookmarks(parsed);
      } catch (error) {
        console.error("Failed to load bookmarks:", error);
      }
    };

    fetchBookmarks();
  }, [])
);
  return (
    <SafeAreaView style={styles.container} className="flex-col flex px-2 h-screen">
      <View className="px-2">
        <Text
          className=" border-l-8 border-red-600   ml-2 text-white text-2xl mb-4 pl-3 py-2"
          style={{
            fontWeight: 600,
            fontSize: 29,
          }}
        >
          bookmarks
        </Text>
      </View>

      <ScrollView className="flex-col  px-2">
        {bookmarks?.map((item) => (
          <TouchableOpacity
            className="flex-wrap flex-row  mb-4 items-center"
            key={item.id}
          onPress={()=>{
            router.push(`/Movie/${item.id}`)
          }}>
            <View
              className="mb-4 mt-2"
              style={{
                width: "45%",
              }}
            >
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                height={200}
                className="w-full  rounded-2xl"
                resizeMode="cover"
              ></Image>
            </View>
            <View
              style={{
                width: "48%",
              }}
              className="flex-col flex mx-2"
            >
              <Text
                className="text-white "
                style={{
                  fontSize: 25,
                  fontWeight: 700,
                }}
              >
                {item.title}
              </Text>
              <View className="flex-row w-52 mt-2 mb-2">
                {item.genres.slice(0, 2).map((item12) => (
                  <View key={item12.id} className="flex-row  ">
                    <MaterialIcons
                      name="fiber-manual-record"
                      size={14}
                      color="gray"
                    ></MaterialIcons>
                    <Text className="text-gray-200 text-sm mx-1 ">
                      {item12.name}
                    </Text>
                  </View>
                ))}
              </View>
              <Text className="text-white w-52 text-pretty">
                {item.overview.length > 150
                  ? item.overview.slice(0, 150) + "..."
                  : item.overview}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
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
export default Fav;
