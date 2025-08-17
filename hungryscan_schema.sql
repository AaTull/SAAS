-- ===========================
-- Enable extensions
-- ===========================
CREATE EXTENSION IF NOT EXISTS "citext";

-- ===========================
-- ENUMS
-- ===========================
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'order_status') THEN
        CREATE TYPE order_status AS ENUM ('pending','accepted','preparing','ready','completed','cancelled');
    END IF;
END$$;

-- ===========================
-- COMMON TIMESTAMP TRIGGER
-- ===========================
CREATE OR REPLACE FUNCTION set_timestamp()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    NEW.created_at := COALESCE(NEW.created_at, CURRENT_TIMESTAMP);
  END IF;
  NEW.updated_at := CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$;

-- ===========================
-- HOTELS
-- ===========================
CREATE TABLE hotels (
  hotel_id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  hotel_type VARCHAR(100) NOT NULL,
  cuisine_type VARCHAR(100),
  phone_number VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100),
  pincode VARCHAR(20),
  logo_url TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX ON hotels (city);
CREATE INDEX ON hotels (hotel_type);

CREATE TRIGGER trg_hotels_timestamps
BEFORE INSERT OR UPDATE ON hotels
FOR EACH ROW EXECUTE FUNCTION set_timestamp();

-- ===========================
-- SUBSCRIPTION PLANS
-- ===========================
CREATE TABLE subscription_plans (
  plan_id BIGSERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  price NUMERIC(10,2) NOT NULL,
  duration_months INT NOT NULL,
  features JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hotel_subscriptions (
  subscription_id BIGSERIAL PRIMARY KEY,
  hotel_id BIGINT NOT NULL REFERENCES hotels(hotel_id) ON DELETE CASCADE,
  plan_id BIGINT NOT NULL REFERENCES subscription_plans(plan_id),
  start_date DATE DEFAULT CURRENT_DATE,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX ON hotel_subscriptions (hotel_id);
CREATE INDEX ON hotel_subscriptions (plan_id);

-- ===========================
-- HOTEL ADMINS
-- ===========================
CREATE TABLE hotel_admins (
  admin_id BIGSERIAL PRIMARY KEY,
  hotel_id BIGINT NOT NULL REFERENCES hotels(hotel_id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email CITEXT NOT NULL UNIQUE,
  phone_number VARCHAR(20),
  password_hash TEXT NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'admin',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX ON hotel_admins (hotel_id);
CREATE INDEX ON hotel_admins (email);

CREATE TRIGGER trg_hotel_admins_timestamps
BEFORE INSERT OR UPDATE ON hotel_admins
FOR EACH ROW EXECUTE FUNCTION set_timestamp();

-- ===========================
-- BUSINESS DETAILS
-- ===========================
CREATE TABLE business_details (
  business_id BIGSERIAL PRIMARY KEY,
  hotel_id BIGINT NOT NULL REFERENCES hotels(hotel_id) ON DELETE CASCADE,
  pan_number VARCHAR(20),
  business_type VARCHAR(100),
  seating_capacity INT,
  gst_number VARCHAR(30),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX ON business_details (hotel_id);

CREATE TRIGGER trg_business_timestamps
BEFORE INSERT OR UPDATE ON business_details
FOR EACH ROW EXECUTE FUNCTION set_timestamp();

-- ===========================
-- MENU
-- ===========================
CREATE TABLE menu_categories (
  category_id BIGSERIAL PRIMARY KEY,
  hotel_id BIGINT NOT NULL REFERENCES hotels(hotel_id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX ON menu_categories (hotel_id);

CREATE TABLE menu_items (
  item_id BIGSERIAL PRIMARY KEY,
  hotel_id BIGINT NOT NULL REFERENCES hotels(hotel_id) ON DELETE CASCADE,
  category_id BIGINT REFERENCES menu_categories(category_id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  is_veg BOOLEAN DEFAULT TRUE,
  image_url TEXT,
  is_available BOOLEAN DEFAULT TRUE,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX ON menu_items (hotel_id);
CREATE INDEX ON menu_items (category_id);
CREATE INDEX ON menu_items USING gin (metadata jsonb_path_ops);

CREATE TRIGGER trg_menu_items_timestamps
BEFORE INSERT OR UPDATE ON menu_items
FOR EACH ROW EXECUTE FUNCTION set_timestamp();

-- ===========================
-- HOTEL TABLES
-- ===========================
CREATE TABLE hotel_tables (
  table_id BIGSERIAL PRIMARY KEY,
  hotel_id BIGINT NOT NULL REFERENCES hotels(hotel_id) ON DELETE CASCADE,
  table_number VARCHAR(50) NOT NULL,
  qr_code_url TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (hotel_id, table_number)
);
CREATE INDEX ON hotel_tables (hotel_id);

-- ===========================
-- ORDERS (Partitioned)
-- ===========================
CREATE TABLE orders (
    order_id BIGSERIAL,
    hotel_id BIGINT NOT NULL REFERENCES hotels(hotel_id) ON DELETE CASCADE,
    table_number VARCHAR(50),
    total_amount NUMERIC(10, 2) NOT NULL,
    status order_status DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (order_id, created_at)
) PARTITION BY RANGE (created_at);

-- Example partition
-- CREATE TABLE orders_2025_08 PARTITION OF orders FOR VALUES FROM ('2025-08-01') TO ('2025-09-01');

CREATE INDEX ON orders (hotel_id);
CREATE INDEX ON orders (status);
CREATE INDEX ON orders (created_at);

-- Order items
CREATE TABLE order_items (
  order_item_id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL, -- needed to match partition PK
  item_id BIGINT NOT NULL REFERENCES menu_items(item_id),
  quantity INT NOT NULL CHECK (quantity > 0),
  price NUMERIC(10,2) NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  FOREIGN KEY (order_id, created_at) REFERENCES orders(order_id, created_at) ON DELETE CASCADE
);
CREATE INDEX ON order_items (order_id);
CREATE INDEX ON order_items (item_id);

-- ===========================
-- SALES AGGREGATE VIEW
-- ===========================
CREATE MATERIALIZED VIEW mv_daily_sales AS
SELECT
  hotel_id,
  date_trunc('day', created_at) AS day,
  COUNT(*) FILTER (WHERE status = 'completed') AS completed_orders,
  SUM(total_amount) FILTER (WHERE status = 'completed') AS total_sales
FROM orders
GROUP BY hotel_id, date_trunc('day', created_at);

CREATE INDEX ON mv_daily_sales (hotel_id, day);
