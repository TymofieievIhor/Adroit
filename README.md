Adroit API

## Requirements

NodeJs 8

## Description

Project created using [Nest](https://github.com/nestjs/nest) framework (TypeScript).

Default password for newly created account is `ChangeMe!`.

## Installation

1) Launch local MySQL and create appropriate database and user for it.
2) Define local credentials and other configuration in file `src/common/env/local-variables.ts`.
3) Install NodeJs packages:
```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start:dev
# or
$ npm run start:local

# incremental rebuild (webpack)
$ npm run webpack
$ npm run start:hmr

# production mode
$ npm run start:prod
```
## Structure

The application consists of modules, which include:

* controller

* entity (entities)

* dtos (dto folder)

* service

Controllers, services and entities are derived from the `ControllerBase<T>`, `ServiceBase<T>` and `EntityBase<T>` classes respectively.

Those base classes are stored in `/src/common/` folder.

## Constants & environment variables

Constant variables are stored in `/src/common/constant.ts`.

Auth-related constants are stored in `/src/common/auth/`.


Environment variables & interfaces (and also local env variables) are in `/src/common/env`.
There's a `TypedEnv` object which implements the `IEnvVariables` interface and gets the `process.env` variables in the root file (main.ts) of the project.

### Naming conventions
>`Transactions`
For naming consistency purposes, methods with suffix `TxChain` or prefix `tx` expect to receive transaction manager as last optional argument.
Always put `TxChain` suffix or `tx` prefix for your transactional methods.

>`Entity properties`
When database entity has property called “type_name” it means this property will be displayed on the UI to the user.
While “type_text_value” contains a key of the "type_name" to use in code.

>`Exceptions`
Every constant with exception message should start with `EXC_` prefix, e.g. `EXC_ACCOUNT_NOT_FOUND`.

## Trip module

Trip module is used for creating scheduled/recurring trips.

It is a copy of the `RideManagement` entities, but the data is never modified after creation.

Currently there are several services available:

* the trip-orchestrator - allows to create the scheduled trip based on the existing ride-route

* the trip-modifier - includes a `dispatch()` method which changes statuses of the trip/driver/passenger using an `action` with the `payload` and `type` as an input parameters.

* the trip service - contains methods for updating/modifying the trip-related entities


## AWS bucket - file uploading

The `Driver`, `Client` and `Passenger` are able to upload specific files.

There's `File` module for this purposes.

Main points:

* there's a 'File' entity in which the link to the AWS is being stored

* currently, files on AWS are never deleted, only records in the 'File' entity


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Database migration

For migrations we use Liquibase, for related commands look at `liquibase` directory in the app root.

## Database

Before you launch the app, create appropriate database and user:

```
> sh first-setup.sh
```

## License

  Nest is [MIT licensed](LICENSE).
