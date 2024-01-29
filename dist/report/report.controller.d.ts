import { ReportService } from './report.service';
import { Report } from './entities/report.entity';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    create(createReportDto: Report): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateReportDto: Report): string;
    remove(id: string): string;
}
