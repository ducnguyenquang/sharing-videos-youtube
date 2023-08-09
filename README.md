# Funny Movie - Youtube Video Sharing App

## 1. Introduction:
The project help us to storage / sharing youtube video. It easy to track interesting videos and watching it another place
- Login / Logout
- List video after sharing
- Shared videos by link

## 2. Prerequisites:
- DynamoDB
- YouTube Data API v3 (get information of youtube video)
- NextJS
- Vercel (server to deploy)

## 3. Installation & Configuration:
- Active YouTube Data API v3:
```bash
To get information about a YouTube video, such as its title and description, you can use the YouTube Data API. The API allows you to retrieve data from YouTube programmatically, including details about videos, channels, playlists, and more.

Here are the general steps to get the information of a YouTube video using its URL:

Get API key: First, you need to obtain an API key from the Google Developer Console. Follow these steps to get an API key:
- Go to the Google Developer Console: https://console.developers.google.com/
- Create a new project or select an existing one.
- Enable the YouTube Data API v3 for your project.
- Create credentials for your project and select "API key."

Use the API: Once you have your API key, you can make a request to the YouTube Data API to get the video information using the video URL. There are various ways to use the API, such as through HTTP requests, client libraries, or SDKs.
```
- Get AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION:
```bash
To obtain the AWS_ACCESS_KEY_ID, you need to create an AWS IAM user and generate access keys for that user. Here is a step-by-step guide on how to do it:

- Sign in to the AWS Management Console:
Log in to your AWS account using your username and password.

- Open the IAM Console:
In the AWS Management Console, navigate to the IAM service. You can either use the search bar to find "IAM" or locate it under the "Security, Identity & Compliance" section.

- Create a New IAM User:
In the IAM dashboard, click on "Users" from the left-hand navigation pane, then click the "Add user" button.

- Provide User Details:
Enter a username for the new IAM user. You can choose to give this user programmatic access (for using AWS CLI, SDKs, etc.), AWS Management Console access (to sign in to the AWS Management Console), or both.

- Set Permissions:
On the "Set permissions" page, you can either choose to add the user to a group with predefined permissions or directly attach policies to the user. If this user needs specific permissions, you can create a custom policy and attach it here.

- Review:
Review the user details and the permissions assigned, then click "Create user."

- View Access Key:
After the user is created, you will be presented with a success message, and you will see the AWS_ACCESS_KEY_ID and the corresponding AWS_SECRET_ACCESS_KEY. These are the credentials you will use to authenticate the IAM user and access AWS resources programmatically.

Important Notes:
The AWS_SECRET_ACCESS_KEY is a sensitive piece of information, and you should store it securely. Never share your access key credentials in public forums or repositories.
It is a good practice to assign the least privilege principle, granting only the necessary permissions to the IAM user.
Regularly rotate your access keys for security purposes.
If you lose or forget your access keys, you can generate new ones by deactivating the old keys and creating new ones for the IAM user.
```
## 4. Database Setup:
- Create 2 tables in DynamoDB (User, Videos table)
```bash
  User Table
  - Table name: yvs_users
  - Primary key: email 
```
```bash
  Video Table
  - Table name: yvs_videos
  - Primary key: id 
```

## 5. Running the Application:
We can start project in locally with command below
```bash
  npm i
  npm run dev 
```
after we can run project with [link](http://localhost:3000)

## 6. Usage:
We can see all shared videos when we go to the dashboard. If we need shared videos, we need input your email and password to login or register new account.
we can go to shared video page when click the "Share a movie" button near by our email on top right browser. 

## 7.	Troubleshooting:
- you need the env file `.env` with structure below (please replace your key). How can you get them please refer above `"3. Installation & Configuration"`
```bash
  AWS_ACCESS_KEY_ID=<YOUR_AWS_ACCESS_KEY_ID>
  AWS_SECRET_ACCESS_KEY=<YOUR_AWS_SECRET_ACCESS_KEY>
  AWS_REGION=<YOUR_AWS_REGION>
  GOOGLE_API_KEY=<YOUR_GOOGLE_API_KEY>
```