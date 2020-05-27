# Static File Server

> This project, allows the uploaded files to your applications to be stored and management. [MongoDB GridFS technology](https://docs.mongodb.com/manual/core/gridfs/) used for storing and retrieving files. The RESTful API layer is written with [ExpressJS](https://expressjs.com/).

<a><img src="https://raw.githubusercontent.com/sametsahindogan/static-file-server/master/docs/node-express-mongo.png"></a>

## What is MongoDB's GridFS

[From Documentation](https://docs.mongodb.com/manual/core/gridfs/): "Instead of storing a file in a single document, GridFS divides the file into parts, or chunks, and stores each chunk as a separate document. By default, GridFS uses a default chunk size of 255 kB; that is, GridFS divides a file into chunks of 255 kB with the exception of the last chunk. The last chunk is only as large as necessary. Similarly, files that are no larger than the chunk size only have a final chunk, using only as much space as needed plus some additional metadata."

## Installation

clone from repository
```bash
git clone https://github.com/sametsahindogan/static-file-server.git
```
install dependencies
```bash
npm install
```
start server
```bash
npm start
```
## Configuration

You need to create own `.env` file. 

```env
APP_URL=http://localhost:3000
APP_PORT=3000

DB_HOST=127.0.0.1
DB_PORT=27017
DB_NAME=static_server
DB_USER=
DB_PASS=

MAX_UPLOAD_FILE=16 # The number of files that can be uploaded at once. 
MAX_UPLOAD_SIZE=64 # Maximum upload size.
JWT_PRIVATE_KEY=0wCNwGRwJ58sJdZBzUNyP6ogJVSw2OzoTYhDNl5Cnvz8rWfok5Y0yPPA2Uy2HXFj
```

## Create User

Firstly, you need to create an user for your application. You will use these credentials for basic auth.

If you are going to use a single static-file-server for multiple applications, it is recommended to create a user for each application.

```bash
npm run-script create-user <username> <api_key> <api_secret>
```
![Gif](/docs/createuser.gif)

# Usage

Application usages is pretty simple. It consists of 5 different endpoint. 

## Get Token

Only can used with **Basic Auth**.

**Expire** is used to determine how many minutes the token will be valid.

**Example Request;**
```
URL: http://localhost:3000/token
METHOD: GET
PARAMS: ?expire=10

E.g: http://localhost:3000/token?expire=10
```
The received **token** can be transmitted to other endpoints under the name **"token"** in the query string, header or body.

**Example Response;**
```json
{
    "succes": true,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiNTlmMTA4NTBmZmY3OWEzMzQzYTQzNWMwMjBhOGRiM2UiLCJhcGlfc2VjcmV0IjoiZWM4ZDE1OTA1ZWYzZTEzMTBiMThhYjIyM2FmMWM4ZjUzY2ZhOGUzMGE2NzU3YzVlYTVhMDI0MzJkZDQ4ZTkxNCIsImV4cCI6MTU5MDU4Mzk0MiwiaWF0IjoxNTkwNTgwOTQyfQ.wnpowIaqULFXGwFKvqcTCfOs-nuea99ZNLnfGV-uq0k"
    }
}
```
## Upload Files

The request must be transmitted as **multipart/form-data**. Files should be sent under the **"upload"** parameter in the request body.

If the **private** option in the query string is sent as **1**, the files are uploaded privately and only users who upload these files can access them with **Basic Auth** or **JWT Token**.

You can send the token in header, body or query parameter. Or you can send credentials with basic authentication.

**Example Request;**
```
URL: http://localhost:3000/files
METHOD: POST
BODY: "upload" as multipart/form-data
PARAMS: ?private=0&token=jwtToken

E.g: http://localhost:3000/files?private=0&token=jwtToken
```
**Example Response;**
```json
{
    "succes": true,
    "data": [
        {
            "file": "test.png",
            "url": "http://localhost:3000/files/5edd8e545366227f0e1f15fd1281b3f40f115266210bac6cb766d467074018b4",
            "path": "5edd8e545366227f0e1f15fd1281b3f40f115266210bac6cb766d467074018b4"
        }
    ]
}
```
In the return parameters, the **"url"** section can be used to directly access the file.

**Path** part can be used in other endpoints (such as file deletion).

## Get Public Files

Anyone who knows the URL can access these files.
If the **download** option in the query string is sent as 1, the file are download directly.

It should be used with the **"path"** variable returned from the upload endpoint.

**Example Request;**
```
URL: http://localhost:3000/files/{path}
METHOD: GET
PARAMS: ?download=0 

E.g: http://localhost:3000/files/5edd8e545366227f0e1f15fd1281b3f40f115266210bac6cb766d467074018b4?download=0
```

## Get Private Files

Only users who upload these files can access them with **Basic Auth** or **JWT Token**.

You can send the token in header, body or query paramater. Or you can send credentials with basic authentication.

It should be used with the **"path"** variable returned from the upload endpoint.

**Example Request;**
```
URL: http://localhost:3000/files/p/{path}
METHOD: GET
PARAMS: ?download=0&token=jwtToken

E.g: http://localhost:3000/files/p/5edd8e545366227f0e1f15fd1281b3f40f115266210bac6cb766d467074018b4?download=0&token=JwtToken
```
## Delete File

Can be used with **Basic Auth** or **JWT Token**.

It should be used with the **"path"** variable returned from the upload endpoint.

**Example Request;**
```
URL: http://localhost:3000/files/{path}
METHOD: DELETE
PARAMS: ?token=jwtToken

E.g: http://localhost:3000/files/p/5edd8e545366227f0e1f15fd1281b3f40f115266210bac6cb766d467074018b4?token=jwtToken
```

## Postman Export

You can use this [export](https://raw.githubusercontent.com/sametsahindogan/static-file-server/master/docs/static-file-server.postman_collection.json).

## License
MIT © [Samet Sahindogan](https://github.com/sametsahindogan/static-file-server/blob/master/LICENSE)