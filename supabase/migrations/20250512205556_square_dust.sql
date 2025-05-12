/*
  # Add More Sample Customer Data

  1. Changes
    - Adds 20 additional customers with realistic data
    - Each customer has:
      - Unique name and email
      - Varied total spend amounts
      - Different visit counts
      - Recent activity dates
*/

INSERT INTO customers (name, email, total_spend, visits, last_active_at)
VALUES
  ('Alex Thompson', 'alex.t@example.com', 2890.75, 25, NOW() - INTERVAL '1 day'),
  ('Maria Garcia', 'mgarcia@example.com', 4350.25, 32, NOW() - INTERVAL '3 days'),
  ('William Chen', 'wchen@example.com', 1750.50, 15, NOW() - INTERVAL '2 days'),
  ('Sophie Martin', 'smartin@example.com', 3200.00, 28, NOW()),
  ('James Wilson', 'jwilson@example.com', 5100.80, 40, NOW() - INTERVAL '4 hours'),
  ('Emma Brown', 'ebrown@example.com', 2400.60, 20, NOW() - INTERVAL '2 days'),
  ('Lucas Silva', 'lsilva@example.com', 3800.90, 30, NOW() - INTERVAL '1 day'),
  ('Isabella Kim', 'ikim@example.com', 1900.45, 18, NOW() - INTERVAL '5 days'),
  ('Oliver Wang', 'owang@example.com', 4700.30, 35, NOW() - INTERVAL '6 hours'),
  ('Sophia Patel', 'spatel@example.com', 2950.75, 22, NOW() - INTERVAL '12 hours'),
  ('Ethan Davis', 'edavis@example.com', 3150.25, 27, NOW() - INTERVAL '2 days'),
  ('Ava Rodriguez', 'arodriguez@example.com', 4200.50, 33, NOW() - INTERVAL '1 day'),
  ('Noah Lee', 'nlee@example.com', 1850.00, 16, NOW() - INTERVAL '4 days'),
  ('Mia Johnson', 'mjohnson@example.com', 5300.80, 42, NOW()),
  ('Liam Taylor', 'ltaylor@example.com', 2600.60, 21, NOW() - INTERVAL '3 days'),
  ('Charlotte White', 'cwhite@example.com', 3900.90, 31, NOW() - INTERVAL '8 hours'),
  ('Mason Clark', 'mclark@example.com', 2100.45, 19, NOW() - INTERVAL '6 days'),
  ('Amelia Wright', 'awright@example.com', 4800.30, 37, NOW() - INTERVAL '5 hours'),
  ('Henry Scott', 'hscott@example.com', 3050.75, 24, NOW() - INTERVAL '2 days'),
  ('Evelyn Adams', 'eadams@example.com', 4100.25, 34, NOW() - INTERVAL '1 day');