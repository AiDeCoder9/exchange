import { ChatModule } from '@/core/chat/chat.module';
import { EmailVerificationModule } from '@/core/email-verification/email-verification.module';
import { CategoryModule } from '@/core/masterdata/category/category.module';
import { MasterModule } from '@/core/masterdata/master.module';
import { ProductModule } from '@/core/product/product.module';
import { AuthenticationModule } from '@/core/user-management/authentication/authentication.module';
import { UserModule } from '@/core/user-management/user/user.module';
import { UtilityModule } from '@/core/utilities/utilities.module';
export default [
  UserModule,
  AuthenticationModule,
  CategoryModule,
  MasterModule,
  EmailVerificationModule,
  ProductModule,
  UtilityModule,
  ChatModule,
];
