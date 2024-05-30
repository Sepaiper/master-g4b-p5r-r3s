import { getRepositories } from "../../../infrastructure/index.js";
import { SchemaData } from "../../../domain/index.js";

const REPOS_PER_PAGE = process.env.REPOS_PER_PAGE;
const REPOS_SHOW = process.env.REPOS_SHOW;

export const listRepositoriesApplication = async () => {
  try {
    SchemaData();

    let page = 1;
    let repositories = [];
    let bucle = true;

    console.log(
      `Processing, it can take a minute, github only allows 100 repos per request and cannot be filtered by Start`
    );

    while (bucle) {
      const response = await getRepositories(page);
      repositories = repositories.concat(response);
      if (response.length < +REPOS_PER_PAGE) bucle = false;
      page += 1;
    }

    /** Github does not allow direct sorting by stars, so we do it in the following sort */
    repositories.sort((a, b) => b.stargazers_count - a.stargazers_count);

    /** We get the 10 most popular */
    const top = repositories.slice(0, REPOS_SHOW);

    console.log(`Popular  repositories`);
    top.forEach((repository) => {
      console.log(
        `Repo: ${repository.name}, Start: ${repository.stargazers_count}`
      );
    });
  } catch (error) {
    throw new Error(`Application: ${error.message}`);
  }
};
