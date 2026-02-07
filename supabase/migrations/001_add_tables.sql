-- Run this in Supabase SQL Editor to add required tables
-- Addresses: stored per user
CREATE TABLE IF NOT EXISTS addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  label TEXT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_addresses_user_id ON addresses(user_id);

-- Vendor applications for admin approval
CREATE TABLE IF NOT EXISTS vendor_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  portfolio_link TEXT,
  location TEXT,
  samples JSONB DEFAULT '[]',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_vendor_applications_status ON vendor_applications(status);

-- Service/commission requests (pre-order, booking)
CREATE TABLE IF NOT EXISTS service_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  service_id UUID REFERENCES products(id) ON DELETE SET NULL,
  service_type TEXT,
  vision TEXT,
  deadline DATE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','accepted','in_progress','completed','cancelled')),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_service_requests_user_id ON service_requests(user_id);

-- Add notification columns to profiles if not exists (run manually if needed)
-- ALTER TABLE profiles ADD COLUMN IF NOT EXISTS notify_orders BOOLEAN DEFAULT true;
-- ALTER TABLE profiles ADD COLUMN IF NOT EXISTS notify_marketing BOOLEAN DEFAULT false;

-- Add moderation_status to products if not exists (for moderation page)
-- ALTER TABLE products ADD COLUMN IF NOT EXISTS moderation_status TEXT;

-- RLS policies (adjust as per your auth setup)
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own addresses" ON addresses FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admins read vendor applications" ON vendor_applications FOR SELECT USING (auth.jwt()->>'role' = 'admin' OR auth.jwt()->>'role' = 'service_role');
CREATE POLICY "Admins update vendor applications" ON vendor_applications FOR UPDATE USING (auth.jwt()->>'role' = 'admin' OR auth.jwt()->>'role' = 'service_role');
CREATE POLICY "Users manage own service requests" ON service_requests FOR ALL USING (auth.uid() = user_id);
