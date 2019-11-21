# stage: 1
FROM node:10 as build
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build
# stage: 2 — the production environment
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
