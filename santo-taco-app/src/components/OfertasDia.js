import { useState } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";

function OfertasDia() {
  const [pratosDia, setPratosDia] = useState([
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
  ]);

  //Os dados virão da API posteriormente.

  const Item = ({ nome, imagem }) => (
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

  return (
    <View style={styles.container}>
      <Text style={styles.tituloOfertas}>Ofertas do Dia</Text>
      <FlatList
        data={pratosDia}
        renderItem={({ item }) => <Item nome={item.name} imagem={item.image} />}
        numColumns={2}
        keyExtractor={(item) => item.id}
        style={styles.lista}
        columnWrapperStyle={styles.linhaLista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 100,
    marginHorizontal: "auto",
    margin: 20,
  },
  tituloOfertas: {
    fontFamily: "Roboto",
    fontSize: 30,
    fontWeight: "900",
  },
  lista: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
  },
  linhaLista: {
    gap: 40,
  },
  ItemContainer: {
    flex: 2,
    maxWidth: "50%",
    paddingBottom: 20,
  },
  ItemImage: {
    width: 150,
    height: 150,
    backgroundColor: "#e0e0e0",
  },
  ItemNome: {
    maxWidth: 150,
    alignItems: 'center',
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "450",
  },
});

export default OfertasDia;
