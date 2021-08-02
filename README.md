## Team Workflow Online App

### Project Configuration

This project is configured by create-react-app frameworks with typescript template, where all the basic typescript
setting are confirmed in 'tsconfig.json' file. In order to compatible with direction looking up, I add `"baseUrl": ". /src"` on top of it, all the imported file absolute path will go to 'src' directory. Based on the teamwork
performance, the whole project will be formatted by prettier, and run `echo {}> .prettierrc.json` to add '.
prettierrc.json' and also ignore some files including in '.prettierignore'. In order to ensure the whole project
team keep the same coding styles, I use eslint by `npx mrm@2 lint-staged ` and install
'eslint-config-prettier' to make ESLint and Prettier play nice with each other by coding `"extends": [ "react-app", "react-app/jest", "prettier" ]`. One more thing is about the commit comments in professional form, so I will use
'commitlint' by coding `yarn add @commitlint/config-conventional @commitlint/cli -D ` and `echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js`, and `npx husky add .husky/commit-msg "yarn commitlint --edit $1"`.

### Building the backend environment for development envieronment

Here I will use 'json-server' to mock the backend database server, and the backend URI lookup is based on Restful
API. Install the json-server by `npm install -g json-server` and created the backend database file of 'db.json'. I
create the script order of `"json-server": "json-server --watch __json_server_mock_file_/db.json --port 3001"` to
run the mock database file.
