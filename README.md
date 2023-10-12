# React Brewery DB

## Introduction

This project uses React and a [brewery API](https://www.openbrewerydb.org/) to provide a brewery search.

## Table of contents

- [Technologies](#technologies)
- [Project structure](#structure)
- [Assignment](#assignment)
- [Getting started](#getting-started)
- [Online version](#online-version)

## Technologies

- TypeScript
- React
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
|  |  ├── CartProductInfo.tsx
|  |  ├── Footer.tsx
|  |  ├── Header.tsx
|  |  ├── HeaderCart.tsx
|  |  ├── HeaderProfile.tsx
|  |  ├── LoginForm.tsx
|  |  ├── ProductEditForm.tsx
|  |  ├── ProductEditModal.tsx
|  |  ├── ProductImageDisplay.tsx
|  |  ├── ProductInfo.tsx
|  |  ├── ProductItem.tsx
|  |  ├── ProductList.tsx
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

1. Use the API endpoint https://fakeapi.platzi.com/ to create an e-commerce website. Read the documentation and learn how to use the different endpoints.
2. Create at least 4 pages (can be more if you want): Page for all products, product page, profile page (only available if user logins), and cart page (cart page could be a page or a modal)
3. Create Redux store for following features:
  - product reducer: get all products, find a single products, filter products by categories, sort products by price. Create, update and delete a product (enable create, update and delete features only for admin of the webapp)
  - user reducer: register and login
  - cart reducer: add product to cart, remove products, update products's quantity in cart
4. When adding routers to your application, programatically set certain routes to be private. For example, route to user profile page should not be accessible if user has not logged in.
5. Implement unit testing for the reducers
6. Deploy the application and rewrite README file.

Bonus

1. Use context API to switch theme
2. Use pagination when fetching/displaying all the products
3. Implement performance optimization where applicable


## Getting started

1. Use `https://github.com/Noutaja/fs16_5-React-Breweries.git` to download the files
2. Use `npm install`
3. Use `npm start` to run the project locally

## Deploying the site

1. Use `npm install` if you haven't already


## Online version

You can find an online version of the project [here](https://noutaja.github.io/fs16_6-frontend-project/)