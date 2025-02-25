# Express boilerplate

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Run locally](#run-locally)
- [Deployment](#deployment)
- [Installed Packages](#installed-packages)

##

## Overview

A lightweight Express boilerplate with SQLite and TypeScript, ready to use.

Features include JWT authentication, Zod validation, Jest testing, ESLint, Prettier, and TypeScript setup.

##

## Getting started

Clone the repository and install dependencies:

```
git clone https://github.com/camilledtr/express-boilerplate.git
cd express-boilerplate
pnpm install
```

Update the remote git repository:

```
git remote set-url origin <your-new-git-repo>

git remote -v
```

Update the author of the future commits:

```
git config --global user.name "<gh-username>"
git config --global user.email "<email>"

git config --global --list
```

Update the package.json meta data:
- name
- author
- private
- license


Commit the changes:

```
git add .
git commit -m "Initial commit"
git push
```

##

## Run locally

Copy the .env.example file to .env and set your environment variables:

```
cp .env.example .env
nano .env
```
##
Create a `private.key` file and define a private key value for JWT:

```
touch private.key
nano private.key
```

Enter any random string that is 12 or more characters long and save your changes.

##
Update the following files to set up the db:
- Init schema: `scripts/db/init.js`
- Fake data: `scripts/db/faker/data.js`
- Seed the db with fake data: `scripts/db/seed.js`


##
After having installed dependencies, set your environment variables and private key and created a SQLite database, run the development server:

```
pnpm dev
```

You can now test the default `GET http://localhost:8080` route.

Happy coding!

##

## Deployment

Build the project:

```
pnpm build
```

Start the server:

```
pnpm run start
```

This will run the compiled JavaScript code located in the `dist` folder.

##

## Installed Packages

#### Main dependencies

- [express](https://www.npmjs.com/package/express)
- [sqlite3](https://www.npmjs.com/package/sqlite3)
- [typescript](https://www.npmjs.com/package/typescript)

###
#### Middlewares

- [cors](https://www.npmjs.com/package/cors) (handle Cross-Origin Resource Sharing)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser) (parse cookies)
- [multer](https://www.npmjs.com/package/multer) (handle file uploads)

###
#### Testing

- [jest](https://www.npmjs.com/package/jest)
- [supertest](https://www.npmjs.com/package/supertest)
- [ts-jest](https://www.npmjs.com/package/ts-jest)

###
#### Other dependencies

- [zod](https://www.npmjs.com/package/zod) (data validation and parsing)
- [bcrypt](https://www.npmjs.com/package/bcrypt) (hash and compare passwords)
- [dotenv](https://www.npmjs.com/package/dotenv) (loads environment variables from a `.env` file)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) (generate and verify JWTs for authentication)
- [nodemon](https://www.npmjs.com/package/nodemon) (auto-reload for development)
