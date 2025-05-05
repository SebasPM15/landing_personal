import { Injectable } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { SheetsService } from '../sheets/sheets.service';

@Injectable()
export class LeadsService {
    constructor(
        private readonly sheetsService: SheetsService
    ) {}

    async createLead(dto: CreateLeadDto): Promise<string> {
        return this.sheetsService.appendLead(dto);
    }

    async getLeads(): Promise <any[]> {
        return this.sheetsService.getLeads();
    }
}
