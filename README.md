<h1 align="center">
🌐 College Administration System
</h1>
<p align="center">
MongoDB, Expressjs, React, Nodejs
</p>

> The software facilitates managing the entire registration and admission 
procedure of students. There are categories of user Admin, Faculty and Student
. Users can register, login and view the student profiles based on 
permission level of account used.  


## clone or download

```terminal
$ git clone https://github.com/prajyotzankar/attendance-mern.git
```
## Project Status
> Underdevelopment 


## Project Structure

```terminal
frontend/
   package.json
   .env (create you own .env, check [prepare your secret session])
   public (default files created by create-react-app)
   src/ (Frontend code of project)
        components/
            -[x] Authentication/
                    -[x] Forgot Password
                    -[x] Login
                    -[x] Registration
            -[x] ShowStudentInfo (filter students by school, course, year and list by PRN)
            -[x] StudentAdmitForm 

backend/
    package.json
    .env (create you own .env, check [prepare your secret session])
    public (default files created by create-react-app)
    src/ (Frontend code of project)
        -[x] middleware (eg. JWT verify, Send Email)
        -[x] models (Mongo models)
        -[x] routes (This holds all of our HTTP to URL path associations for each unique url)

```

## Prerequisites
- [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- [Node](https://nodejs.org/en/download/) ^16.15.1
- [npm](https://nodejs.org/en/download/package-manager/)

## Notice
 You need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3000)

```terminal
$ cd frontend   // go to client folder
$ npm i       // npm install packages
$ npm start // run it locally

// deployment for client app
$ npm run build // this will compile the react code using webpack and generate a folder called docs in the root level
$ npm run start // this will run the files in docs, this behavior is exactly the same how gh-pages will run your static site
```

## Server-side usage(PORT: 5000)

### Prepare your secret
You need to add follow variables in .env:
<ol>
  <li>ATLAS_URI - MongoDB Atlas</li>
  <li>JWT_SECRET_KEY</li>
  <li>JWT_KEY_EXPIRE</li>
  <li>FRONTEND_AUTH_URL - ${Client_BASE_URL}/authentication</li>
  <li>Send Email variables
    <ol>
        <li>EMAIL_SERVICE</li>
        <li>EMAIL_USERNAME</li>
        <li>EMAIL_PASSWORD</li>
        <li>EMAIL_FROM</li>
    </ol>
  </li>
</ol>

### Start

```terminal
$ cd server   // go to server folder
$ npm i       // npm install packages
$ npm server // run it locally
$ npm run build // this will build the server code to es5 js codes and generate a dist file
```


## Dependencies(tech-stacks)

| Client-side                   | Server-side           |
| ----------------------------- | --------------------- |
| axios: ^0.27.2                | bcryptjs: ^2.4.3      |
| bootstrap: ^5.1.3             | jsonwebtoken: ^8.5.1  |
| react: ^18.2.0                | cors: ^2.8.1          |
| react-dom: ^18.2.0            | dotenv: ^16.0.2       |
| react-router-dom: ^6.3.0      | express: ^4.18.1      |
| react-scripts: ^2.1.3         | mongoose: ^6.4.4      |
| web-vitals: ^2.1.4            | nodemailer: ^6.7.8    |

# Screenshots of this project


## Standard

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## BUGs or comments

[Create new Issues](https://github.com/prajyotzankar/attendance-mern/issues) (preferred)

Email Me: zankarprajyotsushil@gmail.com (welcome, say hi)

## Author

[Prajyot Zankar](https://www.linkedin.com/in/prajyotzankar/)

### License

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/prajyotzankar/attendance-mern/blob/master/LICENSE.md)
