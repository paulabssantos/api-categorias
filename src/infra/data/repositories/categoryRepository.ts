import { CreateCategoryDto } from "../../../domain/dtos/createCategoryDto";
import { Category } from "../../../domain/entities/category";
import { RepositoryCategoryContract } from "../../../domain/repositories/categoryRepositoryContract";
import { prisma } from "../prisma";

export class CategoryRepository implements RepositoryCategoryContract{
    async Create(category: CreateCategoryDto): Promise<Category> {
        return await prisma.category.create({data: category})
    }
    async Update(category: Category): Promise<Category> {
        return await prisma.category.update({where: {id: category.id},data: category})
    }
    async Delete(id: number): Promise<void> {
        await prisma.category.delete({ where : {id}})
    }
    async Find(id: number): Promise<Category | null> {
        return await prisma.category.findFirst({where: { id : {equals: id}}})
    }
    async List(): Promise<Category[]> {
        return await prisma.category.findMany()
    }
    async ListChildren(parentId: number): Promise<Category[]> {
        return await prisma.category.findMany({where: {parentId: { equals: parentId}}})
    }
}