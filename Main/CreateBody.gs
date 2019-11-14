function Main() {
  var ss     = SpreadsheetApp.getActiveSpreadsheet();
  var sheet  = ss.getSheetByName('シート1');
  var values = sheet.getDataRange().getValues();

  const SEARCH_COL = 8;
  var index = getBlankRowIndex(values, SEARCH_COL - 1);

  // 何もなければ終了
  if (index < 0) {
    var feeds = values[index];
    
    var body  = getTweetText(feeds, ss);
    
    // 長かったらカットしておく
    if (body.length > 140) {
      body = body.substring(0, 139) + '…';
    }

//    ログ確認用
//    Logger.log('━━━━━━━━━\n' + body);
//    Logger.log('━━━━━━━━━');

    postTweet(body);
    sheet.getRange(index + 1, SEARCH_COL).setValue(true);
  }
}

/**
 * 「TRUE」と入っていない行を探す
 */
function getBlankRowIndex(values) {
  // 二次元配列内でVLOOKUP
  var _ = Underscore.load(); // Underscore for GASライブラリの呼び出し
  var transposedValues = _.zip.apply(_, values);
  var index            = transposedValues[7].indexOf('');

  return index
    
}

/**
 * 「TRUE」と入っていない行を探す
 *
 * @param {object} feeds フィード1行分の配列
 * @param {object} ss 対象のスプレッドシート
 */
function getTweetText(feeds, ss) {
  
  var tweetSource = new TweetSource(feeds,ss);
  
  const LF  = '\n';
  var tweet = '';
  tweet += '[' + tweetSource.feedCategory + '] ' +　tweetSource.feedTitle  + LF;
  tweet += '▼' + tweetSource.entryTitle + LF;
  tweet += tweetSource.entryUrl   + LF;
  tweet += tweetSource.body;
  
  return tweet;
}