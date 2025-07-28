import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { SiteModule } from './site/site.module';
import { PlanModule } from './plan/plan.module';
import { FeatureModule } from './feature/feature.module';
import { PlanFeatureModule } from './plan-feature/plan-feature.module';
import { SitePlanModule } from './site-plan/site-plan.module';
import { SiteFeatureModule } from './site-feature/site-feature.module';
import { ThemeModule } from './theme/theme.module';
import { SiteThemeModule } from './site-theme/site-theme.module';
import { PaymentModule } from './payment/payment.module';
import { CommerceModule } from './commerce/commerce.module';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './auth/roles.guard';
import { TenantGuard } from './auth/tenant.guard';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserModule,
    SiteModule,
    PlanModule,
    FeatureModule,
    PlanFeatureModule,
    SitePlanModule,
    SiteFeatureModule,
    ThemeModule,
    SiteThemeModule,
    PaymentModule,
    CommerceModule,

  ],
  providers: [
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_GUARD, useClass: TenantGuard },
  ],
})
export class AppModule {}
