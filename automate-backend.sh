docker build -t express-backend ./backend/.

typeset -i tagnumber=$(cat ./backend/tagname)

# echo $tagnumber

#increasing no by 1
previoustag=$tagnumber
tagnumber=$tagnumber+1

# echo $tagnumber

docker tag express-backend ishank162/backend:v${tagnumber}

docker push ishank162/backend:v${tagnumber}

echo $tagnumber > ./backend/tagname

sed -i "s/backend:v${previoustag}/backend:v${tagnumber}/g" deployment.yaml && kubectl apply -f deployment.yaml 