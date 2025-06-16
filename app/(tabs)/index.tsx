import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";

export default function Page() {
  return (
    <SafeAreaView className="flex-1" style={styles.container}>
      <View>
        <Text >Hello World</Text>
        <Text >This is the first page of your app.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:Platform.OS==="android" ? StatusBar.currentHeight : 0
  },
});
