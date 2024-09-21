import multer, { memoryStorage } from "multer";
import { Uuid } from "src/core/shared/valueObjects/uuid.vo";

const upload = multer({
  storage: memoryStorage(),
  fileFilter(req, file, callback) {
    file.filename = new Uuid().value;
  },
});

export default upload;
