import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useComanda } from "../contexts/ComandaContext";
import PratoItem from "../components/PratoItem";

export default function MenuInicial() {
  const { pratoId } = useLocalSearchParams();
  const { toggleItem, itensSelecionados } = useComanda();

  const [ofertas, setOfertas] = useState([]);
  const [pratosAgrupados, setPratosAgrupados] = useState({});
  const [loading, setLoading] = useState(true);

  const scrollViewRef = useRef(null);
  const itemPositions = useRef({});

  const carregarPratos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/pratos`);
      if (!response.ok) throw new Error("Falha ao carregar pratos");

      const pratos = await response.json();

      const listaOfertas = pratos.filter(
        (item) =>
          item.isOfertaDoDia === true ||
          item.isOferta === true ||
          item.oferta === true,
      );
      setOfertas(listaOfertas);

      const agrupamento = pratos.reduce((acc, prato) => {
        const cat = prato.categoria || "Geral";
        if (!acc[cat]) {
          acc[cat] = [];
        }
        acc[cat].push(prato);
        return acc;
      }, {});

      setPratosAgrupados(agrupamento);
    } catch (error) {
      console.error("Erro ao carregar pratos na home:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarPratos();
  }, []);

  const guardarPosicao = (id, event) => {
    const layout = event.nativeEvent.layout;
    itemPositions.current[id] = layout.y;
  };

  useEffect(() => {
    if (pratoId && itemPositions.current[pratoId] !== undefined) {
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          y: itemPositions.current[pratoId],
          animated: true,
        });
      }, 300);
    }
  }, [pratoId, pratosAgrupados, ofertas]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E5734B" />
      </View>
    );
  }

  return (
    <ScrollView
      ref={scrollViewRef}
      style={{ flex: 1 }}
      contentContainerStyle={styles.scrollPadding}
      showsVerticalScrollIndicator={false}
    >
      {ofertas.length > 0 && (
        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>Ofertas do Dia</Text>
          {ofertas.map((prato) => (
            <View
              key={prato._id}
              onLayout={(event) => guardarPosicao(prato._id, event)}
            >
              <PratoItem prato={prato} />
            </View>
          ))}
        </View>
      )}

      {Object.keys(pratosAgrupados).map((categoria) => (
        <View key={categoria} style={styles.secao}>
          <Text style={styles.tituloCategoria}>{categoria}</Text>
          {pratosAgrupados[categoria].map((prato) => (
            <View
              key={prato._id}
              onLayout={(event) => guardarPosicao(prato._id, event)}
            >
              <PratoItem prato={prato} />
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollPadding: {
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
  },
  secao: {
    marginBottom: 20,
  },
  tituloSecao: {
    fontFamily: "Roboto",
    fontSize: 30,
    fontWeight: "900",
  },
  tituloCategoria: {
    fontFamily: "Roboto",
    fontSize: 30,
    fontWeight: "900",
  },
});
