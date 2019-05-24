#!/bin/bash
set -ex

DB_USER='root'
DB_PASS=''

ADROIT_USER='adroit_user'
ADROIT_PASS='pass'
ADROIT_HOST='localhost'
ADROIT_DB='adroit_db'

mysql -u "$DB_USER" --password="$DB_PASS" -Bse "
create user '$ADROIT_USER'@'$ADROIT_HOST' identified with mysql_native_password by '$ADROIT_PASS';

create database $ADROIT_DB;

GRANT ALL PRIVILEGES ON $ADROIT_DB.* TO '$ADROIT_USER'@'$ADROIT_HOST';

set global log_bin_trust_function_creators=1;
"