import { Report } from './entities/report.entity';
export declare class ReportService {
    create(createReportDto: Report): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateReportDto: Report): string;
    remove(id: number): string;
}
