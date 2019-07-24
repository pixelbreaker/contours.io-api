// TODO change to use SetMetaData befire ReflectMetaData is deprecated
import { ReflectMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => ReflectMetadata('roles', roles);
