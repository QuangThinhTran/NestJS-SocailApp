import { HttpException, HttpStatus } from "@nestjs/common"
import { extname } from 'path';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid'; // Random string

export const multerOption = {
    fileFilter: (req: any, file: any, cb: any) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
            cb(null, true)
        }
        else {
            cb(
                new HttpException(
                    `Unsupported file type ${extname(file.originalname)}`,
                    HttpStatus.BAD_REQUEST,
                )
            ), false
        }
    },
    storage: diskStorage({
        destination: (req: any, file: any, cb: any) => {
            const uploadPath = './public'
            cb(null, uploadPath)
        },
        fileName: (req: any, file: any, cb: any) => {
            cb(null, `${uuid()}${extname(file.originalname)}`)
        }
    })
}
