/*
  # Add Customer Policies

  1. Security Changes
    - Add RLS policy to allow viewing all customers
    - Add RLS policy to allow authenticated users to view customer data
*/

-- Add policy to allow viewing all customers
CREATE POLICY "Allow viewing all customers" 
ON customers 
FOR SELECT 
USING (true);