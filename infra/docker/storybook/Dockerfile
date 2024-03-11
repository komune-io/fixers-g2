#### Stage 1: Build the react application
FROM node:18.19.1-alpine3.19 as build

WORKDIR /app

COPY . ./

# Install Alpine Dependencies
RUN apk update && apk upgrade && \
    apk add --no-cache python3 make g++

RUN yarn install --frozen-lockfile
RUN make package-libs
ENV PATH /app/node_modules/.bin:$PATH

RUN yarn build-storybook

FROM nginx:1.25.4-alpine

COPY --from=build /app/storybook-static /var/www
COPY infra/docker/storybook/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]
