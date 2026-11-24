# Digital Wallet API (NestJS)

A **NestJS** backend for a simple digital wallet: users sign up, verify their email, own a wallet and make transactions against it.

## Features

- **Auth**: sign-up and sign-in with JWT (`@nestjs/jwt`)
- **Email verification** with a one-time code (`sendEmailOTP`, `verifyEmail`)
- **Users**: profile endpoint
- **Wallets**: create and update a wallet, set a spending **limit**, calculate the balance, fetch your wallet
- **Transactions**: transaction schema and service, listed through `GET /user/getTransaction`
- **Role decorator and auth guard** for protected routes
- Request validation with **Joi** (custom pipe) and `class-validator`

## Endpoints

| Prefix | Routes |
|---|---|
| `/auth` | `POST signup`, `POST signin` |
| `/user` | `GET profile`, `POST verifyEmail`, `GET sendEmailOTP`, `GET getWallet`, `GET getTransaction` |
| `/wallet` | `POST CreateWallet`, `POST UpdateWallet`, `PUT Addlimit`, `PUT CalculateBalance` |

## Tech stack

- NestJS, TypeScript
- MongoDB with Mongoose (`@nestjs/mongoose`)
- JWT, Joi, Nodemailer

## Project structure

```
src/
├── main.ts
├── app.module.ts
├── decorators/roles/   # roles decorator
├── guard/auth/         # auth guard
├── Mail/               # mail service
├── modules/            # auth, User, Wallet, Transaction, validation Pipe
└── schema/             # user and transaction schemas
```

## Getting started

```bash
npm install
# create a .env with your MongoDB URL, JWT secret and mail settings
npm run start:dev
```

```bash
npm run test       # unit tests
npm run build      # production build
```
