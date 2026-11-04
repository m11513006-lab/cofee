export interface CoffeeVariety {
  id: string;
  name: string;
  nameEn: string;
  history: string;
  profile: string;
  origin: string;
  flavorHighlights: string[];
  bestRoast: string;
  rarity: '極致稀有' | '莊園精選' | '經典傳承';
}

export interface ProcessingMethod {
  id: string;
  name: string;
  nameEn: string;
  processTime: string;
  summary: string;
  flavorImpact: string;
  tag: string;
}

export interface CoffeeBean {
  id: string;
  name: string;
  origin: string;
  subRegion: string;
  producer: string;
  variety: string;
  altitude: string;
  process: string;
  roastLevel: '淺焙' | '中淺焙' | '中焙' | '中深焙' | '深焙';
  flavorNotes: string[];
  acidity: number; // 1-5
  sweetness: number; // 1-5
  body: number; // 1-5
  price200g: number;
  dripBagPrice: number;
  description: string;
  brewingNotes: {
    ratio: string;
    temp: string;
    time: string;
    grind: string;
  };
  image: string;
  isFeatured?: boolean;
}

export interface FoodItem {
  id: string;
  name: string;
  nameEn: string;
  category: 'brunch' | 'dessert' | 'drinks';
  categoryLabel: string;
  price: number;
  description: string;
  ingredients: string;
  dietary: '全素' | '蛋奶素' | '現點現做' | '熱門推薦';
  coffeePairing: string;
  prepTime: string;
  image: string;
}

export interface MemberUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: '咖啡探索家' | '風味品鑑師' | '莊園傳奇';
  stamps: number; // 0-8
  points: number;
  favoriteRoast: string;
  favorites: string[]; // item IDs
  joinedDate: string;
}

export interface CartItem {
  cartItemId: string;
  itemId: string;
  name: string;
  category: 'bean' | 'drip' | 'food' | 'drink';
  option: string;
  unitPrice: number;
  quantity: number;
  image: string;
}

export interface OrderRecord {
  orderId: string;
  date: string;
  items: { name: string; option: string; quantity: number; price: number }[];
  total: number;
  status: '準備中' | '已完成' | '待自取';
  diningType: '外帶自取' | '內用' | '熟豆宅配';
  pickupTime?: string;
}

// 咖啡植物學大品種與傳奇種
export const COFFEE_VARIETIES: CoffeeVariety[] = [
  {
    id: 'geisha',
    name: '藝伎 / 瑰夏',
    nameEn: 'Geisha / Gesha',
    history: '1931 年在衣索比亞西南部的瑰夏山林被採集，後經肯亞、坦尚尼亞輾轉至哥斯大黎加，並於 2004 年由巴拿馬翡翠莊園在 BOP 競賽中一戰成名。',
    profile: '極致優雅的茉莉花香、佛手柑、水蜜桃與多汁白葡萄甜感，質地如絲綢般細膩，被譽為「上帝在杯中展現的奇蹟」。',
    origin: '衣索比亞 / 巴拿馬 / 哥倫比亞',
    flavorHighlights: ['茉莉花香', '佛手柑', '白桃汁', '伯爵茶感'],
    bestRoast: '淺焙 (Light Roast)',
    rarity: '極致稀有'
  },
  {
    id: 'typica',
    name: '鐵比卡',
    nameEn: 'Typica',
    history: '最古老的阿拉比卡原生種之一，18世紀初由荷蘭人攜出葉門並散播至全球，為現代絕大多數阿拉比卡品種的祖先。',
    profile: '風味純淨平衡，具細緻乾淨的蘋果酸度與優雅花香，餘韻帶著迷人的焦糖與榛果甜感，極具古典紳士風度。',
    origin: '葉門 / 印尼曼特寧 / 牙買加藍山 / 瓜地馬拉',
    flavorHighlights: ['紅蘋果', '乾淨花香', '生焦糖', '細膩堅果'],
    bestRoast: '中淺焙 至 中焙',
    rarity: '經典傳承'
  },
  {
    id: 'bourbon',
    name: '波旁',
    nameEn: 'Bourbon',
    history: '1708 年法國人在留尼旺島（原名波旁島）培育的自然突變種，果實圓潤飽滿，分為紅波旁、黃波旁與稀少的粉紅波旁。',
    profile: '以其卓越豐沛的甜感聞名，帶有深色莓果、黑櫻桃、濃郁牛奶巧克力與圓潤的油脂感，酸質溫潤滑順。',
    origin: '巴西 / 盧安達 / 薩爾瓦多 / 哥倫比亞',
    flavorHighlights: ['黑櫻桃', '甘蔗糖甜', '牛奶巧克力', '圓潤厚實'],
    bestRoast: '中焙 至 中深焙',
    rarity: '莊園精選'
  },
  {
    id: 'sl28-34',
    name: '肯亞 SL28 & SL34',
    nameEn: 'Scott Labs Selection',
    history: '1930 年代由史考特實驗室在肯亞針對抗旱與高品質杯測選育出的傳奇品種，造就了肯亞咖啡舉世無雙的辨識度。',
    profile: '極為明亮立體的黑醋栗、烏梅、蕃茄蜜蜜餞與柚子果酸，伴隨豐厚酒香與扎實口感，尾韻悠長回甘。',
    origin: '肯亞 (尼耶利 / 祈安布)',
    flavorHighlights: ['黑醋栗', '烏梅果乾', '葡萄柚', '立體高酸質'],
    bestRoast: '淺焙 至 中淺焙',
    rarity: '莊園精選'
  },
  {
    id: 'pacamara',
    name: '帕卡瑪拉',
    nameEn: 'Pacamara',
    history: '薩爾瓦多咖啡研究所在 1958 年培育，由波旁突變的帕卡斯（Pacas）與巨型豆瑪拉哥吉佩（Maragogype）雜交而成。',
    profile: '豆體碩大，具奔放的熱帶水果、百香果、香草植物與辛香料層次，口感醇厚而極富個性。',
    origin: '薩爾瓦多 / 瓜地馬拉 / 尼加拉瓜',
    flavorHighlights: ['百香果', '熱帶核果', '白胡椒薄荷', '極厚醇度'],
    bestRoast: '中淺焙',
    rarity: '莊園精選'
  }
];

// 咖啡處理法
export const PROCESSING_METHODS: ProcessingMethod[] = [
  {
    id: 'washed',
    name: '傳統水洗處理法',
    nameEn: 'Fully Washed',
    processTime: '12 - 36 小時水槽發酵',
    summary: '去除果皮與果肉後，在清水槽中透過微生物天然發酵分解黏膜，洗淨後移至棚架乾燥。',
    flavorImpact: '風味極度乾淨明亮，最能完美展現產區風土特性（Terroir）、細緻花香與活潑檸檬酸質。',
    tag: '純淨高雅 · 產區代表'
  },
  {
    id: 'natural',
    name: '精緻日曬處理法',
    nameEn: 'Natural / Dry Process',
    processTime: '20 - 30 天高架曬床慢乾',
    summary: '採收完全熟成的紅果後，直接鋪平在非洲高架床慢速翻動乾燥，果肉糖分滲透至咖啡生豆內部。',
    flavorImpact: '具有極度奔放濃郁的熱帶熟果香、草莓藍莓果醬感、發酵酒香與深厚糖蜜甜感。',
    tag: '狂野果香 · 醇厚蜜甜'
  },
  {
    id: 'honey',
    name: '蜜處理法',
    nameEn: 'Honey / Pulped Natural',
    processTime: '保留不同比例果膠直接日曬',
    summary: '去皮後保留 50%~100% 果膠層（分為黃蜜、紅蜜、黑蜜），在陽光與遮陰交替下均勻發酵乾燥。',
    flavorImpact: '兼具水洗的乾淨明亮感與日曬的圓潤厚實度，伴隨杏仁糖、蜂蜜與蜜棗般的飽滿甜韻。',
    tag: '平衡圓融 · 糖蜜質地'
  },
  {
    id: 'anaerobic',
    name: '厭氧發酵處理法',
    nameEn: 'Anaerobic Fermentation',
    processTime: '密封不鏽鋼桶注入二氧化碳 48-120 小時',
    summary: '將咖啡櫻桃置入密閉容器排除氧氣，透過特定厭氧菌株慢速低溫發酵，控制溫度與 pH 值。',
    flavorImpact: '帶來前所未有的層次爆發力，如蘭姆酒、肉桂蘋果派、薰衣草紫羅蘭與乳酸發酵多汁感。',
    tag: '前衛實驗 · 層次爆發'
  }
];

// 精品單品咖啡豆菜單
export const COFFEE_BEANS: CoffeeBean[] = [
  {
    id: 'bean-geisha-panama',
    name: '巴拿馬 波奎特 翡翠莊園 綠標 藝伎',
    origin: '巴拿馬 (Panama)',
    subRegion: '波奎特產區 (Boquete)',
    producer: '翡翠莊園 (Hacienda La Esmeralda)',
    variety: '綠標藝伎 (Green Label Geisha 100%)',
    altitude: '1,650 - 1,800m',
    process: '精緻水洗處理法 (Fully Washed)',
    roastLevel: '淺焙',
    flavorNotes: ['橙花與茉莉花香', '蜜桃軟糖', '佛手柑', '高山烏龍茶韻'],
    acidity: 4.5,
    sweetness: 4.8,
    body: 3.5,
    price200g: 780,
    dripBagPrice: 85,
    description: '全球精品咖啡界的桂冠之作。晨曦採摘高海拔完全成熟藝伎果實，冷泉水洗發酵，入口清透如晨露，綻放如春日花園般的百花清芬。',
    brewingNotes: {
      ratio: '1:16 (15g 粉萃取 240ml)',
      temp: '92°C - 93°C',
      time: '2分15秒',
      grind: '中細研磨 (如二號砂糖微細)'
    },
    image: '/src/assets/images/coffee_beans_varieties_1793773967361.jpg',
    isFeatured: true
  },
  {
    id: 'bean-yirgacheffe-gedeb',
    name: '衣索比亞 耶加雪菲 歌迪貝 沃卡 日曬 G1',
    origin: '衣索比亞 (Ethiopia)',
    subRegion: '耶加雪菲 歌迪貝 (Gedeb, Worka)',
    producer: '沃卡小農合作社',
    variety: '原生古優種 (Heirloom)',
    altitude: '2,000 - 2,200m',
    process: '非洲棚架緩慢日曬 (Natural G1)',
    roastLevel: '淺焙',
    flavorNotes: ['新鮮草莓', '熟成藍莓', '紫羅蘭花香', '蜂蜜甜檸檬'],
    acidity: 4.2,
    sweetness: 4.6,
    body: 3.8,
    price200g: 450,
    dripBagPrice: 50,
    description: '耶加雪菲歌迪貝產區以極高海拔著稱，日曬過程長達22天。磨開即是滿溢的莓果花香，入口如啜飲草莓果茶般甜美多汁。',
    brewingNotes: {
      ratio: '1:15 (16g 粉萃取 240ml)',
      temp: '91°C',
      time: '2分10秒',
      grind: '中度研磨'
    },
    image: '/src/assets/images/coffee_beans_varieties_1793773967361.jpg',
    isFeatured: true
  },
  {
    id: 'bean-kenya-sl28',
    name: '肯亞 祈安布 珍珠圓豆 PB 雙重水洗',
    origin: '肯亞 (Kenya)',
    subRegion: '祈安布高原 (Kiambu)',
    producer: '卡庫齊水洗處理廠',
    variety: 'SL28, SL34 珍珠圓豆 (Peaberry)',
    altitude: '1,850m',
    process: '肯亞式雙重水洗 (Kenya 72hr Fermentation)',
    roastLevel: '中淺焙',
    flavorNotes: ['黑醋栗果醬', '黃金奇異果', '烏梅甘草', '蔗糖高甜'],
    acidity: 4.6,
    sweetness: 4.3,
    body: 4.2,
    price200g: 480,
    dripBagPrice: 55,
    description: '圓豆蘊含更濃縮的養分與立體酸香，肯亞獨門的72小時低溫水洗，帶來如黑嘉麗軟糖般的濃烈果香與驚人的生津回甘。',
    brewingNotes: {
      ratio: '1:15.5 (15g 粉萃取 230ml)',
      temp: '90°C',
      time: '2分20秒',
      grind: '中等研磨'
    },
    image: '/src/assets/images/coffee_beans_varieties_1793773967361.jpg'
  },
  {
    id: 'bean-colombia-rose',
    name: '哥倫比亞 考卡 玫瑰花茶雙重厭氧 水洗',
    origin: '哥倫比亞 (Colombia)',
    subRegion: '考卡省 天堂莊園 (Cauca, El Paraiso)',
    producer: '迪亞哥·貝穆德斯 (Diego Bermudez)',
    variety: '卡斯提優 (Castillo)',
    altitude: '1,930m',
    process: '雙重厭氧發酵 + 熱衝擊處理 (Thermal Shock)',
    roastLevel: '淺焙',
    flavorNotes: ['大馬士革玫瑰花茶', '荔枝多汁', '覆盆子乳酪', '香草夾'],
    acidity: 4.0,
    sweetness: 4.7,
    body: 3.6,
    price200g: 580,
    dripBagPrice: 65,
    description: '現代生豆處理科學的里程碑。以熱衝擊封鎖芳香酯類，注水瞬間整個空間瀰漫著如同新鮮採摘的玫瑰花與多汁荔枝香氣。',
    brewingNotes: {
      ratio: '1:16 (15g 粉萃取 240ml)',
      temp: '90°C - 91°C',
      time: '2分05秒',
      grind: '中偏粗研磨'
    },
    image: '/src/assets/images/coffee_beans_varieties_1793773967361.jpg'
  },
  {
    id: 'bean-guatemala-floran',
    name: '瓜地馬拉 安提瓜 花神 蜜處理',
    origin: '瓜地馬拉 (Guatemala)',
    subRegion: '安提瓜火山谷地 (Antigua Valley)',
    producer: '拉米尼塔莊園 (La Minita)',
    variety: '波旁、鐵比卡 (Bourbon & Typica)',
    altitude: '1,600 - 1,800m',
    process: '黃蜜處理 (Yellow Honey)',
    roastLevel: '中焙',
    flavorNotes: ['柑橘香氣', '烤杏仁片', '太妃糖甜', '可可尾韻'],
    acidity: 3.2,
    sweetness: 4.5,
    body: 4.0,
    price200g: 420,
    dripBagPrice: 48,
    description: '火山沃土賦予的經典溫潤調性。經過蜜處理微發酵，酸度溫和柔順，滿滿的杏仁堅果與烤棉花糖香氣，最適合放鬆的午後。',
    brewingNotes: {
      ratio: '1:15 (16g 粉萃取 240ml)',
      temp: '88°C - 89°C',
      time: '2分15秒',
      grind: '中度研磨'
    },
    image: '/src/assets/images/coffee_beans_varieties_1793773967361.jpg'
  },
  {
    id: 'bean-house-blend-dark',
    name: '「森嵐深焙」 經典義式配方豆',
    origin: '印尼蘇門答臘 & 巴西塞拉多 & 哥倫比亞',
    subRegion: '三大產區嚴選混調',
    producer: '嶼森自家烘焙主理人配方',
    variety: 'Typica, Catuai, Bourbon',
    altitude: '1,200 - 1,700m',
    process: '濕剝法 & 半日曬混和',
    roastLevel: '深焙',
    flavorNotes: ['85% 黑巧克力', '炙烤胡桃', '沉木煙燻', '濃郁奶油香'],
    acidity: 1.5,
    sweetness: 4.2,
    body: 4.9,
    price200g: 380,
    dripBagPrice: 45,
    description: '專為熱拿鐵與愛好厚醇口感者打造。低酸深焙卻絕無焦苦，入口如絲絨般化開的黑巧克力與烤堅果香，尾韻甜如黑糖蜜。',
    brewingNotes: {
      ratio: '1:14 (手沖) 或 1:2 (義式濃縮)',
      temp: '86°C - 88°C',
      time: '2分00秒',
      grind: '中細研磨'
    },
    image: '/src/assets/images/coffee_beans_varieties_1793773967361.jpg'
  }
];

// 咖啡館餐點、甜點與飲品
export const FOOD_MENU: FoodItem[] = [
  {
    id: 'food-avocado-salmon',
    name: '煙燻鮭魚酪梨水波蛋酸種麵包',
    nameEn: 'Avocado & Smoked Salmon Poached Egg Sourdough',
    category: 'brunch',
    categoryLabel: '精選手作早午餐',
    price: 320,
    description: '自家天然酵母低溫發酵72小時的裸麥酸種麵包，抹上特製檸檬蒔蘿酪梨泥，佐蘇格蘭冷燻鮭魚、放牧有機水波蛋與紅酸模嫩葉。',
    ingredients: '天然酵母裸麥酸種、挪威煙燻鮭魚、新鮮酪梨、放牧有機雞蛋、特級初榨橄欖油、海鹽碎',
    dietary: '現點現做',
    coffeePairing: '建議佐：肯亞 SL28 雙重水洗手沖，清新明亮酸度解膩，帶出鮭魚甜嫩。',
    prepTime: '現點現做 約 12 分鐘',
    image: '/src/assets/images/cafe_brunch_sourdough_1793773967666.jpg'
  },
  {
    id: 'food-truffle-mushroom-melt',
    name: '松露牛肝菌野菇起司熱烤三明治',
    nameEn: 'Truffle Porcini & Wild Mushroom Melt',
    category: 'brunch',
    categoryLabel: '精選手作早午餐',
    price: 290,
    description: '義大利黑松露醬快炒四種野生綜合菇蕈，夾入自製巧巴達，融化格呂耶爾起司與莫札瑞拉起司，外皮金黃酥脆爆漿拉絲。',
    ingredients: '野生牛肝菌、杏鮑菇、黑松露醬、Gruyère 起司、Mozzarella 起司、自製法式麵包',
    dietary: '蛋奶素',
    coffeePairing: '建議佐：瓜地馬拉花神中焙，堅果溫暖香氣與松露大地氣息完美共鳴。',
    prepTime: '現烤約 10 分鐘',
    image: '/src/assets/images/cafe_brunch_sourdough_1793773967666.jpg'
  },
  {
    id: 'food-cinnamon-roll',
    name: '焦糖核桃肉桂捲佐海鹽奶霜',
    nameEn: 'Sticky Caramel Pecan Cinnamon Roll',
    category: 'dessert',
    categoryLabel: '手作私房甜點',
    price: 160,
    description: '使用斯里蘭卡有機頂級錫蘭肉桂粉與手工黑糖熬煮肉桂糖蜜，夾層鋪滿低溫烘烤脆核桃，出爐淋上微酸法式海鹽乳酪抹醬。',
    ingredients: '日本昭和小麥粉、斯里蘭卡肉桂、法國依思尼奶油、澳洲乳酪、焦糖黑糖、加州核桃',
    dietary: '熱門推薦',
    coffeePairing: '建議佐：「森嵐深焙」熱美式或手沖，黑巧克力回甘與辛香肉桂無懈可擊。',
    prepTime: '回烤溫熱 約 5 分鐘',
    image: '/src/assets/images/cafe_signature_dessert_1793773968011.jpg'
  },
  {
    id: 'food-basque-cheesecake',
    name: '焦香重乳酪巴斯克蛋糕 (半熟熔心)',
    nameEn: 'Burnt Basque Melted Cheesecake',
    category: 'dessert',
    categoryLabel: '手作私房甜點',
    price: 180,
    description: '高溫急速烘烤形成迷人深琥珀色焦糖外層，內部保留濃醇半熟流心質地。使用日本北海道十勝乳酪與馬達加斯加波旁香草莢。',
    ingredients: '北海道十勝奶油乳酪、法國鮮奶油、馬達加斯加天然香草莢、初卵蛋、上白糖',
    dietary: '蛋奶素',
    coffeePairing: '建議佐：衣索比亞 耶加雪菲 歌迪貝手沖，多汁莓果酸香如天然果醬點亮乳酪醇滑。',
    prepTime: '即食冷藏冷卻切片',
    image: '/src/assets/images/cafe_signature_dessert_1793773968011.jpg'
  },
  {
    id: 'food-showa-pudding',
    name: '大人味威士忌焦糖昭和硬布丁',
    nameEn: 'Classic Showa Custard Pudding with Single Malt',
    category: 'dessert',
    categoryLabel: '手作私房甜點',
    price: 150,
    description: '日式喫茶店傳統工法，綿密扎實的蒸烤布丁體，苦甜焦糖中注入少許單一麥芽威士忌，頂部覆蓋細緻輕盈手打十勝鮮奶油與紅櫻桃。',
    ingredients: '新鮮牧場鮮乳、放牧卵黃、微苦手工焦糖、蘇格蘭單一麥芽威士忌（微量香氣）',
    dietary: '蛋奶素',
    coffeePairing: '建議佐：哥倫比亞雙重厭氧手沖，微醺花果香與焦糖布丁極致奢華。',
    prepTime: '即食冷藏出餐',
    image: '/src/assets/images/cafe_signature_dessert_1793773968011.jpg'
  },
  {
    id: 'food-lemon-tart',
    name: '法式小農黃檸檬凝乳塔',
    nameEn: 'Artisan Fresh Meyer Lemon Curd Tart',
    category: 'dessert',
    categoryLabel: '手作私房甜點',
    price: 170,
    description: '屏東在地無毒尤利卡綠檸檬與黃檸檬現榨，慢火熬製柔滑酸冽凝乳，填入酥脆千層杏仁甜派皮，點綴檸檬香蜂草。',
    ingredients: '在地鮮榨檸檬、法國AOP產區奶油、西西里杏仁粉、小麥麵粉、海鹽',
    dietary: '蛋奶素',
    coffeePairing: '建議佐：巴拿馬翡翠莊園藝伎手沖，柑橘雙重奏帶來極致透亮昇華。',
    prepTime: '即食冷藏出餐',
    image: '/src/assets/images/cafe_signature_dessert_1793773968011.jpg'
  },
  {
    id: 'drink-flat-white',
    name: '澳式馥芮白 (短萃濃縮手打奶泡)',
    nameEn: 'Flat White (Ristretto Double Shot)',
    category: 'drinks',
    categoryLabel: '特調飲品與拿鐵',
    price: 170,
    description: '精準使用雙份短萃取 Ristretto，只取咖啡最甘醇甜感前段，融入手打極薄微米蒸奶，如天鵝絨般緊密滑順。',
    ingredients: '雙份精品配方短萃取、在地牧場單一殺菌鮮乳',
    dietary: '現點現做',
    coffeePairing: '經典熱飲單品，推薦搭配肉桂捲或焦糖布丁。',
    prepTime: '現點現做 約 4 分鐘',
    image: '/src/assets/images/hero_coffee_roastery_1793773966325.jpg'
  },
  {
    id: 'drink-sparkling-coldbrew',
    name: '接骨木檸檬氣泡冷萃咖啡',
    nameEn: 'Elderflower Sparkling Cold Brew',
    category: 'drinks',
    categoryLabel: '特調飲品與拿鐵',
    price: 190,
    description: '低溫慢速浸泡18小時單品耶加雪菲冷萃，加入法國接骨木花糖蜜、新鮮現擠檸檬汁與冰透微氣泡水，清冽提神。',
    ingredients: '單品日曬冷萃原液、有機接骨木花萃取露、檸檬汁、氣泡水、迷迭香炙燒',
    dietary: '全素',
    coffeePairing: '夏日特調，推薦搭配酪梨水波蛋酸種麵包。',
    prepTime: '現點現做 約 3 分鐘',
    image: '/src/assets/images/hero_coffee_roastery_1793773966325.jpg'
  }
];

// 預設示範會員帳號
export const DEMO_USER: MemberUser = {
  id: 'user-demo-888',
  name: '林予安',
  email: 'yuann.lin@cafeyusen.com',
  phone: '0912-345-678',
  tier: '風味品鑑師',
  stamps: 5,
  points: 480,
  favoriteRoast: '淺焙花果香',
  favorites: ['bean-geisha-panama', 'food-avocado-salmon', 'food-cinnamon-roll'],
  joinedDate: '2025.10.12'
};

// 預設示範歷史訂單
export const DEMO_ORDERS: OrderRecord[] = [
  {
    orderId: 'YS-20261102-0941',
    date: '2026.11.02 10:15',
    items: [
      { name: '巴拿馬 波奎特 翡翠莊園 綠標 藝伎', option: '200g 熟豆 (原豆不磨)', quantity: 1, price: 780 },
      { name: '焦香重乳酪巴斯克蛋糕', option: '切片冷藏', quantity: 1, price: 180 }
    ],
    total: 960,
    status: '已完成',
    diningType: '熟豆宅配'
  },
  {
    orderId: 'YS-20261028-1420',
    date: '2026.10.28 14:30',
    items: [
      { name: '煙燻鮭魚酪梨水波蛋酸種麵包', option: '現點現做', quantity: 1, price: 320 },
      { name: '澳式馥芮白', option: '熱飲 (燕麥奶換購)', quantity: 1, price: 190 }
    ],
    total: 510,
    status: '已完成',
    diningType: '內用'
  }
];
