import { Injectable } from '@nestjs/common';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportService {
  create(createReportDto: Report) {
    return 'This action adds a new report';
  }

  findAll() {
    return `This action returns all report`;
  }

  findOne(id: number) {
    return `This action returns a #${id} report`;
  }

  update(id: number, updateReportDto: Report) {
    return `This action updates a #${id} report`;
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }
}
