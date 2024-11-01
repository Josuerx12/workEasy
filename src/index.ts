import serverless from "serverless-http";
import { Bootstrap } from "./server/bootstrap";

const app = new Bootstrap();

app.start();

export const handler = serverless(app.app);
