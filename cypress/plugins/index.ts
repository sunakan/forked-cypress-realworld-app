// メモ
// https://docs.cypress.io/api/plugins/writing-a-plugin#Plugins-API
// - exportされた関数は、 `cypress open` or `cypress run` でプロジェクトがopenされる度にcallされる

// フルキヨキ： require構文
// イマドキ： module構文(import)
//
// lodash              ok, 便利関数の集まり(_.lastとか_.eachとか)
// path                ok, path.joinとか使えるようになる
// axios               ok, fetchAPIのちょっとだけ楽なやつ(不要かも)
// dotenv              ok, .envを読み込んで環境変数的な感じで使える
// bluebird            ok, Promiseの速い版？(もしかしたら今は不要かも)
// @percy/cypress/task ok, percyのhealthcheck(不要かも, https://github.com/percy/percy-cypressでもv3からは不要とか書いてある)
import _ from "lodash";
import path from "path";
import axios from "axios";
import dotenv from "dotenv";
import Promise from "bluebird";
import { percyHealthCheck } from "@percy/cypress/task";
import codeCoverageTask from "@cypress/code-coverage/task";

// .env.localを読んで(なくても失敗しない)
// 更に.envを読む(かぶった時は、.env.localが優先)
dotenv.config({ path: ".env.local" });
dotenv.config();

const awsConfig = require(path.join(__dirname, "../../aws-exports-es5.js"));

export default (on, config) => {
  config.env.defaultPassword = process.env.SEED_DEFAULT_USER_PASSWORD;
  config.env.paginationPageSize = process.env.PAGINATION_PAGE_SIZE;
  // Auth0
  config.env.auth0_username = process.env.AUTH0_USERNAME;
  config.env.auth0_password = process.env.AUTH0_PASSWORD;
  config.env.auth0_domain = process.env.REACT_APP_AUTH0_DOMAIN;
  config.env.auth0_audience = process.env.REACT_APP_AUTH0_AUDIENCE;
  config.env.auth0_scope = process.env.REACT_APP_AUTH0_SCOPE;
  config.env.auth0_client_id = process.env.REACT_APP_AUTH0_CLIENTID;
  config.env.auth0_client_secret = process.env.AUTH0_CLIENT_SECRET;
  config.env.auth_token_name = process.env.REACT_APP_AUTH_TOKEN_NAME;
  // Okta
  config.env.okta_username = process.env.OKTA_USERNAME;
  config.env.okta_password = process.env.OKTA_PASSWORD;
  config.env.okta_domain = process.env.REACT_APP_OKTA_DOMAIN;
  config.env.okta_client_id = process.env.REACT_APP_OKTA_CLIENTID;

  // Amazon Cognito
  config.env.cognito_username = process.env.AWS_COGNITO_USERNAME;
  config.env.cognito_password = process.env.AWS_COGNITO_PASSWORD;
  config.env.awsConfig = awsConfig.default;

  // Google
  config.env.googleRefreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  config.env.googleClientId = process.env.REACT_APP_GOOGLE_CLIENTID;
  config.env.googleClientSecret = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;

  const testDataApiEndpoint = `${config.env.apiUrl}/testData`;

  const queryDatabase = ({ entity, query }, callback) => {
    const fetchData = async (attrs) => {
      const { data } = await axios.get(`${testDataApiEndpoint}/${entity}`);
      return callback(data, attrs);
    };

    return Array.isArray(query) ? Promise.map(query, fetchData) : fetchData(query);
  };

  // https://docs.cypress.io/api/plugins/writing-a-plugin#on
  // 例：on("<EVENT>", (a, b) => {})
  // cy.task("db:seed")とかcy.task("filter:database")とかでcallする
  on("task", {
    percyHealthCheck,
    async "db:seed"() {
      // seed database with test data
      const { data } = await axios.post(`${testDataApiEndpoint}/seed`);
      return data;
    },

    // fetch test data from a database (MySQL, PostgreSQL, etc...)
    "filter:database"(queryPayload) {
      return queryDatabase(queryPayload, (data, attrs) => _.filter(data.results, attrs));
    },
    "find:database"(queryPayload) {
      return queryDatabase(queryPayload, (data, attrs) => _.find(data.results, attrs));
    },
  });

  codeCoverageTask(on, config);
  return config;
};
