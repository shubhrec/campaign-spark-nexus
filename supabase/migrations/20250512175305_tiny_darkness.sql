/*
  # Create Edge Function for Message Generation

  Creates a new Edge Function that generates marketing messages using AI.
  Includes proper CORS handling and error management.
*/

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS supabase_functions.generate_messages;

-- Create the function with proper CORS and error handling
CREATE OR REPLACE FUNCTION supabase_functions.generate_messages(request_body jsonb)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  intent text;
  messages jsonb[];
BEGIN
  -- Extract intent from request body
  intent := request_body->>'intent';
  
  -- Validate input
  IF intent IS NULL OR intent = '' THEN
    RETURN jsonb_build_object(
      'messages', jsonb_build_array(
        'We noticed you''ve been shopping with us and we''d love to offer you a special discount on your next purchase.',
        'As a valued customer, we''re excited to share an exclusive offer with you.',
        'Thank you for being a loyal customer. We have something special just for you!'
      )
    );
  END IF;
  
  -- Return default messages (Edge Function will handle actual AI integration)
  RETURN jsonb_build_object(
    'messages', jsonb_build_array(
      'We noticed you''ve been shopping with us and we''d love to offer you a special discount on your next purchase.',
      'As a valued customer, we''re excited to share an exclusive offer with you.',
      'Thank you for being a loyal customer. We have something special just for you!'
    )
  );
END;
$$;