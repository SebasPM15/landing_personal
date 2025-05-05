import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { CreateLeadDto } from '../leads/dto/create-lead.dto';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class SheetsService {
    private sheets;
    private spreadsheetId = process.env.SPREADSHEET_ID;

    constructor() {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        this.sheets = google.sheets({ version: 'v4', auth })
    }

    async appendLead(dto: CreateLeadDto) {
        const { name, email, phone, message } = dto;

        await this.sheets.spreadsheets.values.append({
            spreadsheetId: this.spreadsheetId,
            range: 'LeadsDB!A:D',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [[name, email, phone || '', message || '']],
            },
        });
        
        return 'Lead agregado correctamente';
    }

    async getLeads() {
        const res = await this.sheets.spreadsheets.values.get({
            spreadsheetId: this.spreadsheetId,
            range: 'LeadsDB!A:D',
        });

        return res.data.values || [];
    }

    async getSheetNames() {
        const res = await this.sheets.spreadsheets.get({
            spreadsheetId: this.spreadsheetId,
        });
    
        const names = res.data.sheets.map(sheet => sheet.properties?.title);
        console.log('📝 Nombre de las hojas:', names);
        return names;
    }    
}
