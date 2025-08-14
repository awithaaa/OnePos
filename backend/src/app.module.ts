import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './public/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ItemsModule } from './public/items/items.module';
import { InventoryModule } from './public/inventory/inventory.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, ItemsModule, InventoryModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
