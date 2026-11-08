import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useState, useEffect, useRef } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Animated,
} from "react-native";

function TodasCategorias() {
  const [categorias, setCategorias] = useState([
    {
      categoriaId: "1",
      categoriaName: "Tacos de carne",
      categoriaDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at ultrices massa. Aenean auctor eu ipsum a tincidunt. Mauris egestas elementum aliquet. Nulla facilisi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse vel dolor eget mi faucibus porta ut id tellus. Sed finibus sapien purus, id sollicitudin lectus congue sed. Nunc ut elit a nulla vestibulum commodo. Maecenas sed blandit libero, ac placerat erat. Praesent facilisis risus pulvinar vestibulum venenatis. Nam at nulla at ante vestibulum posuere. Etiam mattis a tortor nec ultrices. Praesent finibus erat sem, in pharetra nunc gravida ac. \n\n Vivamus tincidunt erat dolor, in posuere ex gravida quis. Nam ut est felis. Donec sollicitudin posuere tempus. Curabitur consectetur vitae ante vitae luctus. Cras enim nunc, viverra id pulvinar euismod, gravida ac ipsum. Vestibulum varius erat a purus rutrum commodo. Duis magna tellus, interdum in fermentum sed, volutpat blandit velit. Aliquam lorem mi, eleifend eu faucibus sed, commodo id nunc. Integer ullamcorper feugiat dolor. Suspendisse potenti.",
    },
    {
      categoriaId: "2",
      categoriaName: "Tacos apimentados",
      categoriaDescription: "Tacos deliciosos para os amanates de pimenta.",
    },
    {
      categoriaId: "3",
      categoriaName: "Tacos veganos",
      categoriaDescription: "Tacos livres de ingredientes de origem animal.",
    },
  ]);

  const Item = ({ nome, descricao }) => {
    const [expandido, setExpandido] = useState(false);

    const handleExpandirCard = () => {
      setExpandido(!expandido);
    };

    const animacaoGiro = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(animacaoGiro, {
        toValue: expandido ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, [expandido]);

    const rotacao = animacaoGiro.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "180deg"],
    });

    return (
      <View style={styles.categoriaCard}>
        <Pressable onPress={handleExpandirCard} style={styles.headerDropdown}>
          <Text style={styles.tituloCategoria}>{nome}</Text>
          <Animated.View style={{ transform: [{ rotate: rotacao }] }}>
            <Ionicons name="chevron-down" />
          </Animated.View>
        </Pressable>

        {expandido && (
          <View style={styles.conteudoSanfona}>
            <Text style={styles.divisor}>{descricao}</Text>
            <Pressable style={styles.botaoAcao}>
              <Text style={styles.textoBotao}>Ver pratos</Text>
            </Pressable>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tituloCategoriaPage}>Categorias</Text>
      <FlatList
        data={categorias}
        renderItem={({ item }) => (
          <Item
            nome={item.categoriaName}
            descricao={item.categoriaDescription}
          />
        )}
        keyExtractor={(item) => item.categoriaId}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listaPadding}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tituloCategoriaPage: {
    fontFamily: "Roboto",
    fontSize: 30,
    fontWeight: "900",
  },
  listaPadding: {
    padding: 20,
    paddingTop: 30,
  },
  container: {
    flex: 1,
  },
  categoriaCard: {
    marginBottom: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    elevation: 2,
  },
  headerDropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  tituloCategoria: {
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: "600",
    color: "#111111",
  },
  conteudoSanfona: {
    paddingHorizontal: 20,
    paddingBottom: 20,

  },
  divisor: {
    paddingVertical: 10,
    paddingLeft: 10,
    marginBottom: 16,
    borderRadius: 5,
    backgroundColor: "#E5E5E5",
  },
  descCategoria: {
    fontFamily: "Roboto",
    fontSize: 14,
    color: "#555555",
    lineHeight: 22,
    marginBottom: 20,
  },
  botaoAcao: {
    backgroundColor: "#E58354",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  textoBotao: {
    color: "#FFFFFF",
    fontFamily: "Roboto",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default TodasCategorias;
