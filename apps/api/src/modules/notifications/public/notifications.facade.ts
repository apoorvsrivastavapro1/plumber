import { Injectable } from '@nestjs/common';

export const NOTIFICATIONS_FACADE = Symbol('NOTIFICATIONS_FACADE');

@Injectable()
export class NotificationsFacade {}
