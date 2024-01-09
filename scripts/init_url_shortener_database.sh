#!/bin/bash

# MySQL Connection Details
MYSQL_USER="root"
MYSQL_PASSWORD=""
MYSQL_HOST="127.0.0.1"
MYSQL_PORT="3306"

# Database Configuration
DB_NAME="url_shortener"
DB_USER="root"
DB_PASSWORD="root"

# SQL File
SQL_FILE="../configs/schema.sql"

# MySQL Connection Command
MYSQL_CMD="mysql -u${MYSQL_USER} -p${MYSQL_PASSWORD} -h${MYSQL_HOST} -P${MYSQL_PORT}"

# Function to execute SQL file
execute_sql_file() {
  ${MYSQL_CMD} < "${SQL_FILE}"
}

# Function to configure database in SQL file
configure_database() {
  # Replace placeholders with actual values in the SQL file
  sed -i "s/{{DB_NAME}}/${DB_NAME}/g" "${SQL_FILE}"
  sed -i "s/{{DB_USER}}/${DB_USER}/g" "${SQL_FILE}"
  sed -i "s/{{DB_PASSWORD}}/${DB_PASSWORD}/g" "${SQL_FILE}"

  echo "Database configuration complete."
}

# Main Script Execution
if [ -f "${SQL_FILE}" ]; then
  configure_database
  execute_sql_file
else
  echo "Error: SQL file not found."
fi
