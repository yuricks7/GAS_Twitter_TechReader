/**
 * スプレッドシートに取得したRSSフィードをSlackに投稿する
 */
function Main() {
  try {
    let ss     = SpreadsheetApp.getActiveSpreadsheet();
    let sheet  = ss.getSheetByName('記事');
    let values = sheet.getDataRange().getValues();
    
    // 投稿のターゲットを探す
    const POST_CHECK_COL = 8;
    let index = getBlankRowIndex_(values, POST_CHECK_COL - 1);
    
    // 何もなければ終了
    if (index < 0) return;
    
    // メッセージを生成
    let feeds = values[index];
    let feed  = new Feed(feeds,ss);

    // 投稿
    const props     = PropertiesService.getScriptProperties();
    const channelId = props.getProperty('channel_id');
    const slack     = SlackApp.load(channelId);
    slack.post(feed.m);

    // 後処理
    sheet.deleteRow(index + 1);
    
  } catch (e) {
    let datetime = new Date();
    ErrorLog.create(e, datetime).show();
  }
}

/**
 * 「TRUE」と入っていない行を探す
 *
 * @param {array}    values 検索先の二次元配列
 * @param {number} colIndex 検索列のインデックス
 *
 * @return {number} 「TRUE」と入っていない行のインデックス
 */
let getBlankRowIndex_ = function(values, colIndex) {
  // 二次元配列内でVLOOKUP
  let _ = Underscore.load(); // Underscore for GASライブラリの呼び出し
  let transposedValues = _.zip.apply(_, values);
  let index            = transposedValues[colIndex].indexOf('');

  return index;
};