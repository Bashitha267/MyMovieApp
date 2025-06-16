import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native";
import Corousel from "../components/Corousel";
import MovieCate from "../components/MovieCate";
import Search from "../components/Search";

export default function Page() {
  return (
    <ScrollView className=" bg-black" style={styles.container}>
       <SafeAreaView >
      <Search/>
      <Corousel/>
      <MovieCate/>
    </SafeAreaView>
    </ScrollView>
   
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:Platform.OS==="android" ? StatusBar.currentHeight : 0
  },
});
