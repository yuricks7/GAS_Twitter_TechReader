/**
 * 認証後のコールバック
 *
 * 呼び出しを受けられるように独立させておく
 *
 */
function authCallback(request) {
  var temp = new TwitterApp;
  var twitter = temp.authInstance;

  return twitter.authCallback(request);
};