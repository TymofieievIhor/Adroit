#!/bin/bash
set -ex

tsc

cd liquibase
mvn clean install -Pdev

cd ..

eb deploy dev-env --profile adroit

# deploy without committing
# git add .
# eb deploy dev-env --profile adroit --staged