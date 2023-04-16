import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { Role } from './enums/role.enum';

const PermissionGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      if (role === Role.USUARIO && (request.user.perfil === Role.ROOT) || request.user.perfil === Role.ADMIN) {
        return true;
      }
      if(request.user.perfil === role || request.user.perfil === Role.ROOT) {
        return true;
      }
      return false;
    }
  }
  return mixin(RoleGuardMixin);
};

export default PermissionGuard;
