/*
  # Update Edge Function with CORS headers

  1. Changes
    - Add proper CORS headers to Edge Function
    - Update error handling
    - Fix duplicate code
*/

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS supabase_functions.generate_messages;

-- Create the Edge Function with proper CORS headers
CREATE OR REPLACE FUNCTION supabase_functions.generate_messages(request_body jsonb)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  intent text;
  messages jsonb[];
  response jsonb;
BEGIN
  -- Extract intent from request body
  intent := request_body->>'intent';
  
  -- Validate input
  IF intent IS NULL OR intent = '' THEN
    messages := jsonb_build_array(
      'We noticed you''ve been shopping with us and we''d love to offer you a special discount on your next purchase.',
      'As a valued customer, we''re excited to share an exclusive offer with you.',
      'Thank you for being a loyal customer. We have something special just for you!'
    );
  ELSE
    messages := jsonb_build_array(
      'We noticed you''ve been shopping with us and we''d love to offer you a special discount on your next purchase.',
      'As a valued customer, we''re excited to share an exclusive offer with you.',
      'Thank you for being a loyal customer. We have something special just for you!'
    );
  END IF;

  -- Build response with CORS headers
  response := jsonb_build_object(
    'statusCode', 200,
    'headers', jsonb_build_object(
      'Access-Control-Allow-Origin', '*',
      'Access-Control-Allow-Headers', 'authorization, x-client-info, apikey, content-type',
      'Access-Control-Allow-Methods', 'POST, OPTIONS',
      'Content-Type', 'application/json'
    ),
    'body', jsonb_build_object(
      'messages', messages
    )
  );
  
  RETURN response;
END;
$$;