/**
 * 「Bitly」を使って長いURLを短縮する
 * https://dev.bitly.com/links.html#v3_shorten
 *
 * ▼参照
 * ───────────────────────────────────
 * (1) Bitly登録の手順
 * 【覚書】GASからbit.lyのAPIを叩いてみた話 | すぐもぐ！
 * https://company.sugumogu.com/archives/2461
 *
 * (2) GASからBitly APIを叩くコード
 * 短縮URL を goo.gl から bit.ly へ乗り換えてみた (Google Apps Script) | プログラマってこんなかんじ？？
 * http://daichan4649.hatenablog.jp/entry/translate-shorturl-google-to-bitly
 *
 * (3) Bitly APIのendpointについて
 * bitly APIの使い方 | Qiita
 * https://qiita.com/maruyam-a/items/96c8ad733c770a44117e
 *
 * (4) URLのエンコードなど
 * Bitly APIとJavaScriptでAJAXな短縮URL生成ツールを作成 | maesblog
 * https://mae.chab.in/archives/2495
 *
 * encodeURIComponentが世界基準だと誤解してた話 | Qiita
 * https://qiita.com/shibukawa/items/c0730092371c0e243f62
 * ───────────────────────────────────
 *
 */
class Bitly {

  /**
   * コンストラクタ
   */
  constructor() {
    // GETメソッド用の値を準備
    const PROPS = PropertiesService.getScriptProperties();
    this.token = PROPS.getProperty('BITLY_API_TOKEN');

    // this.baseUrl = 'https://api-ssl.bitly.com/v3/shorten?access_token=';
    this.baseUrl = 'https://api-ssl.bitly.com/v4/shorten'; // bitly api v4
  }

  /**
   * bitlyapiから短縮URLを生成
   * 
   * - ▼参照
   *    - https://zenn.dev/antyuntyun/articles/gas-generate-short-url
   * 
   * @param {string} longUrl - 短縮したい長いURL
   * 
   * @returns {string} - 短縮URL
   */
  shorten(longUrl) {
    const payload = { long_url: longUrl }
    const headers = {
      Authorization: 'Bearer ' + this.token,
      'Content-Type': 'application/json',
    }
    const options = {
      method: 'POST',
      headers: headers,
      payload: JSON.stringify(payload),
    }

    const response = UrlFetchApp.fetch(this.baseUrl, options)
    const content = response.getContentText('UTF-8')

    return JSON.parse(content).link
  }
}