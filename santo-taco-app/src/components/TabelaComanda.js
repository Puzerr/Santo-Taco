import Ionicons from "@react-native-vector-icons/ionicons";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

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
  const [pedidosFeitos, setPedidosFeitos] = useState([
    {
      id: "1",
      nomePrato: "Taco com queijo",
      precoUnidade: 14.99,
      quantidade: 2,
      comanda: "Ricardo",
    },
    {
      id: "2",
      nomePrato: "Super taco tacoso",
      precoUnidade: 49.99,
      quantidade: 3,
      comanda: "Maria",
    },
    {
      id: "3",
      nomePrato: "Meu mock ta certinho em vai tomando",
      precoUnidade: 14.99,
      quantidade: 2,
      comanda: "Ricardo",
    },
    {
      id: "4",
      nomePrato: "Burrito Vegano",
      precoUnidade: 22.5,
      quantidade: 1,
      comanda: "João",
    },
    {
      id: "5",
      nomePrato: "Porção de Nachos",
      precoUnidade: 18.0,
      quantidade: 1,
      comanda: "Maria",
    },
    {
      id: "6",
      nomePrato: "Burrito Vegano",
      precoUnidade: 22.5,
      quantidade: 1,
      comanda: "Raphael",
    },
    {
      id: "7",
      nomePrato: "Porção de Nachos",
      precoUnidade: 18.0,
      quantidade: 1,
      comanda: "Raphael",
    },
    {
      id: "8",
      nomePrato: "Porção de Nachos",
      precoUnidade: 18.0,
      quantidade: 1,
      comanda: "Maria",
    },
    {
      id: "9",
      nomePrato: "Burrito Vegano",
      precoUnidade: 22.5,
      quantidade: 1,
      comanda: "Raphael",
    },
    {
      id: "10",
      nomePrato: "Porção de Nachos",
      precoUnidade: 18.0,
      quantidade: 1,
      comanda: "Raphael",
    },
  ]);

  const comandasDisponiveis = [
    "Todos",
    ...new Set(pedidosFeitos.map((item) => item.comanda)),
  ];

  const [comandaAtual, setComandaAtual] = useState(comandasDisponiveis[0]);

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
      />
      <ValorTotal total={calcularTotal()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tituloComandaPage: {
    fontFamily: "Roboto",
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
    fontFamily: "Roboto",
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
    fontFamily: "Roboto",
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
  textoCelula: {
    fontFamily: "Roboto",
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
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
});

export default TabelaComanda;
