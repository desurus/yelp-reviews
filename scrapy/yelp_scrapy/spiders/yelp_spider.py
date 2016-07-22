import scrapy
from yelp_scrapy.items import YelpRestourantReviews


class YelpSpider(scrapy.Spider):
    name = "yelp"
    custom_settings = {
        'BOT_NAME': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
    }
    allowed_domains = ["yelp.com"]
    start_urls = [
        "http://www.yelp.com/biz/wurstk%C3%BCche-los-angeles-2"
    ]


    def parse(self, response):
        for sel in response.xpath('.//ul[contains(@class, "reviews")]/li'):
            item = YelpRestourantReviews()
            item['review_text'] = sel.xpath('div/div[contains(@class, "review-wrapper")]/div/p/text()').extract()
            item['review_date'] = sel.xpath('div//span[contains(@class, "rating-qualifier")]/text()').extract()
            item['review_rating'] = sel.xpath('div//meta[contains(@itemprop, "ratingValue")]/@content').extract()
            yield item

        next_page = response.css("div.pagination-links > div > div > a.next::attr('href')")
        if next_page:
            url = response.urljoin(next_page[0].extract())
            yield scrapy.Request(url, self.parse)

