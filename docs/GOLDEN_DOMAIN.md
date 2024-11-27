# Build Docker Image

docker build -t superset-golden-domain:0.0.2 .
docker tag superset-golden-domain:0.0.2 tilleryj/superset-golden-domain:0.0.2
docker push tilleryj/superset-golden-domain:0.0.2
