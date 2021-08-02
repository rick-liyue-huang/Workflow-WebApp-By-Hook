## Team Workflow Online App

### Project Configuration

This project is configured by create-react-app frameworks with typescript template, where all the basic typescript
setting are confirmed in 'tsconfig.json' file. In order to compatible with direction looking up, I add `"baseUrl": ". /src"` on top of it, all the imported file absolute path will go to 'src' directory. Based on the teamwork
performance, the whole project will be formatted by prettier, and run `echo {}> .prettierrc.json` to add '.
prettierrc.json' and also ignore some files including in '.prettierignore'. In order to ensure the whole project
team keep the same coding styles, I use eslint by `npx mrm@2 lint-staged ` and install
'eslint-config-prettier' to make ESLint and Prettier play nice with each other by coding `"extends": [ "react-app", "react-app/jest", "prettier" ]`. One more thing is about the commit comments in professional form, so I will use
'commitlint' by coding `yarn add @commitlint/config-conventional @commitlint/cli -D ` and `echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js`, and `npx husky add .husky/commit-msg "yarn commitlint --edit $1"`.
