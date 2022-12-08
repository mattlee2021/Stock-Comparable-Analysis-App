FROM node:16.15.0
WORKDIR /stock_comps_analysis
COPY package*.json ./
RUN npm install
COPY . /stock_comps_analysis
CMD [ "node", "src/api/index.js" ]




