import { createContext, useState, useContext } from "react";

export const ComandaContext = createContext();

export const ComandaProvider = ({ children }) => {
  const [itensSelecionados, setItensSelecionados] = useState([]);

  const toggleItem = (prato) => {
    setItensSelecionados((prev) => {
      const existe = prev.find((item) => item.id === prato._id);
      if (existe) {
        return prev.filter((item) => item.id !== prato._id);
      } else {
        return [
          ...prev,
          {
            id: prato._id,
            nome: prato.name || prato.nome,
            valor: prato.preco,
            quantidade: 1,
            imagem: prato.imagem || prato.image,
          },
        ];
      }
    });
  };

  const atualizarQuantidade = (id, tipo) => {
    setItensSelecionados((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const novaQtd =
              tipo === "aumentar" ? item.quantidade + 1 : item.quantidade - 1;
            return { ...item, quantidade: novaQtd };
          }
          return item;
        })
        .filter((item) => item.quantidade > 0),
    );
  };

  const limparComanda = () => {
    setItensSelecionados([]);
  };

  return (
    <ComandaContext.Provider
      value={{ itensSelecionados, toggleItem, limparComanda, atualizarQuantidade }}
    >
      {children}
    </ComandaContext.Provider>
  );
};

export const useComanda = () => useContext(ComandaContext);
