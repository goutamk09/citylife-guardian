import sqlite3

con = sqlite3.connect("issues.db")
cur = con.cursor()

cur.execute("DELETE FROM issues")
con.commit()

con.close()
print("All issues deleted successfully!")
