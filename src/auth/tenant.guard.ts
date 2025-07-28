import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<{
      headers: Record<string, string>;
      user?: { tenantId?: string };
      tenantId?: string;
    }>();
    const headerName = this.config.get<string>(
      'TENANT_HEADER_NAME',
      'x-tenant-id',
    );
    const headerTenant = req.headers[headerName.toLowerCase()];
    const payloadTenant = req.user?.tenantId;
    const tenant = headerTenant ?? payloadTenant;
    if (!tenant) {
      throw new BadRequestException('Tenant not specified');
    }
    req.tenantId = tenant;
    return true;
  }
}
