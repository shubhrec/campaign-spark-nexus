# Xeno Mini CRM Application Explanation

## Overview (30 seconds)
Xeno is a mini CRM application built with React, TypeScript, and Supabase. It enables businesses to:
- Manage customer data
- Create targeted marketing campaigns
- Generate AI-powered marketing messages
- Track campaign performance

## Key Features (1 minute)
1. **Authentication**
   - Google OAuth integration
   - Protected routes for authenticated users
   - Session management

2. **Customer Management**
   - View customer profiles
   - Track customer spending
   - Monitor visit frequency
   - Last activity tracking

3. **Campaign Creation**
   - Rule-based audience targeting
   - AI-powered message generation
   - Real-time audience estimation
   - Campaign performance tracking

## Technical Stack (30 seconds)
- Frontend: React + TypeScript
- UI: Tailwind CSS + shadcn/ui
- Backend: Supabase
- AI Integration: Together.ai API
- Theme: Dark/Light mode support

## Database Schema (1 minute)
1. **customers**
   ```sql
   - id: uuid (PK)
   - name: text
   - email: text (unique)
   - total_spend: numeric
   - visits: integer
   - last_active_at: timestamptz
   ```

2. **campaigns**
   ```sql
   - id: uuid (PK)
   - created_by: uuid (FK to auth.users)
   - name: text
   - rules_json: jsonb
   - audience_count: integer
   - created_at: timestamptz
   ```

3. **communication_logs**
   ```sql
   - id: uuid (PK)
   - campaign_id: uuid (FK to campaigns)
   - status: text
   - message: text
   - sent_at: timestamptz
   ```

## Key Workflows (1 minute)

1. **Campaign Creation**
   ```typescript
   // 1. Define audience rules
   const rules = {
     operator: 'AND',
     rules: [
       { field: 'total_spend', operator: '>', value: 1000 }
     ]
   };

   // 2. Generate message using AI
   const messages = await generateAIMessages(intent);

   // 3. Create campaign
   const campaign = await createCampaign({
     name, rules_json: JSON.stringify(rules),
     audience_count, created_by: userId
   });
   ```

2. **Message Generation**
   ```typescript
   // Using Together.ai API
   const response = await fetch('https://api.together.xyz/v1/chat/completions', {
     method: 'POST',
     headers: {
       'Authorization': `Bearer ${API_KEY}`,
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
       messages: [
         { role: 'system', content: 'You are a marketing expert...' },
         { role: 'user', content: intent }
       ]
     })
   });
   ```

## Security Features (30 seconds)
- Row Level Security (RLS) policies
- Protected API endpoints
- Secure authentication flow
- Environment variable protection

## Running the Application (30 seconds)
1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   VITE_TOGETHER_API_KEY=your_together_api_key
   ```

3. Start development server:
   ```bash
   npm run dev
   ```