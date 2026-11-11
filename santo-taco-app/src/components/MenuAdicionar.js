import Ionicons from "@react-native-vector-icons/ionicons";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import { useComanda } from "../contexts/ComandaContext";

const Item = ({ item, aoMudarQuantidade }) => {
  const Contador = () => (
    <View style={styles.contadorContainer}>
      <Pressable
        style={styles.botaoDiminuirContador}
        onPress={() => aoMudarQuantidade(item.id, "diminuir")}
      >
        <Ionicons name="arrow-back" size={18} color="#111111" />
      </Pressable>
      <Text style={styles.textoQuantidade}>{item.quantidade}</Text>
      <Pressable
        style={styles.botaoAumentarContador}
        onPress={() => aoMudarQuantidade(item.id, "aumentar")}
      >
        <Ionicons name="arrow-forward" size={18} color="#111111" />
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

export default function MenuAdicionar() {
  const { itensSelecionados, limparComanda, atualizarQuantidade } = useComanda();
  const [numeroMesa, setNumeroMesa] = useState("");
  const [nomeCliente, setNomeCliente] = useState("");
  const [enviando, setEnviando] = useState(false);

  const valorTotal = itensSelecionados.reduce(
    (acc, item) => acc + item.valor * item.quantidade,
    0
  );

  const enviarComanda = async () => {
    if (itensSelecionados.length === 0) {
      return Alert.alert("Aviso", "Selecione pelo menos um prato antes de enviar.");
    }
    if (!numeroMesa.trim() || !nomeCliente.trim()) {
      return Alert.alert("Aviso", "Preencha o Número da Mesa e o Nome do Cliente.");
    }

    setEnviando(true);

    const pedidosFormatados = itensSelecionados.map((item) => ({
      pratoId: item.id,
      nomePrato: item.nome,
      precoUnidade: item.valor,
      quantidade: item.quantidade,
    }));

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/comandas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          numeroMesa: Number(numeroMesa),
          nomeCliente: nomeCliente,
          pedidos: pedidosFormatados,
        }),
      });

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

      <View style={styles.cardIdentificacao}>
        <View style={styles.inputGroupMesa}>
          <Text style={styles.labelInput}>Mesa</Text>
          <TextInput
            style={styles.input}
            placeholder="Nº"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={numeroMesa}
            onChangeText={setNumeroMesa}
          />
        </View>

        <View style={styles.inputGroupCliente}>
          <Text style={styles.labelInput}>Nome do Cliente</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: João Silva"
            placeholderTextColor="#999"
            value={nomeCliente}
            onChangeText={setNomeCliente}
          />
        </View>
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
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum item selecionado.</Text>
          </View>
        }
      />

      <View style={styles.rodapeArea}>
        <View style={styles.linhaTotal}>
          <Text style={styles.rotuloTotal}>Total:</Text>
          <Text style={styles.valorTotal}>
            R$ {valorTotal.toFixed(2).replace(".", ",")}
          </Text>
        </View>

        <Pressable
          style={[styles.botaoFlutuante, enviando && styles.botaoDesabilitado]}
          onPress={enviarComanda}
          disabled={enviando}
        >
          {enviando ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.textoBotaoEnviar}>Mandar para a cozinha!</Text>
          )}
        </Pressable>

        <View style={styles.barraMesa}>
          <Text style={styles.textoBarraMesa}>
            MESA N° {numeroMesa.trim() ? numeroMesa : "#"}
          </Text>
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
  tituloAdicionarPage: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#222222",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  cardIdentificacao: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  inputGroupMesa: {
    flex: 1,
  },
  inputGroupCliente: {
    flex: 2.5,
  },
  labelInput: {
    fontSize: 13,
    fontWeight: "600",
    color: "#444444",
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: "#222222",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  listaContainer: {
    flex: 1,
  },
  listaPadding: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  pedidoUnico: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  itemImage: {
    width: 110,
    height: 80,
    borderRadius: 12,
  },
  nomeContadorContainer: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "space-between",
  },
  nomePedido: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222222",
    marginBottom: 8,
  },
  contadorContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: "#F4F4F4",
    borderRadius: 8,
    padding: 4,
    gap: 12,
  },
  botaoDiminuirContador: {
    padding: 4,
  },
  botaoAumentarContador: {
    padding: 4,
  },
  textoQuantidade: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#111111",
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 15,
    color: "#888888",
  },
  rodapeArea: {
    backgroundColor: "#F2F2F2",
    paddingTop: 8,
  },
  linhaTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  rotuloTotal: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  valorTotal: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#DE7952",
  },
  botaoFlutuante: {
    backgroundColor: "#48B052",
    marginHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  botaoDesabilitado: {
    opacity: 0.7,
  },
  textoBotaoEnviar: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },
  barraMesa: {
    backgroundColor: "#DE7952",
    paddingVertical: 10,
    alignItems: "center",
  },
  textoBarraMesa: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 1,
  },
});