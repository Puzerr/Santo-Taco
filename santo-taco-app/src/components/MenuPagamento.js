import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useFocusEffect } from "expo-router";

export default function PagamentoScreen() {
  const [comandas, setComandas] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarComandas = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/comandas`,
      );
      if (!response.ok) throw new Error("Erro ao buscar comandas");

      const dados = await response.json();
      setComandas(dados);
    } catch (error) {
      console.error("Erro ao carregar pagamentos:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarComandas();
    }, []),
  );

  const handleChamarGarcom = () => {
    Alert.alert("Garçom Notificado!", "Um garçom está indo até você!", [
      { text: "OK", style: "default" },
    ]);
  };

  const totalGeral = comandas.reduce((accComanda, comanda) => {
    const subtotalComanda = comanda.pedidos.reduce(
      (accItem, item) => accItem + item.precoUnidade * item.quantidade,
      0,
    );
    return accComanda + subtotalComanda;
  }, 0);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E5734B" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.tituloPage}>Pagamento</Text>

      <FlatList
        data={comandas}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listPadding}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={48} color="#999" />
            <Text style={styles.emptyText}>
              Nenhuma comanda aberta no momento.
            </Text>
          </View>
        }
        renderItem={({ item: comanda }) => {
          const totalComanda = comanda.pedidos.reduce(
            (acc, ped) => acc + ped.precoUnidade * ped.quantidade,
            0,
          );

          return (
            <View style={styles.cardComanda}>
              <View style={styles.headerCard}>
                <View>
                  <Text style={styles.nomeCliente}>{comanda.nomeCliente}</Text>
                  <Text style={styles.numeroMesa}>
                    Mesa N° {comanda.numeroMesa}
                  </Text>
                </View>
                <Ionicons name="receipt-outline" size={24} color="#E5734B" />
              </View>

              <View style={styles.divisor} />

              {comanda.pedidos.map((pedido, idx) => {
                const subtotalItem = pedido.precoUnidade * pedido.quantidade;
                return (
                  <View
                    key={`${comanda._id}-ped-${idx}`}
                    style={styles.linhaItem}
                  >
                    <Text style={styles.itemTexto}>
                      {pedido.quantidade}x {pedido.nomePrato}
                    </Text>
                    <Text style={styles.itemValor}>
                      R$ {subtotalItem.toFixed(2).replace(".", ",")}
                    </Text>
                  </View>
                );
              })}

              <View style={styles.divisor} />

              <View style={styles.rodapeCard}>
                <Text style={styles.rotuloSubtotal}>Total do Cliente:</Text>
                <Text style={styles.valorSubtotal}>
                  R$ {totalComanda.toFixed(2).replace(".", ",")}
                </Text>
              </View>
            </View>
          );
        }}
      />

      <View style={styles.rodapeFixo}>
        <View style={styles.cardRodape}>
          <View style={styles.barTotalGeral}>
            <Text style={styles.textoTotalGeralRotulo}>Total Geral:</Text>
            <Text style={styles.textoTotalGeralValor}>
              R$ {totalGeral.toFixed(2).replace(".", ",")}
            </Text>
          </View>

          <Pressable
            style={styles.botaoGeralChamarGarcom}
            onPress={handleChamarGarcom}
          >
            <Ionicons name="notifications-outline" size={20} color="#FFFFFF" />
            <Text style={styles.textoBotaoGeral}>Chamar Garçom</Text>
          </Pressable>
        </View>
      </View>
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
    backgroundColor: "#F2F2F2",
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
    paddingBottom: 20,
  },
  emptyContainer: {
    paddingVertical: 60,
    alignItems: "center",
    gap: 12,
  },
  emptyText: {
    fontSize: 16,
    color: "#777777",
  },
  cardRodape: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  headerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nomeCliente: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222222",
  },
  numeroMesa: {
    fontSize: 14,
    color: "#666666",
    marginTop: 2,
  },
  divisor: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 12,
  },
  linhaItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  itemTexto: {
    fontSize: 14,
    color: "#444444",
  },
  itemValor: {
    fontSize: 14,
    fontWeight: "500",
    color: "#222222",
  },
  rodapeCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rotuloSubtotal: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#444444",
  },
  valorSubtotal: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#48B052",
  },
  rodapeFixo: {
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  barTotalGeral: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#A66A4B",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  textoTotalGeralRotulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  textoTotalGeralValor: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  botaoGeralChamarGarcom: {
    flexDirection: "row",
    backgroundColor: "#DE7952",
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  textoBotaoGeral: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
