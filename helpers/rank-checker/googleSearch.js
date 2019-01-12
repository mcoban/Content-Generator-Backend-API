const googleSearch = require('./google')
const axios = require('axios')
const cheerio = require('cheerio')
const geo = new googleSearch.GeoSearch()



let searchGoogle = async (obj) => {
	geo.baseUrl = obj.baseUrl || 'https://www.google.com/search?'
	geo.lang = obj.lang || 'tr'
	geo.mobile = obj.mobile || false

	var url = geo.build({
		query: obj.keyword,
		resultCount: obj.resultCount,
		location: obj.location || 'Türkiye'
	})

	const result = await axios(url).then(response => response.data)
	const $ = cheerio.load(result)

	let results = []
	$('h3.r').map(function (i) {
		try {
			if ($(this).find('a').attr('href').indexOf('http') > 0) {
				results.push({
					rank: i + 1,
					title: $(this).find('a').text(),
					url: $(this).find('a').attr('href').split('url?q=')[1].split('&sa=')[0]
				})
			}
		} catch (e) {
			
		}
	})
	return results
}


module.exports = {
	searchGoogle
}