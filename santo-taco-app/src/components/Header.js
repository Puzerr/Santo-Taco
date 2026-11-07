import { Text, View, StyleSheet } from "react-native";

function Header() {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerText}>Santo Taco</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E58354",
  },
  headerText: {
    fontFamily:'Gaegu_700Bold',
    fontSize: 42,
    color: "#fff",
    letterSpacing: 2,
  },
});

export default Header;
