export interface ICategory {
    id: number;
    name: string;
    description: string;
    parentId: number | null;
    parent?: ICategory | null;
    children?: ICategory[];
    
}