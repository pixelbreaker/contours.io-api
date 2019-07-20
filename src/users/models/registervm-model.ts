import { BaseModelVm } from '../../common/models/basemodel-vm.model';
import { pick } from 'lodash';

export class RegisterVm extends BaseModelVm {
  username: string;
  email: string;
  password: string;
}
