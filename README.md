# NLP to analyse restaurant reviews

This is a demo project aimed to demonstrate use of NLP algorithms to perform sentiment analysis of the restaurant reviews.
Then the calculated score is compared with the rating given by the review author. [live example](http://nlp-demo.desurus.com/)

Installation
-----

This project is build in Python. Make sure you have Python 2.7+ installed on your system.
You will also need:
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

![NLP demo screenshot](https://lh3.googleusercontent.com/qZobNEFbmJvWoXjwgmWAJiua4yBhun1NhXSttnSwmBCZJDJRpFKsZDcxVDUhzXAfVz0NmRM2QTG2EjZBnavL_2feeV-Z_vqyPU-BJ8qlhn7KSqlLS86qTEEVezxL-AWDMcOKN68nMRxD_Y8oJZ5DAjyTzgxt_A_z4JB78Y2EJoLlEDNm1weAl2dzqG_KL3KzJ44kG3MKwkE7tP_7OlMghO7498yppT8DU2hf43UGpaxrXjzIPGEurczgqCnDjMFYNsncIK_kxFBi9xuO1osW0e3psaAcdHml4R0JVSWEDx54kds6n63C1gUQfas3wRjuhlCn-M7aFVxDda9xQfgqddglvJcn2KSuOqjrFskYUocWKGwjiX7QIZhCZ_pHaQYQc_CAJI2l5uMfpWBgqHzO-DHgweT7sUFhpLbZM425XxO1gbVEAgrK9A1QxCTGgWWHtrnn_EjY73wNUp33_j1IYZVXbIsAw7l5x0zIJR_tyvZk3dQN0IHpu3H-FIE4M_WUV0iB_kAnvlXK7_nUAO5NUrstuYtBoOTyh2xT9mEu3kxcyb5G38w11VYHmvVqBNISXHoKgUkahjrr51bSz2v6guKNnxYxAmcv=w2000-h880-no 'NLP demo screenshot')
![NLP demo screenshot](https://lh3.googleusercontent.com/PY3_A65V97p2ooaX3zNAfCWSJ8SKvIW4g5NPnyazyD22Gvb3eNBfDNmb0LxDdw3Sx3rcj72Uk9XipXlQ25U5WKgYVaCODDRR4qR26F1yEGFySOGi1Oz1T6qXPv5Dil2O-VxKGDbOv-cjLpnPj_80P7mXjvHffKngcBAif2Eq3Z3uLafXp9MyhhpjAexP64Ty1jlyvE8hIRE8ay_9zqoqZAol0lMdsBzhtAB6w9qWY1Q2lhZ1UiViKj5S7pAo0eSQJiu3cmqIxWtyUAoDgvV4WrVg9TpSc058q7ycN1P_8yksaFl-PpeTFZ9RkItx7roMCHpGM6uGzp6lx1utEN6IqSgzss7Xi0bmISrf2ZE7kJuf9-RX_U4oP3wz2khKFMbsfdx_RtuvSHpMDeEoB3FJTJ7tLnAcj1og2GbZD2vkWahYpJkFsXBApFaQKIFHasqMfYdRRmQwBZVcrF1tNf0OlLqNsHjDKpBYIMcIw26CW_8rSyD73rstsTH8CdRZx30lBCaO6BKVpamzlYQ2bSsdDFu8tJlv4rzpF_HmlDOVm0mPAkjqjlrfO-Wt7iq-pmlPpDohcBzRW2AL60xHHfnKQTkorCsAU4H_=w2000-h1774-no 'NLP demo screenshot')