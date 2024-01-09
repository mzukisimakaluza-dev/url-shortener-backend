Windows:
1. WINDOWS KEY + R, then type msconfig + ENTER
2. Find MYSQL and check if its running, if not

3. Run PowerShell as admin, `> cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"`
4. Optional: `mysqld --install`
5. Run: `mysqld --initialize`

6. WINDOWS kEY + R, then type services.msc, find MYSQL and run it
