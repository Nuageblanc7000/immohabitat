import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('ROLES_KEY', roles);
