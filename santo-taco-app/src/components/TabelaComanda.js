import React, { useState, useCallback } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useFocusEffect } from "expo-router";

const ValorTotal = ({ total }) => {
  return (
    <View style={styles.botaoTotal}>
      <Text style={styles.botaoTotalNumero}>Total: R${total}</Text>
    </View>
  );
};

const Item = ({ valor, nome, quantidade, precoUnidade, index }) => {
  const isPar = index % 2 === 0;

  return (
    <View
      style={[
        styles.linhaContainer,
        { backgroundColor: isPar ? "#C8C8C8" : "#E8E8E8" },
      ]}
    >
      <View style={[styles.celulaContainer, styles.colNome]}>
        <Text style={styles.linhaCelula}>{nome}</Text>
      </View>
      <View style={[styles.celulaContainer, styles.colPreco]}>
        <Text style={styles.linhaCelula}>{precoUnidade}</Text>
      </View>
      <View style={[styles.celulaContainer, styles.colQtd]}>
        <Text style={styles.linhaCelula}>{quantidade}</Text>
      </View>
      <View
        style={[
          styles.celulaContainer,
          styles.colValor,
          styles.semBordaDireita,
        ]}
      >
        <Text style={styles.textoCelula}>{valor}</Text>
      </View>
    </View>
  );
};

const TabelaHeader = () => {
  return (
    <View style={styles.tabelaHeaderContainer}>
      <View style={[styles.celulaHeaderContainer, styles.colNome]}>
        <Text style={styles.textoHeader}>Nome</Text>
      </View>
      <View style={[styles.celulaHeaderContainer, styles.colPreco]}>
        <Text style={styles.textoHeader}>R$/Unidade</Text>
      </View>
      <View style={[styles.celulaHeaderContainer, styles.colQtd]}>
        <Text style={styles.textoHeader}>Qtd</Text>
      </View>
      <View
        style={[
          styles.celulaHeaderContainer,
          styles.colValor,
          styles.semBordaDireita,
        ]}
      >
        <Text style={styles.textoHeader}>Valor</Text>
      </View>
    </View>
  );
};

const Filtro = ({ comandaAtual, setComandaAtual, comandasDisponiveis }) => {
  const [aberto, setAberto] = useState(false);

  const handleSelecionar = (nome) => {
    setComandaAtual(nome);
    setAberto(false);
  };

  return (
    <View style={styles.filtroWrapper}>
      <Pressable
        style={styles.expandirFiltro}
        onPress={() => setAberto(!aberto)}
      >
        <Text style={styles.textoFiltro}>{comandaAtual}</Text>
        <Ionicons
          name={aberto ? "chevron-up" : "chevron-down"}
          size={20}
          color="#000000"
        />
      </Pressable>

      {aberto && (
        <View style={styles.dropdownList}>
          {comandasDisponiveis.map((nome) => (
            <Pressable
              key={nome}
              style={styles.dropdownItem}
              onPress={() => handleSelecionar(nome)}
            >
              <Text
                style={[
                  styles.textoFiltro,
                  nome === comandaAtual && styles.textoFiltroAtivo,
                ]}
              >
                {nome}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

function TabelaComanda() {
  const [pedidosFeitos, setPedidosFeitos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comandaAtual, setComandaAtual] = useState("Todos");

  // Busca as comandas no backend e achata o array de pedidos para preencher a tabela
  const carregarComandas = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/comandas`,
      );
      if (!response.ok) throw new Error("Falha ao buscar comandas");

      const dados = await response.json();

      // Transforma cada item de pedido da comanda em uma linha plana para a FlatList
      const pedidosAchatados = [];
      dados.forEach((comandaDoc) => {
        comandaDoc.pedidos.forEach((ped, index) => {
          pedidosAchatados.push({
            id: `${comandaDoc._id}-${index}`,
            nomePrato: ped.nomePrato,
            precoUnidade: ped.precoUnidade,
            quantidade: ped.quantidade,
            comanda: `${comandaDoc.nomeCliente} (Mesa ${comandaDoc.numeroMesa})`,
          });
        });
      });

      setPedidosFeitos(pedidosAchatados);
    } catch (error) {
      console.error("Erro ao carregar comanda:", error);
    } finally {
      setLoading(false);
    }
  };

  // Atualiza os dados sempre que a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      carregarComandas();
    }, []),
  );

  const comandasDisponiveis = [
    "Todos",
    ...new Set(pedidosFeitos.map((item) => item.comanda)),
  ];

  const pedidosFiltrados =
    comandaAtual === "Todos"
      ? pedidosFeitos
      : pedidosFeitos.filter((pedido) => pedido.comanda === comandaAtual);

  const calcularTotal = () => {
    const soma = pedidosFiltrados.reduce((acc, pedido) => {
      return acc + pedido.precoUnidade * pedido.quantidade;
    }, 0);
    return soma.toFixed(2).replace(".", ",");
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#E5734B" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.tituloComandaPage}>Comanda</Text>
      <Filtro
        comandaAtual={comandaAtual}
        setComandaAtual={setComandaAtual}
        comandasDisponiveis={comandasDisponiveis}
      />
      <FlatList
        data={pedidosFiltrados}
        renderItem={({ item, index }) => {
          const valorLinha = (item.precoUnidade * item.quantidade)
            .toFixed(2)
            .replace(".", ",");
          const precoUnitarioFormatado = item.precoUnidade
            .toFixed(2)
            .replace(".", ",");
          return (
            <Item
              nome={item.nomePrato}
              precoUnidade={`R$${precoUnitarioFormatado}`}
              quantidade={item.quantidade}
              valor={`R$${valorLinha}`}
              index={index}
            />
          );
        }}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<TabelaHeader />}
        style={styles.listaContainer}
        contentContainerStyle={styles.listaPadding}
        onRefresh={carregarComandas}
        refreshing={loading}
      />
      <ValorTotal total={calcularTotal()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  tituloComandaPage: {
    fontSize: 30,
    fontWeight: "900",
    color: "#000000",
    marginBottom: 16,
  },
  filtroContainer: {
    marginBottom: 16,
    alignItems: "flex-start",
  },
  filtroWrapper: {
    marginBottom: 16,
    alignItems: "flex-start",
    zIndex: 10,
    elevation: 10,
  },
  expandirFiltro: {
    flexDirection: "row",
    backgroundColor: "#D3D3D3",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: "center",
    gap: 8,
  },
  textoFiltro: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  textoFiltroAtivo: {
    color: "#E5734B",
  },
  dropdownList: {
    position: "absolute",
    top: 42,
    left: 0,
    backgroundColor: "#FFFFFF",
    minWidth: 150,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  listaContainer: {
    flex: 1,
  },
  listaPadding: {
    paddingBottom: 100,
  },
  tabelaHeaderContainer: {
    flexDirection: "row",
    backgroundColor: "#E5734B",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  celulaHeaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRightWidth: 1,
    borderColor: "#A0522D",
  },
  textoHeader: {
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  linhaContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#999999",
  },
  celulaContainer: {
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRightWidth: 1,
    borderColor: "#999999",
  },
  linhaCelula: {
    fontSize: 13,
    color: "#000000",
    textAlign: "center",
  },
  textoCelula: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
  },
  colNome: {
    flex: 1.6,
  },
  colPreco: {
    flex: 1.4,
  },
  colQtd: {
    flex: 0.6,
  },
  colValor: {
    flex: 1,
  },
  semBordaDireita: {
    borderRightWidth: 0,
  },
  botaoTotal: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#A66A4B",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoTotalNumero: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
});

export default TabelaComanda;
