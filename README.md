# BigOhTech Nest boilerplate

This project serves as a boilerplate for a NestJS application. It includes basic configurations and commonly used modules to help you kickstart your NestJS application development.

### Prerequisites

Node.js (>= 14.x recommended)  
npm (>= 6.x) or Yarn (>= 1.x)

### Installation

1. Clone the repository
    ```
    git clone https://gitlab.bigohtech.com/base-setup/nest-base-setup.git
    cd nestjs-boilerplate
    ```
2. Install the dependencies:
    ```
    npm install
    ```

### Environment Configuration

In this boilerplate, we primarily focus on three environments: development, staging, and production. Using the .env.example file as a reference, create a new file to configure your environment settings.

-   For Development `.env.development`
-   For Staging `.env.staging`
-   For Production `.env.production`

### Running the Application

After installation and creating env files we can easily run the project using the given script in the package.json file

-   For Development

    ```
    npm run start:dev
    ```

-   For Staging

    ```
    npm run build
    npm run start:stage
    ```

-   For Production
    ```
    npm run build
    npm run start:prod
    ```

## Naming convention

folder name - kebab-case  
file name - snake_case  
variable name - camelCase  
class name - PascalCase  
function name - camelCase  
interface name - camelCase(having i prefix example - iUserInfo)

## Boilerplate having -

Router setup ✅  
config setup ✅  
response setup ✅  
error setup (static and dynamic as well) ✅  
logger setup ✅  
Database setup ✅  
repository setup  
pagination setup ✅  
external service calling setup ✅  
redis setup  
kafka setup  
CORS setup

## Response formate

    {
        statusCode : 201,
        message : "Entity created successfully",
        data : {} || [{}],
        metadata : {
            total : 100,
            page : 2
            perPage : 20,
            previousPage : "",
            nextPage : "",
        }
    }

## Error formate

    {
        errors : {} || [{}],
        errorCode : "CUSTOM_CODE_2000",
        debugId : "debugUUID",
        timestamp : "InGMT",
    }

## Sequilize migrations

1.  All the database changes should be passed by the migrations files.
2.  The config file used in migrations can be found on the path `src/database/config/db.config.js`.
3.  Check the creds are apropiate according to the environments.
4.  For generating a new migration use the command `npx sequelize-cli migration:generate --name 'purpose of the migration'`
5.  To migrate the changes run `NODE_ENV={development | staging | production} npm run migrate:up` via docker or the pipelines used on delivering build.
    -   for Development
        ```
        NODE_ENV=development npm run migrate:up
        ```
    -   for Staging
        ```
        NODE_ENV=staging npm run migrate:up
        ```
    -   for Production 
        ```
        NODE_ENV=production npm run migrate:up
        ```
6.  For revert the most recent migration run command `NODE_ENV={development | staging | production} npm run migrate:undo`

[Migration ref](https://sequelize.org/docs/v6/other-topics/migrations/#undoing-migrations)


## How to run SonarQube

1.  Update sonar-project.js file and provide all the necessary information like token, projectName and projectKey
2. Run following command
    ```
    npm run sonar
    ```
3. It will generate a detailed project report and you will see the result on the provided url  
    for example:
    ```
    http://localhost:9000/dashboard?id=projectKey
    ```

[SonarQube docs ref](https://docs.sonarsource.com/sonarqube/latest/)  
[SonarQube npm ref](https://github.com/SonarSource/sonar-scanner-npm?tab=readme-ov-file)

