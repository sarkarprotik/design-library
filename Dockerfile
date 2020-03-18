FROM node:12.13.0-alpine AS base
WORKDIR /app
RUN yarn global add gulp
COPY package.json yarn.lock ./

FROM base AS dependencies
RUN yarn install --production && yarn cache clean
RUN cp -R node_modules app_node_modules
RUN yarn install && yarn cache clean

FROM dependencies AS setup
COPY . .
RUN gulp build
RUN cp -R build app_build
# RUN cp -R dist app_dist

FROM base AS release
COPY --from=dependencies /app/app_node_modules ./node_modules
COPY --from=setup /app/app_build ./build
# COPY --from=setup /app/app_dist ./dist
COPY . .

CMD ["node", "app.js"]
