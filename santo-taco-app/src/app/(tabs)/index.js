import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import TodosPratos from "../../components/TodosPratos";
import { useEffect, useState } from "react";
import PratoItem from "../../components/PratoItem";

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/pratos`;

const PaginaInicial = () => {
  const [ofertas, setOfertas] = useState([]);
  const [pratosAgrupados, setPratosAgrupados] = useState({});
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const [resOfertas, resTodos] = await Promise.all([
          fetch(`${API_URL}?ofertas=true`),
          fetch(API_URL),
        ]);

        const dadosOfertas = await resOfertas.json();
        const dadosTodos = await resTodos.json();

        setOfertas(dadosOfertas);

        const agrupados = dadosTodos.reduce((acc, prato) => {
          const nomeCategoria = prato.categoriaId.name;
          if (!acc[nomeCategoria]) acc[nomeCategoria] = [];
          acc[nomeCategoria].push(prato);
          return acc;
        }, {});

        setPratosAgrupados(agrupados);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      } finally {
        setCarregando(false);
      }
    };

    buscarDados();
  }, []);

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E5734B" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.paddingBottom}
    >
      {ofertas.length > 0 && (
        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>Ofertas do Dia</Text>
          {ofertas.map((prato) => (
            <PratoItem key={prato._id} prato={prato} />
          ))}
        </View>
      )}

      {Object.keys(pratosAgrupados).map((categoria) => (
        <View key={categoria} style={styles.secao}>
          <Text style={styles.tituloCategoria}>{categoria}</Text>
          {pratosAgrupados[categoria].map((prato) => (
            <PratoItem key={prato._id} prato={prato} />
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

function MenuScreen() {
  return (
    <View style={styles.MenuContainer}>
      <TodosPratos />
    </View>
  );
}

const styles = StyleSheet.create({
  MenuContainer: {
    flex: 1,
    marginHorizontal: 12,
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  paddingBottom: {
    padding: 20,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  secao: {
    marginBottom: 24,
  },
  tituloSecao: {
    fontFamily: "Roboto",
    fontSize: 22,
    fontWeight: "900",
    color: "#E5734B",
    marginBottom: 12,
  },
  tituloCategoria: {
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingBottom: 4,
    marginBottom: 12,
  },
});

export default PaginaInicial;
