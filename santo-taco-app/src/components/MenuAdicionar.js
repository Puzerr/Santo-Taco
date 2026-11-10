import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useComanda } from "../contexts/ComandaContext";

const Item = ({ item, aoMudarQuantidade }) => {
  const Contador = () => (
    <View style={styles.contadorContainer}>
      <Pressable
        style={styles.botaoDiminuirContador}
        onPress={() => aoMudarQuantidade(item.id, "diminuir")}
      >
        <Ionicons name="arrow-back" size={24} color="#111111" />
      </Pressable>

      <Text style={styles.textoQuantidade}>{item.quantidade}</Text>

      <Pressable
        style={styles.botaoAumentarContador}
        onPress={() => aoMudarQuantidade(item.id, "aumentar")}
      >
        <Ionicons name="arrow-forward" size={24} color="#111111" />
      </Pressable>
    </View>
  );

  return (
    <View style={styles.pedidoUnico}>
      <Image
        source={{ uri: item.imagem }}
        contentFit="cover"
        transition={300}
        style={styles.itemImage}
      />
      <View style={styles.nomeContadorContainer}>
        <Text style={styles.nomePedido}>{item.nome}</Text>
        <Contador />
      </View>
    </View>
  );
};

export function MenuAdicionar() {
  const { itensSelecionados, limparComanda, atualizarQuantidade } =
    useComanda();

  const [numeroMesa, setNumeroMesa] = useState("");
  const [nomeCliente, setNomeCliente] = useState("");
  const [enviando, setEnviando] = useState(false);

  const valorTotal = itensSelecionados.reduce(
    (acc, item) => acc + item.valor * item.quantidade,
    0,
  );

  const enviarComanda = async () => {
    if (itensSelecionados.length === 0)
      return Alert.alert("Aviso", "Selecione pelo menos um prato.");
    if (!numeroMesa.trim() || !nomeCliente.trim())
      return Alert.alert("Aviso", "Preencha a Mesa e Cliente.");

    setEnviando(true);

    const pedidosFormatados = itensSelecionados.map((item) => ({
      pratoId: item.id,
      nomePrato: item.nome,
      precoUnidade: item.valor,
      quantidade: item.quantidade,
    }));

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/comandas`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            numeroMesa: Number(numeroMesa),
            nomeCliente: nomeCliente,
            pedidos: pedidosFormatados,
          }),
        },
      );

      if (!response.ok) throw new Error("Falha na requisição");

      Alert.alert("Sucesso!", "Comanda enviada para a cozinha!");
      limparComanda();
      setNumeroMesa("");
      setNomeCliente("");
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível enviar a comanda.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tituloAdicionarPage}>Seus Pedidos</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Número da Mesa"
          keyboardType="numeric"
          value={numeroMesa}
          onChangeText={setNumeroMesa}
        />
        <TextInput
          style={styles.input}
          placeholder="Nome do Cliente"
          value={nomeCliente}
          onChangeText={setNomeCliente}
        />
      </View>

      <FlatList
        data={itensSelecionados}
        renderItem={({ item }) => (
          <Item item={item} aoMudarQuantidade={atualizarQuantidade} />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.listaContainer}
        contentContainerStyle={styles.listaPadding}
      />

      <View style={styles.resumoTotal}>
        <Text style={styles.textoTotal}>
          Total: R$ {valorTotal.toFixed(2).replace(".", ",")}
        </Text>
      </View>

      <Pressable
        style={[styles.botaoFlutuante, enviando && { opacity: 0.7 }]}
        onPress={enviarComanda}
        disabled={enviando}
      >
        {enviando ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.textoBotaoEnviar}>Mandar para a cozinha!</Text>
        )}
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
