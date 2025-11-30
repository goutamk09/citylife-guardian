# backend/migrate.py
import sqlite3

DB = "issues.db"  # relative to backend folder

conn = sqlite3.connect(DB)
c = conn.cursor()

# Add category
try:
    c.execute("ALTER TABLE issues ADD COLUMN category TEXT DEFAULT 'Other'")
except Exception as e:
    print("category column probably exists:", e)

# Add lat
try:
    c.execute("ALTER TABLE issues ADD COLUMN lat REAL")
except Exception as e:
    print("lat column probably exists:", e)

# Add lng
try:
    c.execute("ALTER TABLE issues ADD COLUMN lng REAL")
except Exception as e:
    print("lng column probably exists:", e)

conn.commit()
conn.close()
print("Migration done (no-op if columns exist).")
