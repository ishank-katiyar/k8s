# eval "echo \"$(sed 's/\$/##/g; s/\##{/${/g;' /etc/nginx/nginx.conf)\"" | sed 's/\##/$/g' > /etc/nginx/nginx.conf_new
cat /etc/nginx/nginx.conf
# eval "echo \"$(sed 's/\$/##/g; s/\##{/${/g;' /etc/nginx/nginx.conf)\"" | sed 's/\##/$/g' > /etc/nginx/nginx.conf
# cp /etc/nginx/nginx.conf_new /etc/nginx/nginx.conf
# rm /etc/nginx/nginx.conf_new
sed -i "s/backend-ip/${BACKEND_SERVICE_SERVICE_HOST}/g" /etc/nginx/nginx.conf
sed -i "s/backend-port/${BACKEND_SERVICE_SERVICE_PORT}/g" /etc/nginx/nginx.conf
echo "NEW NGINX CONF..."
cat /etc/nginx/nginx.conf
nginx -g 'daemon off;'