To run this application under development or testing environment one must create a `config.json` file inside the *server/config* folder
```javascript
{
    "test": {
        "PORT": <your_testing_port>,
        "MONGODB_URI": <your_testing_database_uri_connection_string>,
        "JWT_SECRET": <your_testing_jwt_secret>
    },
    "development": {
        "PORT": <your_development_port>,
        "MONGODB_URI": <your_development_database_uri_connection_string>,
        "JWT_SECRET": <your_development_jwt_secret>
    }
}
```