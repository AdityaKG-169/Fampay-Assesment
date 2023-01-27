# Fampay Assignment Server

This is the code for the assignment presented by Fampay.
The repository contains the code for the server side of the assignment (There is no client side code).

## Introduction

The server is built using NodeJS and ExpressJS. On starting the server, it runs a cron job that fetches the latest videos from YouTube through its API. The cron job runs every 1 minute. The videos are stored in a MongoDB database. The server also exposes an API endpoints that returns the videos stored in the database in the required format.

## Setup Without Docker

To successfully run the server, you need to have Git, NodeJS and MongoDB installed on your system. If you don't have them installed, you can install them from the following links:

- [NodeJS](https://nodejs.org/en/download/)
- [MongoDB](https://docs.mongodb.com/manual/installation/)
- [Git](https://git-scm.com/downloads)

You can also proceed with the installation without installing Git. You can download the code as a zip file from the GitHub repository.

**Step 1:** To install the server run the following commands:

```bash
> git clone https://github.com/AdityaKG-169/Fampay-Assesment
> cd Fampay-Assesment
> npm install
```

After installing the dependencies, you need to add the MongoDB connection string and the YouTube API keys in the `.env` file. You can get the MongoDB connection string from the MongoDB Atlas website. You can get the YouTube API keys from the Google Cloud Platform website. You can add multiple YouTube API keys in the `.env` file. The server will automatically use the next API key if the quota for the current API key is exceeded.

**Step 2:** To set the environment variables, create a file named `.env` in the root directory of the project and add the following lines to it:

```bash
MONGO_URI=<Your MongoDB connection string>
YOUTUBE_API_KEYS=<Your YouTube API keys separated by commas>
```

**Step 3:** After setting the environment variables, you can start the server by running the following command:

```bash
> npm run build
> npm start
```

## Setup With Docker

To successfully run the server, you need to have Git and Docker installed on your system. If you don't have them installed, you can install them from the following links:

- [Docker](https://docs.docker.com/get-docker/)
- [Git](https://git-scm.com/downloads)

You can also proceed with the installation without installing Git. You can download the code as a zip file from the GitHub repository.

Step 1 and Step 2 are the same as the steps in the previous section. You can skip them.

In the `.env` file, change the value of `MONGO_URI` to `mongodb://mongo_db:27017/fampay_assesment`. This is because the MongoDB container is named `mongo_db` and the database name is `fampay_assesment`.

**Step 3:** After setting the environment variables, you can start the server by running the following command:

```bash
> sudo docker-compose up -d
```

## API Endpoints

The server exposes the following API endpoints:

- `GET /api/v1/videos/` - Returns the videos stored in the database in the paginated format.

To get custom results, you can use the following query parameters:

- `page` - The page number of the results. Default value is `1`.
- `sortBy` - The order to sort the results in. The value can be `asc` or `desc`. Default value is `desc`. The results are sorted by the `publishedAt` field.
- `query` - The search query to filter the results by. Default value is `null`.

If no query parameters are passed, the server returns the first 10 results sorted by the `publishedAt` field in descending order.

**Example Request:**

```bash
> curl -X GET http://localhost:8080/api/v1/videos/?page=1&sortBy=desc&query=cricket
```

## Fixing common errors

- If you get an error saying `MongoDB connection failed`, make sure that you have MongoDB installed and running on your system.
- If you get an error saying `No MongoDB connection string found`, make sure that you have added the MongoDB connection string in the `.env` file.
- If you get an error saying `No YouTube API keys found`, make sure that you have added the YouTube API keys in the `.env` file.
- If you get an error saying `Quota exceeded / Invalid Key, trying again with a different api key` while running the server, make sure that you have added at least 2 YouTube API keys in the `.env` file.
- For any other errors, please create an issue on the GitHub repository with the error message and the steps you followed to get the error.
