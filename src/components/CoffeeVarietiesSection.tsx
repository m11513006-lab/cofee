import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Droplets, Thermometer, Flame, Sparkles, BookOpen } from 'lucide-react';
import { COFFEE_VARIETIES, PROCESSING_METHODS, CoffeeVariety, ProcessingMethod } from '../data/coffeeData';

export const CoffeeVarietiesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'varieties' | 'processing' | 'roast' | 'brew'>('varieties');
  const [selectedVariety, setSelectedVariety] = useState<CoffeeVariety>(COFFEE_VARIETIES[0]);
  const [selectedProcess, setSelectedProcess] = useState<ProcessingMethod>(PROCESSING_METHODS[0]);

  // Brew timer state
  const [coffeeGrams, setCoffeeGrams] = useState<number>(15);
  const [waterRatio, setWaterRatio] = useState<number>(15.5);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);

  const totalWater = Math.round(coffeeGrams * waterRatio);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else if (!timerRunning && timerSeconds !== 0) {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timerSeconds]);

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainingSecs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const getBrewStage = (sec: number) => {
    if (sec === 0) return { title: '準備注水', desc: '91°C 熱水潤濕濾紙並倒入咖啡粉，輕拍整平。' };
    if (sec <= 35) return { title: '第一階段：悶蒸 (Blooming)', desc: `注入約 ${coffeeGrams * 2.5}ml 溫熱水，均勻浸潤粉層，釋放二氧化碳。` };
    if (sec <= 80) return { title: '第二階段：中心穩定注水', desc: `由中心向外小水流注水至 ${Math.round(totalWater * 0.6)}ml，帶出花果甜感。` };
    if (sec <= 135) return { title: '第三階段：尾段注水與收尾', desc: `穩定注水至總水量 ${totalWater}ml，維持粉面水位平整，等候滴濾完畢。` };
    return { title: '萃取完成！', desc: '移除濾杯，搖勻玻璃下壺，即可倒入溫熱陶瓷杯細細品鑑。' };
  };

  return (
    <section id="varieties" className="py-20 bg-[#F4EFE6] border-b border-[#E3DACD]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#8A796B] mb-2">
            <span>Specialty Coffee Knowledge</span>
            <span aria-hidden="true">·</span>
            <span>風土與工藝指南</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#2C2420] tracking-tight">
            探索咖啡百科：品種、處理法與烘焙光譜
          </h2>
          <p className="mt-3 text-base text-[#615248] leading-relaxed">
            咖啡是一門連結大自然氣候與人類精湛農業工藝的風土藝術。理解咖啡生豆品種的基因根源、採收後的發酵方式與火侯烘焙，能讓你清晰掌握杯中每一口香氣的由來。
          </p>
        </div>

        {/* Tab Navigation (Segmented Controls) */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#E8E1D5] rounded-xl max-w-2xl mb-10">
          <button
            onClick={() => setActiveTab('varieties')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'varieties'
                ? 'bg-[#FAF7F2] text-[#2C2420] shadow-sm font-semibold'
                : 'text-[#6B5E55] hover:text-[#2C2420]'
            }`}
          >
            01. 原生與傳奇品種
          </button>
          <button
            onClick={() => setActiveTab('processing')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'processing'
                ? 'bg-[#FAF7F2] text-[#2C2420] shadow-sm font-semibold'
                : 'text-[#6B5E55] hover:text-[#2C2420]'
            }`}
          >
            02. 生豆精緻處理法
          </button>
          <button
            onClick={() => setActiveTab('roast')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'roast'
                ? 'bg-[#FAF7F2] text-[#2C2420] shadow-sm font-semibold'
                : 'text-[#6B5E55] hover:text-[#2C2420]'
            }`}
          >
            03. 烘焙度與風味輪
          </button>
          <button
            onClick={() => setActiveTab('brew')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'brew'
                ? 'bg-[#FAF7F2] text-[#2C2420] shadow-sm font-semibold'
                : 'text-[#6B5E55] hover:text-[#2C2420]'
            }`}
          >
            04. 手沖黃金比例計時器
          </button>
        </div>

        {/* Tab Content 1: Botanical Varieties */}
        {activeTab === 'varieties' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Variety Selector List */}
            <div className="lg:col-span-5 space-y-3">
              <p className="text-xs font-semibold tracking-wider text-[#8A796B] uppercase mb-1">
                選擇品種探索血統身世
              </p>
              {COFFEE_VARIETIES.map((v) => {
                const isSelected = selectedVariety.id === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariety(v)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#FAF7F2] border-[#C47D42] shadow-sm ring-1 ring-[#C47D42]/30'
                        : 'bg-[#F9F6F0] border-[#E5DDD0] hover:border-[#D0C5B5]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-[#2C2420]">{v.name}</h3>
                      <span className="text-xs text-[#8A796B] font-normal">{v.rarity}</span>
                    </div>
                    <p className="text-xs text-[#8A796B] mt-0.5">{v.nameEn}</p>
                    <div className="flex items-center gap-2 text-xs text-[#6B5E55] mt-2">
                      <span>產地：{v.origin}</span>
                      <span aria-hidden="true">·</span>
                      <span>最佳烘焙：{v.bestRoast}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Variety Detail Card */}
            <div className="lg:col-span-7 bg-[#FAF7F2] border border-[#E5DDD0] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="border-b border-[#EBE4DA] pb-5">
                <div className="flex items-center gap-2 text-xs font-medium text-[#C47D42] mb-1">
                  <span>Botanical Profile</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedVariety.rarity}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#2C2420]">
                  {selectedVariety.name}
                </h3>
                <p className="text-sm text-[#8A796B] italic mt-0.5">{selectedVariety.nameEn}</p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8A796B] mb-2">
                  品種溯源歷史
                </h4>
                <p className="text-sm text-[#4A3E37] leading-relaxed">
                  {selectedVariety.history}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8A796B] mb-2">
                  標誌性杯測風味特徵
                </h4>
                <p className="text-sm text-[#4A3E37] leading-relaxed">
                  {selectedVariety.profile}
                </p>
              </div>

              <div className="pt-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8A796B] mb-2.5">
                  代表風味關鍵字
                </h4>
                {/* Zero-Pill: clean text with dividers */}
                <div className="flex flex-wrap items-center gap-2 text-sm text-[#2C2420] font-medium bg-[#F5EFE6] p-3 rounded-lg border border-[#E8DFD3]">
                  {selectedVariety.flavorHighlights.map((flavor, idx) => (
                    <React.Fragment key={flavor}>
                      <span>{flavor}</span>
                      {idx < selectedVariety.flavorHighlights.length - 1 && (
                        <span className="text-[#B5A89B]" aria-hidden="true">
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#EBE4DA] grid grid-cols-2 gap-4 text-xs text-[#6B5E55]">
                <div>
                  <span className="text-[#8A796B] block">常見著名產區</span>
                  <span className="font-medium text-[#2C2420] mt-0.5 block">{selectedVariety.origin}</span>
                </div>
                <div>
                  <span className="text-[#8A796B] block">建議烘焙詮釋</span>
                  <span className="font-medium text-[#2C2420] mt-0.5 block">{selectedVariety.bestRoast}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: Processing Methods */}
        {activeTab === 'processing' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-3">
              <p className="text-xs font-semibold tracking-wider text-[#8A796B] uppercase mb-1">
                處理法如何形塑咖啡風味
              </p>
              {PROCESSING_METHODS.map((p) => {
                const isSelected = selectedProcess.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProcess(p)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#FAF7F2] border-[#C47D42] shadow-sm ring-1 ring-[#C47D42]/30'
                        : 'bg-[#F9F6F0] border-[#E5DDD0] hover:border-[#D0C5B5]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-[#2C2420]">{p.name}</h3>
                      <span className="text-xs text-[#8A796B]">{p.processTime}</span>
                    </div>
                    <p className="text-xs text-[#8A796B] mt-0.5">{p.nameEn}</p>
                    <p className="text-xs text-[#C47D42] font-medium mt-2">{p.tag}</p>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-7 bg-[#FAF7F2] border border-[#E5DDD0] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="border-b border-[#EBE4DA] pb-5">
                <div className="flex items-center gap-2 text-xs font-medium text-[#C47D42] mb-1">
                  <span>Processing Method Guide</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedProcess.tag}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#2C2420]">
                  {selectedProcess.name}
                </h3>
                <p className="text-sm text-[#8A796B] italic mt-0.5">{selectedProcess.nameEn}</p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8A796B] mb-2 flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-[#C47D42]" />
                  <span>工藝流程與原理</span>
                </h4>
                <p className="text-sm text-[#4A3E37] leading-relaxed">
                  {selectedProcess.summary}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8A796B] mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C47D42]" />
                  <span>杯中風味影響與特色</span>
                </h4>
                <p className="text-sm text-[#4A3E37] leading-relaxed bg-[#F5EFE6] p-4 rounded-xl border border-[#E8DFD3]">
                  {selectedProcess.flavorImpact}
                </p>
              </div>

              <div className="pt-2 text-xs text-[#6B5E55] flex items-center justify-between border-t border-[#EBE4DA]">
                <span>標準處理週期：{selectedProcess.processTime}</span>
                <span className="text-[#8A796B]">嶼森品鑑師推薦批次均通過杯測 86+ 分標準</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 3: Roasting Spectrum */}
        {activeTab === 'roast' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Light Roast */}
              <div className="bg-[#FAF7F2] border border-[#E5DDD0] rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-[#EBE4DA] pb-3">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#2C2420]">淺焙 (Light)</h3>
                    <p className="text-xs text-[#8A796B]">Cinnamon to New England Roast</p>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-[#E8A87C]" title="淺肉桂色" />
                </div>
                <p className="text-xs text-[#615248] leading-relaxed">
                  在一爆密集前後下豆，生豆水分降至最低，內部綠原酸與芳香酯類完整保留。展現最純粹的原產地風土（Terroir）、明亮檸檬酸質與高雅花香。
                </p>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#6B5E55]">
                    <span>酸度 (Acidity)</span>
                    <span className="font-semibold text-[#2C2420]">★★★★★ 明亮活潑</span>
                  </div>
                  <div className="flex justify-between text-[#6B5E55]">
                    <span>醇厚度 (Body)</span>
                    <span className="font-semibold text-[#2C2420]">★★☆☆☆ 輕盈清透</span>
                  </div>
                  <div className="flex justify-between text-[#6B5E55]">
                    <span>風味主調</span>
                    <span className="font-semibold text-[#2C2420]">茉莉、水蜜桃、柑橘、白茶</span>
                  </div>
                </div>
              </div>

              {/* Medium Roast */}
              <div className="bg-[#FAF7F2] border border-[#E5DDD0] rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-[#EBE4DA] pb-3">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#2C2420]">中焙 (Medium)</h3>
                    <p className="text-xs text-[#8A796B]">City to Full City Roast</p>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-[#A86438]" title="栗褐色" />
                </div>
                <p className="text-xs text-[#615248] leading-relaxed">
                  一爆結束至二爆開始前下豆，梅納反應與焦糖化反應達到完美和諧平衡。酸度轉為溫柔甘潤，堅果、太妃糖與熟果甜香綻放，大眾適口性極佳。
                </p>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#6B5E55]">
                    <span>酸度 (Acidity)</span>
                    <span className="font-semibold text-[#2C2420]">★★★☆☆ 溫和柔潤</span>
                  </div>
                  <div className="flex justify-between text-[#6B5E55]">
                    <span>醇厚度 (Body)</span>
                    <span className="font-semibold text-[#2C2420]">★★★★☆ 圓潤平衡</span>
                  </div>
                  <div className="flex justify-between text-[#6B5E55]">
                    <span>風味主調</span>
                    <span className="font-semibold text-[#2C2420]">烤杏仁、生焦糖、黑櫻桃、可可</span>
                  </div>
                </div>
              </div>

              {/* Dark Roast */}
              <div className="bg-[#FAF7F2] border border-[#E5DDD0] rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-[#EBE4DA] pb-3">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#2C2420]">深焙 (Dark)</h3>
                    <p className="text-xs text-[#8A796B]">Vienna to French Roast</p>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-[#4A2E1B]" title="深巧克力色" />
                </div>
                <p className="text-xs text-[#615248] leading-relaxed">
                  進入二爆密集，咖啡豆油脂滲出表面。酸質近乎退隱，轉化為醇厚的煙燻沉木、85%黑巧克力與烤胡桃香氣，質地絲滑如絨，與鮮奶搭配極其濃郁。
                </p>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#6B5E55]">
                    <span>酸度 (Acidity)</span>
                    <span className="font-semibold text-[#2C2420]">★☆☆☆☆ 幾無酸感</span>
                  </div>
                  <div className="flex justify-between text-[#6B5E55]">
                    <span>醇厚度 (Body)</span>
                    <span className="font-semibold text-[#2C2420]">★★★★★ 濃郁扎實</span>
                  </div>
                  <div className="flex justify-between text-[#6B5E55]">
                    <span>風味主調</span>
                    <span className="font-semibold text-[#2C2420]">黑巧克力、炙烤核桃、黑糖、雪茄木</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 4: Interactive Hand-Drip Ratio & Timer */}
        {activeTab === 'brew' && (
          <div className="bg-[#FAF7F2] border border-[#E5DDD0] rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#EBE4DA] gap-4">
              <div>
                <h3 className="font-display text-2xl font-bold text-[#2C2420]">
                  職人 V60 手沖黃金參數與萃取計時器
                </h3>
                <p className="text-xs text-[#8A796B] mt-1">
                  依據粉量動態計算注水配比，協助你在家沖煮出一杯如咖啡館般清澈回甘的手沖咖啡。
                </p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs text-[#8A796B]">推薦水溫：</span>
                <span className="text-xs font-semibold text-[#C47D42] bg-[#F5EFE6] px-2.5 py-1 rounded-md">
                  90°C - 92°C
                </span>
              </div>
            </div>

            {/* Parameter adjustments */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-6 p-4 bg-[#F5EFE6] rounded-xl border border-[#E8DFD3]">
              <div>
                <label className="text-xs font-medium text-[#6B5E55] block mb-1">
                  咖啡粉量 (g)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="12"
                    max="30"
                    value={coffeeGrams}
                    onChange={(e) => setCoffeeGrams(Number(e.target.value))}
                    className="w-full accent-[#C47D42]"
                  />
                  <span className="font-bold text-[#2C2420] text-sm tabular-nums min-w-[2.5rem]">
                    {coffeeGrams}g
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#6B5E55] block mb-1">
                  水粉比例 (Ratio)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="14"
                    max="17"
                    step="0.5"
                    value={waterRatio}
                    onChange={(e) => setWaterRatio(Number(e.target.value))}
                    className="w-full accent-[#C47D42]"
                  />
                  <span className="font-bold text-[#2C2420] text-sm tabular-nums min-w-[3.5rem]">
                    1:{waterRatio}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#6B5E55] block mb-1">
                  建議總注水量 (ml)
                </label>
                <div className="text-xl font-bold font-display text-[#C47D42] tabular-nums">
                  {totalWater} ml
                </div>
              </div>
            </div>

            {/* Timer and Real-Time Stage Guidance */}
            <div className="flex flex-col md:flex-row items-center gap-8 pt-4">
              {/* Timer clock display */}
              <div className="text-center p-6 bg-[#2C2420] text-[#FAF7F2] rounded-2xl min-w-[200px] w-full md:w-auto shadow-md">
                <div className="text-xs text-[#B8ADA0] uppercase tracking-widest font-mono">
                  Brewing Timer
                </div>
                <div className="font-mono text-5xl font-bold my-2 tabular-nums">
                  {formatTimer(timerSeconds)}
                </div>
                <div className="flex items-center justify-center gap-3 mt-4">
                  <button
                    onClick={() => setTimerRunning(!timerRunning)}
                    className="p-2.5 rounded-full bg-[#C47D42] hover:bg-[#9A5A28] text-white transition-colors cursor-pointer"
                    title={timerRunning ? '暫停' : '開始計時'}
                  >
                    {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                  <button
                    onClick={() => {
                      setTimerRunning(false);
                      setTimerSeconds(0);
                    }}
                    className="p-2.5 rounded-full bg-[#4A3E37] hover:bg-[#615248] text-white transition-colors cursor-pointer"
                    title="歸零重置"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Stage description */}
              <div className="flex-1 space-y-2">
                <div className="text-xs font-semibold text-[#C47D42] tracking-wider uppercase">
                  當前沖煮進程
                </div>
                <h4 className="font-display text-xl font-bold text-[#2C2420]">
                  {getBrewStage(timerSeconds).title}
                </h4>
                <p className="text-sm text-[#615248] leading-relaxed">
                  {getBrewStage(timerSeconds).desc}
                </p>
                <div className="pt-2 text-xs text-[#8A796B]">
                  💡 建議悶蒸時間約 30~35 秒；全段注水在 2 分 15 秒前注滿，滴濾約 2 分 30 秒至 2 分 45 秒完成最佳。
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
