# Desafio 16
## Prof
### Info
#### 01 No debug
```powershell
artillery quick -c 20 -n 50 "http://localhost:8080/api/getInfo" > artillery_fast_getInfo.txt
node --prof server.js
node --prof-process fast_getInfo.log > prof_fast_getInfo.txt
```
#### 02 Debug
```powershell
artillery quick -c 20 -n 50 "http://localhost:8080/api/getInfo-debug" > artillery_slow_getInfo.txt
node --prof server.js
node --prof-process slow_getInfo.log > prof_slow_getInfo.txt
```
### Randoms
#### 03 No debug
```powershell
artillery quick -c 20 -n 50 "http://localhost:8080/api/randoms/1000" > artillery_fast_randoms.txt
node --prof server.js
node --prof-process fast_randoms.log > prof_fast_randoms.txt
```
#### 04 Debug
```powershell
artillery quick -c 20 -n 50 "http://localhost:8080/api/randoms-debug/1000" > artillery_slow_randoms.txt
node --prof server.js
node --prof-process slow_randoms.log > prof_slow_randoms.txt
```
## Autocannon
### Info
#### 05 No debug
```powershell
0x server.js
autocannon -d 20 -c 100 "http://localhost:8080/api/getInfo"
```
#### 06 Debug
```powershell
0x server.js
autocannon -d 20 -c 100 "http://localhost:8080/api/getInfo-debug"
```
### Randoms
#### 07 No debug
```powershell
0x server.js
autocannon -d 20 -c 100 "http://localhost:8080/api/randoms/1000"
```
#### 08 Debug
```powershell
0x server.js
autocannon -d 20 -c 100 "http://localhost:8080/api/randoms-debug/1000"
```
## Inspect
```powershell
node --inspect server.js
```
### Info
#### 09 No debug
```powershell
artillery quick -c 20 -n 50 "http://localhost:8080/api/getInfo" > artillery_fast_getInfo.txt
```
#### 10 Debug
```powershell
artillery quick -c 20 -n 50 "http://localhost:8080/api/getInfo-debug" > artillery_slow_getInfo.txt
```
### Randoms
#### 11 No debug
```powershell
artillery quick -c 20 -n 50 "http://localhost:8080/api/randoms/1000" > artillery_fast_randoms.txt
```
#### 12 Debug
```powershell
artillery quick -c 20 -n 50 "http://localhost:8080/api/randoms-debug/1000" > artillery_slow_randoms.txt
```
## Conclusion
Todos los resultados del perfilamiento estan en la carpeta profilin ordenados.<br>
Como conclusion saco que el console.log() consume demasiado tiempo de proceso y rutas como randoms lo alenta un monton haciendo que el artillery llegue a tardar aproximadamente 5 minutos.<br>
Saludos Francisco