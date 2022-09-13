import noticiasDao from '../../database/index.js'
import NoticiasService from './NoticiasService.js';

const noticiasService = new NoticiasService(noticiasDao)

export default noticiasService
