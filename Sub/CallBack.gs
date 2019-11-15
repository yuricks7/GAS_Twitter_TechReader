/**
 * 認証後のコールバック関数
 *
 * 呼び出しを受けられるようにメソッドではなく独立させておく
 *
 * ▼参照
 * Google Apps ScriptでTwitterに投稿するスクリプト（GAS×TwitterBot④） | もりさんのプログラミング手帳
 * https://moripro.net/gas-twitter-bot/
 *
 * 外部ライブラリを使用
 * [name]    TwitterWebService.gs
 * [key]     1rgo8rXsxi1DxI_5Xgo_t3irTw1Y5cxl2mGSkbozKsSXf2E_KBBPC3xTF
 * [version] 2.0
 * [source]  https://gist.github.com/M-Igashi/750ab08718687d11bff6322b8d6f5d90
 */
function authCallback(request) {
  var temp = new TwitterApp;
  var twitter = temp.authInstance;

  return twitter.authCallback(request);
};