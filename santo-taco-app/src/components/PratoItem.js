import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useComanda } from "../hooks/useComanda.js";

const PratoItem = ({ prato }) => {
  const { itensSeleciondos, toggleItem } = useComanda();
  const isSelecionado = itensSeleciondos.some((item) => item.id === prato._id);

  return (
    <Pressable
      style={[styles.container, isSelecionado && styles.containerSelecionado]}
      onPress={() => toggleItem(prato)}
    >
      <Image source={{ uri: prato.image }} style={styles.imagem} />
      <View style={styles.info}>
        <Text style={styles.nome}>{prato.name}</Text>
        <Text style={styles.preco}>
          R$ {prato.preco.toFixed(2).replace(".", ",")}
        </Text>
      </View>
      <View style={styles.iconeContainer}>
        <Ionicons
          name={isSelecionado ? "checkmark-circle" : "add-circle-outline"}
          size={32}
          color={isSelecionado ? "#E5734B" : "#A0A0A0"}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  containerSelecionado: {
    backgroundColor: "#FFF3E0",
  },
  imagem: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  nome: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  preco: {
    fontFamily: "Roboto",
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
  },
  iconeContainer: {
    padding: 8,
  },
});

export default PratoItem;
