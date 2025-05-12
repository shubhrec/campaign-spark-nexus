/*
  # Add Sample Customer Data

  1. Changes
    - Adds 10 sample customers with realistic data
    - Each customer has:
      - Unique name and email
      - Varied total spend amounts
      - Different visit counts
      - Recent activity dates
*/

INSERT INTO customers (name, email, total_spend, visits, last_active_at)
VALUES
  ('John Smith', 'john.smith@example.com', 1250.50, 15, NOW() - INTERVAL '2 days'),
  ('Sarah Johnson', 'sarah.j@example.com', 3420.75, 28, NOW() - INTERVAL '1 day'),
  ('Michael Brown', 'mbrown@example.com', 750.25, 8, NOW() - INTERVAL '5 days'),
  ('Emily Davis', 'emily.davis@example.com', 4890.00, 35, NOW()),
  ('David Wilson', 'dwilson@example.com', 2150.80, 19, NOW() - INTERVAL '3 days'),
  ('Lisa Anderson', 'lisa.a@example.com', 1875.60, 22, NOW() - INTERVAL '4 days'),
  ('James Taylor', 'jtaylor@example.com', 3250.90, 25, NOW() - INTERVAL '1 day'),
  ('Emma White', 'ewhite@example.com', 980.45, 12, NOW() - INTERVAL '6 days'),
  ('Robert Martin', 'rmartin@example.com', 5620.30, 42, NOW() - INTERVAL '12 hours'),
  ('Jennifer Lee', 'jlee@example.com', 2890.75, 31, NOW() - INTERVAL '8 hours');