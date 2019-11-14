function Main() {
  var ss     = SpreadsheetApp.getActiveSpreadsheet();
  var sheet  = ss.getSheetByName('シート1');
  var values = sheet.getDataRange().getValues();

  const POST_CHECK_COL = 8;
  var index = getBlankRowIndex(values, POST_CHECK_COL - 1);
  
  // 何もなければ終了
  if (index < 0) return

  var feeds = values[index];
  var tweetSource = new Feed(feeds,ss);
  var tweet = tweetSource.tweet;
  
  var twitter = new TwitterApp;
  twitter.post(tweet);

  sheet.getRange(index + 1, POST_CHECK_COL).setValue(true);
}

/**
 * 「TRUE」と入っていない行を探す
 */
var getBlankRowIndex = function(values, colIndex) {
  // 二次元配列内でVLOOKUP
  var _ = Underscore.load(); // Underscore for GASライブラリの呼び出し
  var transposedValues = _.zip.apply(_, values);
  var index            = transposedValues[colIndex].indexOf('');

  return index;
}