/**
 * Builds a SUM(CASE WHEN ...) aggregate expression for use with
 * TypeORM query builder's .addSelect(sql, alias).
 *
 * @example
 * const [sql, alias] = totalEntriesCountQuery({ queryCondition: [...], newPropertyName: 'total' });
 * qb.addSelect(sql, alias);
 */
export const totalEntriesCountQuery = <
    TReqKey extends string | number | symbol = string,
    TResKey extends string | number | symbol = string,
>(config: {
    queryCondition: {
        value: string[];
        propertyName: TReqKey;
        isNotIn?: boolean;
    }[];
    newPropertyName: TResKey;
}): [string, string] => {
    const { queryCondition, newPropertyName } = config;

    const queryMap = queryCondition.map((item) => {
        const { propertyName, value, isNotIn = false } = item;
        const keyName = camelCaseToUnderscore(String(propertyName));
        return `${keyName} ${isNotIn ? 'NOT IN' : 'IN'} (${value
            .map((v) => `'${v}'`)
            .join(', ')})`;
    });

    const queryStr = queryMap.join(' AND ');
    return [
        `SUM(CASE WHEN ${queryStr} THEN 1 ELSE 0 END)`,
        String(newPropertyName),
    ];
};

export const QueryLiteral = <
    TReqModel extends Record<string, any>,
    TResModel extends Record<string, any>,
>() => {
    return {
        totalEntriesCountQuery: totalEntriesCountQuery<
            keyof TReqModel,
            keyof TResModel
        >,
    };
};

function camelCaseToUnderscore(input: string) {
    return input.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}
