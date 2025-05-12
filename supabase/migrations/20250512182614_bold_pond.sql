/*
  # Update Customers Table Permissions

  1. Changes
    - Enable RLS on customers table
    - Add policy for authenticated users to view all customers
    - Add policy for authenticated users to view their own data

  2. Security
    - Ensures authenticated users can view customer data
    - Maintains data access control through RLS
*/

-- First ensure RLS is enabled
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view all customers
CREATE POLICY "Authenticated users can view all customers"
ON customers
FOR SELECT
TO authenticated
USING (true);

-- Allow users to view their own data (if needed in future)
CREATE POLICY "Users can view own customer data"
ON customers
FOR SELECT
TO authenticated
USING (auth.uid() IN (SELECT created_by FROM campaigns));