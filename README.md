Building with docker:

```
docker-compose up
```

Building without docker:

```
    npm i
    npm run build
    npm run migrate_start
```

Configuration:

place: 
```
./config.json
```
config:
```json
{
    "database": {
        "connectionLimit": "number",
        "host": "string",
        "user": "string",
        "password": "string",
        "database": "string"
    },
    "network": {
        "port": "number"
    },
    "jwt": {
        "secret": "string"
    }
}
```