import { BaseModelVm } from '../../common/models/basemodel-vm.model';
import { Length, IsEmail } from 'class-validator';

export class RegisterVm extends BaseModelVm {
  @Length(3, 20)
  username: string;

  @IsEmail()
  email: string;

  @Length(3, 30)
  password: string;
}
