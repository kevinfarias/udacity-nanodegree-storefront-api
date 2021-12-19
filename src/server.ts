import express from "express";
import bodyParser from "body-parser";
import categoryRouter from "./routes/categories";
import productRouter from "./routes/products";
import userRouter from "./routes/users";
import orderRouter from "./routes/orders";
import cors from "cors";
const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());
app.use(cors());

app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
