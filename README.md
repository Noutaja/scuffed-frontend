# Frontend Project - Scuffed Webstore

## Introduction

This project uses React and Redux (among other things) to provide a web store frontend with https://fakeapi.platzi.com/ serving as the backend
It is still a work in progress with critical features, like checking out not implemented.

## Table of contents


- [Getting started](#getting-started)
  - [Development](#development)
  - [Deploying the site](#deploying-the-site)
- [Usage](#usage)
  - [Features](#features)
  - [Features and todo list](#features-and-todo-list)
- [Architechture and design](#architecture-and-design)
  - [Technologies](#technologies)
  - [Project structure](#structure)
- [Assignment](#assignment)
- [Online version](#online-version)

# Getting started

## Development

1. Use `git clone https://github.com/Noutaja/fs16_6-frontend-project.git` to download the files
2. Use `npm install` to install all dependancies
3. Use `npm start` to run the project locally

## Deploying the site

1. Use `npm install` if you haven't already
2. Edit `"homepage": "https://noutaja.github.io/fs16_6-frontend-project/"`\
to match your profile- and repository name. **IMPORTANT!**
3. Use `npm run deploy`
4. Edit your github pages setting:
![Github settings](images/Github settings.png)

# Usage

## Features

Scuffed Webstore features a responsive user interface with basic product searching and sorting:
![Store at tablet and beyond](images/Scuffed-Webstore-desktop.png)
Store at tablet and beyond

![Store with mobiles](images/Scuffed-Webstore-mobile.png)
Store with mobiles

![Login validation](images/Login.png)
Logging in has input validation

![Editing product](images/Product-edit.png)
Editing and adding a product is a modal

![Shopping cart](images/Shopping-cart.png)
Shopping cart checks if the user is logged in before checking out

## Feature and Todo list

### Complete

- Basic responsiveness
  - Elements resize and hide with narrower screens
- Custom theme
- API
  - Products
    - Create
    - Read
    - Update
    - Delete
  - Categories
    - Read
  - Users
    - Create
    - Authenticate
- Pages
  - Products search
  - Single product
  - Cart
  - Login and register
  - Profile
- Products page features
  - Filtering
    - Category
    - Name
  - Sorting
    - Price
    - Ascending and descending
  - Client-side pagination
  - Adding products to cart
  - ADMIN: Add new product
- Single Product page features
  - Carousel
  - ADMIN: Edit product
  - ADMIN: Delete product
- Cart page features
  - Cart contents
  - Increase and decrease product quantity
  - Empty cart
  - Login check for checkout
- Login and register page features
  - Form validation
- Profile page features
  - Basic information
  - Gated from unregistered users

### Todo

- Proper responsiveness
  - Menu for nav bar
  - Do fonts better
  - Fix various bugs
- API
  - Categories
    - Create
    - Update
    - Delete
  - Users
    - Read
    - Update
    - Delete
  - Google authentication
  - Payment processing
- Pages
  - Checkout page
  - Admin dashboard
- Products page features
  - Filtering
    - Price
  - Sorting
    - Name
  - Server-side pagination
    - API might not support it
- Cart page features
  - Checkout details sidebar
- Login and register page features
  - Fix bugs
  - Possibly split into two
- Profile page features
  - Updating information
  - Order history
  - Visual upgrades
- **REFACTORING THE WHOLE THING**


## Scripts

### `npm run deploy` and `npm run predeploy`

`npm run deploy` is used to publish the project to your set homepage.\
`npm run predeploy` is called automatically by `npm run deploy`.

### `npm install`

Install all the dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.\
Use this if you want to publish the site somewhere not Github Pages. It may require additional tweaks.

# Architecture and design

## Technologies

- TypeScript
- React
  - React-router-dom
- Redux
- Jest
- MSW
- Material UI

## Structure

```
.
├── package-lock.json
├── package.json
├── public
|  ├── favicon.ico
|  ├── index.html
|  ├── logo192.png
|  ├── logo512.png
|  ├── manifest.json
|  └── robots.txt
├── README.md
├── src
|  ├── App.tsx
|  ├── components
|  |  ├── CartItemComponent.tsx
|  |  ├── CartItemInfo.tsx
|  |  ├── ...
|  |  ├── Search.tsx
|  |  └── StoreLogo.tsx
|  ├── componentsCustom
|  |  └── UnstyledLink.tsx
|  ├── helpers
|  |  ├── addIdsToList.ts
|  |  ├── debounce.ts
|  |  ├── loginFormValidators.ts
|  |  └── searchSorting.ts
|  ├── hooks
|  |  ├── useAppDispatch.ts
|  |  └── useAppSelector.ts
|  ├── index.tsx
|  ├── pages
|  |  ├── CartPage.tsx
|  |  ├── LoginPage.tsx
|  |  ├── MainPage.tsx
|  |  ├── ProfilePage.tsx
|  |  └── SingleProductPage.tsx
|  ├── react-app-env.d.ts
|  ├── redux
|  |  ├── reducers
|  |  └── store.ts
|  ├── tests
|  |  ├── cartReducer.test.ts
|  |  ├── categoriesReducer.test.ts
|  |  ├── categoriesTestServer.ts
|  |  ├── productsReducer.test.ts
|  |  ├── productTestServer.ts
|  |  ├── uiReducer.test.ts
|  |  ├── usersReducer.test.ts
|  |  └── usersTestServer.ts
|  ├── themes
|  |  └── themes.ts
|  └── types
|     ├── Props.ts
|     └── Types.ts
└── tsconfig.json
```

## Assignment

### Requirements

1. Use the API endpoint https://fakeapi.platzi.com/ to create an e-commerce website.\
Read the documentation and learn how to use the different endpoints.
2. Create at least 4 pages (can be more if you want): Page for all products, product page,\
profile page (only available if user logins), and cart page (cart page could be a page or a modal)
3. Create Redux store for following features:
  - product reducer: get all products, find a single products, filter products by categories,\
  sort products by price. Create, update and delete a product\
  (enable create, update and delete features only for admin of the webapp)
  - user reducer: register and login
  - cart reducer: add product to cart, remove products, update products's quantity in cart
4. When adding routers to your application, programatically set certain routes to be private.\
For example, route to user profile page should not be accessible if user has not logged in.
5. Implement unit testing for the reducers
6. Deploy the application and rewrite README file.

Bonus

1. Use context API to switch theme
2. Use pagination when fetching/displaying all the products
3. Implement performance optimization where applicable


## Online version

You can find an online version of the project [here](https://noutaja.github.io/fs16_6-frontend-project/)