export interface IRepository<T> {
    findById(id: string): Promise<T | null>;
}
