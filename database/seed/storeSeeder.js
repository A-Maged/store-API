require('dotenv').config();
const mongoose = require('mongoose');
var StoreModel = require('../../models/store')

var mongooseStoreConnection = require("../connectDB")(process.env.STORE_DATABASE)



var storeSeeder = function(storeData){

    const store = new StoreModel(storeData);

    // add store to DB
    store.save(function(error, store) {
        if (error){ 
            console.log(error); 
            process.exit();
        }
        else{ 
            console.log('inserted ' + store.name + ' succesfully');
        }

    });	

}





// **************************************

for(var i = 1; i <= 10; i++){

    storeSeeder({
        name: i + " store name",
        slug: i + "-store-slug",
        description: i + " store description blaaaaa blaaaaaaaaaaaa blaaaaaaaaa",
        location: {
                address : i + " street ny address",
                longitude: i + 1111111,
                latitude: i + 2222222
        },
        featuredImg: "http://" + i + "featuredImgLink.jpg",
        coverImgLink: "http://" + i + "coverImgLink.jpg",
        catagories: 	["cat" + (i+1) , "cat" + (i+2), "cat" + (i+3)],
        hasDelivery: true,
        deliveryCities: [i + "ny", i + "la", i + "texas"],


        items:[{
            name: "item"+ i +" name",
            
            description: "item"+ i +" description",
            
            price: i + 599,

            featuredImg : "http://"+ i +"itemfeaturedImgLink.jpg",

            galleryImgs: ["http://"+ i +"gallaryImgLink1.jpg", "http://"+ (i+1) +"gallaryImgLink2.jpg", "http://"+ (i+2) +"gallaryImgLink3.jpg"],

            catagory: "cat" + i,

            reviews:[ 
                {
                    username: i + "tito",
                    data:	"great product",
                    stars: 	4
                }
            ]
        }]


    });


}

