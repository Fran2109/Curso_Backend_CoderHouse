import noticiasService from '../../services/noticias/index.js'
import NoticiasController from './NoticiasController.js'

const noticiasController = new NoticiasController(noticiasService)

export default noticiasController