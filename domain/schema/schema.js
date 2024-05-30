import Joi from "joi";

const userSchema = Joi.object({
  GITHUB_TOKEN: Joi.string().required(),
  GITHUB_API_URL: Joi.string().required(),
  USERNAMEREPO: Joi.string().required(),
  REPOS_PER_PAGE: Joi.string().required(),
  REPOS_SHOW: Joi.string().required(),
});

const data = {
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  GITHUB_API_URL: process.env.GITHUB_API_URL,
  USERNAMEREPO: process.env.USERNAMEREPO,
  REPOS_PER_PAGE: process.env.REPOS_PER_PAGE,
  REPOS_SHOW: process.env.REPOS_SHOW,
};

export const SchemaData = () => {
  const { error, value } = userSchema.validate(data);

  if (error) {
    let mes = "";
    error.details.forEach((message) => {
      mes += `${message.message}, `;
    });
    throw new Error(
      `You need to set environment variables, see .env.template, ${mes}`
    );
  } else {
    console.log("Datos válidos:", {
        ...value,
      GITHUB_TOKEN: "*******************",
    });
  }
};
