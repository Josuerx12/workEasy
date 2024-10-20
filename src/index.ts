import serverless from "serverless-http";
import "module-alias/register";
import { Bootstrap } from "./server/bootstrap";

const app = new Bootstrap();

// app.start();

export const handler = serverless(app.app);
