import { Tabs } from "expo-router";
import { View, Button } from "react-native";
import { useState } from "react";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { BottomTabBar } from "expo-router/build/layouts/TabsClient.js";

const tabBar =
  (name) =>
  ({ color, size }) => {
    return <Ionicons name={name} color={color} size={size} />;
  };

function BottomTabsLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{ tabBarActiveTintColor: "#F5B041", headerShown: false }}
        tabBar={(props) => (
          <View>
            <Button title="Mesa n°#" color="#F5B041" />
            <BottomTabBar {...props} />
          </View>
        )}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Início",
            tabBarLabel: "inicio",
            tabBarIcon: tabBar("home"),
          }}
        />
        <Tabs.Screen
          name="comanda"
          options={{
            title: "Comanda",
            tabBarLabel: "comanda",
            tabBarIcon: tabBar("newspaper"),
          }}
        />
        <Tabs.Screen
          name="adicionar"
          options={{
            title: "Adicionar",
            tabBarLabel: "adicionar",
            tabBarIcon: tabBar("add"),
          }}
        />
        <Tabs.Screen
          name="categorias"
          options={{
            title: "Categorias",
            tabBarLabel: "cagetorias",
            tabBarIcon: tabBar("grid"),
          }}
        />
        <Tabs.Screen
          name="pagamento"
          options={{
            title: "Pagamento",
            tabBarLabel: "pagamento",
            tabBarIcon: tabBar("wallet"),
          }}
        />
      </Tabs>
    </View>
  );
}

export default BottomTabsLayout;
