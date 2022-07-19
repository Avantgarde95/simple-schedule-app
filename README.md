## How to run

Must install

- [Node.js](https://nodejs.org/)
- [yarn (yarn classic)](https://classic.yarnpkg.com/en/docs/install)

Recommended to install

- [React devtools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=ko)
- [VSCode Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Install the dependencies

- Run `yarn`

Run in the development mode

- Run `yarn dev`
- Open <http://localhost:3000> on the browser

Run in the production mode

- Run `yarn build`
- Run `yarn start`

Check the code

- Run `yarn lint`
- Run `yarn lint:fix` to check & fix

## APIs

- `/api/schedules`
  - GET: Get the array of schedules' IDs
  - DELETE: Remove all schedules
- `/api/schedule`
  - POST (body: content, ...): Create a schedule
  - PATCH (query: id, body: content, ...): Update the schedule
  - DELETE (query: id): Delete the schedule
