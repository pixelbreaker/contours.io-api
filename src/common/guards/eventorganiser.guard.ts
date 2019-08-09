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
    const organiser = this.reflector.get<boolean>(
      'organiser',
      context.getHandler(),
    );
    if (!organiser) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const id = request.params.id;

    const userid = user._id;

    // if (user.role === UserRole.Admin) {
    //   return true;
    // }
    const event = await this._eventsService.findOne({ _id: id });
    if (event && event.organiser._id.toString() !== userid.toString()) {
      return false;
    }
    return true;
  }
}
