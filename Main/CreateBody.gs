function Main() {
  var body = getTweetText();
  
  // 長かったらカット
  if (body.length > 140) {
    body = body.substring(0, 139) + '…';
  }
  
  postTweet(body);
}

function getTweetText() {
  var ss     = SpreadsheetApp.getActiveSpreadsheet();
  var sheet  = ss.getSheetByName('シート1');
  var values = sheet.getDataRange().getValues();

  var feeds = values[1];
  
  var tweetSource = new TweetSource(feeds, ss);
  
  const LF  = '\n';
  var tweet = '';
//  ログ確認用
//  tweet += '━━━━━━━━━━━━━━━━━━' + LF;
  tweet += '[' + tweetSource.feedCategory + '] ' +　tweetSource.feedTitle  + LF;
  tweet += '▼' + tweetSource.entryTitle + LF;
  tweet += tweetSource.entryUrl   + LF;
  tweet += tweetSource.body;
//  tweet += tweetSource.body       + LF;
//  tweet += '━━━━━━━━━━━━━━━━━━' + LF;
  
  Logger.log(tweet);
  
  return tweet;
}