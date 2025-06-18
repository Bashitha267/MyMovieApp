import { Platform, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import Corousel from "../components/Corousel";
import MovieCate from "../components/MovieCate";
import Popular from "../components/Popular";
import Search from "../components/Search";

export default function Page() {
  return (
  
       <View style={styles.container}>
          <ScrollView className=" bg-black"  >
      <Search/>
      <Corousel/>
      <MovieCate/>
      <Popular/>
    <StatusBar barStyle="light-content" />
       </ScrollView>
    </View>
   
   
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:Platform.OS==="android" ? StatusBar.currentHeight : 45,
    backgroundColor:"black"
  },
});
