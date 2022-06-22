# Clase 11
## TDD
### ¿Que es TDD?
TDD o Test-Driven Development (desarrollo dirigido por tests) es una práctica de programación que consiste en escribir primero las pruebas (generalmente unitarias), después escribir el código fuente que pase la prueba satisfactoriamente y, por último, refactorizar el código escrito.
Con esta práctica se consigue entre otras cosas un código más robusto, más seguro, mantenible y una mayor rapidez en el desarrollo.
### Ejemplo TDD: Algoritmo Calculadora
1. Supongamos que el cliente nos pide que desarrollemos una calculadora que sume números.
2. Acordamos que el criterio de aceptación sería que si introduces en la calculadora dos números y le das a la operación de suma, la calculadora te muestra el resultado de la suma en la pantalla.
3. Partiendo de este criterio, comenzamos a definir el funcionamiento del algoritmo de suma y convertimos el criterio de aceptación en una prueba concreta. Por ejemplo: un algoritmo al que al introducir 3 y 5 devuelve 8:
```function testSuma() { assertEquals(8, Calculadora.suma(3,5)); }```
### Análisis del último paso
* Es el punto es el más importante del TDD y que supone un cambio de mentalidad: primero escribo cómo debe funcionar mi programa y una vez que lo tengo claro, paso a codificarlo.
* Al escribir el test estamos diseñando cómo va a funcionar el software. Para cubrir la prueba vamos a necesitar una clase ‘Calculadora’ con una función que se llame ‘Suma’ y que tenga dos parámetros.
* Esta clase todavía no existe pero cuando la creemos, sabremos cómo va a funcionar. Por supuesto, si intentamos pasar este test nos dará un error, porque la clase Calculadora aún no existe.
### Escritura del código y prueba
* Ahora pasamos a escribir el código de la clase. Será fácil, porque ya sabemos exactamente cómo se va a comportar:
```javascript
class Calculadora { 
    static suma (a, b) { 
        const c = a + b;
        return c; 
    } 
}
```
* Ejecutamos la prueba y ya tenemos el código funcionado con la prueba pasada.
* Una vez que todo esté funcionando, pasamos a refactorizar y a eliminar código duplicado. Este ejemplo es sencillo y en un caso real no haríamos tantos pasos para algo tan evidente, pero el código mejorado podría ser:
```javascript
class Calculadora {
    static suma (a, b) {
        return a+b; 
    }
}
```
* En ejemplos más complejos, deberíamos buscar código duplicado y agruparlo en funciones, o utilizar la herencia o el polimorfismo.
### Detalles a tener en cuenta
* Es importante pasar todos los tests después de refactorizar por si nos olvidado de algo.
* Ahora deberíamos volver al punto 3 con tests más complicados y repetir el proceso. Por ejemplo, podríamos hacer que el algoritmo admita sumar números decimales.
* Esta forma de trabajar es también muy buena para entender el código. La calidad del diseño de un software está también relacionada con el conocimiento del equipo de desarrollo en relación al dominio en cuestión.
## El mock de APIs
### ¿Qué es una API?
API significa interfaz de programación de aplicaciones. Es un 
conjunto de definiciones y protocolos que se utilizan para desarrollar e 
integrar el software de las aplicaciones.
### API: Conceptos
* Permiten que sus productos y servicios se comuniquen con otros sin necesidad de saber cómo están implementados. 
* Esto simplifica el desarrollo de las aplicaciones y permite ahorrar tiempo y dinero.
* Otorgan flexibilidad, proporcionan oportunidades de innovación y simplifican el diseño, la administración y el uso de las aplicaciones.
* Esto es ideal al momento de diseñar herramientas y productos nuevos (o gestionar los actuales).
* Las API se consideran como contratos, con documentación que representa un acuerdo entre las partes: si una de las partes envía una solicitud remota con cierta estructura, esa misma estructura determinará cómo responderá el software de la otra parte.
### ¿Qué es Mocking y Mock?
* Mocking es la técnica utilizada para simular objetos en memoria con la finalidad de poder ejecutar pruebas unitarias.
* Los Mocks son objetos preprogramados con expectativas que forman una especificación de las llamadas que se espera recibir.
* Los Mocks se pueden servir desde un servidor web a través de unaMock API.
### Utilizando los Mocks en TDD
* Al trabajar con TDD nos encontramos con la dependencia de ciertos elementos que pueden estar fuera de contexto con el sistema que queremos probar.
* Algunas dependencias pueden traer efectos colaterales sobre el resultado de las pruebas, lo que se traduce en futuros errores. Incluso pueden no estar (todavía) implementadas, al estar el sistema en una fase temprana de desarrollo.
* Para resolver este problema, reemplazamos las dependencias por los mocks. Así se devolverán los resultados esperados para hacer las peticiones a dichas dependencias, sin realizar ninguna operación real o compleja.
* Nos podemos valer de un servidor de mocks que imita el comportamiento de nuestro servidor real, devolviendo datos de prueba o datos esperados tras las peticiones que queremos poner a prueba.
## Mocks y API
### Mocks implementados en una API
* Los mocks de API son una herramienta muy potente que permite desarrollar y probar el front-end como un componente independiente del back-end, facilitando y reduciendo tiempos de desarrollo, y aumentando la productividad del equipo.
* Un mock del servidor es sumamente útil para el equipo de desarrolladores que trabaja en la interfaz del usuario, ya que responde preguntas triviales y permite avanzar notablemente sin depender del desarrollo del backend 
* De esta manera se evita tener que esperar a que el servidor esté terminado para poder empezar a desarrollar el frontend.
* La mock API debe estar bien diseñada y documentada. Si hay errores en la especificación, habrá disparidad en el comportamiento de los mocks, causando que el frontend no termine de encajar cuando se haga el cambio al backend real.
### FAKER.js
* Faker.js es una librería Javascript que nos permite generar varios tipos de datos aleatorios como nombres, dirección de correo electrónico, perfil de avatar, dirección, cuenta bancaria, empresa, título del trabajo y mucho más.
* Faker.js se puede utilizar dentro de un proyecto Node.js para generar un mocking de datos para ser servidos desde un proyecto implementado con Express.
* Se instala en un proyecto Node.js es a través del comando npm i faker
## Normalización de datos
### ¿Qué es la normalización de datos?
Es un proceso de estandarización y validación de datos que consiste en eliminar las redundancias o inconsistencias, completando datos mediante una serie de reglas que actualizan la información, protegiendo su integridad y favoreciendo la interpretación, para que así sea más fácil de consultar y más útil para quien la gestiona.
### ¿Cuándo y cómo se utiliza?
La normalización de datos es útil cuando un repositorio de datos es demasiado grande, contiene redundancias, tiene información profundamente anidada y/o es difícil de usar. 
Al normalizar los datos, debemos seguir algunas reglas
* La estructura de datos debe ser plana.
* Cada entidad debe almacenarse como propiedad de objeto diferente.
* Las relaciones con otras entidades deben crearse basadas en identificadores: ‘id’.
## Normalizr
### ¿Qué es normalizr?
Es un paquete muy útil que utiliza la definición de esquemas personalizados para crear datos normalizados.
Se puede instalar desde npm a través de npm i normalizr
