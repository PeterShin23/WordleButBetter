import { useContext } from "react";
import { WordContext } from "../contexts/word-context";

const useWordContext = () => useContext(WordContext);

export default useWordContext;