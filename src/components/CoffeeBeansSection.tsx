import React, { useState } from 'react';
import { ShoppingBag, Heart, Check, Sparkles, SlidersHorizontal, Info } from 'lucide-react';
import { COFFEE_BEANS, CoffeeBean, CartItem } from '../data/coffeeData';

interface CoffeeBeansSectionProps {
  onAddToCart: (item: Omit<CartItem, 'cartItemId'>) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const CoffeeBeansSection: React.FC<CoffeeBeansSectionProps> = ({
  onAddToCart,
  favorites,
  onToggleFavorite
}) => {
  const [filterRoast, setFilterRoast] = useState<string>('all');
  const [selectedBeanForDetail, setSelectedBeanForDetail] = useState<CoffeeBean | null>(null);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  // Per-bean selected packaging option
  const [packagingChoice, setPackagingChoice] = useState<{ [beanId: string]: 'whole' | 'ground' | 'drip' }>({});

  const filteredBeans = COFFEE_BEANS.filter((b) => {
    if (filterRoast === 'all') return true;
    if (filterRoast === 'light') return b.roastLevel.includes('淺');
    if (filterRoast === 'medium') return b.roastLevel === '中焙';
    if (filterRoast === 'dark') return b.roastLevel.includes('深');
    return true;
  });

  const handleAdd = (bean: CoffeeBean) => {
    const choice = packagingChoice[bean.id] || 'whole';
    let optionLabel = '200g 熟豆 (原豆不磨)';
    let price = bean.price200g;

    if (choice === 'ground') {
      optionLabel = '200g 熟豆 (代客手沖細度研磨)';
      price = bean.price200g;
    } else if (choice === 'drip') {
      optionLabel = '隨身濾掛包 (10包/盒裝)';
      price = bean.dripBagPrice * 10;
    }

    onAddToCart({
      itemId: bean.id,
      name: bean.name,
      category: choice === 'drip' ? 'drip' : 'bean',
      option: optionLabel,
      unitPrice: price,
      quantity: 1,
      image: bean.image
    });

    setAddedNotice(bean.id);
    setTimeout(() => {
      setAddedNotice((prev) => (prev === bean.id ? null : prev));
    }, 2000);
  };

  return (
    <section id="beans" className="py-20 bg-[#FAF7F2] border-b border-[#EBE4DA]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#8A796B] mb-2">
              <span>Direct Trade Specialty Beans</span>
              <span aria-hidden="true">·</span>
              <span>莊園自慢直火烘焙</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#2C2420] tracking-tight">
              當季單品咖啡豆與濾掛選品
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#615248] max-w-2xl">
              每週二、五定時小量直火烘焙，接單後進行充氮包裝，確保在最佳賞味熟成期將極致產區風土送抵你手中。
            </p>
          </div>

          {/* Interactive Filter Tabs (Buttons with click handlers) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#EFE9DF] rounded-xl self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setFilterRoast('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                filterRoast === 'all'
                  ? 'bg-[#FAF7F2] text-[#2C2420] shadow-sm font-semibold'
                  : 'text-[#6B5E55] hover:text-[#2C2420]'
              }`}
            >
              全部風味 ({COFFEE_BEANS.length})
            </button>
            <button
              onClick={() => setFilterRoast('light')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                filterRoast === 'light'
                  ? 'bg-[#FAF7F2] text-[#2C2420] shadow-sm font-semibold'
                  : 'text-[#6B5E55] hover:text-[#2C2420]'
              }`}
            >
              淺焙 · 花果清新
            </button>
            <button
              onClick={() => setFilterRoast('medium')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                filterRoast === 'medium'
                  ? 'bg-[#FAF7F2] text-[#2C2420] shadow-sm font-semibold'
                  : 'text-[#6B5E55] hover:text-[#2C2420]'
              }`}
            >
              中焙 · 堅果太妃
            </button>
            <button
              onClick={() => setFilterRoast('dark')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                filterRoast === 'dark'
                  ? 'bg-[#FAF7F2] text-[#2C2420] shadow-sm font-semibold'
                  : 'text-[#6B5E55] hover:text-[#2C2420]'
              }`}
            >
              深焙 · 厚醇黑巧
            </button>
          </div>
        </div>

        {/* 3-column product grid with generous whitespace */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBeans.map((bean) => {
            const isFav = favorites.includes(bean.id);
            const choice = packagingChoice[bean.id] || 'whole';
            const priceDisplay =
              choice === 'drip' ? bean.dripBagPrice * 10 : bean.price200g;

            return (
              <div
                key={bean.id}
                className="bg-[#FFFFFF] border border-[#EBE4DA] rounded-2xl overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col group"
              >
                {/* Visual Header */}
                <div className="relative aspect-[4/3] bg-[#EFE9DF] overflow-hidden">
                  <img
                    src={bean.image}
                    alt={bean.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  {/* Subtle Top Tags */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="text-[11px] font-semibold text-[#FAF7F2] bg-[#2C2420]/80 backdrop-blur-xs px-2.5 py-1 rounded-md">
                      {bean.roastLevel}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(bean.id);
                      }}
                      className="pointer-events-auto p-1.5 rounded-full bg-white/85 text-[#2C2420] hover:bg-white hover:text-red-600 transition-colors cursor-pointer shadow-xs"
                      title={isFav ? '取消收藏' : '加入收藏'}
                    >
                      <Heart
                        className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`}
                      />
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Quiet Unboxed Metadata: Origin / Process */}
                    <div className="flex items-center gap-1.5 text-xs text-[#8A796B] mb-1.5">
                      <span>{bean.origin}</span>
                      <span aria-hidden="true">·</span>
                      <span>{bean.process}</span>
                      <span aria-hidden="true">·</span>
                      <span>{bean.altitude}</span>
                    </div>

                    {/* Product Name */}
                    <h3 className="font-display text-lg font-bold text-[#2C2420] leading-snug group-hover:text-[#C47D42] transition-colors">
                      {bean.name}
                    </h3>

                    {/* Flavor Notes with unboxed dividers */}
                    <div className="flex flex-wrap items-center gap-1 text-xs text-[#6B5E55] mt-2.5 font-medium">
                      {bean.flavorNotes.map((note, index) => (
                        <React.Fragment key={note}>
                          <span>{note}</span>
                          {index < bean.flavorNotes.length - 1 && (
                            <span className="text-[#C8BCB0]" aria-hidden="true">
                              ·
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    <p className="text-xs text-[#615248] line-clamp-2 mt-3 leading-relaxed">
                      {bean.description}
                    </p>
                  </div>

                  {/* Packaging Option Selector */}
                  <div className="pt-2 border-t border-[#F2ECE3] space-y-3">
                    <div className="flex items-center gap-1.5 text-xs text-[#6B5E55]">
                      <span className="text-[#8A796B]">研磨包裝：</span>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() =>
                            setPackagingChoice((prev) => ({ ...prev, [bean.id]: 'whole' }))
                          }
                          className={`px-2 py-0.5 rounded text-[11px] cursor-pointer transition-colors ${
                            choice === 'whole'
                              ? 'bg-[#2C2420] text-white'
                              : 'bg-[#F2ECE3] text-[#6B5E55] hover:text-[#2C2420]'
                          }`}
                        >
                          全豆
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setPackagingChoice((prev) => ({ ...prev, [bean.id]: 'ground' }))
                          }
                          className={`px-2 py-0.5 rounded text-[11px] cursor-pointer transition-colors ${
                            choice === 'ground'
                              ? 'bg-[#2C2420] text-white'
                              : 'bg-[#F2ECE3] text-[#6B5E55] hover:text-[#2C2420]'
                          }`}
                        >
                          代磨
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setPackagingChoice((prev) => ({ ...prev, [bean.id]: 'drip' }))
                          }
                          className={`px-2 py-0.5 rounded text-[11px] cursor-pointer transition-colors ${
                            choice === 'drip'
                              ? 'bg-[#2C2420] text-white'
                              : 'bg-[#F2ECE3] text-[#6B5E55] hover:text-[#2C2420]'
                          }`}
                        >
                          濾掛10入
                        </button>
                      </div>
                    </div>

                    {/* Price and Action Buttons */}
                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <span className="text-xs text-[#8A796B]">NT$ </span>
                        <span className="font-display text-xl font-bold text-[#2C2420] tabular-nums">
                          {priceDisplay}
                        </span>
                        <span className="text-[11px] text-[#8A796B] ml-1">
                          {choice === 'drip' ? '/ 盒' : '/ 半磅200g'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedBeanForDetail(bean)}
                          aria-label={`查看 ${bean.name} 詳細杯測卡`}
                          className="p-2 text-[#8A796B] hover:text-[#2C2420] hover:bg-[#F5EFE6] rounded-lg transition-colors cursor-pointer"
                          title="查看完整杯測卡"
                        >
                          <Info className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleAdd(bean)}
                          className={`px-3.5 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                            addedNotice === bean.id
                              ? 'bg-emerald-700 text-white'
                              : 'bg-[#2C2420] hover:bg-[#433832] text-white'
                          }`}
                        >
                          {addedNotice === bean.id ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>已加入</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>選購加入</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Cupping Modal */}
        {selectedBeanForDetail && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[#FAF7F2] border border-[#E3DACD] rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedBeanForDetail(null)}
                className="absolute top-5 right-5 text-lg font-bold text-[#8A796B] hover:text-[#2C2420] cursor-pointer"
              >
                ✕
              </button>

              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#C47D42] mb-1">
                  <span>莊園杯測認證報告</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedBeanForDetail.roastLevel}</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-[#2C2420]">
                  {selectedBeanForDetail.name}
                </h3>
                <p className="text-xs text-[#8A796B] mt-1">
                  產區：{selectedBeanForDetail.subRegion} · 莊園主：{selectedBeanForDetail.producer}
                </p>
              </div>

              {/* Flavor Radar / Scales */}
              <div className="bg-[#F5EFE6] p-4 rounded-xl space-y-2.5 border border-[#E8DFD3] text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#6B5E55]">明亮酸度 (Acidity)</span>
                  <span className="font-mono font-bold text-[#2C2420] tabular-nums">
                    {selectedBeanForDetail.acidity} / 5.0
                  </span>
                </div>
                <div className="w-full bg-[#E5DDD0] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#C47D42] h-full rounded-full"
                    style={{ width: `${(selectedBeanForDetail.acidity / 5) * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[#6B5E55]">甘甜感 (Sweetness)</span>
                  <span className="font-mono font-bold text-[#2C2420] tabular-nums">
                    {selectedBeanForDetail.sweetness} / 5.0
                  </span>
                </div>
                <div className="w-full bg-[#E5DDD0] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#C47D42] h-full rounded-full"
                    style={{ width: `${(selectedBeanForDetail.sweetness / 5) * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[#6B5E55]">醇厚度 (Body & Texture)</span>
                  <span className="font-mono font-bold text-[#2C2420] tabular-nums">
                    {selectedBeanForDetail.body} / 5.0
                  </span>
                </div>
                <div className="w-full bg-[#E5DDD0] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#C47D42] h-full rounded-full"
                    style={{ width: `${(selectedBeanForDetail.body / 5) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8A796B] mb-1.5">
                  推薦手沖參數建議 (Brewing Guide)
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs text-[#2C2420] bg-white p-3.5 rounded-xl border border-[#EBE4DA]">
                  <div>
                    <span className="text-[#8A796B] block">粉水比：</span>
                    <span className="font-semibold">{selectedBeanForDetail.brewingNotes.ratio}</span>
                  </div>
                  <div>
                    <span className="text-[#8A796B] block">建議水溫：</span>
                    <span className="font-semibold">{selectedBeanForDetail.brewingNotes.temp}</span>
                  </div>
                  <div>
                    <span className="text-[#8A796B] block">建議萃取時間：</span>
                    <span className="font-semibold">{selectedBeanForDetail.brewingNotes.time}</span>
                  </div>
                  <div>
                    <span className="text-[#8A796B] block">研磨粗細度：</span>
                    <span className="font-semibold">{selectedBeanForDetail.brewingNotes.grind}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#EBE4DA]">
                <div>
                  <span className="text-xs text-[#8A796B]">200g 半磅售價</span>
                  <div className="font-display text-xl font-bold text-[#2C2420] tabular-nums">
                    NT$ {selectedBeanForDetail.price200g}
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleAdd(selectedBeanForDetail);
                    setSelectedBeanForDetail(null);
                  }}
                  className="px-5 py-2.5 bg-[#2C2420] text-white text-xs font-medium rounded-lg hover:bg-[#433832] transition-colors cursor-pointer"
                >
                  加入購物袋
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
