# Clase 09
## MongoDB
+ MongoDB es una base de datos No relacional, NoSQL, orientada a documentos que ofrece una gran escalabilidad y flexibilidad, y un modelo de consultas e indexación avanzado.
+ El modelo de documentos de MongoDB resulta muy fácil de aprender y usar, y proporciona a los desarrolladores todas las funcionalidades que necesitan para satisfacer los requisitos más complejos a cualquier escala.
### MongoDB dispone de dos variantes de despliegue
+ Local: con Mongo Server, a través de sus opciones Community y Enterprise.
+ Remota: mediante una plataforma configurada en la nube, lista para usar, llamada Mongo Atlas.
### Caracteristicas
+ Almacena datos en documentos flexibles similares a JSON: la estructura de datos puede cambiarse con el tiempo.
+ El modelo de documento se asigna a los objetos en el código de su aplicación para facilitar el trabajo con los datos.
+ Las consultas ad hoc, la indexación y la agregación en tiempo real ofrecen maneras potentes de acceder a los datos y analizarlos.
+ MongoDB es una base de datos distribuida en su núcleo, por lo que la alta disponibilidad, la escalabilidad horizontal y la distribución geográfica están integradas y son fáciles de usar.
+ MongoDB es de uso gratuito.
### Introduccion
+ El concepto de bases de datos NoSQL va creciendo y se utiliza con más frecuencia. MongoDB la base de datos NoSQL más conocida.
+ El concepto NoSQL define sistemas que difieren del modelo clásico SQL: Sistema de bases de datos relacionales. Lo más destacado de NoSQL es que no usan SQL como lenguaje principal de consultas.
+ MongoDB es una base de datos orientada a documentos. No se basa en el concepto de Tabla Fila y Registro sino que se apoya en el concepto de Colección, Documento y Propiedad.
### Colecciones
+ Una colección en MongoDB es muy similar a una tabla de una base de datos. La tabla almacena registros (filas) mientras que las colecciones almacenan documentos.
### Documentos
+ Aquí comienzan las diferencias importantes entre una base de datos SQL y una NoSQL. El concepto de fila y de documentos son bastante diferentes. 
+ Una fila está compuesta de columnas y siempre son las mismas para todas ellas. 
+ En cambio un documento está compuesto por claves y valores (key,value) y cada documento puede tener variaciones importantes con respecto al anterior dentro de una colección.
### Documentos Embebidos
+ Un documento embebido es un documento que está  insertado dentro de otro y que ambos están ligados  a la misma colección.
+ De esta manera las bases de datos orientadas a documentos aportan una gran flexibilidad a la hora de estructurar la información
### MongoDB Server y MongoDB Client CLI
#### Pasos para la puesta en marcha
1. Creamos una carpeta llamada -por ejemplo- miBaseMongo
2. Ejecutamos en la consola el siguiente comando: ```mongod --dbpath “ruta/hacia/la/carpeta/miBaseMongo”```
3. Verificamos que el motor de base de datos se inicie. Este escuchará peticiones de clientes en localhost puerto 27017.
4. Abrimos otra consola y ejecutamos el comando: mongo
5. En este caso se abre el cliente que se conectará al servicio de base de  datos iniciado anteriormente.
## SQL vs NoSQL
### Conceptos
+ Al trabajar con SQL y bases de datos relacionales, el sistema de almacenamiento de datos de nuestras aplicaciones web sigue patrones que otorgan relación entre las tablas de nuestra base de datos con las claves primaria y foráneas. 
+ Esto es altamente beneficioso porque nos genera un sistema de almacenamiento de datos totalmente estructurado.
+ Al evolucionar nuestras aplicaciones web, debemos realizar modificaciones en nuestro modelo conceptual de la base de datos.
+ Este problema con las bases de datos NoSQL quedaría resuelto por la flexibilidad que nos ofrecen las base de datos documentales, ya que estas bases de datos trabajan con datos en formato JSON.
### MySQL
#### Ventajas
+ Podemos ejecutar sentencias SQL directamente en nuestra base de datos.
+ Posibilidad de abstracción de nuestra base de datos con algún ORM estilo Doctrine o Hibernate.
+ Almacenamiento de datos totalmente organizado y jerarquizado con claves primarias y foráneas.
+ Nos permite evitar la duplicidad de registros.
+ Mejora notable en mantenimiento de datos en relación a la seguridad requerida de los mismos.
#### Desventajas
+ Si nuestro sistema escala y evoluciona, tendremos que haber diseñado nuestra base de datos según los posibles nuevos requerimientos.
+ Requiere más espacio de almacenamiento que una base NoSQL.
+ Las transacciones de datos son más pesadas frente a las bases de datos NoSQL.
+ Los límites en los campos de las tablas nos pueden hacer perder datos si no los configuramos adecuadamente según el tamaño del dato que nos puedan introducir los usuarios.
### MongoDB
#### Ventajas
+ La escalabilidad y su carácter descentralizado hacen que soporte estructuras distribuidas.
+ Permiten realizar sistemas más abiertos y flexibles debido a su fácil adaptación de nuevas evoluciones de nuestras aplicaciones web.
+ No se requieren potentes recursos para poder trabajar con bases de datos NoSQL.
+ Optimización de las consultas en base de datos para grandes cantidades de datos almacenados.
#### Desventajas
+ Problemas con sentencias SQL ya que no admiten el 100% de las consultas existentes.
+ No es capaz de realizar transacciones. Si bien en nuestra web o en una aplicación que hemos desarrollado podemos simular una transacción, MongoDB no tiene esa opción entre sus tantas capacidades.
+ La principal desventaja de MongoDB es que carece de algo tan fundamental como los Joins.
+ Falta de estandarización entre las diferentes bases de datos NoSQL.
## CRUD
El concepto CRUD está estrechamente vinculado a la gestión de datos digitales. CRUD hace referencia a un acrónimo en el que se reúnen las primeras letras de las cuatro operaciones fundamentales de aplicaciones persistentes en sistemas de bases de datos.
+ Create (Crear registros)
+ Read ó Retrieve (Leer registros)
+ Update (Actualizar registros)
+ Delete ó Destroy (Borrar registros)
### Conceptos
+ CRUD resume las funciones requeridas por un usuario para crear y gestionar datos. 
+ Muchos procesos de gestión de datos están basados en CRUD, en los que dichas operaciones están específicamente adaptadas a los requisitos del sistema y de usuario, ya sea para la gestión de bases de datos o para el uso de aplicaciones. 
+ Para los expertos, las operaciones son las herramientas de acceso típicas e indispensables para comprobar, por ejemplo, los problemas de la base de datos.
+ Para los usuarios, CRUD significa crear una cuenta (create) y utilizarla (read), actualizarla (update) o borrarla (delete) en cualquier momento.