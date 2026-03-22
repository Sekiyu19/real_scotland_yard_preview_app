import type { Station } from './types';

// Station positions mapped to the game map layout
// Coordinate system: x: 0-1300, y: 0-900
// Types from the rules:
//   local (各停) = all stations (small gray dot)
//   express (快速) = blue circle stations
//   limited_express (特急/JR) = pink outlined stations
//
// 特急 stations: major JR stations on the Yamanote loop
// 快速 stations: important transfer hubs

export const stations: Station[] = [
  // ===== 北部エリア (赤羽〜綾瀬) =====
  { id: 'akabane_iwabuchi', name: '赤羽岩淵', x: 470, y: 48, type: 'local' },
  { id: 'shimo', name: '志茂', x: 530, y: 48, type: 'local' },
  { id: 'oji_kamiya', name: '王子神谷', x: 585, y: 48, type: 'local' },
  { id: 'oji', name: '王子', x: 635, y: 55, type: 'local' },
  { id: 'nishi_ga_hara', name: '西ヶ原', x: 590, y: 100, type: 'local' },
  { id: 'komagome', name: '駒込', x: 545, y: 120, type: 'limited_express' },
  { id: 'sugamo', name: '巣鴨', x: 480, y: 128, type: 'local' },
  { id: 'hon_komagome', name: '本駒込', x: 650, y: 115, type: 'local' },
  { id: 'sendagi', name: '千駄木', x: 715, y: 115, type: 'local' },
  { id: 'nishi_nippori', name: '西日暮里', x: 790, y: 100, type: 'limited_express' },
  { id: 'nippori', name: '日暮里', x: 845, y: 100, type: 'local' },
  { id: 'kita_senju', name: '北千住', x: 895, y: 72, type: 'express' },
  { id: 'ayase', name: '綾瀬', x: 955, y: 72, type: 'local' },
  { id: 'kita_ayase', name: '北綾瀬', x: 1010, y: 72, type: 'local' },
  { id: 'minami_senju', name: '南千住', x: 940, y: 112, type: 'local' },
  { id: 'minowa', name: '三ノ輪', x: 930, y: 138, type: 'local' },

  // ===== 池袋周辺 =====
  { id: 'ikebukuro', name: '池袋', x: 415, y: 168, type: 'limited_express' },
  { id: 'shin_otsuka', name: '新大塚', x: 480, y: 183, type: 'local' },
  { id: 'myogadani', name: '茗荷谷', x: 510, y: 206, type: 'local' },
  { id: 'sengoku', name: '千石', x: 545, y: 183, type: 'local' },
  { id: 'hakusan', name: '白山', x: 560, y: 206, type: 'local' },
  { id: 'higashi_ikebukuro', name: '東池袋', x: 450, y: 198, type: 'local' },
  { id: 'gokokuji', name: '護国寺', x: 465, y: 238, type: 'local' },
  { id: 'edogawabashi', name: '江戸川橋', x: 498, y: 262, type: 'local' },

  // ===== 上野・根津エリア =====
  { id: 'todaimae', name: '東大前', x: 600, y: 193, type: 'local' },
  { id: 'kasuga', name: '春日', x: 585, y: 228, type: 'local' },
  { id: 'nezu', name: '根津', x: 700, y: 198, type: 'local' },
  { id: 'hongosanchome', name: '本郷三丁目', x: 635, y: 255, type: 'local' },
  { id: 'ueno', name: '上野', x: 830, y: 168, type: 'limited_express' },
  { id: 'ueno_okachimachi', name: '上野御徒町', x: 830, y: 198, type: 'local' },
  { id: 'ueno_hirokoji', name: '上野広小路', x: 830, y: 222, type: 'local' },
  { id: 'naka_okachimachi', name: '仲御徒町', x: 870, y: 208, type: 'local' },
  { id: 'inaricho', name: '稲荷町', x: 890, y: 173, type: 'local' },
  { id: 'tawaramachi', name: '田原町', x: 935, y: 173, type: 'local' },
  { id: 'asakusa', name: '浅草', x: 985, y: 152, type: 'local' },
  { id: 'oshiage', name: '押上', x: 1015, y: 192, type: 'local' },
  { id: 'honjo_azumabashi', name: '本所吾妻橋', x: 1050, y: 162, type: 'local' },

  // ===== 中野〜高田馬場エリア =====
  { id: 'nakano', name: '中野', x: 195, y: 288, type: 'express' },
  { id: 'ochiai', name: '落合', x: 258, y: 308, type: 'local' },
  { id: 'nakai', name: '中井', x: 248, y: 288, type: 'local' },
  { id: 'takadanobaba', name: '高田馬場', x: 312, y: 282, type: 'express' },
  { id: 'nishi_waseda', name: '西早稲田', x: 302, y: 328, type: 'local' },
  { id: 'waseda', name: '早稲田', x: 398, y: 268, type: 'local' },

  // ===== 飯田橋〜水道橋 =====
  { id: 'kagurazaka', name: '神楽坂', x: 478, y: 268, type: 'local' },
  { id: 'iidabashi', name: '飯田橋', x: 535, y: 280, type: 'express' },
  { id: 'korakuen', name: '後楽園', x: 548, y: 248, type: 'local' },
  { id: 'suidobashi', name: '水道橋', x: 578, y: 290, type: 'local' },
  { id: 'ochanomizu', name: '御茶ノ水', x: 648, y: 312, type: 'local' },
  { id: 'shin_ochanomizu', name: '新御茶ノ水', x: 648, y: 328, type: 'local' },
  { id: 'yushima', name: '湯島', x: 720, y: 262, type: 'local' },

  // ===== 新宿エリア =====
  { id: 'nakano_sakaue', name: '中野坂上', x: 228, y: 372, type: 'local' },
  { id: 'nishi_shinjuku_5', name: '西新宿五丁目', x: 218, y: 418, type: 'local' },
  { id: 'nishi_shinjuku', name: '西新宿', x: 268, y: 382, type: 'local' },
  { id: 'higashi_shinjuku', name: '東新宿', x: 318, y: 372, type: 'local' },
  { id: 'wakamatsu_kawada', name: '若松河田', x: 358, y: 372, type: 'local' },
  { id: 'ushigome_yanagicho', name: '牛込柳町', x: 408, y: 308, type: 'local' },
  { id: 'ushigome_kagurazaka', name: '牛込神楽坂', x: 455, y: 308, type: 'local' },
  { id: 'shinjuku_nishiguchi', name: '新宿西口', x: 282, y: 436, type: 'local' },
  { id: 'tochomae', name: '都庁前', x: 242, y: 458, type: 'local' },
  { id: 'shinjuku', name: '新宿', x: 295, y: 462, type: 'limited_express' },
  { id: 'shinjuku_gyoenmae', name: '新宿御苑前', x: 368, y: 448, type: 'local' },
  { id: 'shinjuku_sanchome', name: '新宿三丁目', x: 360, y: 466, type: 'local' },
  { id: 'yotsuya_sanchome', name: '四谷三丁目', x: 415, y: 466, type: 'local' },
  { id: 'yoyogi', name: '代々木', x: 282, y: 488, type: 'local' },

  // ===== 四ツ谷〜市ヶ谷〜九段下 =====
  { id: 'yotsuya', name: '四ツ谷', x: 425, y: 438, type: 'limited_express' },
  { id: 'ichigaya', name: '市ヶ谷', x: 495, y: 378, type: 'express' },
  { id: 'akebonobashi', name: '曙橋', x: 440, y: 392, type: 'local' },
  { id: 'kudanshita', name: '九段下', x: 580, y: 372, type: 'express' },
  { id: 'jimbocho', name: '神保町', x: 605, y: 388, type: 'local' },
  { id: 'takebashi', name: '竹橋', x: 640, y: 392, type: 'local' },
  { id: 'kojimachi', name: '麹町', x: 525, y: 458, type: 'local' },
  { id: 'hanzomon', name: '半蔵門', x: 575, y: 458, type: 'local' },

  // ===== 秋葉原〜神田エリア =====
  { id: 'ogawamachi', name: '小川町', x: 705, y: 352, type: 'local' },
  { id: 'awajicho', name: '淡路町', x: 720, y: 362, type: 'local' },
  { id: 'iwamotocho', name: '岩本町', x: 783, y: 328, type: 'local' },
  { id: 'akihabara', name: '秋葉原', x: 805, y: 272, type: 'limited_express' },
  { id: 'suehirocho', name: '末広町', x: 772, y: 278, type: 'local' },
  { id: 'kanda', name: '神田', x: 788, y: 362, type: 'local' },

  // ===== 馬喰町〜錦糸町エリア =====
  { id: 'bakurocho', name: '馬喰町', x: 840, y: 308, type: 'local' },
  { id: 'bakuroyokoyama', name: '馬喰横山', x: 850, y: 322, type: 'local' },
  { id: 'asakusabashi', name: '浅草橋', x: 908, y: 248, type: 'local' },
  { id: 'ryogoku', name: '両国', x: 955, y: 248, type: 'local' },
  { id: 'higashi_nihombashi', name: '東日本橋', x: 912, y: 318, type: 'local' },
  { id: 'morishita', name: '森下', x: 975, y: 318, type: 'local' },
  { id: 'hamachou', name: '浜町', x: 942, y: 338, type: 'local' },
  { id: 'kinshicho', name: '錦糸町', x: 1030, y: 262, type: 'local' },
  { id: 'sumiyoshi', name: '住吉', x: 1040, y: 308, type: 'local' },
  { id: 'kikukawa', name: '菊川', x: 1025, y: 342, type: 'local' },

  // ===== 大手町〜東京エリア =====
  { id: 'otemachi', name: '大手町', x: 718, y: 412, type: 'express' },
  { id: 'mitsukoshimae', name: '三越前', x: 745, y: 382, type: 'local' },
  { id: 'nihombashi', name: '日本橋', x: 805, y: 428, type: 'local' },
  { id: 'ningyocho', name: '人形町', x: 835, y: 378, type: 'local' },
  { id: 'kodenmacho', name: '小伝馬町', x: 865, y: 362, type: 'local' },
  { id: 'suitengumae', name: '水天宮前', x: 868, y: 412, type: 'local' },
  { id: 'kayabacho', name: '茅場町', x: 868, y: 442, type: 'local' },
  { id: 'tokyo', name: '東京', x: 785, y: 498, type: 'limited_express' },
  { id: 'kyobashi', name: '京橋', x: 822, y: 488, type: 'local' },
  { id: 'nijubashimae', name: '二重橋前', x: 710, y: 478, type: 'local' },
  { id: 'sakuradamon', name: '桜田門', x: 628, y: 488, type: 'local' },

  // ===== 有楽町〜銀座エリア =====
  { id: 'yurakucho', name: '有楽町', x: 725, y: 518, type: 'local' },
  { id: 'hibiya', name: '日比谷', x: 685, y: 542, type: 'express' },
  { id: 'ginza', name: '銀座', x: 765, y: 568, type: 'express' },
  { id: 'ginza_itchome', name: '銀座一丁目', x: 808, y: 552, type: 'local' },
  { id: 'higashi_ginza', name: '東銀座', x: 818, y: 578, type: 'local' },
  { id: 'tsukiji', name: '築地', x: 842, y: 588, type: 'local' },
  { id: 'shintomicho', name: '新富町', x: 852, y: 552, type: 'local' },
  { id: 'tsukijishijo', name: '築地市場', x: 842, y: 618, type: 'local' },
  { id: 'takaracho', name: '宝町', x: 865, y: 508, type: 'local' },
  { id: 'hacchobori', name: '八丁堀', x: 882, y: 528, type: 'local' },

  // ===== 永田町〜赤坂エリア =====
  { id: 'nagatacho', name: '永田町', x: 522, y: 508, type: 'express' },
  { id: 'akasaka_mitsuke', name: '赤坂見附', x: 472, y: 528, type: 'express' },
  { id: 'aoyama_itchome', name: '青山一丁目', x: 418, y: 538, type: 'local' },
  { id: 'tameike_sanno', name: '溜池山王', x: 492, y: 572, type: 'local' },
  { id: 'akasaka', name: '赤坂', x: 522, y: 588, type: 'local' },
  { id: 'kokkai_gijidomae', name: '国会議事堂前', x: 605, y: 562, type: 'local' },
  { id: 'kasumigaseki', name: '霞ケ関', x: 620, y: 578, type: 'express' },
  { id: 'toranomon', name: '虎ノ門', x: 645, y: 602, type: 'local' },
  { id: 'onarimon', name: '御成門', x: 688, y: 578, type: 'local' },

  // ===== 新橋〜浜松町エリア =====
  { id: 'shimbashi', name: '新橋', x: 748, y: 608, type: 'limited_express' },
  { id: 'shiodome', name: '汐留', x: 778, y: 628, type: 'local' },
  { id: 'daimon', name: '大門', x: 722, y: 638, type: 'local' },
  { id: 'shiba_koen', name: '芝公園', x: 685, y: 622, type: 'local' },
  { id: 'kamiyacho', name: '神谷町', x: 632, y: 622, type: 'local' },
  { id: 'katsudoki', name: '勝どき', x: 850, y: 612, type: 'local' },

  // ===== 渋谷〜表参道エリア =====
  { id: 'shibuya', name: '渋谷', x: 298, y: 588, type: 'limited_express' },
  { id: 'omote_sando', name: '表参道', x: 360, y: 572, type: 'express' },
  { id: 'gaienmae', name: '外苑前', x: 392, y: 558, type: 'local' },
  { id: 'meiji_jingumae', name: '明治神宮前', x: 320, y: 552, type: 'local' },
  { id: 'kita_sando', name: '北参道', x: 298, y: 528, type: 'local' },
  { id: 'kokuritsu_kyogijo', name: '国立競技場', x: 348, y: 502, type: 'local' },
  { id: 'nogizaka', name: '乃木坂', x: 418, y: 588, type: 'local' },
  { id: 'roppongi', name: '六本木', x: 438, y: 608, type: 'express' },

  // ===== 目黒〜恵比寿〜品川エリア =====
  { id: 'meguro', name: '目黒', x: 298, y: 658, type: 'limited_express' },
  { id: 'naka_meguro', name: '中目黒', x: 305, y: 628, type: 'local' },
  { id: 'ebisu', name: '恵比寿', x: 342, y: 628, type: 'local' },
  { id: 'hiroo', name: '広尾', x: 392, y: 628, type: 'local' },
  { id: 'azabu_juban', name: '麻布十番', x: 522, y: 632, type: 'local' },
  { id: 'shirokane_takanawa', name: '白金高輪', x: 472, y: 662, type: 'local' },
  { id: 'shirokanedai', name: '白金台', x: 412, y: 668, type: 'local' },
  { id: 'mita', name: '三田', x: 595, y: 662, type: 'local' },
  { id: 'akabane_bashi', name: '赤羽橋', x: 582, y: 638, type: 'local' },
  { id: 'sengakuji', name: '泉岳寺', x: 565, y: 698, type: 'local' },
  { id: 'takanawadai', name: '高輪台', x: 525, y: 698, type: 'local' },
  { id: 'gotanda', name: '五反田', x: 372, y: 698, type: 'local' },
  { id: 'takanawa_gateway', name: '高輪ゲートウェイ', x: 540, y: 682, type: 'local' },

  // ===== 代々木上原エリア =====
  { id: 'yoyogi_uehara', name: '代々木上原', x: 202, y: 508, type: 'local' },
  { id: 'yoyogi_koen', name: '代々木公園', x: 248, y: 518, type: 'local' },

  // ===== 門前仲町〜豊洲エリア =====
  { id: 'monzen_nakacho', name: '門前仲町', x: 898, y: 478, type: 'local' },
  { id: 'kiyosumi_shirakawa', name: '清澄白河', x: 952, y: 428, type: 'local' },
  { id: 'tsukishima', name: '月島', x: 888, y: 568, type: 'local' },
  { id: 'toyosu', name: '豊洲', x: 930, y: 568, type: 'local' },
  { id: 'tatsumi', name: '辰巳', x: 970, y: 568, type: 'local' },
  { id: 'shin_kiba', name: '新木場', x: 1015, y: 568, type: 'local' },

  // ===== 追加駅 =====
  { id: 'kuramae', name: '蔵前', x: 945, y: 218, type: 'local' },
  { id: 'shin_okachimachi', name: '新御徒町', x: 870, y: 238, type: 'local' },
  { id: 'zoshigaya', name: '雑司が谷', x: 362, y: 238, type: 'local' },
  { id: 'keisei_ueno', name: '京成上野', x: 858, y: 183, type: 'local' },
];

export const stationMap = new Map<string, Station>(
  stations.map(s => [s.id, s])
);
