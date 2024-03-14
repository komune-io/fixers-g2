FROM node:21.7-alpine3.19 as build

WORKDIR /app

COPY . ./

ENV PATH /app/node_modules/.bin:$PATH

RUN if [ ! -d "./storybook-static" ]; then \
      apk update && apk upgrade && \
      apk add --no-cache make && \
      make build-libs && \
      yarn build-storybook; \
    fi


FROM nginx:1.25.4-alpine

LABEL org.opencontainers.image.source = "https://github.com/komune-io/fixers-g2"

COPY --from=build /app/storybook-static /var/www
COPY infra/docker/storybook/nginx.conf /etc/nginx/nginx.conf

RUN chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d

RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid
USER nginx

EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]
