import sqlite3

con = sqlite3.connect("issues.db")
cur = con.cursor()
rows = cur.execute("SELECT id, description, category, lat, lng FROM issues").fetchall()

for r in rows:
    print(r)
