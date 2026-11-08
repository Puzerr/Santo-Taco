import { View, StyleSheet } from "react-native";
import OfertasDia from "../../components/OfertasDia";
import TodosPratos from "../../components/TodosPratos";

function MenuScreen() {
  return (
    <View style={styles.container}>
      <OfertasDia />
      <TodosPratos />
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

export default MenuScreen;
