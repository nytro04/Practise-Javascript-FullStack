## Getting Started

To get you started you can simply clone the repository:

```
git clone https://github.com/nytro04/Practise-Javascript-FullStack.git
```

and install the backend dependencies

```
npm install
```

install the frontend dependencies

```
npm run client-install
```

### Prerequisites

You need git to clone the repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

A number of node.js tools is necessary to initialize and test the project. You must have node.js and its package manager (npm) installed. You can get them from [http://nodejs.org/](http://nodejs.org/). The tools/modules used in this project are listed in package.json and include express, mongodb and mongoose.

#### MongoDB

The project uses MongoDB as a database. If you are on Mac and using Homebrew package manager the installation is as simple as `brew install mongodb`.

### Start the MongoDB server

First we need to create the `db` directory where the database files will live in. In your terminal navigate to the `root` of your system by doing `cd ~` . You can create the directory by running `sudo mkdir -p /data/db`. Now open a different tab in your terminal and run `mongod` to start the Mongo server.

### Run the Application

The project is the Backend and Frontend for the Practical Test for FullStack Javascript. The simplest way to start this server is:

    npm run dev

To run the development server

### Generate API documentation

Navigate to localhost:8888/api-docs for the API documentation
