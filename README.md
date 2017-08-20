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

## show single item in a store
```
GET  /api/v1/stores/show/:storeSlug/:itemId
```

## add a store
```
POST  /api/v1/stores/add
body data : {
	name: String, 
	description: String,
	location: {
		address : String,
		longitude: Number,
		latitude: Number,
	},
	featuredImg: String, 
	coverImgLink: 	String,
	hasDelivery:Boolean, 
	deliveryCities: [String]
}
```

## add an item to a store
```
POST  /api/v1/stores/:storeSlug/add
body data : [{
	name:String,
	description: String,
	price: Number,
	featuredImg : String,
	galleryImgs: [String],
	catagory: String,
	reviews:[{
		username: String,
		data:	String,
		stars: 	Number
	}]
}]
```

## update a store
```
POST  /api/v1/stores/update/:storeSlug
body data : {name: String, description: String}
```

