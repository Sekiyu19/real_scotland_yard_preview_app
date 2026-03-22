import type { Station } from './types';

// ===================================================================
// 画像の路線図を忠実に再現した駅データ
// 座標系: x: 0-1200, y: 0-780
//
// 駅タイプ（画像のルールより）:
//   local (各停)          = 表記駅全部（小さいドット）
//   express (快速)        = 青丸駅
//   limited_express (特急) = ピンク囲み駅（JR）
//
// 特急駅（ピンク囲み・大きい文字）:
//   池袋, 駒込, 西日暮里, 秋葉原, 四ツ谷, 新宿, 渋谷, 目黒, 新橋
//
// 快速駅（青丸）:
//   中野, 高田馬場, 北千住, 上野, 飯田橋, 市ヶ谷, 九段下,
//   大手町, 東京, 日比谷, 銀座, 霞ケ関, 赤坂見附, 永田町,
//   表参道, 六本木
// ===================================================================

export const stations: Station[] = [
  // ===== 北部エリア =====
  { id: 'akabane_iwabuchi', name: '赤羽岩淵', x: 475, y: 48, type: 'express' },
  { id: 'shimo', name: '志茂', x: 545, y: 48, type: 'local' },
  { id: 'oji_kamiya', name: '王子神谷', x: 620, y: 55, type: 'local' },
  { id: 'oji', name: '王子', x: 685, y: 48, type: 'local' },
  { id: 'nishi_ga_hara', name: '西ヶ原', x: 590, y: 95, type: 'local' },
  { id: 'komagome', name: '駒込', x: 530, y: 108, type: 'limited_express' },
  { id: 'sugamo', name: '巣鴨', x: 475, y: 95, type: 'express' },
  { id: 'hon_komagome', name: '本駒込', x: 645, y: 108, type: 'local' },
  { id: 'sendagi', name: '千駄木', x: 708, y: 90, type: 'local' },
  { id: 'nishi_nippori', name: '西日暮里', x: 775, y: 75, type: 'limited_express' },
  { id: 'machiya', name: '町屋', x: 840, y: 70, type: 'local' },
  { id: 'kita_senju', name: '北千住', x: 895, y: 50, type: 'express' },
  { id: 'ayase', name: '綾瀬', x: 960, y: 50, type: 'local' },
  { id: 'kita_ayase', name: '北綾瀬', x: 1035, y: 40, type: 'local' },
  { id: 'minami_senju', name: '南千住', x: 945, y: 85, type: 'local' },
  { id: 'minowa', name: '三ノ輪', x: 935, y: 115, type: 'local' },
  { id: 'iriya', name: '入谷', x: 935, y: 148, type: 'local' },

  // ===== 池袋エリア =====
  { id: 'ikebukuro', name: '池袋', x: 410, y: 148, type: 'limited_express' },
  { id: 'shin_otsuka', name: '新大塚', x: 475, y: 142, type: 'local' },
  { id: 'higashi_ikebukuro', name: '東池袋', x: 445, y: 185, type: 'local' },
  { id: 'myogadani', name: '茗荷谷', x: 490, y: 178, type: 'local' },
  { id: 'sengoku', name: '千石', x: 538, y: 138, type: 'local' },
  { id: 'hakusan', name: '白山', x: 575, y: 148, type: 'local' },
  { id: 'gokokuji', name: '護国寺', x: 452, y: 218, type: 'local' },
  { id: 'edogawabashi', name: '江戸川橋', x: 472, y: 245, type: 'local' },
  { id: 'zoshigaya', name: '雑司ヶ谷', x: 365, y: 230, type: 'local' },

  // ===== 上野・根津エリア =====
  { id: 'todaimae', name: '東大前', x: 618, y: 138, type: 'local' },
  { id: 'kasuga', name: '春日', x: 578, y: 192, type: 'express' },
  { id: 'korakuen', name: '後楽園', x: 548, y: 232, type: 'express' },
  { id: 'nezu', name: '根津', x: 698, y: 152, type: 'local' },
  // 本郷三丁目は2つに分かれている（乗り換え不可）
  { id: 'hongosanchome_m', name: '本郷三丁目(丸)', x: 618, y: 198, type: 'local' },
  { id: 'hongosanchome_o', name: '本郷三丁目(大)', x: 638, y: 212, type: 'local' },
  { id: 'yushima', name: '湯島', x: 718, y: 240, type: 'local' },
  { id: 'ueno', name: '上野', x: 808, y: 145, type: 'express' },
  { id: 'ueno_okachimachi', name: '上野御徒町', x: 808, y: 185, type: 'local' },
  { id: 'ueno_hirokoji', name: '上野広小路', x: 790, y: 210, type: 'local' },
  { id: 'naka_okachimachi', name: '仲御徒町', x: 835, y: 205, type: 'local' },
  { id: 'shin_okachimachi', name: '新御徒町', x: 870, y: 195, type: 'local' },
  { id: 'inaricho', name: '稲荷町', x: 890, y: 170, type: 'local' },
  { id: 'tawaramachi', name: '田原町', x: 938, y: 170, type: 'local' },
  { id: 'asakusa', name: '浅草', x: 980, y: 158, type: 'express' },
  { id: 'kuramae', name: '蔵前', x: 925, y: 195, type: 'express' },
  { id: 'honjo_azumabashi', name: '本所吾妻橋', x: 1058, y: 150, type: 'local' },
  { id: 'oshiage', name: '押上', x: 1108, y: 180, type: 'express' },

  // ===== 中野〜高田馬場 =====
  { id: 'nakano', name: '中野', x: 178, y: 295, type: 'express' },
  { id: 'ochiai', name: '落合', x: 242, y: 308, type: 'local' },
  { id: 'takadanobaba', name: '高田馬場', x: 310, y: 280, type: 'local' },
  { id: 'nishi_waseda', name: '西早稲田', x: 305, y: 335, type: 'local' },
  { id: 'waseda', name: '早稲田', x: 388, y: 298, type: 'local' },

  // ===== 飯田橋〜水道橋 =====
  { id: 'kagurazaka', name: '神楽坂', x: 458, y: 295, type: 'local' },
  { id: 'iidabashi', name: '飯田橋', x: 522, y: 285, type: 'express' },
  { id: 'suidobashi', name: '水道橋', x: 572, y: 280, type: 'local' },
  { id: 'ochanomizu', name: '御茶ノ水', x: 640, y: 298, type: 'local' },
  { id: 'shin_ochanomizu', name: '新御茶ノ水', x: 648, y: 315, type: 'local' },

  // ===== 新宿エリア =====
  { id: 'nakano_sakaue', name: '中野坂上', x: 218, y: 360, type: 'express' },
  { id: 'nishi_shinjuku', name: '西新宿', x: 262, y: 378, type: 'local' },
  { id: 'nishi_shinjuku_5', name: '西新宿五丁目', x: 210, y: 408, type: 'local' },
  { id: 'higashi_shinjuku', name: '東新宿', x: 318, y: 360, type: 'express' },
  { id: 'wakamatsu_kawada', name: '若松河田', x: 365, y: 362, type: 'local' },
  { id: 'ushigome_yanagicho', name: '牛込柳町', x: 408, y: 315, type: 'local' },
  { id: 'ushigome_kagurazaka', name: '牛込神楽坂', x: 455, y: 315, type: 'local' },
  { id: 'shinjuku_nishiguchi', name: '新宿西口', x: 278, y: 428, type: 'local' },
  { id: 'tochomae', name: '都庁前', x: 235, y: 450, type: 'local' },
  { id: 'shinjuku', name: '新宿', x: 290, y: 455, type: 'limited_express' },
  { id: 'shinjuku_gyoenmae', name: '新宿御苑前', x: 362, y: 430, type: 'local' },
  { id: 'shinjuku_sanchome', name: '新宿三丁目', x: 352, y: 455, type: 'local' },
  { id: 'yotsuya_sanchome', name: '四谷三丁目', x: 408, y: 458, type: 'local' },
  { id: 'yoyogi', name: '代々木', x: 272, y: 478, type: 'local' },

  // ===== 四ツ谷〜市ヶ谷〜九段下 =====
  { id: 'yotsuya', name: '四ツ谷', x: 425, y: 430, type: 'limited_express' },
  { id: 'ichigaya', name: '市ヶ谷', x: 492, y: 375, type: 'express' },
  { id: 'akebonobashi', name: '曙橋', x: 432, y: 392, type: 'local' },
  { id: 'kudanshita', name: '九段下', x: 570, y: 365, type: 'express' },
  { id: 'jimbocho', name: '神保町', x: 602, y: 382, type: 'express' },
  { id: 'takebashi', name: '竹橋', x: 635, y: 385, type: 'local' },
  { id: 'kojimachi', name: '麹町', x: 505, y: 445, type: 'local' },
  { id: 'hanzomon', name: '半蔵門', x: 562, y: 448, type: 'local' },

  // ===== 秋葉原〜神田エリア =====
  { id: 'ogawamachi', name: '小川町', x: 702, y: 350, type: 'local' },
  { id: 'awajicho', name: '淡路町', x: 722, y: 360, type: 'local' },
  { id: 'iwamotocho', name: '岩本町', x: 842, y: 265, type: 'local' },
  { id: 'akihabara', name: '秋葉原', x: 810, y: 238, type: 'limited_express' },
  { id: 'suehirocho', name: '末広町', x: 778, y: 258, type: 'local' },
  { id: 'kanda', name: '神田', x: 780, y: 360, type: 'local' },
  { id: 'kodenmacho', name: '小伝馬町', x: 855, y: 345, type: 'local' },

  // ===== 馬喰〜錦糸町エリア =====
  { id: 'bakuroyokoyama', name: '馬喰横山', x: 885, y: 275, type: 'local' },
  { id: 'asakusabashi', name: '浅草橋', x: 970, y: 230, type: 'local' },
  { id: 'ryogoku', name: '両国', x: 1010, y: 238, type: 'local' },
  { id: 'higashi_nihombashi', name: '東日本橋', x: 910, y: 310, type: 'local' },
  { id: 'morishita', name: '森下', x: 965, y: 318, type: 'express' },
  { id: 'hamachou', name: '浜町', x: 935, y: 335, type: 'local' },
  { id: 'kinshicho', name: '錦糸町', x: 1075, y: 248, type: 'local' },
  { id: 'sumiyoshi', name: '住吉', x: 1045, y: 300, type: 'express' },
  { id: 'kikukawa', name: '菊川', x: 1025, y: 338, type: 'local' },

  // ===== 大手町〜東京エリア =====
  { id: 'otemachi', name: '大手町', x: 712, y: 400, type: 'express' },
  { id: 'mitsukoshimae', name: '三越前', x: 745, y: 382, type: 'express' },
  { id: 'nihombashi', name: '日本橋', x: 800, y: 418, type: 'express' },
  { id: 'ningyocho', name: '人形町', x: 828, y: 375, type: 'local' },
  { id: 'suitengumae', name: '水天宮前', x: 872, y: 400, type: 'local' },
  { id: 'kayabacho', name: '茅場町', x: 862, y: 432, type: 'express' },
  { id: 'tokyo', name: '東京', x: 778, y: 482, type: 'local' },
  { id: 'kyobashi', name: '京橋', x: 818, y: 475, type: 'local' },
  { id: 'nijubashimae', name: '二重橋前', x: 708, y: 468, type: 'local' },
  { id: 'sakuradamon', name: '桜田門', x: 622, y: 475, type: 'local' },

  // ===== 有楽町〜銀座エリア =====
  { id: 'yurakucho', name: '有楽町', x: 722, y: 508, type: 'local' },
  { id: 'hibiya', name: '日比谷', x: 678, y: 538, type: 'express' },
  { id: 'ginza', name: '銀座', x: 755, y: 555, type: 'express' },
  { id: 'ginza_itchome', name: '銀座一丁目', x: 802, y: 545, type: 'local' },
  { id: 'higashi_ginza', name: '東銀座', x: 802, y: 568, type: 'express' },
  { id: 'tsukiji', name: '築地', x: 840, y: 580, type: 'local' },
  { id: 'shintomicho', name: '新富町', x: 840, y: 548, type: 'local' },
  { id: 'tsukijishijo', name: '築地市場', x: 838, y: 620, type: 'local' },
  { id: 'takaracho', name: '宝町', x: 865, y: 495, type: 'local' },
  { id: 'hacchobori', name: '八丁堀', x: 878, y: 518, type: 'local' },

  // ===== 永田町〜赤坂エリア =====
  { id: 'nagatacho', name: '永田町', x: 515, y: 505, type: 'express' },
  { id: 'akasaka_mitsuke', name: '赤坂見附', x: 460, y: 522, type: 'express' },
  { id: 'aoyama_itchome', name: '青山一丁目', x: 405, y: 535, type: 'local' },
  { id: 'tameike_sanno', name: '溜池山王', x: 478, y: 562, type: 'express' },
  { id: 'akasaka', name: '赤坂', x: 515, y: 575, type: 'local' },
  { id: 'kokkai_gijidomae', name: '国会議事堂前', x: 605, y: 550, type: 'express' },
  { id: 'kasumigaseki', name: '霞ケ関', x: 612, y: 572, type: 'express' },
  { id: 'toranomon', name: '虎ノ門', x: 640, y: 595, type: 'local' },
  { id: 'onarimon', name: '御成門', x: 685, y: 575, type: 'local' },

  // ===== 新橋〜浜松町エリア =====
  { id: 'shimbashi', name: '新橋', x: 745, y: 605, type: 'limited_express' },
  { id: 'shiodome', name: '汐留', x: 775, y: 625, type: 'local' },
  { id: 'daimon', name: '大門', x: 675, y: 640, type: 'express' },
  { id: 'shiba_koen', name: '芝公園', x: 685, y: 615, type: 'local' },
  { id: 'kamiyacho', name: '神谷町', x: 625, y: 615, type: 'local' },
  { id: 'katsudoki', name: '勝どき', x: 888, y: 610, type: 'local' },

  // ===== 渋谷〜表参道エリア =====
  { id: 'shibuya', name: '渋谷', x: 258, y: 590, type: 'limited_express' },
  { id: 'omote_sando', name: '表参道', x: 348, y: 565, type: 'express' },
  { id: 'gaienmae', name: '外苑前', x: 392, y: 555, type: 'local' },
  { id: 'meiji_jingumae', name: '明治神宮前', x: 278, y: 555, type: 'express' },
  { id: 'kita_sando', name: '北参道', x: 292, y: 518, type: 'local' },
  { id: 'kokuritsu_kyogijo', name: '国立競技場', x: 345, y: 495, type: 'local' },
  { id: 'nogizaka', name: '乃木坂', x: 412, y: 585, type: 'local' },
  { id: 'roppongi', name: '六本木', x: 440, y: 608, type: 'express' },

  // ===== 目黒〜恵比寿〜品川エリア =====
  { id: 'meguro', name: '目黒', x: 265, y: 695, type: 'limited_express' },
  { id: 'naka_meguro', name: '中目黒', x: 272, y: 650, type: 'express' },
  { id: 'ebisu', name: '恵比寿', x: 315, y: 645, type: 'local' },
  { id: 'hiroo', name: '広尾', x: 380, y: 638, type: 'local' },
  { id: 'azabu_juban', name: '麻布十番', x: 500, y: 640, type: 'express' },
  { id: 'shirokane_takanawa', name: '白金高輪', x: 405, y: 698, type: 'local' },
  { id: 'shirokanedai', name: '白金台', x: 338, y: 710, type: 'local' },
  { id: 'mita', name: '三田', x: 572, y: 665, type: 'express' },
  { id: 'akabane_bashi', name: '赤羽橋', x: 565, y: 638, type: 'local' },
  { id: 'sengakuji', name: '泉岳寺', x: 485, y: 740, type: 'local' },
  { id: 'takanawadai', name: '高輪台', x: 415, y: 735, type: 'local' },
  { id: 'gotanda', name: '五反田', x: 290, y: 740, type: 'express' },

  // ===== 代々木上原エリア =====
  { id: 'yoyogi_uehara', name: '代々木上原', x: 148, y: 530, type: 'express' },
  { id: 'yoyogi_koen', name: '代々木公園', x: 208, y: 530, type: 'local' },

  // ===== 門前仲町〜豊洲エリア =====
  { id: 'monzen_nakacho', name: '門前仲町', x: 895, y: 470, type: 'express' },
  { id: 'kiyosumi_shirakawa', name: '清澄白河', x: 945, y: 420, type: 'express' },
  { id: 'tsukishima', name: '月島', x: 905, y: 575, type: 'express' },
  { id: 'toyosu', name: '豊洲', x: 948, y: 572, type: 'local' },
  { id: 'tatsumi', name: '辰巳', x: 990, y: 572, type: 'local' },
  { id: 'shin_kiba', name: '新木場', x: 1040, y: 572, type: 'express' },
];

export const stationMap = new Map<string, Station>(
  stations.map(s => [s.id, s])
);
