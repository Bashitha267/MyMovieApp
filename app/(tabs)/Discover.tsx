import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Genres = {
  id: number;
  name: string;
};

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

const Discover = () => {
  const router = useRouter();
  const [cate, setCate] = useState<Genres[]>([]);
  const [cateLoading, setCateLoading] = useState(false);
  const [active, setActive] = useState('');
  const [activeId, setActiveId] = useState<number>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieLoading, setMovieLoading] = useState(false);
  const [activeSearch, setActiveSearch] = useState(false);
  const [query, setQuery] = useState('');
  const apiKey = "b595089bbce12e3f85f4b29ba3bab776";

  // Get genres
  useEffect(() => {
    const getcate = async () => {
      setCateLoading(true);
      try {
        const results = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
        );
        const data = await results.json();
        setCate(data.genres);
        setActiveId(data.genres[0].id);
        setActive(data.genres[0].name);
      } catch (e) {
        console.log(e);
      } finally {
        setCateLoading(false);
      }
    };
    getcate();
  }, []);

  // Fetch movies by genre
  useEffect(() => {
    if (!activeSearch) {
      const getMovies = async () => {
        setMovieLoading(true);
        try {
          const results = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${activeId}`
          );
          const data = await results.json();
          setMovies(data.results);
        } catch (e) {
          console.log(e);
        } finally {
          setMovieLoading(false);
        }
      };
      if (activeId) getMovies();
    }
  }, [activeId, activeSearch]);

  // Handle search submission
  const handleSearch = async () => {
    if (!query.trim()) return;
    setMovieLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setMovieLoading(false);
    }
  };

  if (cateLoading || movieLoading) return (
    <View className="bg-black flex-1">
      <ActivityIndicator size="large" color="red"></ActivityIndicator>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} className="flex-col">
      <ScrollView className="flex-col">
        <View className="mr-4 ml-4 my-2 border-l-8 border-red-500 px-2 mb-5 mt-5 justify-between flex flex-row items-center">
          <Text
            className="pl-3 text-white"
            style={{
              fontSize: 25,
              fontWeight: "600",
            }}
          >
            Discover
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (activeSearch && query) {
                setQuery('');
                setActiveSearch(false);
              } else {
                setActiveSearch(!activeSearch);
              }
            }}
          >
            <Ionicons name="search" size={25} color="white" />
          </TouchableOpacity>
        </View>

        {/* Search Input */}
        {activeSearch && (
          <View className="mx-4 mb-8 ">
            <TextInput
              placeholder="Search for a movie..."
              value={query}
              onChangeText={(text) => setQuery(text)}
              onSubmitEditing={handleSearch}
              className="bg-white text-black px-4 py-3 rounded-xl"
            />
          </View>
        )}

        {/* Genre Filters */}
        {!activeSearch && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-2 mb-4"
          >
            {cate.map((item) => (
              <TouchableOpacity
                onPress={() => {
                  setActive(item.name);
                  setActiveId(item.id);
                }}
                key={item.id}
                className={`mx-4 rounded-xl px-3 py-1 ${
                  active === item.name
                    ? "bg-red-600 border-2"
                    : "border-2 border-white"
                }`}
              >
                <Text className="text-white px-2 py-1">{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Movie Grid */}
        <View className="ml-2 flex-row flex-wrap justify-between">
          {movies.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => router.push(`/Movie/${item.id}`)}
              style={{ width: '48%' }}
              className="flex-col px-2 mb-8"
            >
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={{ height: 250, width: '100%' }}
                className="rounded-xl"
                resizeMode="cover"
              />
              <Text className="text-white text-center mt-1">{item.title}</Text>
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
