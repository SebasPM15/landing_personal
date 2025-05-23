import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeadsModule } from './leads/leads.module';
import { SheetsModule } from './sheets/sheets.module';

@Module({
  imports: [LeadsModule, SheetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
