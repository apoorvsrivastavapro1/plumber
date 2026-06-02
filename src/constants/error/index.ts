import { defaultErrorConfig } from './config/default';
import { commonErrorConfig } from './config/common';

import { DEFAULT_ERROR } from './errors/default';
import { COMMON_ERROR } from './errors/common';

export type ERROR = DEFAULT_ERROR | COMMON_ERROR;

export { DEFAULT_ERROR, COMMON_ERROR };

export const errorConfig = {
    ...defaultErrorConfig,
    ...commonErrorConfig,
};
