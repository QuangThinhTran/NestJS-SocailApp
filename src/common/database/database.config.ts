import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from 'src/user/entities/user.entity';
import { Blog } from 'src/blog/entities/blog.entity';
import { Image } from 'src/image/enitities/image.entity';
import { Comment } from 'src/comment/entities/comment.entity';

dotenv.config();

const databaseOptions: DataSourceOptions = {
  type: <any>process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: <any>process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  synchronize: <any>process.env.DB_SYNCHRONIZE,
  entities: [User, Blog, Image, Comment],
  migrations: ['src/database/migrations/*.ts'],
  migrationsRun: true,
};
const dataSource = new DataSource(databaseOptions);
export default dataSource;
