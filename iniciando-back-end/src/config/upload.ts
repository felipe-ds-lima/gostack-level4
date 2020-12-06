import crypto from 'crypto'
import multer from 'multer'
import { resolve } from 'path'

const uploadFolder = resolve(__dirname, '..', '..', 'tmp')

export default {
  tmpFolder: uploadFolder,
  uploadsFolder: resolve(uploadFolder, 'uploads'),

  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(req, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex')
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    },
  }),
}
