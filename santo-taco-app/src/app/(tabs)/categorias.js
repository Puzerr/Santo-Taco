import { StyleSheet, View } from "react-native";
import TodasCategorias from "../../components/TodasCategorias";

function CategoriasScreen() {
  return (
    <View style={styles.container}>
      <TodasCategorias />
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

export default CategoriasScreen;
