//認証用インスタンスの生成
var twitter = TwitterWebService.getInstance(
  'xxxxxxxxxxxxxxxxxxxxxxxxx',//API Key
  'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'//API secret key
);

//アプリを連携認証する
function authorize() {
  twitter.authorize();
}

//認証を解除する
function reset() {
  twitter.reset();
}

//認証後のコールバック
function authCallback(request) {
  return twitter.authCallback(request);
}

// ツイートを投稿
function postTweet() {
  
  var service  = twitter.getService();
  var endPointUrl = 'https://api.twitter.com/1.1/statuses/update.json';
  
  var response = service.fetch(endPointUrl, {
    method: 'post',
    payload: {
      status: 'GASテスト'
    }
  });
}