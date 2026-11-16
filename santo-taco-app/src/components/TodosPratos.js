import { FlatList, View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { Image } from "expo-image";
import OfertasDia from "./OfertasDia";

function TodosPratos() {
  const [categorias, setCategorias] = useState([
    {
      categoriaId: "1",
      categoriaName: "Tacos de carne",
      pratos: [
        {
          id: "1",
          name: "Prato #1",
          image:
            "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?q=80&w=1494&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        },
        {
          id: "2",
          name: "Prato #2",
          image:
            "https://plus.unsplash.com/premium_photo-1678051141689-1f7a7861b3b4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        },
        {
          id: "3",
          name: "Prato nome bem grande #3",
          image:
            "https://plus.unsplash.com/premium_photo-1664476631037-87a2714dd04e?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        },
        {
          id: "4",
          name: "Prato nome bem grande #3",
          image:
            "https://plus.unsplash.com/premium_photo-1661776649804-6bfa4fc14d09?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        },
      ],
    },
    {
      categoriaId: "2",
      categoriaName: "Tacos apimentados",
      pratos: [
        {
          id: "10",
          name: "Prato C #1",
          image:
            "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?q=80&w=1494&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        },
        {
          id: "20",
          name: "Prato C #2",
          image:
            "https://plus.unsplash.com/premium_photo-1678051141689-1f7a7861b3b4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        },
        {
          id: "30",
          name: "Prato C nome bem grande #3",
          image:
            "https://plus.unsplash.com/premium_photo-1664476631037-87a2714dd04e?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        },
        {
          id: "40",
          name: "Prato C nome bem grande #3",
          image:
            "https://plus.unsplash.com/premium_photo-1661776649804-6bfa4fc14d09?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        },
      ],
    },
  ]);

  const Elemento = ({ nome, imagem }) => (
    <View style={styles.ItemContainer}>
      <Image
        source={{ uri: imagem }}
        contentFit="cover"
        transition={300}
        style={styles.ItemImage}
      />

      <Text style={styles.ItemNome}>{nome}</Text>
    </View>
  );

  const Item = ({ nomeCategoria, pratos }) => (
    <View>
      <Text style={styles.tituloCategoria}>{nomeCategoria}</Text>
      <FlatList
        data={pratos}
        renderItem={({ item }) => (
          <Elemento nome={item.name} imagem={item.image} />
        )}
        keyExtractor={(pratos) => pratos.id}
        numColumns={2}
        columnWrapperStyle={styles.linhaLista}
        scrollEnabled={false}
        style={styles.lista}
      />
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={categorias}
        renderItem={({ item }) => (
          <Item nomeCategoria={item.categoriaName} pratos={item.pratos} />
        )}
        ListHeaderComponent={<OfertasDia />}
        keyExtractor={(item) => item.categoriaId}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  categoriaCotainer: {
    marginBottom: 30,
  },
  tituloCategoria: {
    fontFamily: "Roboto",
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 10,
  },
  lista: {
    flexGrow: 0,
    marginTop: 10,
  },
  linhaLista: {
    gap: 24,
    justifyContent: "space-between",
  },
  ItemContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  ItemImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 24,
    backgroundColor: "#e0e0e0",
  },
  ItemNome: {
    maxWidth: "100%",
    marginTop: 10,
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "700",
    color: "#4A4A"
  },
});

export default TodosPratos;
