import { listRepositoriesApplication } from "../../../application/index.js";

export const listRepositoriesController = async () => {
  try {
    await listRepositoriesApplication();
  } catch (error) {
    throw new Error(`Controller: ${error.message}`);
  }
};
