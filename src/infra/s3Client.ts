import { config } from "dotenv";
import { S3Client } from "@aws-sdk/client-s3";
config();

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_VERCEL,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
  region: process.env.AWS_REGION,
});

export default s3;
