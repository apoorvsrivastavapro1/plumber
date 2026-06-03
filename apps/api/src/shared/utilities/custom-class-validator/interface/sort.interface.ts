export enum SORT_ORDER {
    ASC = 'ASC',
    DESC = 'DESC',
}

export type ISortInfo = {
    field: string;
    order: SORT_ORDER;
};

export type ISortPatternsKeys<T extends string | number> = (
    | T
    | `${T}:${SORT_ORDER.ASC}`
    | `${T}:${SORT_ORDER.DESC}`
)[];

export type ISortKey<T extends object> = Exclude<keyof T, symbol>;
