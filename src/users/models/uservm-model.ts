import { BaseModelVm } from '../../common/models/basemodel-vm.model';
import { pick } from 'lodash';
import { UserRole } from './user-role.enum';

export class UserVm extends BaseModelVm {
  _id: string;
  username: string;
  email: string;
  role: UserRole;

  public static map(props, extraFields = []) {
    return pick(props, ['_id', 'username', ...extraFields]) as UserVm;
  }
}
