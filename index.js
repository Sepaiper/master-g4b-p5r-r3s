import "dotenv/config";
import { listRepositoriesController } from "./infrastructure/index.js";

async function app() {
  try {
    await listRepositoriesController();
  } catch (error) {
    console.log(error.message);
  }
}

app();
