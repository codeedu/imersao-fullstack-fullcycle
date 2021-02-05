// @flow
import classes from "./PixRegister.module.scss";
import { GetServerSideProps, NextPage } from "next";
import * as React from "react";
import Card from "../../../../components/Card";
import Input from "../../../../components/Input";
import Layout from "../../../../components/Layout";
import PixKeyCard from "../../../../components/PixKeyCard";
import Title from "../../../../components/Title";
import { BankAccount, PixKey } from "../../../../model";
import { bankHttp } from "../../../../util/http";
import FormButtonActions from "../../../../components/FormButtonActions";
import Button from "../../../../components/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Modal from "../../../../util/modal";

interface PixRegisterProps {
  pixKeys: PixKey[];
  bankAccount: BankAccount;
}

const PixRegister: NextPage<PixRegisterProps> = (props) => {
  const { pixKeys, bankAccount } = props;
  const {
    query: { id },
    push
  } = useRouter();

  const { register, handleSubmit } = useForm();

  async function onSubmit(data) {
    try{
      await bankHttp.post(`bank-accounts/${id}/pix-keys`, data);
      Modal.fire({
        title: 'Chave cadastrada com sucesso',
        icon: 'success'
      });
      push(`/bank-accounts/${id}`);
    }catch(e){
      console.error(e);
      Modal.fire({
        title: 'Ocorreu um erro. Verifique o console',
        icon: 'error'
      });
    }
  }

  return (
    <Layout bankAccount={bankAccount}>
      <div className="row">
        <div className="col-sm-6">
          <Title>Cadastrar chave Pix</Title>
          <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className={classes.kindInfo}>Escolha um tipo de chave</p>
              <Input
                name="kind"
                type="radio"
                labelText="CPF"
                value="cpf"
                ref={register}
              />
              <Input
                name="kind"
                type="radio"
                labelText="E-mail"
                value="email"
                ref={register}
              />
              <Input name="key" labelText="Digite a chave" ref={register} />
              <FormButtonActions>
                <Button type="submit">Cadastrar</Button>
                <Link href="/bank-accounts/[id]" as={`/bank-accounts/${id}`}>
                  <Button type="button" variant="info">
                    Voltar
                  </Button>
                </Link>
              </FormButtonActions>
            </form>
          </Card>
        </div>
        <div className="col-sm-4 offset-md-2">
          <Title>Minhas chaves pix</Title>
          {pixKeys.map((p, key) => (
            <PixKeyCard key={key} pixKey={p} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PixRegister;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {
    query: { id },
  } = ctx;
  const [{ data: pixKeys }, {data: bankAccount}] = await Promise.all([
    await bankHttp.get(`bank-accounts/${id}/pix-keys`),
    await bankHttp.get(`bank-accounts/${id}`),
  ])

  return {
    props: {
      pixKeys,
      bankAccount
    },
  };
};
