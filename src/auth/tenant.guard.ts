import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
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
    req.tenantId = headerTenant ?? payloadTenant;
    return true;
  }
}
