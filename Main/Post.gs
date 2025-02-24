/**
 * スプレッドシートに取得したRSSフィードをSlackに投稿する
 * 
 * 外部ライブラリを使用
 * [Name] ErrorLog
 * [Key]  10mUdZARNfKmE9Fv8v-LCiRk4TnGoKtZMnR9AnBbLVqXzGjPB8R-U-VQw
 * [note] V8ランタイムを使用。
 */
function Main() {
  try {
    var ss     = SpreadsheetApp.getActiveSpreadsheet();
    var sheet  = ss.getSheetByName('記事');
    var values = sheet.getDataRange().getValues();
    
    // 投稿のターゲットを探す
    const POST_CHECK_COL = 8;
    var index = getBlankRowIndex_(values, POST_CHECK_COL - 1);
    
    // 何もなければ終了
    if (index < 0) return;
    
    // メッセージを生成
    var feeds      = values[index];
    var postSource = new Feed(feeds,ss);
    var post       = postSource.post;

    // 投稿
    const slack = SlackApp.load();
    slack.post(post);

    // 後処理
    sheet.deleteRow(index + 1);
    
  } catch (e) {
    var datetime = new Date();
    ErrorLog.create(e, datetime).show();
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
var getBlankRowIndex_ = function(values, colIndex) {
  // 二次元配列内でVLOOKUP
  var _ = Underscore.load(); // Underscore for GASライブラリの呼び出し
  var transposedValues = _.zip.apply(_, values);
  var index            = transposedValues[colIndex].indexOf('');

  return index;
};