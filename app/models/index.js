const request = require('superagent')
const cheerio = require('cheerio')

module.exports = {
  /**
   * 获取mobi电子书搜索列表
   * 
   * @param {string} query - 查询关键词
   * @return {array} - 返回list数组
   * 
   * list数组元素为mobi对象，包含3个字段，均为string
   * mobi.id - mobi电子书唯一索引，用于查询源下载用url
   * mobi.img - mobi电子书封面图url
   * mobi.desc - mobi电子书描述（标题、简介等）
   */
  async getList(query) {
    const res = await request.get('http://www.pdfbook.cn').query({ s: query })
    const $ = cheerio.load(res.text)
    const $li = $('#main').find('.image_box').find('li')
    const $as = $li.find('strong a')
    const $imgs = $li.find('img')
    let list = []
    for(let i = 0; i < $li.length; i++) {
      list.push({
        id: $as[i].attribs.href,
        img: $imgs[i].attribs.src,
        desc: $as[i].attribs.title
      })
    }
    return list
  },
  /**
    * 获取mobi电子书下载链接
    * 
    * @param {string} id - mobi电子书索引
    * @return {string} - 返回源中mobi电子书下载链接
    */
  async getUrl (id) {
    const res = await request.get(id)
    const $ = cheerio.load(res.text)
    return 'www.baidu.com'
  }
}