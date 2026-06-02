import { User } from '../interface/user.interface';
/**
 * @interface User
 * @description we implement User interface in class UserEntityDTo it means when we not implements the User properties then typeScript will throw error
 */
export class UserEntityDto implements User {
    name: string;
    email: string;
    mobileNumber: number;
    street: string;
    postalCode: number;
    city: string;
    district: string;
    state: string;
}
