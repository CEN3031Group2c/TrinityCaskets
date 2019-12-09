# Trinity Caskets
## Description
A website for Trinity Caskets Store and More. Using a MERN stack, the web app displays information and listings. It features a cart, payment, user logins, and an admin panel for CRUD operations. The site is currently deployed at http://www.trinitycasketstoreandmore.com/

## Authors
- Ashlyn Comiskey
- Bao Nguyen
- Michael DelSole
- Abinai Pasunuri
- Jose Quintas
- John Francis

## Features
- Home Page
- About Page
- FAQ
- Catalog
- User Login
- Admin Panel
- Payment
- TO-DO: Add screenshots for the above features

## Credits
- MongoDB
- Express
- React
- Node.js
- Bootstrap
- Reactstrap
- Redux
- Paypal Button API
- AWS Buckets
- All dependencies are in the `package.json` in the root folder and `package.json` in the client folder

## How to Run Project Locally
- Create a .env file at the root directory and add these environment variables:
  - DB_URI=BLANK  
    JWT_SECRET=BLANK  
    PAYPAL_CLIENT_ID=BLANK  
    AWS_ACCESS_KEY_ID=BLANK  
    AWS_SECRET_ACCESS_KEY=BLANK  
    AWS_BUCKET=BLANK
- Install dependencies (`npm run install-all`)
- Run client and server in dev (`npm run dev`)

## How to Run Project on Heroku
- Push project to heroku master
- Add these environment variables:
  - DB_URI=BLANK  
    JWT_SECRET=BLANK  
    PAYPAL_CLIENT_ID=BLANK  
    AWS_ACCESS_KEY_ID=BLANK  
    AWS_SECRET_ACCESS_KEY=BLANK  
    AWS_BUCKET=BLANK  
- Visit deployed link (your-app-name.herokuapp.com)