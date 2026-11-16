import { View, StyleSheet } from "react-native";
import MenuInicial from "../../components/MenuInicial";

function IndexScreen() {
  return (
    <View style={styles.container}>
      <MenuInicial />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default IndexScreen;
