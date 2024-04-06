FROM node:18.19-alpine
#RUN apt-get update && \
#    apt-get install -y curl gnupg && \
#    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
#    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
#    apt-get update && \
#    apt-get install -y nodejs yarn
LABEL authors="ConCongSan"
WORKDIR /nestjs/social
COPY package.json ./
RUN npm install
RUN npm install -g @babel/core @babel/cli
COPY . .
RUN npm run build source
EXPOSE 3000
CMD ["npm", "build"]