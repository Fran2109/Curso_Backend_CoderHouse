process.on('message', msg => {
    console.log("Ejecutando por el proceso " + process.pid);
    const numbers = {};
    for(let i = 1; i <= 1000; i++) {
        numbers[i] = 0;
    }
    for(let i=0; i<msg; i++){
        numbers[Math.floor(Math.random() * 1000)+1]++;
    }
    process.send(numbers)
})

process.send('listo')