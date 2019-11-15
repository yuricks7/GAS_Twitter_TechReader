/**
 * RSSフィードをTwitter用に加工するクラス
 *
 * @param {array} feeds フィード1行分の配列
 * @param {object}   ss 対象のスプレッドシート
 */
var Feed = function(feeds, ss) {
  this.ss = ss;

  this.feedTitle  = feeds[0];
  this.feedUrl    = feeds[1];
  this.postTime   = feeds[2]; // ?

//  var serialValue = feeds[2];
//  Logger.log(serialValue);
//
//  var unixValue   = (serialValue - 25569) * 24*60*60;
//  var date = new Date(unixValue * 1000);
//  this.postTimeJst = getJstString(); // ?

  this.thumnail   = feeds[3]; // URLの方が良いかも？
  this.entryTitle = feeds[4];
  this.entryUrl   = feeds[5];
  this.body       = feeds[6];

  /* フィードシートからカテゴリの検索 */
  this.feedCategory = getFeedCategory(ss, this.feedTitle);

  // ツイート本文
  this.tweet = this.getTweetText();
};

/**
 * ブログ・タイトルからフィード・カテゴリーを取得する
 *
 * @param {object} spreadsheet マスターのあるスプレッドシート
 * @param {string, number} key 検索する値 
 *
 * @return 取得したカテゴリー
 */
var getFeedCategory = function(ss, key) {
  var masterSheet  = ss.getSheetByName('フィード');
  var masterValues = masterSheet.getDataRange().getValues();

  const TITLE_COL_INDEX    = 1;
  const CATEGORY_COL_INDEX = 0;
  
  return vlookup(key, masterValues, TITLE_COL_INDEX, CATEGORY_COL_INDEX);
};

/**
 * VLOOKUP関数の代替
 *
 * 外部ライブラリを使用
 * [Name]    Underscore for GAS
 * [Key]     M3i7wmUA_5n0NSEaa6NnNqOBao7QLBR4j
 * [version] 2.0
 * [note]    類似ライブラリ（※）では使えない処理があるので混同しないように注意。
 *           ※UnderscoreGS（'MiC3qjLYVUjCCUQpMqPPTWUF7jOZt2NQ8'）
 *
 * @param {string, number}    key 検索する値
 * @param {array}           arr2d 検索先の二次元配列
 * @param {number} searchColIndex 行の確認に使う列のインデックス
 * @param {number} returnColIndex 値を取得する列のインデックス
 *
 * @return 取得した値
 */
var vlookup = function(key, arr2d, rowSearchColIndex, returnColIndex) {
  var _ = Underscore.load(); // Underscore for GASライブラリの呼び出し
  var transposedValues = _.zip.apply(_, arr2d);
  var targetIndex      = transposedValues[rowSearchColIndex].indexOf(key);
  
  return arr2d[targetIndex][returnColIndex];
}

/**
 * ツイートの本文を作成する
 *
 * @param {object} feeds フィード1行分の配列
 * @param {object} ss 対象のスプレッドシート
 *
 * @return {string} 作成した文章
 */
Feed.prototype.getTweetText = function() {
  
  const LF  = '\n';
  var tweet = '';
  tweet += '▼[' + this.feedCategory + '] ' +　this.feedTitle;
  tweet += LF + this.entryTitle;
  tweet += LF + this.entryUrl;
  tweet += LF + this.body;

  // 長かったらカットしておく
  if (tweet.length > 140) {
    tweet = tweet.substring(0, 139) + '…';
  }
  
  return tweet;
}

/**
 * 時刻を読みやすいように変換する
 *
 * 外部ライブラリを使用
 * [name]    Moment.js
 * [key]     MHMchiX6c1bwSqGM1PZiW_PxhMjh3Sh48
 * [version] 9.0
 *
 * @return {string} 「yyyy/mm/dd (曜日) hh:mm:ss形式」の文字列
 */
var getJstString = function() {
  
  var ret = Moment.moment(this.postTime).format('YYYY/MM/DD (ddd) hh:mm:ss');
  Logger.log(typeof ret);
  Logger.log(ret);

  return String(ret) + ' - JST';
}