import { HttpException, HttpStatus } from '@nestjs/common';
import { diskStorage } from 'multer';
import { Util } from 'src/util/util';

export const multerOption = {
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      cb(null, true);
    } else {
      cb(
        new HttpException(
          `Unsupported file type ${file.originalname}`,
          HttpStatus.BAD_REQUEST,
        ),
      ),
        false;
    }
  },
  storage: diskStorage({
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = './public';
      cb(null, uploadPath);
    },
    filename: (req: any, file: any, cb: any) => {
      const nameImage = Util.createSlug(file.originalname);
      cb(null, `${nameImage}`);
    },
  }),
};
