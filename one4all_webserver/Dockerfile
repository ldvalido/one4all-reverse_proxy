FROM node:19-alpine3.16

# WORKDIR /app
# COPY package*.json ./
# RUN npm install

#COPY . .
WORKDIR /app
EXPOSE 3000
RUN mkdir /app/node_modules && ln -s /deps /app/node_modules
CMD [ "npm", "run", "dev" ]

