/* 
Query 2: 
Are there any neighbourhoods in any of the cities that don’t have any listings?
*/

use('Results')
db.Neighborhoods_Without_Listings.drop();
db.createCollection("Neighborhoods_Without_Listings");

// Los Angeles
use('AirBnb_Los_Angeles');
neighborhoods_w_listing_la = db.Listings.distinct("neighbourhood_cleansed");
var los_angeles = db.Neighborhoods.find( { neighbourhood: { $nin: neighborhoods_w_listing_la } } ,{neighbourhood:1, _id:0}).toArray()
use('Results')
los_angeles.forEach((item) => db.Neighborhoods_Without_Listings.insertOne(item));

// Portland
use('AirBnb_Portland');
neighborhoods_w_listing_p = db.Listings.distinct("neighbourhood_cleansed");
var portland = db.Neighborhoods.find( { neighbourhood: { $nin: neighborhoods_w_listing_p } } ,{neighbourhood:1, _id:0}).toArray()
use('Results')
portland.forEach((item) => db.Neighborhoods_Without_Listings.insertOne(item));

// Salem
use('AirBnb_Salem');
neighborhoods_w_listing_s = db.Listings.distinct("neighbourhood_cleansed");
var salem = db.Neighborhoods.find( { neighbourhood: { $nin: neighborhoods_w_listing_s } } ,{neighbourhood:1, _id:0}).toArray()
use('Results')
salem.forEach((item) => db.Neighborhoods_Without_Listings.insertOne(item));

// San Diego
use('AirBnb_San_Diego');
neighborhoods_w_listing_sd = db.Listings.distinct("neighbourhood_cleansed");
var san_diego = db.Neighborhoods.find( { neighbourhood: { $nin: neighborhoods_w_listing_sd } } ,{neighbourhood:1, _id:0}).toArray()
use('Results')
san_diego.forEach((item) => db.Neighborhoods_Without_Listings.insertOne(item));

// Results
db.Neighborhoods_Without_Listings.find({}, {_id:0})