FROM nginx:1.19.9-alpine
# COPY --from=build /usr/scr/app/build /usr/share/nginx/html

# curl install
RUN apk --no-cache add curl
RUN apk --no-cache add vim
# RUN apk --no-cache add echo

# RUN /bin/sh -c "chmod +x docker-entrypoint.sh"

# ENV BACKEND_SERVICE_SERVICE_HOST=10.106.193.78
# ENV BACKEND_SERVICE_SERVICE_PORT=8080

# RUN echo $BACKEND_SERVICE_SERVICE_HOST

RUN rm /etc/nginx/nginx.conf

COPY nginx/nginx.conf /etc/nginx/

COPY nginx/run-nginx.sh /

RUN chmod +x /run-nginx.sh

# RUN eval "echo \"$(sed 's/\$/##/g; s/\##{/${/g;' /etc/nginx/nginx.conf)\"" | sed 's/\##/$/g' > /etc/nginx/nginx.conf_new

# RUN cp /etc/nginx/nginx.conf_new /etc/nginx/nginx.conf

# RUN rm /etc/nginx/nginx.conf_new

# COPY nginx/nginx.conf /etc/nginx/template/default.conf.template
# COPY nginx /etc/nginx/

# CMD ["/bin/sh", "-c", "cat /etc/nginx/nginx.conf"]

# RUN /bin/sh -c "envsubst < /etc/nginx/nginx.conf 2>&1 | tee /etc/nginx/nginx.conf"

# CMD ["/bin/sh", "-c", "cat /etc/nginx/nginx.conf && envsubst < /etc/nginx/nginx.conf"]
# CMD ["/bin/sh", "-c", "envsubst '${BACKEND_SERVICE_SERVICE_HOST} ${BACKEND_SERVICE_SERVICE_PORT}' < /etc/nginx/nginx.conf"]
# CMD ["/bin/sh", "-c", "envsubst '${BACKEND_SERVICE_SERVICE_HOST} ${BACKEND_SERVICE_SERVICE_PORT}' < /etc/nginx/nginx.conf 2>&1 | tee /etc/nginx/nginx.conf"]
# CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.conf 2>&1 | tee /etc/nginx/nginx.conf"]
# CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.conf |& tee /etc/nginx/nginx.conf"]
# CMD ["/bin/sh", "-c", "cat /etc/nginx/nginx.conf && cat /etc/nginx/conf.d/default.conf"]
# CMD ["/bin/sh", "-c", "cat /etc/nginx/conf.d/default.conf"]
# CMD ["/bin/sh", "-c", "cat /etc/nginx/template/default.conf.template"]

# RUN echo -e "asdf\nasdf" | cat >> /etc/nginx/nginx.conf

# # RUN cat /etc/nginx/nginx.conf
# # ENTRYPOINT [ "echo hello && cat /etc/nginx/nginx.conf" ] 
# # ENTRYPOINT [ echo ok ] 
# # ENTRYPOINT [ printenv ] 
# # ENTRYPOINT [ "/bin/sh -c printenv" ] 

# # CMD ["/bin/sh", "-c", "cat /etc/nginx/nginx.conf && ", "nginx", "-g", "daemon off;"]
# CMD ["/bin/sh", "-c", "cat /etc/nginx/nginx.conf && nginx -g 'daemon off;'"]
# CMD ["nginx", "-g", "daemon off;"]
# CMD ["eval \"echo \"$(sed 's/\$/##/g; s/\##{/${/g;' /etc/nginx/nginx.conf)\"\" | sed 's/\##/$/g' > /etc/nginx/nginx.conf_new && cp /etc/nginx/nginx.conf_new /etc/nginx/nginx.conf && rm /etc/nginx/nginx.conf_new && nginx -g 'daemon off;'"]
# RUN eval "echo \"$(sed 's/\$/##/g; s/\##{/${/g;' /etc/nginx/nginx.conf)\"" | sed 's/\##/$/g' > /etc/nginx/nginx.conf_new
# CMD ["eval 'echo '$(sed 's/\$/##/g; s/\##{/${/g;' /etc/nginx/nginx.conf)'' | sed 's/\##/$/g' > /etc/nginx/nginx.conf_new"]
CMD [ "./run-nginx.sh" ]