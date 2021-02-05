# Imersão Full Stack & FullCycle - CodePix

## Descrição

Repositório do front-end feito com Next.js (Front-end dos bancos)

**Importante**: A aplicação do Apache Kafka, Golang e Nest.js deve estar rodando primeiro.

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

### Banco BBX
```
## Levantar banco BBX
docker-compose -f docker-compose_bbx.yaml up -d

## Entrar no container do Next.js
docker-compose -f docker-compose_bbx.yaml exec app_bbx bash

## Rodar o Next.js
npm run dev
```

Acessar http://localhost:3001 para ver as contas bancárias e poder fazer as operações.

### Banco CTER
```
## Levantar banco CTER
docker-compose -f docker-compose_cter.yaml up -d

## Entrar no container do Next.js
docker-compose -f docker-compose_cter.yaml exec app_cter bash

## Rodar o Next.js
npm run dev
```

Acessar http://localhost:3002 para ver as contas bancárias e poder fazer as operações.

### Para Windows 

Lembrar de instalar o WSL2 e Docker. Vejo o vídeo: [https://www.youtube.com/watch?v=gCUPP4E8Msc](https://www.youtube.com/watch?v=gCUPP4E8Msc) 

Siga o guia rápido de instalação: [https://github.com/codeedu/wsl2-docker-quickstart](https://github.com/codeedu/wsl2-docker-quickstart) 
