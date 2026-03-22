import type { Line } from './types';

// ===================================================================
// 画像の路線図を忠実に再現した路線データ
// 凡例（右下）:
//   銀座線, 丸の内線, 日比谷線, 東西線, 千代田線, 有楽町線,
//   副都心線, 半蔵門線, 南北線, 都営三田線, 都営新宿線,
//   都営大江戸線, 都営浅草線, (JR) 京浜東北, 山手, 総武線
// ===================================================================

export const lines: Line[] = [
  // ===== 東京メトロ =====
  {
    id: 'ginza',
    name: '銀座線',
    color: '#FF9500',
    stations: [
      'shibuya', 'omote_sando', 'gaienmae', 'aoyama_itchome',
      'akasaka_mitsuke', 'tameike_sanno', 'toranomon', 'shimbashi',
      'ginza', 'kyobashi', 'nihombashi', 'mitsukoshimae', 'kanda',
      'suehirocho', 'ueno_hirokoji', 'ueno',
      'inaricho', 'tawaramachi', 'asakusa',
    ],
  },
  {
    id: 'marunouchi',
    name: '丸ノ内線',
    color: '#F62E36',
    stations: [
      'ikebukuro', 'shin_otsuka', 'myogadani', 'korakuen',
      'hongosanchome_m', 'ochanomizu', 'awajicho', 'otemachi',
      'tokyo', 'ginza', 'kasumigaseki', 'kokkai_gijidomae',
      'akasaka_mitsuke', 'yotsuya', 'yotsuya_sanchome',
      'shinjuku_gyoenmae', 'shinjuku_sanchome', 'shinjuku',
      'nishi_shinjuku', 'nakano_sakaue',
    ],
  },
  {
    id: 'hibiya',
    name: '日比谷線',
    color: '#B5B5AC',
    stations: [
      'kita_senju', 'minami_senju', 'minowa', 'iriya', 'ueno',
      'naka_okachimachi', 'akihabara', 'kodenmacho',
      'ningyocho', 'kayabacho', 'hacchobori', 'tsukiji',
      'higashi_ginza', 'ginza', 'hibiya', 'kasumigaseki',
      'kamiyacho', 'roppongi', 'hiroo', 'ebisu',
      'naka_meguro',
    ],
  },
  {
    id: 'tozai',
    name: '東西線',
    color: '#009BBF',
    stations: [
      'nakano', 'ochiai', 'takadanobaba', 'waseda',
      'kagurazaka', 'iidabashi', 'kudanshita', 'takebashi',
      'otemachi', 'nihombashi', 'kayabacho', 'monzen_nakacho',
    ],
  },
  {
    id: 'chiyoda',
    name: '千代田線',
    color: '#00BB85',
    stations: [
      'kita_ayase', 'ayase', 'kita_senju', 'machiya',
      'nishi_nippori', 'sendagi', 'nezu', 'yushima',
      'shin_ochanomizu', 'otemachi', 'nijubashimae', 'hibiya',
      'kasumigaseki', 'kokkai_gijidomae', 'akasaka',
      'nogizaka', 'omote_sando', 'meiji_jingumae',
      'yoyogi_koen', 'yoyogi_uehara',
    ],
  },
  {
    id: 'yurakucho',
    name: '有楽町線',
    color: '#C1A470',
    stations: [
      'ikebukuro', 'higashi_ikebukuro', 'gokokuji',
      'edogawabashi', 'iidabashi', 'ichigaya', 'kojimachi',
      'nagatacho', 'sakuradamon', 'yurakucho', 'ginza_itchome',
      'shintomicho', 'tsukishima', 'toyosu',
      'tatsumi', 'shin_kiba',
    ],
  },
  {
    id: 'fukutoshin',
    name: '副都心線',
    color: '#9C5E31',
    stations: [
      'ikebukuro', 'zoshigaya',
      'nishi_waseda', 'higashi_shinjuku',
      'shinjuku_sanchome', 'kita_sando', 'meiji_jingumae',
      'shibuya',
    ],
  },
  {
    id: 'hanzomon',
    name: '半蔵門線',
    color: '#8F76D6',
    stations: [
      'shibuya', 'omote_sando', 'aoyama_itchome',
      'nagatacho', 'hanzomon', 'kudanshita',
      'jimbocho', 'otemachi', 'mitsukoshimae',
      'suitengumae', 'kiyosumi_shirakawa', 'sumiyoshi',
      'kinshicho', 'oshiage',
    ],
  },
  {
    id: 'namboku',
    name: '南北線',
    color: '#00AC9B',
    stations: [
      'akabane_iwabuchi', 'shimo', 'oji_kamiya', 'oji',
      'nishi_ga_hara', 'komagome', 'hon_komagome',
      'todaimae', 'korakuen', 'iidabashi', 'ichigaya',
      'yotsuya', 'nagatacho', 'tameike_sanno',
      'roppongi', 'azabu_juban',
      'shirokane_takanawa', 'shirokanedai', 'meguro',
    ],
  },

  // ===== 都営地下鉄 =====
  {
    id: 'mita',
    name: '都営三田線',
    color: '#0079C2',
    stations: [
      'sugamo', 'sengoku', 'hakusan', 'kasuga',
      'suidobashi', 'jimbocho', 'otemachi', 'hibiya',
      'onarimon', 'shiba_koen', 'mita',
      'shirokane_takanawa', 'shirokanedai', 'meguro',
    ],
  },
  {
    id: 'shinjuku_line',
    name: '都営新宿線',
    color: '#6CBB5A',
    stations: [
      'shinjuku', 'shinjuku_sanchome', 'akebonobashi',
      'ichigaya', 'kudanshita', 'jimbocho', 'ogawamachi',
      'iwamotocho', 'bakuroyokoyama', 'hamachou',
      'morishita', 'kikukawa', 'sumiyoshi',
    ],
  },
  {
    id: 'oedo',
    name: '都営大江戸線',
    color: '#CE2869',
    stations: [
      // ループ部分
      'tochomae', 'shinjuku_nishiguchi', 'higashi_shinjuku',
      'wakamatsu_kawada', 'ushigome_yanagicho', 'ushigome_kagurazaka', 'iidabashi',
      'kasuga', 'hongosanchome_o', 'ueno_okachimachi',
      'shin_okachimachi', 'kuramae', 'ryogoku',
      'morishita', 'kiyosumi_shirakawa', 'monzen_nakacho',
      'tsukishima', 'katsudoki', 'tsukijishijo',
      'shiodome', 'daimon', 'akabane_bashi',
      'azabu_juban', 'roppongi', 'aoyama_itchome',
      'kokuritsu_kyogijo', 'yoyogi', 'shinjuku',
      'tochomae',
    ],
    isLoop: true,
  },
  {
    // 大江戸線の尻尾部分（都庁前〜中野坂上）
    id: 'oedo_tail',
    name: '都営大江戸線（支線）',
    color: '#CE2869',
    stations: [
      'tochomae', 'nishi_shinjuku_5', 'nakano_sakaue',
    ],
  },
  {
    id: 'asakusa_line',
    name: '都営浅草線',
    color: '#E85298',
    stations: [
      'oshiage', 'honjo_azumabashi', 'asakusa',
      'kuramae', 'asakusabashi',
      'higashi_nihombashi', 'ningyocho', 'nihombashi',
      'takaracho', 'shimbashi', 'daimon',
      'mita', 'sengakuji', 'takanawadai', 'gotanda',
    ],
  },

  // ===== JR線（JR・オレンジ停車駅のみ直接接続） =====
  {
    id: 'yamanote',
    name: 'JR山手線（オレンジライン）',
    color: '#FF8C00',
    stations: [
      'ikebukuro', 'komagome', 'nishi_nippori',
      'akihabara', 'shimbashi', 'meguro',
      'shibuya', 'shinjuku',
      'ikebukuro',
    ],
    isLoop: true,
  },
  {
    id: 'chuo',
    name: 'JR中央線',
    color: '#FF4500',
    stations: [
      'akihabara', 'yotsuya', 'shinjuku',
    ],
  },
  {
    id: 'sobu',
    name: 'JR総武線',
    color: '#FFD400',
    stations: [
      'akihabara', 'kinshicho',
    ],
  },
  {
    id: 'keihin_tohoku',
    name: 'JR京浜東北線',
    color: '#00B2E5',
    stations: [
      'oji', 'nishi_nippori',
    ],
  },
  {
    id: 'tokyu_toyoko',
    name: 'JR中目黒〜渋谷',
    color: '#FF8C00',
    stations: [
      'naka_meguro', 'shibuya',
    ],
  },
];
