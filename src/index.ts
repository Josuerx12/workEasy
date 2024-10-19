import "module-alias/register";
import { Bootstrap } from "./server/bootstrap";

const app = new Bootstrap();

app.start();
