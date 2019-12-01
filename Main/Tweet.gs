/**
 * スプレッドシートに取得したRSSフィードをTwitterに投稿する
 *
 */
function Main() {
  try {
    var ss     = SpreadsheetApp.getActiveSpreadsheet();
    var sheet  = ss.getSheetByName('記事');
    var values = sheet.getDataRange().getValues();
    
    const POST_CHECK_COL = 8;
    var index = getBlankRowIndex(values, POST_CHECK_COL - 1);
    
    // 何もなければ終了
    if (index < 0) return;
    
    var feeds = values[index];
    var tweetSource = new Feed(feeds,ss);
    var tweet       = tweetSource.tweet;

    var twitter = new TwitterApp;
    twitter.post(tweet);
    
    sheet.getRange(index + 1, POST_CHECK_COL).setValue(true);
    
  } catch (e) {
    var occuredTime = new Date();
    var errorLog    = new ErrorLog(e, occuredTime);
    var ssForLog    = SpreadsheetApp.getActiveSpreadsheet();
    errorLog.output(ssForLog, 'エラーログ');

  }
}

/**
 * 「TRUE」と入っていない行を探す
 *
 * 外部ライブラリを使用
 * [Name]    Underscore for GAS
 * [Key]     M3i7wmUA_5n0NSEaa6NnNqOBao7QLBR4j
 * [version] 2.0
 * [note]    類似ライブラリ（※）では使えない処理があるので混同しないように注意。
 *           ※UnderscoreGS（'MiC3qjLYVUjCCUQpMqPPTWUF7jOZt2NQ8'）
 *
 * @param {array}    values 検索先の二次元配列
 * @param {number} colIndex 検索列のインデックス
 *
 * @return {number} 「TRUE」と入っていない行のインデックス
 */
var getBlankRowIndex = function(values, colIndex) {
  // 二次元配列内でVLOOKUP
  var _ = Underscore.load(); // Underscore for GASライブラリの呼び出し
  var transposedValues = _.zip.apply(_, values);
  var index            = transposedValues[colIndex].indexOf('');

  return index;
};