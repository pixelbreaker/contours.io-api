import { BaseModelVm } from '../../common/models/basemodel-vm.model';
import { pick } from 'lodash';

export class UserVm extends BaseModelVm {
  _id: string;
  username: string;
  email: string;

  public static map(props, extraFields = []) {
    return pick(props, ['_id', 'username', ...extraFields]) as UserVm;
  }
}
