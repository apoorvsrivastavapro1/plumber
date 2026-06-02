import { Aadhar } from './aadhar.dto';
import { Voter } from './voter.dto';
import { Pan } from './pan.dto';
import { IsIn, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CheckTypeAndCount } from 'src/utils/custom-class-validator';

export class Common {
    @IsIn(['pan', 'aadhar', 'voter'])
    @CheckTypeAndCount()
    type: string;

    @Type(() => Pan)
    @ValidateNested({ each: true })
    pan: Pan;

    @ValidateNested()
    @Type(() => Aadhar)
    aadhar: Aadhar;

    @ValidateNested({ each: true })
    @Type(() => Voter)
    voter: Voter;
}
