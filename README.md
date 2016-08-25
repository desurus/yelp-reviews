# NLP to analyse restaurant reviews

This is a demo project aimed to demonstrate use of NLP algorithms to perform sentiment analysis of the restaurant reviews.
Then the calculated score is compared with the rating given by the review author. [live example](http://nlp-demo.desurus.com/)

Installation
-----

This project is build in Python. Make sure you have Python 2.7+ installed on your system.
You will also need:
* [scrapy](http://scrapy.org/) crawling engine for python
* [nltk](http://www.nltk.org/) library for python
* [mongodb](https://www.mongodb.com/download-center?jmp=docs#community)
* [flask](http://flask.pocoo.org/) framework for python
* [pymongo](https://api.mongodb.com/python/current/)
* [grunt](http://gruntjs.com/) is used to build javascript portion of the website

How to use
-----

Follow these steps to populate project with data to display:
* Go to **yelp-reviews/scrapy** and open **run_scraper.py** for editing;
* Populate **start_urls** lists with the business URL's from Yelp that you want to analyse
* Then run **./run_scraper.py**
* Now perform sentiment analysis by running **./run_nltk.py**
* There are too many data points to display pretty, we need to calculate avarages by running **./run_norm.py**
* You now should have all the data necessary in the mongodb to display. We just need to run the server. Run **sudo ./run_server.py > /dev/null 2>&1 &** to start the server. 
* Now you can visit http://127.0.0.1 to see something like this:

![NLP demo screenshot](http://nlp-demo.desurus.com/static/nlp_demo1.png 'NLP demo screenshot')
![NLP demo screenshot](http://nlp-demo.desurus.com/static/nlp_demo2.png 'NLP demo screenshot')
