import axios from "axios";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_API_URL = process.env.GITHUB_API_URL;
const USERNAMEREPO = process.env.USERNAMEREPO;
const REPOS_PER_PAGE = process.env.REPOS_PER_PAGE;
const URL = `${GITHUB_API_URL}/users/${USERNAMEREPO}/repos`;

export const getRepositories = async (page) => {
  try {
    let data = [];
    await axios
      .get(URL, {
        params: {
          direction: "asc",
          per_page: REPOS_PER_PAGE,
          sort: "full_name",
          page,
        },
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      })
      .then((resp) => {
        data = resp.data;
      })
      .catch((error) => {
        let addMess = error.request ? error.request.res.statusMessage : "";
        throw new Error(`Request: ${error.message} ${addMess}`);
      });
    return data;
  } catch (error) {
    throw new Error(`Axios: ${error.message}`);
  }
};
