docker build -t nginx-m ./nginx/.

typeset -i tagnumber=$(cat ./nginx/tagname)

# echo $tagnumber

#increasing no by 1
previoustag=$tagnumber
tagnumber=$tagnumber+1

# echo $tagnumber

docker tag nginx-m ishank162/nginx-m:v${tagnumber}

docker push ishank162/nginx-m:v${tagnumber}

echo $tagnumber > ./nginx/tagname

sed -i "s/nginx-m:v${previoustag}/nginx-m:v${tagnumber}/g" deployment-nginx.yaml && kubectl apply -f deployment-nginx.yaml