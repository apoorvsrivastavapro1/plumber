import { IsNotEmpty } from 'class-validator';
export class Voter {
    @IsNotEmpty()
    voterNo: number;

    @IsNotEmpty()
    age: number;

    @IsNotEmpty()
    addressOnVoterId: string;
}
