# Kaka Memorial Foundation

A full-stack NGO website for the **Kaka Memorial Foundation**, an organization dedicated to uplifting rural communities in Nigeria through education, clean water access, and strategic partnerships aligned with UN Sustainable Development Goals.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running Locally](#running-locally)
- [Build and Deployment](#build-and-deployment)
- [Authentication and Authorization](#authentication-and-authorization)
- [Password Security](#password-security)
- [API Reference](#api-reference)
- [Admin Dashboard](#admin-dashboard)
- [PayPal Integration](#paypal-integration)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

The Kaka Memorial Foundation website serves as a digital presence and operational platform for the NGO. It enables community members to learn about the foundation's causes, register for events, make donations via PayPal, and join as partners or volunteers. An internal admin dashboard allows foundation staff to manage all site content and track registrations, donations, and outreach metrics.

The site focuses on three SDG pillars:
- **SDG 4** — Quality Education
- **SDG 6** — Clean Water and Sanitation
- **SDG 17** — Partnerships for the Goals

---

## Key Features

**Public Website**
- Multi-page site: Home, About, Causes, Events, Join Us, Contact
- Homepage statistics with animated count-up display
- Scrollable advocacy/project carousel with admin-managed slides
- Event category listings with detailed registration flow
- Partner, volunteer, and newsletter subscription forms
- PayPal donation integration (one-time, monthly, annual)
- Contact form for general inquiries

**Authentication**
- Email and password sign-in via Better Auth
- Mandatory security question setup during registration (used for password recovery)
- Role-based access control (admin role required for dashboard)
- Session management with IP and user-agent tracking

**Password Security**
- Strong password enforcement: minimum 8 characters, uppercase, lowercase, number, and special character
- Real-time strength bar and requirements checklist during registration and password change
- Backend validation via Better Auth middleware — cannot be bypassed via direct API calls
- Shared validation logic in `src/lib/password-validation.ts`

**Password Recovery (no email required)**
- 3-step security-question–based forgot-password flow
- One-time tokens (32-byte random, SHA-256 stored, 15-minute TTL)
- Database-backed rate limiting: 10 requests / 15 min (email step), 5 attempts / 15 min (answer step)
- All sessions revoked on successful reset

**Admin Dashboard**
- Manage event categories (create, edit, delete)
- View all event registrations (attendees) per category
- View partner/volunteer registrations
- View and manage donation records
- Read contact form submissions
- Edit homepage statistics (prefix, value, suffix, description)
- Manage carousel slides (title, description, image, link, order)
- View newsletter subscribers
- Admin profile page to change password and update security question

---

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.2.4 |
| UI Library | React | 19.2.4 |
| Language | TypeScript | 5 |
| Styling | Tailwind CSS | 4.2.4 |
| ORM | Prisma | 7.8.0 |
| Database | PostgreSQL (Neon) | — |
| Authentication | Better Auth | 1.6.9 |
| Payments | PayPal React SDK | 9.1.1 |
| Icons | Lucide React + React Icons | — |
| DB Driver | pg (node-postgres) | 8.20.0 |
| Serverless Adapter | @prisma/adapter-neon | 7.8.0 |
| Linting | ESLint | 9 |
| Seeding | tsx | 4.21.0 |

---

## Project Structure

```
kaka-memorial-foundation/
├── prisma/
│   ├── schema.prisma          # Database schema (all models)
│   ├── seed.ts                # Seed script for initial data
│   └── migrations/            # Auto-generated Prisma migrations
├── public/                    # Static assets (images, logos)
│   └── team/                  # Team member photos
├── src/
│   ├── app/
│   │   ├── (pages)/           # Public-facing route group
│   │   │   ├── page.tsx       # Home page
│   │   │   ├── about/
│   │   │   ├── causes/
│   │   │   ├── contacts/
│   │   │   ├── events/
│   │   │   └── join-us/
│   │   ├── sign-in/           # Sign-in page
│   │   ├── sign-up/           # Sign-up page (with security question)
│   │   ├── forgot-password/   # 3-step password recovery page
│   │   ├── admin/             # Protected admin dashboard routes
│   │   │   ├── page.tsx       # Dashboard overview
│   │   │   ├── profile/       # Admin profile (password + security question)
│   │   │   ├── carousel/
│   │   │   ├── donations/
│   │   │   ├── event-attendees/
│   │   │   ├── events/
│   │   │   ├── memberships/
│   │   │   ├── messages/
│   │   │   ├── registrations/
│   │   │   └── statistics/
│   │   └── api/               # API route handlers
│   │       ├── auth/[...all]/ # Better Auth catch-all
│   │       ├── contact/
│   │       ├── donation/
│   │       ├── event-categories/
│   │       ├── event-registration/
│   │       ├── forgot-password/   # Password reset (3-step)
│   │       ├── membership/
│   │       ├── register/
│   │       ├── user/
│   │       │   └── security-question/  # Get/set security question
│   │       └── admin/         # Admin-only API routes
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── JoinUsCta.tsx
│   │   ├── PayPalPaymet.tsx
│   │   ├── form-components/   # Reusable InputField, TextAreaField
│   │   ├── home-page-components/
│   │   └── ui/                # AnimateIn entrance animation wrapper
│   ├── hooks/
│   │   └── useCountUp.ts      # Intersection-observer count-up hook
│   └── lib/
│       ├── auth.ts            # Better Auth server config + password hooks
│       ├── auth-client.ts     # Better Auth browser client
│       ├── password-validation.ts  # Shared password rules and strength logic
│       ├── prisma.ts          # Prisma client singleton
│       └── security-questions.ts   # Predefined security question list
├── next.config.ts
├── prisma.config.ts
├── tailwind.config.js
├── postcss.config.mjs
└── tsconfig.json
```

---

## Prerequisites

- **Node.js** 20 or later
- **npm** 10 or later
- A **PostgreSQL** database — [Neon](https://neon.tech) is recommended for serverless/Vercel deployments; a local PostgreSQL instance also works for development
- A **PayPal Developer** account with a sandbox app (for donation testing)

---

## Installation and Setup

**1. Clone the repository**

```bash
git clone <repository-url>
cd kaka-memorial-foundation
```

**2. Install dependencies**

```bash
npm install
```

> `postinstall` automatically runs `prisma generate` to build the Prisma client.

**3. Configure environment variables**

Copy the example below into a `.env` file in the project root and fill in your values (see [Environment Variables](#environment-variables)).

**4. Set up the database**

```bash
# Apply the schema to your database
npx prisma migrate deploy

# Seed initial data (admin users, statistics, carousel, event categories)
npm run seed
```

**5. Start the development server**

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Create a `.env` file at the project root with the following variables:

```env
# ── Database ──────────────────────────────────────────────────────────────────
# Connection string for Neon PostgreSQL with PgBouncer pooling
DATABASE_URL="postgresql://<user>:<password>@<host>/<dbname>?sslmode=require&pgbouncer=true"

# Unpooled connection used by Prisma migrations
DATABASE_URL_UNPOOLED="postgresql://<user>:<password>@<host>/<dbname>?sslmode=require"

# ── Better Auth ───────────────────────────────────────────────────────────────
BETTER_AUTH_SECRET="<at-least-32-character-random-secret>"
BETTER_AUTH_URL="http://localhost:3000"   # Change to production URL when deploying

# ── PayPal ────────────────────────────────────────────────────────────────────
NEXT_PUBLIC_PAYPAL_CLIENT_ID="<paypal-client-id>"   # Safe to expose (public)
PAYPAL_SECRET="<paypal-secret>"                      # Keep server-side only

# ── Admin Accounts (used by seed script only) ─────────────────────────────────
ADMIN_1_NAME="Admin One"
ADMIN_1_EMAIL="admin1@example.com"
ADMIN_1_PASSWORD="<strong-password>"

ADMIN_2_NAME="Admin Two"
ADMIN_2_EMAIL="admin2@example.com"
ADMIN_2_PASSWORD="<strong-password>"

ADMIN_3_NAME="Admin Three"
ADMIN_3_EMAIL="admin3@example.com"
ADMIN_3_PASSWORD="<strong-password>"
```

> **Note:** Never commit `.env` to version control. Only `NEXT_PUBLIC_*` variables are exposed to the browser.

---

## Database Setup

The project uses **Prisma ORM** with a **PostgreSQL** database. The schema is defined in [prisma/schema.prisma](prisma/schema.prisma).

### Schema Models

| Model | Purpose |
|-------|---------|
| `User` | Authenticated users; includes `securityQuestion` and `securityAnswerHash` fields |
| `Session` | Active login sessions |
| `Account` | Auth provider accounts (passwords stored here under `providerId: 'credential'`) |
| `Verification` | Email/token verification records; also used for rate-limit tracking |
| `EventCategory` | Event types (title, date, location, image) |
| `Event` | Individual event registrations per category |
| `Registration` | Partner and volunteer form submissions |
| `Membership` | Newsletter subscriber emails |
| `Contact` | Contact form submissions |
| `Donation` | PayPal payment records |
| `Statistic` | Homepage impact statistics (editable) |
| `CarouselItem` | Advocacy/project carousel slides (editable) |

### Running Migrations

```bash
# Apply all pending migrations to the database
npx prisma migrate deploy

# (Development only) Create a new migration after schema changes
npx prisma migrate dev --name <migration-name>

# Regenerate the Prisma client after schema changes
npx prisma generate
```

### Seeding

The seed script creates admin accounts and populates default content:

```bash
npm run seed
```

What gets seeded:
- **3 admin users** from `ADMIN_1_*`, `ADMIN_2_*`, `ADMIN_3_*` env vars
- **5 homepage statistics** (grants raised, donations received, people served, programs, volunteers)
- **3 carousel items** (X-Space advocacy, water access, youth summit)
- **3 event categories** (Community Outreach, Advocacy, Fundraising)

The seed is idempotent — it checks for existing records before inserting, so it is safe to re-run.

### Prisma Studio (optional)

To browse and edit database records via a visual UI:

```bash
npx prisma studio
```

---

## Running Locally

```bash
# Development server with hot reload
npm run dev

# Type-check without building
npx tsc --noEmit

# Lint
npm run lint
```

The dev server runs at `http://localhost:3000`.

---

## Build and Deployment

### Production Build (Local)

```bash
npm run build
npm start
```

### Deploying to Vercel

The project is configured for zero-config Vercel deployment:

1. Push the repository to GitHub/GitLab.
2. Import the project in the [Vercel dashboard](https://vercel.com).
3. Add all environment variables from the [Environment Variables](#environment-variables) section.
   - Set `BETTER_AUTH_URL` to your production domain (e.g., `https://kakamemorialfoundation.org`).
4. Vercel will automatically run `npm run build` and start the server.

> **Neon + Vercel:** The `@prisma/adapter-neon` adapter is pre-configured for Vercel's serverless functions. No additional configuration is required when using Neon as your database provider.

### Trusted Origins

Better Auth is pre-configured to trust the following origins (edit `src/lib/auth.ts` to add more):
- `https://kaka-memorial-foundation.vercel.app`
- `https://kakamemorialfoundation.org`
- `http://localhost:3000`

---

## Authentication and Authorization

Authentication is handled by **[Better Auth](https://better-auth.com)** with email/password credentials.

### Sign-Up Flow

1. User fills in name, email, password, security question, and security answer at `/sign-up`.
2. Better Auth creates the account via `/api/auth/[...all]`.
3. Immediately after account creation, the security question and hashed answer are saved via `POST /api/user/security-question`.
4. Sessions are stored in the `session` table with expiry, IP address, and user-agent.

### Sign-In Flow

1. User visits `/sign-in` and submits email and password.
2. On success, a session cookie is set and the user is redirected.
3. A "Forgot password?" link on the sign-in page leads to the recovery flow.

### Password Recovery (Forgot Password)

The 3-step flow at `/forgot-password` does not use email links:

1. **Step 1 — Email:** Enter the registered email address. The system returns the security question for that account.
2. **Step 2 — Answer:** Submit the answer to the security question. On success, a one-time reset token (valid for 15 minutes) is issued.
3. **Step 3 — New Password:** Submit the new password (must meet strength requirements) along with the token. All existing sessions are revoked on success.

### Admin Access

Access to `/admin/*` routes and `/api/admin/*` endpoints requires `user.role === 'admin'`. Admin accounts are created exclusively via the seed script — there is no public admin registration.

To grant admin access to an existing user, update their `role` field directly in the database:

```sql
UPDATE "user" SET role = 'admin' WHERE email = 'user@example.com';
```

### Client-Side Protection

Admin pages check the session role client-side via `useSession()` and redirect to `/sign-in` if the user is unauthenticated or lacks the admin role.

### Server-Side Protection (API Routes)

Admin API routes call `auth.api.getSession()` and return `401 Unauthorized` if the session is missing or the role is not `admin`.

---

## Password Security

Password requirements are enforced at every entry point — registration, password change, and password reset. They cannot be bypassed via direct API calls.

### Rules

All five of the following must be satisfied:

| Rule | Requirement |
|------|-------------|
| Length | At least 8 characters |
| Uppercase | At least one uppercase letter (A–Z) |
| Lowercase | At least one lowercase letter (a–z) |
| Number | At least one digit (0–9) |
| Special character | At least one non-alphanumeric character |

### Strength Indicator

The sign-up and password-change pages display a colour-coded strength bar and a per-rule checklist in real time:
- **Weak** (red) — score 0–2
- **Fair** (amber) — score 3–4
- **Strong** (green) — score 5–6

### Shared Logic

All password logic lives in `src/lib/password-validation.ts` and is imported by:
- `src/lib/auth.ts` — Better Auth `hooks.before` middleware (server-side enforcement)
- `src/app/api/forgot-password/route.ts` — reset step validation
- `src/app/sign-up/page.tsx` — real-time frontend feedback
- `src/app/admin/profile/page.tsx` — admin password change feedback

---

## API Reference

All endpoints accept and return JSON unless noted otherwise.

### Public Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/contact` | Submit a contact form message |
| `POST` | `/api/donation` | Record a completed PayPal donation |
| `GET` | `/api/event-categories` | List all event categories |
| `POST` | `/api/event-registration` | Register for an event (requires auth session) |
| `POST` | `/api/membership` | Subscribe to the newsletter |
| `POST` | `/api/register` | Submit a partner or volunteer registration |
| `POST` | `/api/forgot-password` | Password reset (3-step: `request`, `verify`, `reset`) |

#### `POST /api/contact`
```json
{ "name": "string", "email": "string", "subject": "string", "message": "string" }
```

#### `POST /api/donation`
```json
{
  "name": "string (optional)",
  "email": "string (optional)",
  "amount": "number",
  "currency": "string",
  "transactionId": "string (PayPal order/transaction ID, unique)",
  "frequency": "one-time | monthly | annual"
}
```
Duplicate `transactionId` values are silently ignored (idempotent).

#### `POST /api/event-registration`
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "organization": "string (optional)",
  "address": "string (optional)",
  "comments": "string (optional)",
  "eventCategoryId": "number"
}
```
Returns `409 Conflict` if the email is already registered for that event category.

#### `POST /api/register`
```json
{
  "registrationType": "partner | volunteer",
  "name": "string",
  "email": "string",
  "phone": "string",
  "address": "string",
  "message": "string"
}
```

#### `POST /api/forgot-password`

Step `request`:
```json
{ "step": "request", "email": "string" }
```
Returns `{ "question": "string" }` on success.

Step `verify`:
```json
{ "step": "verify", "email": "string", "answer": "string" }
```
Returns `{ "token": "string" }` on success. Token is valid for 15 minutes.

Step `reset`:
```json
{ "step": "reset", "email": "string", "token": "string", "newPassword": "string" }
```
Returns `{ "success": true }` on success. All sessions are revoked.

### Authenticated User Endpoints

| Method | Path | Auth required | Description |
|--------|------|---------------|-------------|
| `GET` | `/api/user/security-question` | Session | Get the signed-in user's security question and whether it is set |
| `POST` | `/api/user/security-question` | Session | Set or update the security question and answer |

#### `POST /api/user/security-question`
```json
{
  "question": "string (must be from the predefined list)",
  "answer": "string",
  "currentPassword": "string (required only when updating an existing answer)"
}
```

### Admin Endpoints

All admin endpoints require an authenticated session with `role: 'admin'`. Returns `401` otherwise.

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/admin/carousel` | List carousel items |
| `POST` | `/api/admin/carousel` | Create carousel item |
| `PUT` | `/api/admin/carousel/[id]` | Update carousel item |
| `DELETE` | `/api/admin/carousel/[id]` | Delete carousel item |
| `GET` | `/api/admin/donations` | List all donations |
| `GET` | `/api/admin/event-attendees` | List all event registrations |
| `GET` | `/api/admin/events` | List event categories |
| `POST` | `/api/admin/events` | Create event category |
| `PUT` | `/api/admin/events/[id]` | Update event category |
| `DELETE` | `/api/admin/events/[id]` | Delete event category |
| `GET` | `/api/admin/memberships` | List newsletter subscribers |
| `POST` | `/api/admin/memberships` | Add subscriber |
| `DELETE` | `/api/admin/memberships/[id]` | Remove subscriber |
| `GET` | `/api/admin/registrations` | List partner/volunteer registrations |
| `GET` | `/api/admin/statistics` | List homepage statistics |
| `POST` | `/api/admin/statistics` | Create a statistic |
| `PUT` | `/api/admin/statistics/[id]` | Update a statistic |
| `DELETE` | `/api/admin/statistics/[id]` | Delete a statistic |

### Authentication Endpoint

| Method | Path | Description |
|--------|------|-------------|
| `*` | `/api/auth/[...all]` | Better Auth handler (sign in, sign up, sign out, session, change password) |

---

## Admin Dashboard

The admin dashboard is accessible at `/admin` for users with `role: 'admin'`.

### Sections

| Route | Purpose |
|-------|---------|
| `/admin` | Overview with quick-navigation links |
| `/admin/events` | Create, edit, and delete event categories |
| `/admin/event-attendees` | View all event registrations; search, filter, export CSV |
| `/admin/registrations` | Browse partner and volunteer submissions |
| `/admin/donations` | View all PayPal donation records |
| `/admin/messages` | Read contact form submissions |
| `/admin/statistics` | Edit the homepage impact stats |
| `/admin/carousel` | Manage the homepage advocacy/projects carousel slides |
| `/admin/memberships` | View and manage newsletter subscribers |
| `/admin/profile` | Change password and update security question |

### Accessing the Dashboard

Sign in at `/sign-in` using admin credentials provisioned by the seed script. After sign-in, navigate to `/admin` or click the admin dashboard link.

---

## PayPal Integration

Donations are processed client-side using the **@paypal/react-paypal-js** SDK.

**Flow:**
1. Donor selects a donation amount and frequency on the `/join-us` page.
2. The PayPal button renders using `NEXT_PUBLIC_PAYPAL_CLIENT_ID`.
3. On successful payment, the client calls `POST /api/donation` with the PayPal transaction details.
4. The API stores the record, deduplicating by `transactionId`.

**Environment variables required:**
- `NEXT_PUBLIC_PAYPAL_CLIENT_ID` — exposed to the browser (safe)
- `PAYPAL_SECRET` — kept server-side; used for any server-to-server PayPal API calls

**Testing:** Use [PayPal Sandbox](https://developer.paypal.com/tools/sandbox/) accounts to test donations without real charges.

---

## Troubleshooting

### `prisma generate` fails after `npm install`
The `postinstall` script runs automatically. If it fails, run it manually:
```bash
npx prisma generate
```

### TypeScript errors after schema changes
After modifying `prisma/schema.prisma`, always regenerate the Prisma client:
```bash
npx prisma generate
```

### Database connection errors
- Verify `DATABASE_URL` is correct and the database is reachable.
- For Neon, ensure the connection string includes `?sslmode=require`.
- For migrations, use `DATABASE_URL_UNPOOLED` (direct connection, not pooled).

### Admin dashboard shows "Unauthorized"
- Confirm the user's `role` column in the `user` table is set to `'admin'`.
- Check that `BETTER_AUTH_SECRET` is the same across all server restarts.
- Clear browser cookies and sign in again.

### Password reset says "No security question is set"
The user must have set a security question during sign-up or from the admin profile page. If the account was created before the security question feature was added, a developer will need to reset the password directly in the database.

### PayPal button does not appear
- Verify `NEXT_PUBLIC_PAYPAL_CLIENT_ID` is set and is a valid sandbox or live client ID.
- Check the browser console for PayPal SDK errors.

### Seed script fails
The seed is idempotent and skips existing records by design. If you see an actual error, check that `DATABASE_URL` points to the correct database and that migrations have been applied (`npx prisma migrate deploy`).

### Images from external URLs not loading
`next.config.ts` allows images from all HTTPS hostnames (`hostname: '**'`). If an image still fails, check for mixed-content (HTTP) URLs in the database.

---

## Contributing

1. Fork the repository and create a feature branch from `main`.
2. Make your changes and ensure the project builds without errors:
   ```bash
   npm run build
   npm run lint
   ```
3. Keep commits focused and descriptive.
4. Open a pull request against `main` with a clear description of the change.

There are no automated tests in this project at this time. Please manually verify any pages or API routes affected by your change before submitting.

---

## License

This project is private and proprietary to the Kaka Memorial Foundation. All rights reserved.
