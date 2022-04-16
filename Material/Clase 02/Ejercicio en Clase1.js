function mostrarLetras (string_oracion, saludo, int_interval){
    let indice = 0;
    const length = string_oracion.length;
    const timer = setInterval(() => {
        console.log(string_oracion[indice]);
        indice++;
        if(indice>=length)
        {
            clearInterval(timer);
            saludo();
        } 
    }, int_interval);

    
}

mostrarLetras('Hola', () => console.log("Adios"), 500);

mostrarLetras('Hola Mundo', () => console.log("Adios"), 1000);

mostrarLetras('Hola Mundo! Como Estas?', () => console.log("Adios"), 250);