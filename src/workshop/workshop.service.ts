import { Injectable } from '@nestjs/common';
import { Workshop } from './entities/workshop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Util } from '../util/util';

@Injectable()
export class WorkshopService {
  constructor(
    @InjectRepository(Workshop)
    private readonly workshopRepository: Repository<Workshop>,
  ) {}

  async create(data: Workshop, file: Express.Multer.File): Promise<Workshop> {
    const path = Util.createSlug(file.originalname);
    const slug = Util.createSlug(data.description);
    return this.workshopRepository.save({ ...data, image: path, slug: slug });
  }

  async findAll(): Promise<Workshop[]> {
    return this.workshopRepository.find({
      relations: ['users', 'comments'],
    });
  }

  async findOne(id: number): Promise<Workshop> {
    return this.workshopRepository.findOneOrFail({
      where: { id },
      relations: ['users', 'comments'],
    });
  }

  async findBySlug(slug: string): Promise<Workshop> {
    return this.workshopRepository.findOne({
      where: { slug: slug },
      relations: ['users', 'comments'],
    });
  }

  async update(id: number, data: Workshop): Promise<Workshop> {
    const path = Util.createSlug(data.image);
    const slug = Util.createSlug(data.description);
    await this.workshopRepository.update(id, {
      ...data,
      slug: slug,
      image: path,
    });
    return this.workshopRepository.findOneOrFail({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.workshopRepository.softDelete(id);
  }
}
