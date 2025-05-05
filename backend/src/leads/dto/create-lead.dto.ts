export class CreateLeadDto {
    readonly name: string;
    readonly email: string;
    readonly phone?: string;
    readonly message?: string;
}