"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const typeorm_1 = require("typeorm");
class BaseRepository {
    async getRepository(item) {
        const entityManager = (0, typeorm_1.getManager)();
        return await entityManager.getRepository(item);
    }
    async getAll(repo, page, itemPerPage, options) {
        if (page <= 0) {
            page = 1;
        }
        if (itemPerPage < 5) {
            itemPerPage = 5;
        }
        if (itemPerPage > 25) {
            itemPerPage = 25;
        }
        const totalItems = await repo.count({});
        const maxPage = Math.ceil(totalItems / itemPerPage);
        let items = [];
        if (totalItems > 0) {
            const take = itemPerPage;
            const skip = (page - 1) * take;
            if (!options) {
                items = await repo.find({
                    skip,
                    take,
                });
            }
            else {
                const filter = { skip, take, ...options };
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
exports.BaseRepository = BaseRepository;
