import { View, Text, StyleSheet } from "react-native";
import OfertasDia from "../../components/OfertasDia";

function MenuScreen() {
  return (
    <View style={styles.container}>
      <OfertasDia />;
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MenuScreen;
