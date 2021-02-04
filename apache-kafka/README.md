# Imersão Full Stack & FullCycle - CodePix

## Descrição

Repositório do Apache Kafka (Mensageria)

**Importante**: Roda-lo antes de qualquer apliação

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
docker-compose up
```
***Importante***: Toda vez que para-lo de rodar, rode ```docker-compose down``` para destruir os volumes, senão ao rodar um UP novamente dará erro

### Para Windows 

Lembrar de instalar o WSL2 e Docker. Vejo o vídeo: [https://www.youtube.com/watch?v=gCUPP4E8Msc](https://www.youtube.com/watch?v=gCUPP4E8Msc) 

Siga o guia rápido de instalação: [https://github.com/codeedu/wsl2-docker-quickstart](https://github.com/codeedu/wsl2-docker-quickstart) 
