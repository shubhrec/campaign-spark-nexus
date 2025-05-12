/*
  # Create Edge Function for Message Generation

  1. Create Edge Function
    - Name: generate-messages
    - Description: Generates marketing messages using AI
    - CORS enabled for all origins
*/

-- Create the Edge Function
SELECT supabase.create_function(
  'generate-messages',
  'Generate marketing messages using AI',
  array['{"name": "intent", "type": "string"}']::jsonb[],
  'typescript',
  $$
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const MIXTRAL_API_URL = "https://api.together.xyz/v1/chat/completions";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { intent } = await req.json();

    if (!intent) {
      throw new Error('Intent is required');
    }

    const response = await fetch(MIXTRAL_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('TOGETHER_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        messages: [
          {
            role: 'system',
            content: 'You are a marketing expert. Generate 3 unique, engaging marketing messages based on the campaign intent provided. Each message should be concise, persuasive, and suitable for email or SMS campaigns.'
          },
          {
            role: 'user',
            content: intent
          }
        ],
        max_tokens: 300,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate messages from AI service');
    }

    const data = await response.json();
    
    // Extract messages from the response
    const content = data.choices[0].message.content;
    const messages = content
      .split(/\d+\./)
      .filter(Boolean)
      .map(msg => msg.trim());

    return new Response(
      JSON.stringify({ messages }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate messages',
        details: error.message 
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  }
});
$$
);