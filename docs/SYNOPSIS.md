# Build Docker Image

docker build -t superset-synopsis:0.0.5 .
docker tag superset-synopsis:0.0.5 tilleryj/superset-synopsis:0.0.5
docker push tilleryj/superset-synopsis:0.0.5
