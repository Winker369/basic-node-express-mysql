# Run following commands to setup local env
```
docker-compose up -d
docker exec -it node_env /bin/bash
// For migrating tables
node migration.js up --migrate-all
cp .env.example .env
```
`If .env was not copied properly just copy paste manually`

# Access the API with the following endpoint
http://localhost:9000/

# Access the MySQL with the following configuration
```
Connection Method: Standard (TCP/IP)
Hostname: 127.0.0.1 or localhost
Port: 9001
Username: root
Password: root
```