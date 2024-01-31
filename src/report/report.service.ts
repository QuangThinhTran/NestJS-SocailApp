import { Injectable } from '@nestjs/common';
import { Report } from './entities/report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    readonly reportRepository: Repository<Report>,
  ) {}

  async create(data: Report): Promise<Report> {
    return this.reportRepository.save(data);
  }

  async findByBlogID(id: number): Promise<Report[]> {
    return this.reportRepository.find({
      where: {
        blog: { id },
      },
      relations: ['blog', 'user'],
    });
  }

  async findByUserID(id: number): Promise<Report[]> {
    return this.reportRepository.find({
      where: {
        user: { id },
      },
      relations: ['blog', 'user'],
    });
  }
}
