/*
 * 参照
 * 【GAS】スプレッドシートのランダムな行データを取得してツイート（GAS×TwitterBot⑤） | もりさんのプログラミング手帳
 * https://moripro.net/gas-spreadsheet-random-tweet/
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