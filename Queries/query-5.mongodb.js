/* 
Query 5: 
For each city, how many reviews are received for December of each year?
 */

//Portland
use('AirBnb_Portland');
db.Reviews.aggregate(
    {
        $set: {
            year: { $year: "$date" }, 
            month: { $month: "$date"}
        }
    }, 
    {
        $match: {
            "month":12
        }
    },
    {
        $group: {
            _id: "$year", 
            reviews: {$sum: 1}}
    }, 
    {
        $sort: {_id:1}
    }
)

//Salem
use('AirBnb_Salem');
db.Reviews.aggregate(
    {
        $set: {
            year: { $year: "$date" }, 
            month: { $month: "$date"}
        }
    }, 
    {
        $match: {
            "month":12
        }
    },
    {
        $group: {
            _id: "$year", 
            reviews: {$sum: 1}}
    }, 
    {
        $sort: {_id:1}
    }
)

//Los Angeles
use('AirBnb_Los_Angeles');
db.Reviews.aggregate(
    {
        $set: {
            year: { $year: "$date" }, 
            month: { $month: "$date"}
        }
    }, 
    {
        $match: {
            "month":12
        }
    },
    {
        $group: {
            _id: "$year", 
            reviews: {$sum: 1}}
    }, 
    {
        $sort: {_id:1}
    }
)

//San Diego
use('AirBnb_San_Diego');
db.Reviews.aggregate(
    {
        $set: {
            year: { $year: "$date" }, 
            month: { $month: "$date"}
        }
    }, 
    {
        $match: {
            "month":12
        }
    },
    {
        $group: {
            _id: "$year", 
            reviews: {$sum: 1}}
    }, 
    {
        $sort: {_id:1}
    }
)
