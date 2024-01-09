#!/bin/bash

# MySQL Connection Details
MYSQL_USER="root"
MYSQL_PASSWORD=""
MYSQL_HOST="127.0.0.1"
MYSQL_PORT="3306"

# Database Configuration
DB_NAME="url_shortener"

# MySQL Connection Command
MYSQL_CMD="mysql -u${MYSQL_USER} -p${MYSQL_PASSWORD} -h${MYSQL_HOST} -P${MYSQL_PORT}"

# Function to clear the database and its tables
clear_database() {
  ${MYSQL_CMD} -e "DROP DATABASE IF EXISTS ${DB_NAME};"
}

# Main Script Execution
clear_database

echo "Database and tables cleared."
