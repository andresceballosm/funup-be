FROM node:16-alpine
COPY src/ /app/src
COPY *.ts /app/
COPY *.json /app/
COPY .env* /app/
WORKDIR /app
RUN ls -la
RUN npm install
RUN npm run build
ENTRYPOINT ["/usr/local/bin/npm", "run", "start"]