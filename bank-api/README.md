# Imersão Full Stack & FullCycle - CodePix

## Descrição

Repositório da API feita com Nest.js (API dos Bancos)

**Importante**: A aplicação do Apache Kafka e Golang deve estar rodando primeiro.

## Configurar /etc/hosts

A comunicação entre as aplicações se dá de forma direta através da rede da máquina.
Para isto é necessário configurar um endereços que todos os containers Docker consigam acessar.

Acrescente no seu /etc/hosts (para Windows o caminho é C:\Windows\system32\drivers\etc\hosts):
```
127.0.0.1 host.docker.internal
```
Em todos os sistemas operacionais é necessário abrir o programa para editar o *hosts* como Administrator da máquina ou root.

## Rodar a aplicação

Execute os comandos:
```
mkdir dist-bbx
mkdir dist-cter

## Rodar banco BBX
docker-compose -f docker-compose_bbx.yaml up

## Rodar banco CTER
docker-compose -f docker-compose_cter.yaml up
```

Espere os logs verdinhos do Nest para verificar se deu certo.

* Acessar http://localhost:8001/bank-accounts para listar as contas bancárias do banco BBX.
* Acessar http://localhost:8002/bank-accounts para listar as contas bancárias do banco CTER.

### Para Windows 

Lembrar de instalar o WSL2 e Docker. Vejo o vídeo: [https://www.youtube.com/watch?v=gCUPP4E8Msc](https://www.youtube.com/watch?v=gCUPP4E8Msc) 

Siga o guia rápido de instalação: [https://github.com/codeedu/wsl2-docker-quickstart](https://github.com/codeedu/wsl2-docker-quickstart) 
