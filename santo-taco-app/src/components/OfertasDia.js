import { useState } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";

function OfertasDia() {
  const [pratosDia, setPratosDia] = useState([
    {
      id: "1",
      name: "Taco apimentado",
      image:
        "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?q=80&w=1494&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    },
    {
      id: "2",
      name: "Taco de carne",
      image:
        "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?q=80&w=1494&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
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
      <Text>Ofertas do Dia</Text>
      <FlatList
        data={pratosDia}
        renderItem={({ item }) => (
          <Item nome={item.name} imagem={item.image} style={{ flex: 1 }} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  ItemContainer: {
    justifyContent: "center",
  },
  ItemImage: {
    width: 100,
    height: 100,
    backgroundColor: "#e0e0e0",
  },
  ItemNome: {
    fontFamily: "Roboto",
    fontSize: 15,
    fontWeight: "900"
  }
});

export default OfertasDia;
