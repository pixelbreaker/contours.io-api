import { BaseModelVm } from '../../common/models/basemodel-vm.model';

export class UserVm extends BaseModelVm {
  _id: string;
  username: string;

  public static projection: string[] = ['_id', 'username'];
}
