#!/usr/bin/env bash
# shellcheck disable=SC2181

#
# Load a SQL file into skolan
#
function loadSqlIntoEshop
{
    echo ">>> $4 ($3)"
    mysql "-u$1" "-p$2"  warehouse < "$3" > /dev/null
    if [ $? -ne 0 ]; then
        echo "The command failed, you may have issues with your SQL code."
        echo "Verify that all SQL commands can be exeucted in sequence in the file:"
        echo " '$3'"
        exit 1
    fi
}

#
# Recreate and reset the database to be as after part II.
#
echo ">>> Start docker mysql"
sudo docker start mysql
mysql --local_infile=1
echo ">>> Reset all tables"
loadSqlIntoEshop "admin" "pass" "ddl.sql" "Create tables"
loadSqlIntoEshop "admin" "pass" "insert.sql" "Insert/update into warehouse"