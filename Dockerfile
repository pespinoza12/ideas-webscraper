# Use uma imagem base oficial do Node.js
FROM node:18-alpine

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie os arquivos necessários para o container
COPY package*.json ./

# Instale as dependências
RUN npm install --production

# Copie o restante dos arquivos do projeto
COPY . .

# Exponha a porta em que o servidor estará rodando
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
