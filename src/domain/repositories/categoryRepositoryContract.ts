import { CreateCategoryDto } from "../dtos/createCategoryDto";
import { Category } from "../entities/category";

export interface RepositoryCategoryContract{
    Create(category: CreateCategoryDto) : Promise<Category>;
    Update(category: Category) : Promise<Category>;
    Delete(id: number) : Promise<void>;
    Find(id: number) : Promise<Category | null>;
    List() : Promise<Category[]>;
    ListChildren(parentId: number) : Promise<Category[]>;
}