# under construction

## REST API for the [store-UI](https://github.com/A-Maged/store-UI) Repo

## show all stores
```
GET  /api/v1/stores
```

## show single store
```
GET  /api/v1/stores/show/:storeSlug
```

## add a store
```
POST  /api/v1/stores/add
body data : {name: String, description: String}
```

## update a store
```
POST  /api/v1/stores/update/:storeSlug
body data : {name: String, description: String}
```

