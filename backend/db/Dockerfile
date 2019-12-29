FROM 172.42.42.200:18082/alpine:3.11.2
RUN apk --update add postgresql-client && rm -rf /var/cache/apk/*

ARG PGHOST
ARG PGPORT
ARG PGUSER
ARG PGPASSWORD
ARG PGDB

RUN psql "postgresql://postgres:${PGPASSWORD}@${PGHOST}:${PGPORT}/postgres" -c "REVOKE ALL PRIVILEGES ON DATABASE ${PGDB} FROM ${PGUSER}"; exit 0
RUN psql "postgresql://postgres:${PGPASSWORD}@${PGHOST}:${PGPORT}/postgres" -c "DROP DATABASE IF EXISTS ${PGDB}"
RUN psql "postgresql://postgres:${PGPASSWORD}@${PGHOST}:${PGPORT}/postgres" -c "DROP USER IF EXISTS ${PGUSER}"
RUN psql "postgresql://postgres:${PGPASSWORD}@${PGHOST}:${PGPORT}/postgres" -c "CREATE DATABASE ${PGDB}"
RUN psql "postgresql://postgres:${PGPASSWORD}@${PGHOST}:${PGPORT}/postgres" -c "CREATE USER ${PGUSER} WITH ENCRYPTED PASSWORD '${PGPASSWORD}'"
RUN psql "postgresql://postgres:${PGPASSWORD}@${PGHOST}:${PGPORT}/postgres" -c "GRANT ALL PRIVILEGES ON DATABASE ${PGDB} TO ${PGUSER}"
RUN psql "postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDB}" -c "SELECT CURRENT_DATABASE()"