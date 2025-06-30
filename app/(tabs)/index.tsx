import { Platform, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import Corousel from "../components/Corousel";
import Latest from "../components/Latest";
import Popular from "../components/Popular";

export default function Page() {
  return (
  
       <View style={styles.container}>
          <ScrollView className=" bg-black"  >
      
      <Corousel/>
      <Popular/>
    
      <Latest/>
    <StatusBar barStyle="default" />
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
