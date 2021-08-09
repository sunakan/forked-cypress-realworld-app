このリポジトリは [cypress-io/cypress-realworld-app](https://github.com/cypress-io/cypress-realworld-app) の fork したリポジトリ

勝手に意訳したり、コードリーディングでのメモをしたり勉強用のリポジトリ

| Tool                   | 役割                                             | バッジ                                                                                                                                                                                                              |
| :--------------------- | :----------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| CircleCI               | CI                                               | [![CircleCI](https://circleci.com/gh/sunakan/forked-cypress-realworld-app/tree/suna-main.svg?style=shield)](https://circleci.com/gh/sunakan/forked-cypress-realworld-app/tree/suna-main)                            |
| Cypress ダッシュボード | Cypress のテストレポート                         | [![Cypressが作ってくれたRealWorldApp](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/detailed/39p3u5/suna-main&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/39p3u5/runs) |
| Percy                  | Cypress で撮ったスクショをブラウザ毎に一覧できる | [![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/68136805/Cypress-RealWorldApp)                                                  |
| Codecov                | Cypress で測ったカバレッジのレポート             | [![codecov](https://codecov.io/gh/sunakan/forked-cypress-realworld-app/branch/suna-main/graph/badge.svg?token=BHLDJDR33B)](https://codecov.io/gh/sunakan/forked-cypress-realworld-app)                              |
| CodeClimate            | コードのメンテナンス性                           | [![Maintainability](https://api.codeclimate.com/v1/badges/0a6daea2f542ad5dc1b0/maintainability)](https://codeclimate.com/github/sunakan/forked-cypress-realworld-app/maintainability)                               |

<p align="center">
A payment application to demonstrate <strong>real-world</strong> usage of <a href="https://cypress.io">Cypress</a> testing methods, patterns, and workflows.

Cypress のテスト手法、パターン、ワークフローを実際に使用して実証するための決済アプリケーション

</p>

<p align="center">
  <img style='width: 70%' alt="Cypress Real World App" src="./public/img/rwa-readme-screenshot.png" />
</p>

> 💬 **Note from maintainers**(メンテナのメモ)
>
> このアプリはデモ・教育を目的にしてる

> 設定と構成は本番と似ているかも知れないけど、本格的じゃない

> アプリは Cypress を使ったテストの学習、実験、改造、練習に使ってください
>
> Happy Testing

---

## Features

| Feature                                    | 補足                      |
| :----------------------------------------- | :------------------------ |
| [TypeScript][typescript]                   |                           |
| [Express][express]と[React][reactjs]       |
| [XState][xstate]                           | 状態遷移を表現            |
| [lowdb][lowdb]                             | json ファイルで db を表現 |
| [Material-UI][material-ui]                 |                           |
| DB に依存しない                            |                           |
| ローカルで認証                             |                           |
| E2E テストでの DB seeding                  |                           |
| CI + [Cypress Dashboard][cypressdashboard] |                           |

## Getting Started

アプリには、database.json が付属されており、アプリ起動後すぐにテストを始めるにあたって必要なものが全部入ってる!!

超便利!!!

> 🚩 **Note**
>
> サンプルアプリのユーザーのどれかログイン可能
>
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

| 前提環境 | バージョン |
| :------- | :--------- |
| Node.js  | 14         |

正確なバージョンについては、.node-version ファイルを参照

TypeScript は、プロジェクトの依存関係としてローカルに追加されるので、インストールする必要はなし

### (依存関係の)インストール

```shell
$ yarn install
# or
$ npx yarn install
```

### アプリの起動

```shell
$ npx yarn dev
```

| 側             | ポート番号 | .env の変数の対応        |
| :------------- | :--------- | :----------------------- |
| フロントエンド | 3000       | `REACT_APP_PORT`         |
| バックエンド   | 3001       | `REACT_APP_BACKEND_PORT` |

でもコミットはしないで(CI のため)

### Cypress の始め方

```shell
$ yarn cypress:open
# or
$ npx yarn cypress:open
```

> 🚩 **Note**
>
> もしデフォルトのポート番号(3000) を変更した時、cypress.json の方も変更すること
>
> 3 つのプロパティの更新が必要(baseUrl と apiUrl と url)
>
> 例： .env の `REACT_APP_PORT` を 13000, `REACT_APP_BACKEND_PORT` を 13001 に変更した時、cypress.json は以下のような感じになる
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
> CI 環境では、デフォルトポートで実行されることを期待されているので、 `cypress.json` を更新して commit するのは避ける

## Tests

| Type(種類) | Location(場所)                           |
| ---------- | ---------------------------------------- |
| API テスト | [cypress/tests/api](./cypress/tests/api) |
| UI テスト  | [cypress/tests/ui](./cypress/tests/ui)   |
| 単体テスト | [`src/__tests__`](./src/__tests__)       |

## DB

- JSON DB は data/database.json にできる
- 使ってる npm パッケージは lowdb
- seed ファイルは ./data/database-seed.json
- test 中の間 spec が実行される度に seed される
- React からの更新は express サーバを通して backend/database.ts で handle される
- DB をリセットしたい時、 `yarn db:seed`
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

一覧は package.json の scripts へ

## コードカバレッジレポート

CircleCI の [@cypress/code-coverage](https://github.com/cypress-io/code-coverage) プラグインを利用してカバレッジレポートを出す

手元での方法は

```
$ yarn cypress:run --env coverage=true
# Macとかなら
$ open coverage/index.html
```

## 開発-バックエンド

```
$ npx yarn run start:api
```

## 3rd Party 認証プロバイダ

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
