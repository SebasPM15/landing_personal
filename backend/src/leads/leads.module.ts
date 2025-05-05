import { Module } from '@nestjs/common';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { SheetsModule } from '../sheets/sheets.module'; // 👈 importa el módulo

@Module({
  imports: [SheetsModule],
  controllers: [LeadsController],
  providers: [LeadsService]
})
export class LeadsModule {}
