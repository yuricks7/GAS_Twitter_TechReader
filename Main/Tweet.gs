/**
 * スプレッドシートに取得したRSSフィードをTwitterに投稿する
 *
 */
function Main() {
  try {
    var ss     = SpreadsheetApp.getActiveSpreadsheet();
    var sheet  = ss.getSheetByName('記事');
    var values = sheet.getDataRange().getValues();
    
    // 投稿のターゲットを探す
    const POST_CHECK_COL = 8;
    var index = getBlankRowIndex(values, POST_CHECK_COL - 1);
    
    // 何もなければ終了
    if (index < 0) return;
    
    // ツイートを生成
    var feeds       = values[index];
    var tweetSource = new Feed(feeds,ss);
    var tweet       = tweetSource.tweet;

    // 投稿
    var twitter = new TwitterApp;
    twitter.post(tweet);
    
    // あとでシートじゃなくStackDriverに残すように変更する（予定）
    // console.log(tweet);

    // 後処理
    sheet.deleteRow(index + 1);
    
  } catch (e) {
    logErrorMessage(e);

  }
}

/**
 * エラーログをStackDriverに出力する
 *
 * @param {Error} errorObject 内容
 */
var logErrorMessage = function(errorObject) {
  // 例`at ${fileName} :${lineNum} (${functionName})`
  var stack = String(errorObject.stack); // `String()`も必要…?

  var funcNameStart = stack.lastIndexOf('(') + 1;
  var funcNameEnd   = stack.length - 2;

  var fileNameStart = stack.indexOf(' ') + 1;
  var fileNameEnd   = stack.indexOf(':');

  const LF  = '\n';
  const EoL = '. ';
  var descriptions = String(errorObject.message).split(EoL).join(EoL + LF);

  var m  = '';
  m += '[Line No.] '         + errorObject.lineNumber + LF;
  m += '[Function Name] '    + stack.slice(funcNameStart, funcNameEnd) + LF;
  m += '[Script File Name] ' + stack.slice(fileNameStart, fileNameEnd) + LF;
  m += '[Error Type] '       + errorObject.name       + LF;
  m += '[Description]' + LF;
  m += '  ' + descriptions;

  console.error(m); // Rhinoで出来るかな…？
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