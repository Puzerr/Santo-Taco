import { StyleSheet, View } from "react-native";
import MenuPagamento from "../../components/MenuPagamento";

function CategoriasScreen() {
  return (
    <View style={styles.container}>
      <MenuPagamento />
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
