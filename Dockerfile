#FROM nginx:1.15
#COPY /dist/front /usr/share/nginx/html
#COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
#EXPOSE 80
# Stage 2 - Deploy with NGNIX
FROM nginx:1.15
COPY  /dist/multikart /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
