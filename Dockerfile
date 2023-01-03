FROM node:14-alpine
WORKDIR /home/meshhouse/frontend

# run application
ENV NPM_CONFIG_LOGLEVEL verbose
CMD ["sh", "-c", "npm install && npm run dev"]
