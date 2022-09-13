import { buildSchema } from 'graphql'
import { graphqlHTTP } from 'express-graphql'

import {
  getPersonas,
  getPersona,
  createPersona,
  updatePersona,
  deletePersona,
} from './personasController.js'

const schema = buildSchema(`
  input DireccionInput {
    calle: String
    numero: Int
  }
  
  input PersonaInput {
    nombre: String
    edad: Int
    direccion: DireccionInput
  }

  type Direccion {
    calle: String
    numero: Int
  }

  type Persona {
    id: ID!
    nombre: String
    edad: Int
    direccion: Direccion
  }

  type Query {
    getPersona(id: ID!): Persona
    getPersonas(campo: String, valor: String): [Persona]
  }
  
  type Mutation {
    createPersona(datos: PersonaInput!): Persona
    updatePersona(id: ID!, datos: PersonaInput!): Persona
    deletePersona(id: ID!): Persona
  }
`)

export const graphqlMiddleware = graphqlHTTP({
  schema,
  rootValue: {
    getPersonas,
    getPersona,
    createPersona,
    updatePersona,
    deletePersona,
  },
  graphiql: true,
})

// const schema = buildSchema(`
//   input PersonaInput {
//     nombre: String
//     edad: Int
//   }
//   type Persona {
//     id: ID!
//     nombre: String
//     edad: Int
//   }
//   type Query {
//     getPersona(id: ID!): Persona
//     getPersonas(campo: String, valor: String): [Persona]
//   }
//   type Mutation {
//     createPersona(datos: PersonaInput!): Persona
//     updatePersona(id: ID!, datos: PersonaInput!): Persona
//     deletePersona(id: ID!): Persona
//   }
// `)