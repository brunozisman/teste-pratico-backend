import {Router} from 'express'
import UserController from './controllers/UserController'

const routes = new Router()

routes.get('/users', UserController.index)
routes.get('/user/:id', UserController.show)
routes.post('/user', UserController.create)
routes.put('/user/:id', UserController.update)
routes.delete('/user/:id', UserController.delete)


export default routes