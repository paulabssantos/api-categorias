import { Request, response, Response } from "express";
import { CategoryUseCases } from "../../application/useCases/categoryUseCases";
import { UpdateCategoryDto } from "../../domain/dtos/updateCategoryDto";
import { CategoryRepository } from "../../infra/data/repositories/categoryRepository";
import { CreateCategoryDto } from "../../domain/dtos/createCategoryDto";

export class CategoryController {
    private readonly repositoryUseCase = new CategoryRepository()
    private readonly categoryUseCases = new CategoryUseCases(this.repositoryUseCase);

    async Create(request : Request,response: Response) : Promise<Response>{
        let body : CreateCategoryDto = request.body

        let applicationResponse = await this.categoryUseCases.Create(body)

        return response.status(applicationResponse.statusCode).json({message: applicationResponse.message, body: applicationResponse.body})

    }

    async Update(request : Request,response: Response) : Promise<Response>{
        let body : UpdateCategoryDto = request.body
        let id = request.params.id

        let applicationResponse = await this.categoryUseCases.Update(Number(id),body)

        return response.status(applicationResponse.statusCode).json({message: applicationResponse.message, body: applicationResponse.body})

    }

    async Delete(request : Request,response: Response) : Promise<Response>{
        let id = request.params.id

        let applicationResponse = await this.categoryUseCases.Delete(Number(id))

        return response.status(applicationResponse.statusCode).json({message: applicationResponse.message, body: applicationResponse.body})
    }

    async List(request : Request,response: Response) : Promise<Response>{
        let applicationResponse = await this.categoryUseCases.List()

        return response.status(applicationResponse.statusCode).json({message: applicationResponse.message, body: applicationResponse.body})
    }

    async Find(request : Request,response: Response) : Promise<Response>{
        let id = request.params.id

        let applicationResponse =  await this.categoryUseCases.Find(Number(id))

        return response.status(applicationResponse.statusCode).json({message: applicationResponse.message, body: applicationResponse.body})

    }
}