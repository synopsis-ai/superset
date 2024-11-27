# Build Docker Image

docker build -t superset-golden-domain:0.0.4 .
docker tag superset-golden-domain:0.0.4 tilleryj/superset-golden-domain:0.0.4
docker push tilleryj/superset-golden-domain:0.0.4
