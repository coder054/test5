FROM node:12

ARG FIREBASE_CLIENT

ENV PORT 3000

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN echo "$FIREBASE_CLIENT" >> /usr/src/app/.env.local
RUN echo "$FIREBASE_SERVER" >> /usr/src/app/.env.local

# Installing dependencies
COPY package*.json /usr/src/app/
RUN npm install

# Copying source files
COPY . /usr/src/app

# Building app
RUN npm run build
EXPOSE 3000

# Running the app
CMD "npm" "run" "start"