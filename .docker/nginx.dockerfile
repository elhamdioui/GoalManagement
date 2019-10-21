FROM nginx:alpine

LABEL author="Elmehdi Aitbrahim"

COPY ./.docker/nginx.conf /etc/nginx/nginx.conf

COPY ./SothemaGoalManagement-SPA/dist /usr/share/nginx/html

EXPOSE 80 443

ENTRYPOINT ["nginx", "-g", "daemon off;"]