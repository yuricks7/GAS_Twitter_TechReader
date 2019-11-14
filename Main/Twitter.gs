/*
 * 参照
 * 【GAS】スプレッドシートのランダムな行データを取得してツイート（GAS×TwitterBot⑤） | もりさんのプログラミング手帳
 * https://moripro.net/gas-spreadsheet-random-tweet/
 */

/**
 * 認証インスタンス
 *
 * @note グローバル変数なので扱いに注意
 *
 */
var twitter = generateInstance();

/**
 * 認証用インスタンスの生成
 */
function generateInstance() {
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
function postTweet(m) {
  
  var service  = twitter.getService();
  var endPointUrl = 'https://api.twitter.com/1.1/statuses/update.json';
  
  var response = service.fetch(endPointUrl, {
    method: 'post',
    payload: {
      status: m
    }
  });  
};

/**
 * アプリを連携認証する
 */
function authorize() {
  twitter.authorize();
};

/**
 * 認証を解除する
 */
function reset() {
  twitter.reset();
};

/**
 * 認証後のコールバック
 */
function authCallback(request) {
  return twitter.authCallback(request);
};