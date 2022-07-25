# Desafio 15
## Nodemon
```powershell
nodemon server.js -p 3000 -m FORK
```
```powershell
nodemon server.js -p 3000 -m CLUSTER
```
## Forever
```powershell
forever start server.js -p 8080 -m FORK
forever start server.js -p 8081 -m FORK
forever start server.js -p 8082 -m FORK
```
```powershell
forever list
```
## 