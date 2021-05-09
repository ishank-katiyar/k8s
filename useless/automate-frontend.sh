docker build -t ishank162/react-frontend ./frontend/tresster/.

# typeset -i tagnumber=$(cat ./frontend/tresster/tagname)

# echo $tagnumber

# #increasing no by 1
# previoustag=$tagnumber
# tagnumber=$tagnumber+1

# # echo $tagnumber

# docker tag react-frontend ishank162/frontend:v${tagnumber}

# echo $tagnumber > ./frontend/tresster/tagname

# docker push ishank162/frontend:v${tagnumber}
docker push ishank162/react-frontend:latest

# sed -i "s/frontend:v${previoustag}/frontend:v${tagnumber}/g" deployment.yaml && kubectl apply -f deployment.yaml