var TweetSource = function(feeds, ss) {
  var serialValue = feeds[2];
//  Logger.log(serialValue);

  var unixValue   = (serialValue - 25569) * 24*60*60;
  var date = new Date(unixValue * 1000);

  this.feedTitle  = feeds[0];
  this.feedUrl    = feeds[1];
  this.postTime   = feeds[2];       // ?
//  this.postTimeJst = getJstString(); // ?

//  this.thumnail   = feeds[3]; // URLの方が良いかも？
  this.entryTitle = feeds[4];
  this.entryUrl   = feeds[5];
  this.body       = feeds[6];

  /* フィードシートからカテゴリの検索 */
  var feedSheet  = ss.getSheetByName('フィード');
  var feedValues = feedSheet.getDataRange().getValues();

  this.feedCategory = getFeedCategory(this.feedTitle, feedValues, 2, 1);

};

///**
// * 時刻を読みやすいように変換する
// *
// * Moment.jsライブラリを使用
// * ライブラリ・キー：MHMchiX6c1bwSqGM1PZiW_PxhMjh3Sh48
// */
//var getJstString = function() {
//  
//  var ret = Moment.moment(this.postTime).format('YYYY/MM/DD (ddd) hh:mm:ss');
//  Logger.log(typeof ret);
//  Logger.log(ret);
//
//  return String(ret) + ' - JST';
//}

/**
 * フィードシートからブログのカテゴリを取得する
 *
 * Underscore for GAS ライブラリを使用
 * ライブラリ・キー：M3i7wmUA_5n0NSEaa6NnNqOBao7QLBR4j
 *
 * ※UnderscoreGS（'MiC3qjLYVUjCCUQpMqPPTWUF7jOZt2NQ8'）では使えない処理があるので注意。
 */
var getFeedCategory = function(key, arr2d, masterCol, searchCol) {
  // 二次元配列内でVLOOKUP
  var _ = Underscore.load(); // Underscore for GASライブラリの呼び出し
  var transposedValues = _.zip.apply(_, arr2d);
  var targetIndex      = transposedValues[masterCol -1].indexOf(key);
  var ret              = arr2d[targetIndex][searchCol - 1];
  
  return ret
}