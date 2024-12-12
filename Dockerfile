# Use uma imagem base oficial do Node.js
FROM node:18-alpine

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o package.json e o package-lock.json para o container
COPY package*.json ./

# Instale as dependências com cache para otimizar o tempo
RUN npm install --production --prefer-offline

# Copie o restante dos arquivos do projeto
COPY . .

# Exponha a porta em que o servidor estará rodando
EXPOSE 3000

# Defina variáveis de ambiente padrão (pode ser sobrescrita pelo Railway)
ENV NODE_ENV=production

# Comando para iniciar a aplicação
CMD ["npm", "start"]
