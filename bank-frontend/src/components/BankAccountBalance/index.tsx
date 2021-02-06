import { useContext } from "react";
import BankContext from "../../context/BankContext";
import classes from "./BankAccountBalance.module.scss";

interface BankAccountBalanceProps {
  balance: number;
}
export const BankAccountBalance: React.FunctionComponent<BankAccountBalanceProps> = (
  props
) => {
  const { balance } = props;
  const bank = useContext(BankContext);
  return (
    <div className={`${classes.root} ${classes[bank.cssCode]}`}>
      <h2>
        Saldo em conta Corrente{" "}
        <span>R$ {balance.toLocaleString("pt-BR")}</span>
      </h2>
    </div>
  );
};
