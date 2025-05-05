import { Controller, Get, Post, Body } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';

@Controller('leads')
export class LeadsController {
    constructor (private readonly leadsService: LeadsService) {}

    @Post()
    create(@Body() dto: CreateLeadDto) {
        return this.leadsService.createLead(dto);
    }

    @Get()
    finAll() {
        return this.leadsService.getLeads();
    }
}
