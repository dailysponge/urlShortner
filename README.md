<h1>Getting Started with Url Shortener</h1>
This guide will walk you through the steps necessary to set up a MongoDB Atlas database and spin up a frontend display.

Prerequisites
NodeJS version: v18.14.0 and above
PORT : 3000 (frontend) & 3001 (backend)
MongoDB Atlas Account
Node.js and NPM installed on your machine.

<h3>Installation</h3>

1.  Log in to MongoDB Atlas at https://www.mongodb.com/atlas/database and create a new database.
2.  Choose connection via Username & Password and Cloud Environment.
3.  Whitelist your current IP address.
4.  Under Database, connect to the created DB via "Connect your application" and obtain the connection string starting with "mongodb+srv://".
5.  Create a new file called .env from the template.env file in the root directory of this project.
6.  Paste the connection string into the MONGODB_URI variable of .env file.
7.  Fill up the BACKEND_PORT variable with 3001.
8.  Install the required dependencies by running the command npm install.
9.  Run the command `npm install` and `npm start` to spin up the frontend display.
10. Visit http://localhost:3000/ in your browser to view the frontend display.

<h3>Assumptions:<h3>

1.  The application is designed to be used by a single user only, and hence it does not include authentication features.
2.  The application is expected to be deployed with a custom domain name. However, during the development process, it may temporarily run on localhost for demonstration purposes. In this case, the QR code feature may not be applicable.
3.  URL Validation: The application assumes that the user will enter a valid URL in the input field. URL checks are performed to verify that the entered URL contains ".com" and is a reachable site. If the entered URL does not meet these criteria, the application will not generate a short URL and display an error message to the user.
4.  Timeout: When adding a new URL to the database, a maximum of 3 seconds is given before a timeout occurs. If the URL cannot be added to the database within this time frame, the application will not generate a short URL and display an error message to the user.

<h3>Notes on architecture diagram</h3>

The architecture diagram for this application is not provided in the README file. However, some key design decisions that were made during the development process are as follows:

1. NoSQL Database: For this application, a NoSQL database was used, specifically MongoDB. The reason for this is that NoSQL databases are known to be easily scalable and can support large amounts of queries. Additionally, MongoDB is a popular NoSQL database that is well-documented and has good community support.
2. Hashing: The shortid library was used for generating unique identifiers for the URLs in this application. This library generates unique identifiers that are 9 characters long. These identifiers are used to create short URLs that can be easily shared and accessed by users. Hashing is important for security reasons, as it makes it difficult for malicious users to guess the URLs and access sensitive information.
