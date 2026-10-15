# MarketGazette Deployment Guide

This guide provides step-by-step instructions for setting up and deploying the MarketGazette application.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Environment Variables](#environment-variables)
4. [Database Setup](#database-setup)
5. [Deployment to Vercel](#deployment-to-vercel)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher) or yarn
- Git
- A Vercel account (for deployment)

## Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd marketgazette
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory with the following variables:
   ```
   # Finnhub API (for stock data and news)
   FINNHUB_API_KEY=your_finnhub_api_key_here
   
   # Gemini API (for AI analysis)
   GEMINI_API_KEY=your_gemini_api_key_here
   
   # Supabase (for database)
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

## Environment Variables

The following environment variables are required for the application to function properly:

| Variable | Description | Required |
|----------|-------------|----------|
| `FINNHUB_API_KEY` | API key for Finnhub (stock data and news) | Yes |
| `GEMINI_API_KEY` | API key for Google Gemini (AI analysis) | Yes |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |

## Database Setup

MarketGazette uses Supabase as its database provider. Follow these steps to set up the database:

1. **Create a Supabase project**
   - Go to [supabase.com](https://supabase.com) and create a new project
   - Note down your project URL and anonymous key

2. **Set up the database schema**
   Run the following SQL commands in your Supabase SQL editor to create the necessary tables:

   ```sql
   -- Watchlist table
   create table watchlist (
     id uuid default uuid_generate_v4() primary key,
     ticker text not null,
     company_name text,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null
   );

   -- User notes table
   create table user_notes (
     id uuid default uuid_generate_v4() primary key,
     ticker text not null,
     note text not null,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null
   );

   -- Bookmarked articles table
   create table bookmarked_articles (
     id uuid default uuid_generate_v4() primary key,
     article_id text not null,
     title text not null,
     source text,
     saved_at timestamp with time zone default timezone('utc'::text, now()) not null
   );

   -- User settings table
   create table user_settings (
     id uuid default uuid_generate_v4() primary key,
     theme text default 'minimalist-light',
     notifications_enabled boolean default true,
     sound_enabled boolean default true,
     updated_at timestamp with time zone default timezone('utc'::text, now()) not null
   );
   ```

3. **Enable Row Level Security (RLS)**
   ```sql
   alter table watchlist enable row level security;
   alter table user_notes enable row level security;
   alter table bookmarked_articles enable row level security;
   alter table user_settings enable row level security;
   ```

4. **Create policies**
   ```sql
   -- Watchlist policies
   create policy "Users can view their own watchlist" on watchlist
     for select using (auth.uid() = id);
   
   create policy "Users can insert their own watchlist items" on watchlist
     for insert with check (auth.uid() = id);
   
   create policy "Users can update their own watchlist items" on watchlist
     for update using (auth.uid() = id);
   
   create policy "Users can delete their own watchlist items" on watchlist
     for delete using (auth.uid() = id);

   -- Similar policies for other tables...
   ```

## Deployment to Vercel

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import project to Vercel**
   - Go to [vercel.com](https://vercel.com) and click "New Project"
   - Import your GitHub repository
   - Vercel should automatically detect it's a Next.js project

3. **Configure environment variables**
   In the Vercel project settings, add the same environment variables from your `.env.local` file:
   - `FINNHUB_API_KEY`
   - `GEMINI_API_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. **Deploy**
   Click "Deploy" and Vercel will build and deploy your application
   - The build process will run `npm run build`
   - The application will be available at your Vercel domain

## Troubleshooting

### Common Issues

1. **API Key Errors**
   - Ensure your API keys are correctly set in the environment variables
   - Check that you have sufficient quota/credits on your API accounts

2. **Database Connection Issues**
   - Verify your Supabase URL and anonymous key are correct
   - Ensure your database schema has been properly set up
   - Check that Row Level Security policies are configured correctly

3. **Build Failures**
   - Make sure all dependencies are properly installed
   - Check for any TypeScript errors in your code
   - Verify that you're using compatible versions of Node.js and npm

4. **Local Development Issues**
   - Try clearing your npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`
   - Ensure you're using the correct version of Node.js (v18+)

### Getting Help

If you encounter issues not covered in this guide:
1. Check the console output for specific error messages
2. Verify your environment variables are correctly set
3. Ensure all required services (Finnhub, Gemini, Supabase) are accessible
4. Consult the documentation for each service:
   - [Finnhub Documentation](https://finnhub.io/docs/api)
   - [Google Gemini Documentation](https://ai.google.dev/docs)
   - [Supabase Documentation](https://supabase.com/docs)
   - [Next.js Documentation](https://nextjs.org/docs)
   - [Vercel Documentation](https://vercel.com/docs)

## Updating Your Deployment

To update your deployed application:
1. Make changes to your code locally
2. Commit and push to your GitHub repository
3. Vercel will automatically detect the changes and redeploy
4. You can monitor the deployment status in your Vercel dashboard

## Support

For additional support, please refer to the individual service documentations or contact their respective support teams.
