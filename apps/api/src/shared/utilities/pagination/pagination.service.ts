import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '@api/shared/constants/database';

@Injectable()
export class PaginationService {
    constructor() {}

    getPaginationMetadata(req: Request, total: number) {
        const query = req.query;
        const pathName = req.path;
        const page = +(query?.page ?? DEFAULT_PAGE);
        const perPage = +(query?.perPage ?? DEFAULT_PER_PAGE);

        const prevLink =
            pathName +
            '?' +
            new URLSearchParams({
                ...query,
                page: `${page - 1}`,
                perPage: `${perPage}`,
            }).toString();

        const selfLink = new URLSearchParams({
            ...query,
            page: `${page}`,
            perPage: `${perPage}`,
        }).toString();

        const nextLink =
            pathName +
            '?' +
            new URLSearchParams({
                ...query,
                page: `${page + 1}`,
                perPage: `${perPage}`,
            }).toString();

        return {
            total: total,
            page: page,
            perPage: perPage,
            links: {
                prev: page <= 1 ? null : prevLink,
                self: `${pathName}?${selfLink}`,
                next: total > page * perPage ? nextLink : null,
            },
        };
    }

    getPaginationResponse<T>(req: Request, data: T[], count: number) {
        return {
            data: data,
            metadata: this.getPaginationMetadata(req, count),
        };
    }
}
