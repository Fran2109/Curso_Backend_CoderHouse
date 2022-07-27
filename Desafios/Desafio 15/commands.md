# Desafio 15
## Nodemon
```cmd
nodemon server.js -p 3000 -m FORK
```
```cmd
nodemon server.js -p 3000 -m CLUSTER
```
## Forever
```cmd
forever start --watch server.js -p 8080
forever start --watch server.js -p 8081
forever start --watch server.js -p 8082
```
```cmd
forever list
```
## PM2
```cmd
pm2 start server.js --name=server8080 --watch -- -p 8080
pm2 start server.js --name=server8081 --watch -- -p 8081
pm2 start server.js --name=server8082 --watch -- -p 8082
```
```cmd
pm2 start server.js -i max
pm2 start server.js --name=cluster --watch -i max
```
Estuve proabando mucho y no puedo hacer funcionar el modo Cluster con PM2. Hago lo mismo que en las guias pero no funciona. Pido orientacion.
## Nginx
Para la primer parte usare lo comentado en el archivo de conf de Nginx.
Ejecutar en una consola
```cmd
node server.js -p 8080
```
Y en otra
```cmd
node server.js -p 8081 -m CLUSTER
```
Ademas agregue un log en el proceso de generar los numeros para ver que numero de proceso lo ejecuta en cada request<br>
Y para la segunda parte ejecutar un servidor en cada consola.
```cmd
node server.js -p 8082
node server.js -p 8083
node server.js -p 8084
node server.js -p 8085
```
Verificar por consola que se vaya cambiando el puerto que ejecuta el request