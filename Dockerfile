# Use uma imagem Node.js com suporte a Puppeteer
FROM node:18-slim

# Instale dependências essenciais para Puppeteer
RUN apt-get update && apt-get install -y \
  ca-certificates \
  fonts-liberation \
  libappindicator3-1 \
  libasound2 \
  libatk1.0-0 \
  libatk-bridge2.0-0 \
  libcups2 \
  libdrm2 \
  libgbm1 \
  libglib2.0-0 \
  libgtk-3-0 \
  libnspr4 \
  libnss3 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  xdg-utils \
  wget \
  --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

# Instale as dependências do projeto
WORKDIR /app
COPY package*.json ./
RUN npm install

# Copie os arquivos do projeto
COPY . .

# Configuração para Puppeteer usar Chromium embutido
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=false \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Exponha a porta para o servidor
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]
