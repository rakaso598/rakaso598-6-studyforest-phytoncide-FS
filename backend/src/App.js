import express from "express";
import router from "./modules/index.module.js";
import errorHandler from "./middlewares/errorHandler.module.js";

const app = express();
const PORT = 5090;

app.use(express.json());
app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`${PORT} 실행됨!`);
});
