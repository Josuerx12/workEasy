import { Uuid } from "@src/core/shared/valueObjects/uuid.vo";
import multer, { memoryStorage } from "multer";

const upload = multer({
  storage: memoryStorage(),
  fileFilter(req, file, callback) {
    file.filename = new Uuid().value;
  },
});

export default upload;
