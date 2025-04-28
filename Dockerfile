# Use a imagem oficial do Node.js como base
FROM node:20-slim

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o container
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação para o container
COPY . .

# Construa a aplicação Next.js
RUN npm run build

# Exponha a porta que o Next.js usará
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]