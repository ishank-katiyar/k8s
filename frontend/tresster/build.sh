npm run build

echo "DELETING PREVIOUS BUILD..."
rm -rf /usr/share/nginx/html/build

echo "COPYING NEW BUILD"
cp -r build /usr/share/nginx/html/

BACKEND_SERVICE_SERVICE_HOST=${BACKEND_SERVICE_SERVICE_HOST:-localhost}
BACKEND_SERVICE_SERVICE_PORT=${BACKEND_SERVICE_SERVICE_PORT:-5000}

echo "COPYING NGINX CONF"
rm /etc/nginx/nginx.conf
envsubst < ./nginx/nginx/nginx.conf > aa
cp aa /etc/nginx/nginx.conf
rm aa

cat /etc/nginx/nginx.conf

echo "RELOADING NGINX"
nginx -s reload