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
Full demo of features: https://www.youtube.com/watch?v=UKLjXEbhWFk
- Home Page  
![home page](https://i.ibb.co/375XkVg/2019-12-09-16-01-02-Trinity-Casket-Store-And-More.png)
- About Page  
![about page](https://i.ibb.co/TWzjcSH/2019-12-09-16-01-18-Trinity-Casket-Store-And-More.png)
- FAQ  
![FAQ page](https://i.ibb.co/Jjvx9q8/2019-12-09-16-05-37-Trinity-Casket-Store-And-More.png)
- Catalog  
![catalog page](https://i.ibb.co/kBNQbfQ/2019-12-09-16-02-33-Trinity-Casket-Store-And-More.png)
- User Login  
![login](https://i.ibb.co/xJ9dqXH/2019-12-09-16-10-44-Trinity-Casket-Store-And-More.png)
- Admin Panel  
![admin panel](https://i.ibb.co/pJDdHBp/2019-12-09-16-08-33-Trinity-Casket-Store-And-More.png)
- Payment  
![payment](https://i.ibb.co/wQq4mQ4/Annotation-2019-12-09-192728.jpg)

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

## Credits
- MongoDB
- Express
- React
- Node.js
- Bootstrap
- Reactstrap
- Redux
- Paypal Button API
- AWS S3
- All dependencies are in the `package.json` in the root folder and `package.json` in the client folder
