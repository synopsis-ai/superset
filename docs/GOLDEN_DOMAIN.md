# Build Docker Image

docker build -t superset-golden-domain:0.0.3 .
docker tag superset-golden-domain:0.0.3 tilleryj/superset-golden-domain:0.0.3
docker push tilleryj/superset-golden-domain:0.0.3
