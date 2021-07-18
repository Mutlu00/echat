<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!--
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->

<!-- PROJECT LOGO -->
<p align="center">
  <a href="https://github.com/Don-Cryptus/echat">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">eChat</h3>

  <p align="center">
    Find some fun people to play with and have a good time.
    <br />
    <a href="#about-the-project"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://aktoryes.de/">View Demo</a>
    ·
    <a href="https://github.com/Don-Cryptus/echat/issues">Report Bug</a>
    ·
    <a href="https://github.com/Don-Cryptus/echat/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started-development">Getting Started Development</a>
      <ul>
        <li><a href="#prerequisites-development">Prerequisites Development</a></li>
        <li><a href="#installation-development">Installation Development</a></li>
      </ul>
    </li>
        <li>
      <a href="#getting-started-production">Getting Started Production</a>
      <ul>
        <li><a href="#prerequisites-production">Prerequisites Production</a></li>
        <li><a href="#installation-production">Installation Production</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

# About The Project

This Project will be something between epal.gg or battlebuddy.gg

## Built With

- Server

  - [postgres](https://www.npmjs.com/package/pg)
  - [graphql](https://www.npmjs.com/package/graphql)
  - [typescript](https://www.npmjs.com/package/typescript)
  - [express](https://www.npmjs.com/package/express)
  - [apollo-server-express](https://www.npmjs.com/package/apollo-server-express)
  - [type-graphql](https://www.npmjs.com/package/type-graphql)
  - [typeorm](https://www.npmjs.com/package/typeorm)
  - [nodemailer](https://www.npmjs.com/package/nodemailer)
  - [cloudinary](https://www.npmjs.com/package/cloudinary)

- Web
  - [typescript](https://www.npmjs.com/package/typescript)
  - [react](https://www.npmjs.com/package/react)
  - [tailwindcss](https://www.npmjs.com/package/tailwindcss)
  - [graphql](https://www.npmjs.com/package/graphql)
  - [@apollo/client](https://www.npmjs.com/package/@apollo/client)
  - [next](https://www.npmjs.com/package/next)

<!-- GETTING STARTED DEVELOPMENT  -->

# Getting Started Development

This is an example of setting up your project locally.
To get a local copy up and running follow these simple example steps.

## Prerequisites Development

This project requires NodeJS (version 14 or later), Postgres and Yarn. Node and Postgres are really easy to install. To make sure you have them available on your machine, try running the following command.

- node

  ```sh
  node -v
  v16.5.0
  ```

- postgres
  ```sh
  psql -help
  ```

To install yarn type:

- yarn
  ```sh
  npm i yarn -g
  ```

(Optional) You will need to have a SMPT Email and a Cloudinary account to use the API for Emails & Images

## Installation Development

- Clone the repo

  ```sh
  git clone https://github.com/Don-Cryptus/echat/
  cd echat/
  code .
  ```

  ```diff
  + Run 2 Terminals at the same time, one for Server & one for Web
  ```

### Server Development

1. Install Server NPM packages

   ```sh
   cd server/
   yarn
   ```

2. `./server/.env` File
   ```diff
   - Be sure too create `.env` file as explained in the `.env.development`
   ```

3. Run server
   ```sh
   yarn dev
   ```

### Web Development

1. Install Web NPM packages
   ```sh
   cd web/
   yarn
   ```

2. `./web/src/constants.ts` File
   ```diff
   - change GRAPHQL_SERVER_URL to your specified port in the ./server/.env file
   ```

3. Run Web
   ```sh
   yarn dev
   ```
<!-- 4. Enter your API in `config.js`
   ```JS
   const API_KEY = 'ENTER YOUR API';
   ``` -->

# Getting Started Production

This is an example of setting up your project on the web.
To get the local copy up and running on the web follow these simple example steps.

## Prerequisites Production

This project requires preferrably a Ubuntu Linux VPS (version 20 or later), nginx, nodejs, postgres, github actions, docker. We will be going over each step individually.

- node

  ```sh
  node -v
  v16.5.0
  ```

- postgres
  ```sh
  psql -help
  ```

To install yarn type:

- yarn
  ```sh
  npm i yarn -g
  ```

## Installation Production

- Clone the repo
  ```sh
  git clone https://github.com/Don-Cryptus/echat/
  cd echat/
  code .
  ```

Run 2 Terminals at the same time, one for Server & one for Web

### Server

1. Install Server NPM packages
   ```sh
   cd server/
   yarn
   ```
2. Run server
   ```sh
   yarn dev
   ```

### Web

1. Install Web NPM packages
   ```sh
   cd web/
   yarn
   ```
2. Run Web
   ```sh
   yarn dev
   ```

<!-- USAGE EXAMPLES -->

# Usage

Register, Login chat with a gamer, book them and play with them.

_For more examples, please refer to the [FAQ](https://aktoryes.de/)_

<!-- ROADMAP -->

# Roadmap

See the [open issues](https://github.com/Don-Cryptus/echat/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

# Contributing

Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

# License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

# Contact

Your Email - don.cryptus@gmail.com

Project Link: [https://github.com/Don-Cryptus/echat/](https://github.com/Don-Cryptus/echat/)
