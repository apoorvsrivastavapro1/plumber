import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { PaginationInterceptor } from './pagination.interceptor';

/**
 * This decorator formats the response to include metadata containing details such as data, total count,
 * and helper links.
 *
 * Note: This decorator will only function correctly if the controller returns an object
 * containing `rows` and `count`.
 *
 * Example:
 *      @Controller
 *      function getAllData() {
 *          return { rows, count };
 *      }
 *
 * @returns A decorator that applies the PaginationInterceptor.
 */
export function Pagination() {
    return applyDecorators(UseInterceptors(PaginationInterceptor));
}
