このリポジトリは [cypress-io/cypress-realworld-app](https://github.com/cypress-io/cypress-realworld-app) の fork したやつ

勝手に意訳したり、コードリーディングでのメモをしたり勉強用のリポジトリ

[![CircleCI](https://circleci.com/gh/sunakan/forked-cypress-realworld-app/tree/suna-main.svg?style=shield)](https://circleci.com/gh/sunakan/forked-cypress-realworld-app/tree/suna-main)
[![Cypressが作ってくれたRealWorldApp](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/detailed/39p3u5/suna-main&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/39p3u5/runs)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/68136805/Cypress-RealWorldApp)
[![codecov](https://codecov.io/gh/sunakan/forked-cypress-realworld-app/branch/suna-main/graph/badge.svg?token=BHLDJDR33B)](https://codecov.io/gh/sunakan/forked-cypress-realworld-app)

<p align="center">
A payment application to demonstrate <strong>real-world</strong> usage of <a href="https://cypress.io">Cypress</a> testing methods, patterns, and workflows.

Cypress のテスト手法、パターン、ワークフローを実際に使用して実証するための決済アプリケーションです。

</p>

<p align="center">
  <img style='width: 70%' alt="Cypress Real World App" src="./public/img/rwa-readme-screenshot.png" />
</p>

> 💬 **Note from maintainers**(メンテナのメモ)
>
> This application is purely for demonstration and educational purposes. Its setup and configuration resemble typical real-world applications, but it's not a full-fledge production system. Use this app to learn, experiment, tinker, and practice application testing with Cypress.
> このアプリはデモ・教育を目的にしてる
> 設定と構成は本番と似ているかも知れないけど、本格的じゃない
> アプリは Cypress を使ったテストの学習、実験、改造、練習に使ってください
>
> Happy Testing
> いえーい

---

## Features(機能郡)

🛠 Built with [React][reactjs], [XState][xstate], [Express][express], [lowdb][lowdb], [Material-UI][material-ui] and [TypeScript][typescript]

- React
- XState
  - 状態遷移を表現するのに便利なパッケージ
- express
- lowdb
  - json ファイルで db を表現
- マテリアル UI
- TypeScript
  ⚡️ Zero database dependencies
- DB に依存しない
  🚀 Full-stack [Express][express]/[React][reactjs] application with real-world features and tests
- フルスタック Express/React アプリ(RealWorld の機能とテストの全て付き)
  👮‍♂️ Local Authentication
- ローカルでの認証
  🔥 Database Seeding with End-to-end Tests
- E2E テストでの DB seeding
  💻 CI/CD + [Cypress Dashboard][cypressdashboard]
- CI/CD は Cypress のダッシュボード

## Getting Started

The Cypress Real-World App (RWA) is a full-stack Express/React application backed by a local JSON database ([lowdb]).

Cypress Real-World App (RWA) はローカルな JSON DB を使ったフルスタックな Express/React アプリ

The app is bundled with [example data](./data/database.json) (`data/database.json`) that contains everything you need to start using the app and run tests out-of-the-box.

アプリには、database.json が付属されており、アプリ起動後すぐにテストを始めるにあたって必要なものが全部入ってる!!

超便利!!!

> 🚩 **Note**
>
> You can login to the app with any of the [example app users](./data/database.json#L2). The default password for all users is `s3cret`.  
> サンプルアプリのユーザーのどれかログイン可能
> デフォルトのパスワードは全て `s3cret`
>
> Example users can be seen by running `yarn list:dev:users`.
> ユーザ一覧は `yarn list:dev:users` で確認可能

jq 使ってもいける

```
$ cat data/database.json | jq -c '.users[] | {username: .username, password: "s3cret"}'
{"username":"Katharina_Bernier","password":"s3cret"}
{"username":"Tavares_Barrows","password":"s3cret"}
{"username":"Allie2","password":"s3cret"}
{"username":"Giovanna74","password":"s3cret"}
{"username":"Jessyca.Kuhic","password":"s3cret"}
```

### Prerequisites(前提条件)

The only requirement for this project is to have [Node.js](https://nodejs.org/en/) **version 14** installed on your machine. Refer to the [.node-version](./.node-version) file for the exact version.

このプロジェクトの唯一の要件は、お使いのマシンに Node.js のバージョン 14 がインストールされていること

正確なバージョンについては、.node-version ファイルを参照してください。

TypeScript will be added as a local dependency to the project, so no need to install it.

TypeScript は、プロジェクトのローカルな依存関係として追加されますので、インストールする必要はなし

### Installation

```shell
$ yarn install
# or
$ npx yarn install
```

### Run the app

```shell
$ npx yarn dev
```

> 🚩 **Note**
>
> The app will run on port `3000` (frontend) and `3001` (API backend) by default. Please make sure there are no other applications or services running on both ports.
> フロントエンド：3000 番
> バックエンド：3001 番
> アプリを起動する時、2 つのポート番号を空けておくこと
>
> If you want to change the default ports, you can do so by modifying `REACT_APP_PORT` and `REACT_APP_BACKEND_PORT` variables in `.env` file.
> もしポート番号を変更したい時は `.env` の `REACT_APP_PORT` と `REACT_APP_BACKEND_PORT` を変更したらよい
>
> However, make sure the modified port numbers in `.env` are not commited into Git since the CI environments still expect the application run on default ports.
> でもコミットはしないで(CI のため)

### Start Cypress

```shell
$ yarn cypress:open
# or
$ npx yarn cypress:open
```

> 🚩 **Note**
>
> If you have changed the default ports, then you need to update Cypress configuration file (`cypress.json`) locally.
> デフォルトのポート番号(3000)を変更したい時、cypress.json を更新するべき
>
> There are three properties that you need to update in `cypress.json`: `baseUrl`, `apiUrl`, and `url`.
> 3 つのプロパティの更新が必要(baseUrl と apiUrl と url)
>
> The port number in `baseUrl` corresponds to `REACT_APP_PORT` variable in `.env` file. Similarly, the port number in `apiUrl` and `url` correspond to `REACT_APP_BACKEND_PORT`.
> apiUrl と url のポート番号は.env にある `REACT_APP_BACKEND_PORT` に対応している
>
> For example, if you have changed `REACT_APP_PORT` to `13000` and `REACT_APP_BACKEND_PORT` to `13001` in `.env` file, then your `cypress.json` should look similar to the following snippet:
> 例： .env の `REACT_APP_PORT` を 13000, `REACT_APP_BACKEND_PORT` を 13001 とすると、cypress.json は以下のような感じになる
>
> ```json
> {
>   "baseUrl": "http://localhost:13000",
>   /* Omitted for brevity */
>   "env": {
>     "apiUrl": "http://localhost:13001",
>     /* Omitted for brevity */
>     "codeCoverage": {
>       "url": "http://localhost:13001/__coverage__"
>     }
>   },
>   "experimentalStudio": true
> }
> ```
>
> Avoid committing the modified `cypress.json` into Git since the CI environments still expect the application run on default ports.
> CI 環境では、デフォルトポートで実行されることを期待されているので、 `cypress.json` を更新して commit するのは避ける

## Tests

| Type(種類) | Location(場所)                           |
| ---------- | ---------------------------------------- |
| API テスト | [cypress/tests/api](./cypress/tests/api) |
| UI テスト  | [cypress/tests/ui](./cypress/tests/ui)   |
| 単体テスト | [`src/__tests__`](./src/__tests__)       |

## Database

- The local JSON database located in [data/database.json](./data/database.json) and is managed with [lowdb].

  - JSON DB は data/database.json にできる
  - 使ってる npm パッケージは lowdb

- The database is [reseeded](./data/database-seed.json) each time the application is started (via `yarn dev`). Database seeding is done in between each [Cypress End-to-End test](./cypress/tests).

  - db は起動の度に reseed(初期化 => seed)される
  - test 中の間 spec が実行される度に seed される

- Updates via the React frontend are sent to the [Express][express] server and handled by a set of [database utilities](backend/database.ts)

  - React からの更新は express サーバを通して backend/database.ts で handle される

- Generate a new database using `yarn db:seed`.

  - DB をリセットしたい時、 `yarn db:seed`

- An [empty database seed](./data/empty-seed.json) is provided along with a script (`yarn start:empty`) to view the application without data.
  - DB が空の状態でアプリをスタートしたい時は `yarn start:empty`

## Additional NPM Scripts

| Script         | Description                                                                                                                                                                       |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dev            | Starts backend in watch mode and frontend                                                                                                                                         |
| dev:auth0      | Starts backend in watch mode and frontend; [Uses Auth0 for Authentication](#auth0) > [Read Guide](http://on.cypress.io/auth0)                                                     |
| dev:okta       | Starts backend in watch mode and frontend; [Uses Okta for Authentication](#okta) > [Read Guide](http://on.cypress.io/okta)                                                        |
| dev:cognito    | Starts backend in watch mode and frontend; [Uses Cognito for Authentication](#amazon-cognito) > [Read Guide](http://on.cypress.io/amazon-cognito)                                 |
| dev:google     | Starts backend in watch mode and frontend; [Uses Google for Authentication](#google) > [Read Guide](https://docs.cypress.io/guides/testing-strategies/google-authentication.html) |
| start          | Starts backend and frontend                                                                                                                                                       |
| types          | Validates types                                                                                                                                                                   |
| db:seed        | Generates fresh database seeds for json files in /data                                                                                                                            |
| start:empty    | Starts backend, frontend and Cypress with empty database seed                                                                                                                     |
| tsnode         | Customized ts-node command to get around react-scripts restrictions                                                                                                               |
| list:dev:users | Provides id and username for users in the dev database                                                                                                                            |

実行例

```
$ yarn dev
```

- For a complete list of scripts see [package.json](./package.json)
  - 一覧は package.json の scripts へ

## Code Coverage Report

The Cypress Real-World App uses the [@cypress/code-coverage](https://github.com/cypress-io/code-coverage) plugin to generate code coverage reports for the app frontend and backend.

このアプリは [@cypress/code-coverage](https://github.com/cypress-io/code-coverage) プラグインを利用して、フロントエンドとバックエンドのコードカバレッジレポートをだす

To generate a code coverage report:

1. Run `yarn cypress:run --env coverage=true` and wait for the test run to complete.
2. Once the test run is complete, you can view the report at `coverage/index.html`.

方法は

```
$ yarn cypress:run --env coverage=true
# Macとかなら
$ open coverage/index.html
```

## 3rd Party Authentication Providers

Support for 3rd party authentication is available in the application to demonstrate the concept and commands needed for programmatic login.

サードパーティ認証のサポートは、プログラムによるログインに必要なコンセプトとコマンドを示すために、アプリケーションで利用可能

### Auth0

A [guide has been written with detail around adapting the RWA](http://on.cypress.io/auth0) to use [Auth0][auth0] and to explain the programmatic command used for Cypress tests.

Prerequisites include an Auth0 account and a Tenant configured for use with a SPA. Environment variables from Auth0 are to be placed in the [.env](./.env).

前提 1: Auth0 のアカウントが必要
前提 2: SPA として使うためのテナントが必要

.env に環境変数として入れて利用する

Start the application with `yarn dev:auth0` and run Cypress with `yarn cypress:open`.

Auth0 を有効にして起動する時

```
$ npx yarn dev:auth0
$ npx yarn cypress:open
```

The only passing spec on this branch will be the [auth0 spec](./cypress/tests/ui-auth-providers/auth0.spec.ts); all others will fail.

このブランチで通るテストは auth0 用だけで、残りは失敗する

### Okta

A [guide has been written with detail around adapting the RWA](http://on.cypress.io/okta) to use [Okta][okta] and to explain the programmatic command used for Cypress tests.

Prerequisites include an [Okta][okta] account and [application configured for use with a SPA][oktacreateapp]. Environment variables from [Okta][okta] are to be placed in the [.env](./.env).

前提 1: Okta のアカウントが必要
前提 2: SPA として使うためのアプリが必要

Start the application with `yarn dev:okta` and run Cypress with `yarn cypress:open`.

The **only passing spec on this branch** will be the [okta spec](./cypress/tests/ui-auth-providers/okta.spec.ts); all others will fail.

### Amazon Cognito

A [guide has been written with detail around adapting the RWA](http://on.cypress.io/amazon-cognito) to use [Amazon Cognito][cognito] as the authentication solution and to explain the programmatic command used for Cypress tests.

Prerequisites include an [Amazon Cognito][cognito] account. Environment variables from [Amazon Cognito][cognito] are provided by the [AWS Amplify CLI][awsamplify].

前提 1: Amazon Cognito のアカウントが必要

Start the application with `yarn dev:cognito` and run Cypress with `yarn cypress:open`.

The **only passing spec on this branch** will be the [cognito spec](./cypress/tests/ui-auth-providers/cognito.spec.ts); all others will fail.

### Google

A [guide has been written with detail around adapting the RWA](https://docs.cypress.io/guides/testing-strategies/google-authentication.html) to use [Google][google] as the authentication solution and to explain the programmatic command used for Cypress tests.

Prerequisites include an [Google][google] account. Environment variables from [Google][google] are to be placed in the [.env](./.env).

Start the application with `yarn dev:google` and run Cypress with `yarn cypress:open`.

The **only passing spec** when run with `yarn dev:google` will be the [google spec](./cypress/tests/ui-auth-providers/google.spec.ts); all others will fail.

## License

[![license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/cypress-io/cypress/blob/master/LICENSE)

This project is licensed under the terms of the [MIT license](/LICENSE).

[reactjs]: https://reactjs.org
[xstate]: https://xstate.js.org
[express]: https://expressjs.com
[lowdb]: https://github.com/typicode/lowdb
[typescript]: https://typescriptlang.org
[cypressdashboard]: https://dashboard.cypress.io/projects/7s5okt/runs
[material-ui]: https://material-ui.com
[okta]: https://okta.com
[auth0]: https://auth0.com
[oktacreateapp]: https://developer.okta.com/docs/guides/sign-into-spa/react/create-okta-application/
[cognito]: https://aws.amazon.com/cognito
[awsamplify]: https://amplify.aws
[google]: https://google.com
