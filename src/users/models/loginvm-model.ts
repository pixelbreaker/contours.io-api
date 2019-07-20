import { BaseModelVm } from '../../common/models/basemodel-vm.model';
import { pick } from 'lodash';

export class LoginVm extends BaseModelVm {
  email: string;
  password: string;

  public static map(props, extraFields = []) {
    return pick(props, ['email', ...extraFields]) as LoginVm;
  }
}
