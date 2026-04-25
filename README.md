# Personal Expense Tracker App

## Project Team Information

**Team Name:** Group 6

**Team Members:**

- Ashley Rohleder
- Helen Castillo
- Neil Tolentino

## Project General Description

A React-based expense tracking application that allows users to view recent expenses, add new ones and filter them by category.

## Three High-Level User Stories

### Story 1: Recent Expense List Component

"As a user, I want to add new expense in the list of my recent expense so that I can track my spending".

### Story 2: Expense Category Summary Component

"As a user, I want to set budget limits for specific categories and compare them against my total expenses, so that I can instantly identify where I am overspending and adjust my habits."

### Story 3: Expense Filter Component

"As a user, I want to filter my expenses by one or more categories so that I can easily view and analyze my spending habits". (sprint 2)

## Front-End Deployment

**Live Application:** [To be added]

### Local Development

- cd vite-project
- npm install
- npm run dev


## Sprint Kanban Items

T.1 : Set up Project Git Repository -  Neil Tolentino
T.2 : Project Initialization - Helen Castillo
T.3 : Project Readme - Neil Tolentino
T.4 : Integration - Ashley Rohleder
T.5 : App Stylesheet and Style Guide - Helen Castillo 
T.6: Team Vercel Account/Management - Neil Tolentino
I.1: Recent Expenses List Component - Neil Tolentino
I.1: Expense Filter Component - Ashley Rohleder
I.1: Category Summary Component - Helen Castillo

## Local Setup Instructions

Follow these steps to get the Personal Expense Tracker running on your local machine.

**1. Prerequisites**
- Node.js (v18 or higher)
- npm
- A Clerk account (for Authentication)
- A Neon.tech or PostgreSQL database instance

**2. Installation**

From the root directory, install dependencies for the entire monorepo:

command: npm install

**3. Environment Variables**

You must create .env files in both the backend and frontend folders. Use the templates below:

For Backend (apps/backend/.env): 

PORT=3000
DATABASE_URL="your_neon_postgresql_connection_string"
CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
CLERK_WEBHOOK_SECRET="whsec_..." # Found in Clerk Dashboard > Webhooks

For Frontend (apps/frontend/.env):

VITE_CLERK_PUBLISHABLE_KEY="pk_test_..."
VITE_API_URL="http://localhost:3000/api"

**4. Database Setup**

Once your DATABASE_URL is set, initialize your database schema and seed the initial categories:

# Navigate to backend
cd apps/backend

# Generate Prisma Client and push schema to database
npx prisma generate
npx prisma migrate dev --name init

# Seed the database (Categories: Food, Transport, etc.)
npm run prisma db seed

**6. Running the Application**

You can start both applications simultaneously from the root directory:

# From the root folder run:
npm run dev

- Frontend: http://localhost:5173
- Backend: http://localhost:3000