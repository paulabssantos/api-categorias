import { CreateCategoryDto } from "../../domain/dtos/createCategoryDto";
import { UpdateCategoryDto } from "../../domain/dtos/updateCategoryDto";
import { RepositoryCategoryContract } from "../../domain/repositories/categoryRepositoryContract";
import { ApplicationResponse } from "../../presentation/helpers/applicationResponse";
import { HttpStatusCode } from "../../presentation/helpers/httpStatusCode";

export class CategoryUseCases{
    constructor(private readonly repositoryCategory : RepositoryCategoryContract){}

    async Create(category:CreateCategoryDto){

        if(category.parentId){
            let parent = await this.repositoryCategory.Find(category.parentId)

            if(!parent){
                return new ApplicationResponse("Categoria pai informada não encontrada",404)
            }

            if(parent.parentId){
                let parentChildren = await this.repositoryCategory.ListChildren(parent.id)
                if(parentChildren.length > 4){
                    return new ApplicationResponse("Subcategoria pode ter no máximo 5 subcategorias.")
                }

                if(parentChildren.find(child => child.name == category.name)){
                    return new ApplicationResponse("Categoria já cadastrada com o nome informado.")
                }
            }else{
                let parentChildren = await this.repositoryCategory.ListChildren(category.parentId)
    
                if(parentChildren.length > 19){
                    return new ApplicationResponse("Categoria pai pode ter no máximo 20 subcategorias.")
                }

                if(parentChildren.find(child => child.name == category.name)){
                    return new ApplicationResponse("Categoria já cadastrada com o nome informado.")
                }
            }
        }
        let newCategory = await this.repositoryCategory.Create(category)

        return new ApplicationResponse("",HttpStatusCode.Created,newCategory)
    }

    async Update(id: number, category: UpdateCategoryDto) {
        let findCategory = await this.repositoryCategory.Find(id)
        if (!findCategory) {
            return new ApplicationResponse("Categoria não encontrada",HttpStatusCode.NotFound)
        }
        findCategory.active = category.active
        findCategory.name = category.name

        let updatedCategory = await this.repositoryCategory.Update(findCategory)
        
        return new ApplicationResponse("",HttpStatusCode.Ok,updatedCategory)

    }

    async Delete(id: number) {
        let findCategory = await this.repositoryCategory.Find(id)
        if (!findCategory) {
            return new ApplicationResponse("Categoria não encontrada",HttpStatusCode.NotFound)
        }
        this.repositoryCategory.Delete(id)
        return new ApplicationResponse("",200)
    }

    async Find(id: number) {
        let findCategory = await this.repositoryCategory.Find(id)
        if (!findCategory) {
            return new ApplicationResponse("Categoria não encontrada",HttpStatusCode.NotFound)
        }
        return new ApplicationResponse("",HttpStatusCode.Ok,findCategory)
    }

    async List() {
        let categories = await this.repositoryCategory.List();
        return new ApplicationResponse("",HttpStatusCode.Ok,categories)
    }
}