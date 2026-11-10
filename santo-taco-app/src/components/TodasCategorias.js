import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { useRouter, useFocusEffect } from "expo-router";

export default function TodasCategorias() {
  const router = useRouter();
  const [categoriasComPratos, setCategoriasComPratos] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarPratosECategorias = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/pratos`);
      if (!response.ok) throw new Error("Erro ao buscar pratos");

      const pratos = await response.json();

      const agrupado = pratos.reduce((acc, prato) => {
        const catNome = prato.categoria || "Geral";
        if (!acc[catNome]) {
          acc[catNome] = [];
        }
        acc[catNome].push(prato);
        return acc;
      }, {});

      const listaFormatada = Object.keys(agrupado).map((catNome) => ({
        categoria: catNome,
        pratos: agrupado[catNome],
      }));

      setCategoriasComPratos(listaFormatada);
    } catch (error) {
      console.error("Erro em Categorias:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarPratosECategorias();
    }, []),
  );

  const irParaPratoNaHome = (pratoId) => {
    router.push({
      pathname: "/",
      params: { pratoId },
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E5734B" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.tituloPage}>Categorias</Text>

      <FlatList
        data={categoriasComPratos}
        keyExtractor={(item) => item.categoria}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listPadding}
        renderItem={({ item: secaoCat }) => (
          <View style={styles.secaoCategoria}>
            <Text style={styles.nomeCategoria}>{secaoCat.categoria}</Text>

            {secaoCat.pratos.map((prato) => (
              <View key={prato._id} style={styles.cardPrato}>
                <Image
                  source={{ uri: prato.imagem || prato.image }}
                  contentFit="cover"
                  transition={300}
                  style={styles.imagemPrato}
                />

                <View style={styles.infoContainer}>
                  <Text style={styles.nomePrato}>
                    {prato.name || prato.nome}
                  </Text>

                  {prato.descricao && (
                    <Text style={styles.descricaoPrato} numberOfLines={2}>
                      {prato.descricao}
                    </Text>
                  )}

                  <Text style={styles.precoPrato}>
                    R$ {Number(prato.preco).toFixed(2).replace(".", ",")}
                  </Text>

                  <Pressable
                    style={styles.botaoVerPrato}
                    onPress={() => irParaPratoNaHome(prato._id)}
                  >
                    <Text style={styles.textoBotao}>Ver na Página Inicial</Text>
                    <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    paddingTop: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tituloPage: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#222222",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  listPadding: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  secaoCategoria: {
    marginBottom: 24,
  },
  nomeCategoria: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E5734B",
    marginBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#E5734B",
    paddingBottom: 4,
    alignSelf: "flex-start",
  },
  cardPrato: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  imagemPrato: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  nomePrato: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222222",
  },
  descricaoPrato: {
    fontSize: 13,
    color: "#666666",
    marginTop: 2,
    marginBottom: 4,
  },
  precoPrato: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#48B052",
    marginBottom: 6,
  },
  botaoVerPrato: {
    flexDirection: "row",
    backgroundColor: "#E5734B",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    alignSelf: "flex-start",
  },
  textoBotao: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
});
