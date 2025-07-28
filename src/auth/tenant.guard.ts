import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<{
      headers: Record<string, string>;
      user?: { tenantId?: string };
      tenantId?: string;
    }>();
    const headerTenant = req.headers['x-tenant-id'];
    const payloadTenant = req.user?.tenantId;
    req.tenantId = headerTenant ?? payloadTenant;
    return true;
  }
}
