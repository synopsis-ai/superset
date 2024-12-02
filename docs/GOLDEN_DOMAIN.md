# Build Docker Image

docker build -t superset-golden-domain:0.0.5 .
docker tag superset-golden-domain:0.0.5 tilleryj/superset-golden-domain:0.0.5
docker push tilleryj/superset-golden-domain:0.0.5
