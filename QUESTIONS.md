#
Q1: Are there any sub-optimal choices( or short cuts taken due to limited time ) in your implementation?
#

I think most sub optimal choice I've done during this project was structuring the json data to be returned on the server side code.
There was a lot of hard coding done to fetch each crypto exchanges price from their api with different links and then I had to parse
data from different exchanges because they all returned their own distinct json formats. I didn't know how to deal with this efficiently
and it would definitely be a pain to scale this up if we wanted to support more exchanges.

Another short cut I took was just making a really plain-looking frontend with React. There's more to be desired than just 12 lines of
text with prices/recommendations.

#
Q2: Is any part of it over-designed? ( It is fine to over-design to showcase your skills as long as you are clear about it)
#
The most overdesigned (if it is overdesigned at all) part of this project was implementing autorefreshing of prices from each exchange every 5 seconds.
I thought it was just a nifty little thing to implement so the user wouldn't have to refresh each time to get new prices.

#
Q3: If you have to scale your solution to 100 users/second traffic what changes would you make, if any?
#
I would not make any changes to my server code if I had to scale this project up. Initially, I thought that for each price request the frontend did to the backend, 
the backend would trigger 8 API calls 1 for each triplet of exchange, buy/sell, and ETH/BTC to get the most recent data from all exchanges. However, I then quickly changed it to have each of these 8 API calls be executed every 5 seconds asynchronously and update the server cache that way. This way, if one of the exchanges was 
down, the server could still use the most recent data it had and the price fetching would not be bottlenecked. Another benefit of this approach was that there would
be less API calls to external services in total since the server would cache the master copy of all prices instead of having to fetch it each time for each individual
user.

On the frontend, if we were bearing heavy traffic, I would try to make the autoupdating slower depending on the number of concurrent users. This way, under heavy load,
the number of requests to the server would dynamically scale down if the server could not handle the load.

Otherwise, if we didn't want to decrease the refresh rate, I would just have multiple servers each calling and holding their own master version of the price data fetched from each exchange.

#
Q4: What are some other enhancements you would have made, if you had more time to do this implementation
#
If I had more time to do this, I would have a live graph for each cryptocurrency for buy/sell on each exchange. That way the users would have a way to visualize the price history of a currency before buying or selling.