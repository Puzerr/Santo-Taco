import { Text, View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function Header() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
        <Text style={styles.headerText}>Santo Taco</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E58354",
  },
  headerText: {
    fontFamily: "Gaegu_700Bold",
    fontSize: 42,
    color: "#fff",
    letterSpacing: 2,
  },
});

export default Header;
