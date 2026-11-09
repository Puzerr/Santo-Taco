import Ionicons from "@react-native-vector-icons/ionicons";
import { Image } from "expo-image";
import { useState } from "react";
import { Pressable, Text, View, StyleSheet, FlatList } from "react-native";

function MenuAdicionar() {
  const [pedidos, setPedidos] = useState([
    {
      id: "1",
      name: "Prato #1",
      image:
        "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?q=80&w=1494&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    },
    {
      id: "2",
      name: "Prato #2",
      image:
        "https://plus.unsplash.com/premium_photo-1678051141689-1f7a7861b3b4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    },
    {
      id: "3",
      name: "Prato nome bem grande #3",
      image:
        "https://plus.unsplash.com/premium_photo-1664476631037-87a2714dd04e?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    },
    {
      id: "4",
      name: "Prato nome bem grande #3",
      image:
        "https://plus.unsplash.com/premium_photo-1661776649804-6bfa4fc14d09?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    },
  ]);

  const Item = ({ nome, imagem }) => {
    const [quantidadePedido, setQuantidadePedido] = useState(0);

    const handleQuantidade = (tipo) => {
      if (tipo === "aumentar") {
        setQuantidadePedido((quantidadePedido) => quantidadePedido + 1);
      } else if (tipo === "diminuir" && quantidadePedido > 0) {
        setQuantidadePedido((quantidadePedido) => quantidadePedido - 1);
      }
    };

    const Contador = () => (
      <View style={styles.contadorContainer}>
        <Pressable
          style={styles.botaoDiminuirContador}
          onPress={() => handleQuantidade("diminuir")}
        >
          <Ionicons name="arrow-back" size={24} color="#111111" />
        </Pressable>
        <Text style={styles.textoQuantidade}>{quantidadePedido}</Text>
        <Pressable
          style={styles.botaoAumentarContador}
          onPress={() => handleQuantidade("aumentar")}
        >
          <Ionicons name="arrow-forward" size={24} color="#111111" />
        </Pressable>
      </View>
    );
    return (
      <View style={styles.pedidoUnico}>
        <Image
          source={{ uri: imagem }}
          contentFit="cover"
          transition={300}
          style={styles.itemImage}
        />
        <View style={styles.nomeContadorContainer}>
          <Text style={styles.nomePedido}>{nome}</Text>
          <Contador />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tituloAdicionarPage}>Seus Pedidos</Text>
      <FlatList
        data={pedidos}
        renderItem={({ item }) => <Item nome={item.name} imagem={item.image} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.listaContainer}
        contentContainerStyle={styles.listaPadding}
      />
      <Pressable style={styles.botaoFlutuante}>
        <Text style={styles.textoBotaoEnviar}>Mandar para a cozinha!</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tituloAdicionarPage: {
    fontFamily: "Roboto",
    fontSize: 30,
    fontWeight: "900",
    color: "#333333",
  },
  listaContainer: {
    flex: 1,
  },
  listaPadding: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  pedidoUnico: {
    flexDirection: "row",
    backgroundColor: "#FAFAFA",
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
    elevation: 2,
  },
  itemImage: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: "#e0e0e0",
  },
  nomeContadorContainer: {
    flex: 1,
    paddingLeft: 16,
    paddingVertical: 4,
    justifyContent: "space-between",
    alignItems: "center",
  },
  nomePedido: {
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: "900",
    color: "#111111",
    textAlign: "center",
  },
  contadorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 4,
    width: 130,
  },
  botaoDiminuirContador: {
    padding: 8,
    backgroundColor: "#F2F2F2",
    borderRadius: 6,
  },
  botaoAumentarContador: {
    padding: 8,
    backgroundColor: "#F2F2F2",
    borderRadius: 6,
  },
  textoQuantidade: {
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: "bold",
    color: "#111111",
  },
  botaoFlutuante: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },
  textoBotaoEnviar: {
    color: "#FFFFFF",
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MenuAdicionar;
