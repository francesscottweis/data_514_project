/* 
Query 1: 
Display list of stays in Portland, OR in descending order of 
rating, with details: 
- name 
- neighbourhood
- room type
- how many guests it accommodates
- property type and amenities, 
- per night’s cost 
- is available for the next two days
 */
use('AirBnb_Portland');

// get listings that are available for the next two nights 
var available_listings = db.Calendar.aggregate(
    {
        $match:
            {
                $and: [
                    {"date": { $gte: new Date(ISODate().getTime() -  1000 * 3600 * 24 * 1), 
                        $lt: new Date(ISODate().getTime() + 1000 * 3600 * 24 * 1)}}, 
                    {"available":true}
                ]
             }
    }, 
    {
        $group: {
            _id: "$listing_id", 
            datesAvailable: {$sum: 1}}
    }, 
    {
        $match: 
            {
                "datesAvailable":2
            }
    }, 
    {
        $project: {
            "_id":1, "datesAvailable":0
        }
    }
).toArray()

db.AvailableListings.drop();
db.createCollection("AvailableListings");
available_listings.forEach((item) => db.AvailableListings.insertOne(item));

available_listings_ids = db.AvailableListings.distinct("_id");

db.Listings.aggregate( [
    {
       $project: {
        _id:0, 
        "name":1,
        "neighbourhood_cleansed":1,
        "room_type":1, 
        "accommodates":1,
        "property_type":1,
        "amenities":1, 
        "price":1,
        "available_next_two_days":  {
            $cond: {
              if: {
                $in: [
                  "$id",
                  available_listings_ids
                ]
              },
              then: true,
              else: false
            }
        },
        "review_scores_rating":1
       }
    }, 
    {
        $sort : { review_scores_rating : -1 }
    }
 ] )

