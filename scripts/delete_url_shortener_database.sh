#!/bin/bash

ROOT_PATH=".."

# Path to .env file
ENV_FILE="$ROOT_PATH/.env"

# Check if .env file exists
if [ -f "$ENV_FILE" ]; then
  # Load environment variables from .env file
  source "$ENV_FILE"
  echo ".env loaded successfully."

  # MySQL Connection Details
  MYSQL_USER=$MYSQL_USER
  MYSQL_PASSWORD=$MYSQL_PASSWORD
  MYSQL_HOST=$MYSQL_HOST
  MYSQL_PORT=$MYSQL_PORT

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
else
  echo "Error: $ENV_FILE not found."
  exit 1
fi
