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
        return [...prev, { id: prato._id, valor: prato.preco }];
      }
    });
  };

  const limparComanda= () => {
    setItensSelecionados([]);
  }

  return(
    <ComandaContext.Provider value={{itensSelecionados, toggleItem, limparComanda}}>
        {children}
    </ComandaContext.Provider>
  )
};

export const useComanda = () => useContext(ComandaContext);