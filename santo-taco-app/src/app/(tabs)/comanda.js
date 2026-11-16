import { View, StyleSheet } from "react-native";
import TabelaComanda from "../../components/TabelaComanda";

function ComandaScreen() {
  return (
    <View style={styles.container}>
      <TabelaComanda />
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

export default ComandaScreen;
