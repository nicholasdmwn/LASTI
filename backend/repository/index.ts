import {
    EntityManager,
    EntityTarget,
    FindManyOptions,
    FindOneOptions,
    getManager,
    Repository,
} from 'typeorm';
import { PaginationResult } from '../model/dto/abstract';

export abstract class BaseRepository<T> {
    protected async getRepository(item: EntityTarget<T>): Promise<Repository<T>> {
        const entityManager: EntityManager = getManager();
        return await entityManager.getRepository(item);
    }

    protected async getAll(
        repo: Repository<T>,
        page: number,
        itemPerPage: number,
        options?: FindOneOptions<T>
    ): Promise<PaginationResult<T>> {
        if (page <= 0) {
            page = 1;
        }
        if (itemPerPage < 5) {
            itemPerPage = 5;
        }

        if (itemPerPage > 25) {
            itemPerPage = 25;
        }

        const totalItems: number = await repo.count({});
        const maxPage = Math.ceil(totalItems / itemPerPage);

        let items: T[] = [];
        if (totalItems > 0) {
            const take = itemPerPage;
            const skip = (page - 1) * take;
            if (!options) {
                items = await repo.find({
                    skip,
                    take,
                });
            } else {
                const filter: FindManyOptions<T> = { skip, take, ...options };
                items = await repo.find(filter);
            }
        }

        return {
            page,
            maxPage,
            itemPerPage,
            totalItems,
            items,
        };
    }
}
