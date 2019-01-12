const btoa = require('btoa');

var GeoSearch = function() {
  
  this.baseUrl = 'https://www.google.com.tr/search?'
  this.pws = true
  this.lang = 'tr'
  this.mobile = false
  this.userAgent = ''

  var key = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'

  var makeHash = function(loc) {
    loc = loc.toLowerCase()
      .replace(/[åä]/g,'a')
      .replace(/[ö]/g,'o')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
    return  'w+CAIQICI' + key[loc.length%key.length] + btoa(loc).replace(/\=/g,'').trim()
  }

  this.build = function(input) {
    var hash = makeHash(input.location)
    var params = {
      query : encodeURIComponent(input.query),
      uule: hash,
      ie: 'UTF8',
      oe: 'UTF8',
      adtest: 'off',
      ip: '0.0.0.0',
      source_ip: '0.0.0.0',
      num: input.resultCount || 50
    }

    if (this.pws) params.pws = 0
    if (this.lang) params.hl = this.lang
    if (this.mobile) params['adtest-useragent'] = 'Mozilla/5.0+(Linux;+Android+4.4;+Nexus+5+Build/0)&device=30001'

    var urlParams = Object.keys(params).map(function(k) {
      return k + "=" + params[k]
    }).join('&')

    return this.baseUrl + urlParams
  }
}



module.exports.GeoSearch = GeoSearch;