import { View, StyleSheet } from "react-native";
import MenuAdicionar from "../../components/MenuAdicionar";

function AdicionarScreen() {
  return (
    <View style={styles.container}>
      <MenuAdicionar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    marginTop: 20,
  },
});

export default AdicionarScreen;
