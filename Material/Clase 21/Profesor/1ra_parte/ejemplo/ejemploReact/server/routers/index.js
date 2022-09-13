import NoticiasRouter from './NoticiasRouter.js'
import noticiasController from '../controllers/noticias/index.js'

const noticiasRouter = new NoticiasRouter(noticiasController)

export default noticiasRouter.get()