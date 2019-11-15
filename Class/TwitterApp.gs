/**
 * Twitterの実際のアクションを扱うクラス
 *
 * ▼参照
 * 【GAS】スプレッドシートのランダムな行データを取得してツイート（GAS×TwitterBot⑤） | もりさんのプログラミング手帳
 * https://moripro.net/gas-spreadsheet-random-tweet/
 *
 * クラス全体で外部ライブラリを使用
 * [name]    TwitterWebService.gs
 * [key]     1rgo8rXsxi1DxI_5Xgo_t3irTw1Y5cxl2mGSkbozKsSXf2E_KBBPC3xTF
 * [version] 2.0
 * [source]  https://gist.github.com/M-Igashi/750ab08718687d11bff6322b8d6f5d90
 */
var TwitterApp = function() {
  // 認証インスタンス
  this.authInstance = generateInstance();
};

/**
 * 認証用インスタンスの生成
 */
var generateInstance = function() {
  var props = PropertiesService.getScriptProperties();
  
  var instance = TwitterWebService.getInstance(
    props.getProperty('API_KEY'), // API Key
    props.getProperty('API_SECRET_KEY')  // API secret key
  );

  return instance;
};

/**
 * ツイートを投稿
 *
 * @param {string} 投稿するメッセージ
 */
TwitterApp.prototype.post = function(m) {
  var service = this.authInstance.getService();    
  const END_POINT_URL = 'https://api.twitter.com/1.1/statuses/update.json';
  
  var response = service.fetch(END_POINT_URL, {
    method: 'post',
    payload: {
      status: m
    }
  });
}

/**
 * アプリを連携認証する
 */
TwitterApp.prototype.authorize = function() {
  this.authInstance.authorize();
};

/**
 * 認証を解除する
 */
TwitterApp.prototype.reset = function() {
  this.authInstance.reset();
};