import { ComandaContext } from "../contexts/ComandaContext";
import { useContext } from "react";

const useComanda = () => useContext(ComandaContext);

export default useComanda;
