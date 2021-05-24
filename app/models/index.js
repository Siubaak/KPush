const axios = require('axios')
const cheerio = require('cheerio')

module.exports = {
  /**
   * 获取mobi电子书搜索列表
   * 
   * @param {string} query - 查询关键词
   * @return {array} - 返回电子书列表
   * 
   * 返回数组元素为mobi对象，包含2个字段，均为string
   * mobi.id - mobi电子书唯一id
   * mobi.desc - mobi电子书描述（标题、简介等）
   */
  async getList(query) {
    const res = await axios.get(`https://3lib.net/s/`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
      },
      params: {
        'q': query,
        'extensions[]': 'mobi'
      }
    })
    const $ = cheerio.load(res.data)
    const $li = $('#searchResultBox .resItemBox')
    const list = []
    for(let i = 1; i < $li.length; i++) {
      const $td = $li.eq(i).find('td')
      const $item = $td.eq(2).find('a')
      list.push({
        id: $item.attr('href'),
        desc: $item.text()
      })
    }
    return list
  },
  /**
   * 通过id换取下载链接
   * 
   * @param {string} id - mobi电子书唯一id
   * @return {string} - 返回mobi电子书下载用url
   */
  async getUrl(id) {
    const res = await axios.get(`https://3lib.net${id}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
      }
    })
    const $ = cheerio.load(res.data)
    return `https://3lib.net${$('.dlButton').attr('href')}`
  }
}
