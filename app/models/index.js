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
   * mobi.url - mobi电子书下载用url
   * mobi.desc - mobi电子书描述（标题、简介等）
   */
  async getList(query) {
    const res = await axios.get('https://sk.kindleshare.cn', {
      params: {
        ext: 'mobi',
        name: query,
        submit: 'Search'
      }
    })
    const $ = cheerio.load(res.data)
    const $li = $('#jieguo table tr')
    const list = []
    for(let i = 1; i < $li.length; i++) {
      const $td = $li.eq(i).find('td')
      list.push({
        url: $td.eq(3).find('a').attr('href'),
        desc: `${$td.eq(0).text()} (${$td.eq(2).text()})`
      })
    }
    return list
  }
}