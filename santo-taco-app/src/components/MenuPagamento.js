import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { useState } from "react";

function MenuPagamento() {
  const [gastosComanda, setGastosComandas] = useState([
{
      id: "1",
      valor: 59.96,
      comanda: "Ricardo",
    },
    {
      id: "2",
      valor: 185.97,
      comanda: "Maria",
    },
    {
      id: "3",
      valor: 22.50,
      comanda: "João",
    },
    {
      id: "4",
      valor: 81.00,
      comanda: "Raphael",
    },
  ]);

  const [solicitado, setSolicitado] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const handleFecharConta = () => {
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      setSolicitado(true);
    }, 400);
  };

  const ItemLinha = ({ comanda, valor, index }) => {
    const isPar = index % 2 === 0;

    return (
      <View
        style={[
          styles.linha,
          { backgroundColor: isPar ? "#B8B8B8" : "#D9D9D9" },
        ]}
      >
        <Text style={styles.textoComanda}>{comanda}</Text>
        <Text style={styles.textoValor}>
          R${valor.toFixed(2).replace(".", ",")}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tituloPagamentoPage}>Pagamento</Text>
      <View style={styles.tabelaWrapper}>
        <FlatList
          data={gastosComanda}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <ItemLinha
              comanda={item.comanda}
              valor={item.valor}
              index={index}
            />
          )}
          scrollEnabled={false}
        />
        <Pressable
          style={styles.botaoFecharConta}
          onPress={handleFecharConta}
          disabled={carregando}
        >
          {carregando ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.textoBotaoFechar}>Fechar a conta</Text>
          )}
        </Pressable>
      </View>

      {solicitado && (
        <Text style={styles.mensagemSucesso}>
          O garçom já está indo até você
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  tituloPagamentoPage: {
    fontFamily: "Roboto",
    fontSize: 28,
    fontWeight: "900",
    color: "#000000",
    marginBottom: 20,
  },
  tabelaWrapper: {
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 16,
  },
  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  textoComanda: {
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  textoValor: {
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  botaoFecharConta: {
    backgroundColor: "#000000",
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  textoBotaoFechar: {
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  mensagemSucesso: {
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
    textAlign: "center",
    marginTop: 10,
  },
});

export default MenuPagamento;
