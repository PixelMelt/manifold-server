echo "Building Docker Image"
docker build -t manifold-server .
echo "Running Docker Image"

# overwrites the container if it already exists
echo "Stopping and removing existing container"
docker stop manifold-server
docker rm manifold-server

docker run --name manifold-server -d -p 3000:3000 manifold-server 