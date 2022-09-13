import assert from 'assert'
import axios from 'axios'

const url = 'http://localhost:8080/api/noticias'

const datosNoticia = {
    "titulo": "I'll generate the optical SSL program, that should capacitor the SCSI microchip!",
    "cuerpo": "Dolor sunt vel et ipsam nesciunt occaecati quo ad. Molestias soluta sed alias facere. Voluptas optio qui quo veritatis sapiente sed voluptates maxime. Voluptatem harum sed. Molestiae et sit omnis qui.",
    "autor": "Ana Palomo",
    "imagen": "https://cdn.fakercloud.com/avatars/bobbytwoshoes_128.jpg",
    "email": "Claudia_Arenas85@hotmail.com",
    "vista": false
}

describe('api noticias', () => {
    describe('al enviar datos validos...', () => {
        it('crea y guarda la noticia y devuelve un codigo 201', async () => {
            const { data, status } = await axios.post(url, datosNoticia)

            assert.strictEqual(status, 201)

            assert.ok(data)
            assert.ok(data.id)

            const { data: noticiaObtenida } = await axios.get(url + '/' + data.id)

            delete noticiaObtenida.id
            assert.deepStrictEqual(noticiaObtenida, datosNoticia)
        })
    })

    describe('al enviar datos invalidos...', () => {
        it('no guarda nada y devuelve un codigo 400', async () => {

            return assert.rejects(
                axios.post(url, { nombre: 'pepe' }),
                // axios.post(url, datosNoticia),
                ({ response }) => {
                    assert.strictEqual(response.status, 400)
                    return true
                }
            )
        })
    })
})


//================================================================

// import assert from 'assert'
// import axios from 'axios'

// // setup (preparacion)
// const url = 'http://localhost:8080/api/noticias'

// const datosNoticia = {
//     "titulo": "I'll generate the optical SSL program, that should capacitor the SCSI microchip!",
//     "cuerpo": "Dolor sunt vel et ipsam nesciunt occaecati quo ad. Molestias soluta sed alias facere. Voluptas optio qui quo veritatis sapiente sed voluptates maxime. Voluptatem harum sed. Molestiae et sit omnis qui.",
//     "autor": "Ana Palomo",
//     "imagen": "https://cdn.fakercloud.com/avatars/bobbytwoshoes_128.jpg",
//     "email": "Claudia_Arenas85@hotmail.com",
//     "vista": false
// }

// // exercise (ejecutar)
// try {
//     const { data, status } = await axios.post(url, datosNoticia)
//     // console.log(response.data)

//     if (status !== 201) {
//         throw new Error('el estado no es 201')
//     }

//     // assertion (validacion)
//     if (!data) {
//         throw new Error('falta la noticia')
//     }

//     if (!data.id) {
//         throw new Error('falta el id')
//     }

//     let noticiaObtenida
//     try {
//         const { data: data2 } = await axios.get(url + '/' + data.id)
//         noticiaObtenida = data2
//     } catch (error) {
//         throw new Error('no se encontró la noticia guardada')
//     }
//     delete noticiaObtenida.id
//     assert.deepStrictEqual(noticiaObtenida, datosNoticia)

//     console.log('prueba exitosa')

// } catch (error) {
//     console.log(error.message)
// }


