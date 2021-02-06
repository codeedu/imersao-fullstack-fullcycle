import { createContext } from "react";

const BankContext = createContext<{ name: string; code: string; cssCode: string }>(null);

export default BankContext;