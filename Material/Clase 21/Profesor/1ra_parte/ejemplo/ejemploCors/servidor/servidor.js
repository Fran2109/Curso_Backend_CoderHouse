import express from 'express'
import cors from 'cors'

const app = express()

// app.use(cors())

// app.use(
//   cors({
//     origin: 'http://localhost:4000',
//   })
// )

// app.use(
//   cors(process.env.NODE_ENV === 'production'
//     ? { origin: 'http://localhost:4000' }
//     : {}
//   )
// )

app.use(cors(allowOnlyPost))

/* middlewares */
function allowOnlyPost({ method }, next) {
  if (method === 'POST')
    next(null, { origin: true })
  else
    next(null, { origin: false })
}
/* fin middlewares */

app.use((req, res, next) => {
  console.log(req.originalUrl)
  next()
})

app.get('/mensaje', (req, res) => {
  res.send('el mensaje para mostrar')
})

app.post('/mensaje', (req, res) => {
  res.send('el mensaje para mostrar dsp de un post')
})

app.listen(3000)
