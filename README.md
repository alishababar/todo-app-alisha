<<<<<<< HEAD
🚀 SaaS To-Do Application (Next.js + Stripe)
A full-stack SaaS To-Do application built with Next.js, Prisma, PostgreSQL, and Stripe. This app allows users to manage tasks with a subscription-based model (Free & Pro plans).

=======
🚀 Task Manager SaaS (Next.js + Stripe)

A full-stack SaaS-based task management application built using **Next.js**, **Prisma**, **PostgreSQL**, and **Stripe**.  
This platform allows users to manage daily tasks while offering a **subscription-based upgrade system** (Free & Pro plans).

---

🧩 Key Features

✅ Application Features

- User authentication using Better Auth
- Full task management (Create, View, Update, Delete)
- Clean and responsive UI built with Tailwind CSS and shadcn/ui

💳 SaaS Functionality

- Integrated Stripe Checkout for payments
- Subscription tiers (Free and Pro)
- Secure payment handling
- Automatic subscription updates via webhooks
- Feature restrictions based on user plan

---

💻 Technology Stack

Frontend

- Next.js (App Router)
- React
- Tailwind CSS
- shadcn/ui components

 Backend

- Prisma ORM
- PostgreSQL (Neon Database)
- Better Auth for authentication

 Payment System

- Stripe Checkout
- Stripe Webhooks

---

 ⚙️ Environment Setup

Create a `.env` file in the root directory and add the following:

```env
DATABASE_URL=your_database_url
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000

STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

STRIPE_PRICE_PRO=price_...
STRIPE_PRICE_PREMIUM=price_...

NEXT_PUBLIC_BASE_URL=http://localhost:3000

```

🧠 Application Flow
  Subscription Process
- User selects the "Upgrade to Pro" option
- A Stripe Checkout session is generated
- User completes the payment process
- Stripe triggers a webhook event
- Application updates the user’s subscription status in the database

```
Feature Access Rules
- Free Plan → Limited to 5 tasks
- Pro Plan → No task limit
```
🔄 Webhook Configuration


Start the Stripe listener:

```
stripe listen --forward-to localhost:3000/api/stripe/webhook

Then copy the generated webhook secret into your .env file.

```

🚀 Getting Started

Run the following commands:
```
npm install
npx prisma migrate dev
npm run dev
```
After that, open: http://localhost:3000

```
📌 Notes
* Do not expose your .env file publicly
* Use Stripe test mode for development
* You can extend this project by adding more plans or features