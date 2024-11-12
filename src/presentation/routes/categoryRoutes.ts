import { Router, Request, Response } from 'express';
import { CategoryController } from '../controllers/categoryController';
import { CategoryUseCases } from '../../application/useCases/categoryUseCases';
import { CategoryRepository } from '../../infra/data/repositories/categoryRepository';

const categoryRoutes = Router()
const controller = new CategoryController()

categoryRoutes.get('/', (req: Request, res: Response) => {
    controller.List(req,res)
})

categoryRoutes.get('/:id', (req: Request, res: Response) => {
    controller.Find(req,res)
})

categoryRoutes.post('/', (req: Request, res: Response) => {
    controller.Create(req,res)
})

categoryRoutes.put('/:id', (req: Request, res: Response) => {
    controller.Update(req,res)
})

categoryRoutes.delete('/:id', (req: Request, res: Response) => {
    controller.Delete(req,res)
})

export { categoryRoutes }

