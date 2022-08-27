import {Router, Request, Response} from 'express'

const routes = new Router()

routes.get('/', (req: Request, res: Response) => {
    return res.json("Hello")
})


export default routes