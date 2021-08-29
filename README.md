Introduction....

## 1.Project Configuration

This project is configured by 'create-react-app' frameworks with typescript template, where all the basic typescript setting are confirmed in 'tsconfig.json' file. In order to compatible with direction looking up, I add "baseUrl": ". /src" on top of it, all the imported file absolute path will go to 'src' directory. Based on the teamwork performance, the whole project will be formatted by prettier, and run `echo {}> .prettierrc.json` to add '.prettierrc.json' and also ignore some files including in '.prettierignore'. In order to ensure the whole project team keep the same coding styles, I use eslint by `npx mrm@2 lint-staged` and install 'eslint-config-prettier' to make ESLint and Prettier play nice with each other by coding `"extends": [ "react-app", "react-app/jest", "prettier" ]`. One more thing is about the commit comments in professional form, so I will use 'commitlint' by coding `yarn add @commitlint/config-conventional @commitlint/cli -D` and echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js, and npx husky add .husky/commit-msg "yarn commitlint --edit $1".

2.Building the backend environment for development envieronment
In the first stage, I will use 'json-server' to mock the backend database server, and the backend URI lookup is based on Restful API. Install the json-server by npm install -g json-server and created the backend database file of 'db.json'. I create the script order of "json-server": "json-server --watch \__json_server_mock_file_/db.json --port 3001" to run the mock database file.
In the second stage, I will use dev-tool named 'localstorage-console-tool', through which the database will be stored and controlled in webpage localstorage. The specific installation and configuration follows as below: npm install git+https://github.com/rick-liyue-huang/localstorage-console-tool.git --legacy-peer-deps and add the 'mockServiceWorker.js' in '/public' directory.

3.Create the Project List and Login page in the initial stage
The project list is created in 'screens/projectList' directory, and acted as part of 'authenticated-app.tsx', which means that these page will be shown after login. Through this project, I need create some utilities in 'utils' directory, in which 'cleanObject' used to omit 'key === 0' status, 'useMount' and 'useDebounce' are custom hoods. In the directory of 'screens/login' I create the login page and test whether it is working by custom middleware in 'json_server_mock_file/middleware.js'.

4.Refactor the Project List and Login page in the second stage
Using 'json-server' in development stage is fine, but we cannot still use it in production stage, so here I use the localstorage to store and config the account authentication status through 'localstorage-console-tool' from my github. After I use this framework, I can store the user information in page localstorage and do not care the additional backend database tools.
In order to use 'localstorage-console-tool' I need to import it in 'src/index.tsx':
loadServer(() =>
ReactDOM.render(
<React.StrictMode>
<AppProviders>
<DevTools />
<App />
</AppProviders>
</React.StrictMode>,
document.getElementById("root")
)
);

just the page will change with additional 'dev console table'.
In order to let website know who logins, we should set the window.localStorage as 'user.token' and should bring it with login and register, and I realize it in 'src/auth-providers.ts', which is the base of project context created in 'src/context' directory, finally I create the 'AuthContext' and wraps the whole components in 'src/index.tsx'. The created 'authenticated-app.tsx' will point to 'projectList' directory and the 'unauthenticated-app' directory will include the 'login' and 'register' files.

5.Using Ant design to beautify the project
Here I will use ant design, emotion.sh and craco to beautify the whole project, and also need modify the 'package. json', add add craco configuration file by 'craco.config.js', in which I can set the project global style.
"scripts": {
"start": "craco start",
"build": "craco build",
"test": "craco test",
"start-previous": "react-scripts start",
"build-previous": "react-scripts build",
"test-previous": "react-scripts test",
"eject": "react-scripts eject",
"prepare": "husky install",
"json-server": "json-server --watch **json_server_mock_file**/db.json --port 3001 --middlewares **json_server_mock_file**/middleware.js"
},
Besides Using Ant Design and Emotion.sh to beautify the single components, I also use grid and flex to design the whole project outline, the basic outline is followed as:
const Container = styled.div`display: grid; grid-template-rows: 6rem 1fr 6rem; grid-template-columns: 20rem 1fr 20rem; grid-template-areas: "header header header" "nav main aside" "footer footer footer"; height: 100vh;`;
const Header = styled.header`grid-area: header`;
const Main = styled.main`grid-area: main`;
const Nav = styled.nav`grid-area: nav`;
const Aside = styled.aside`grid-area: aside`;
const Footer = styled.footer`grid-area: footer`;
One more modification is to import 'react-query' and modify the 'context/index.tsx',
export const AppProviders = ({ children }: { children: ReactNode }) => {
return (
<QueryClientProvider client={new QueryClient()}>
<AuthProvider>{children}</AuthProvider>
</QueryClientProvider>
);
};
