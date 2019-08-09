import { EventsService } from '../../events/events.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../users/models/user-role.enum';

@Injectable()
export class EventOrganiserGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly _eventsService: EventsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const organiser: {
      organiser: boolean;
      roles: string[];
    } = this.reflector.get<any>('organiser', context.getHandler());
    if (!organiser) {
      return true;
    }

    const { user, params } = context.switchToHttp().getRequest();

    if (organiser.roles) {
      const hasRole = () =>
        user.roles.some(role => organiser.roles.includes(role));

      return user && user.roles && hasRole();
    }
    const event = await this._eventsService.findOne({ _id: params.id });
    if (event && event.organiser._id.toString() !== user._id.toString()) {
      return false;
    }
    return true;
  }
}
