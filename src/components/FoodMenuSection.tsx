import React, { useState } from 'react';
import { Utensils, Check, Plus, Heart, Clock, Coffee } from 'lucide-react';
import { FOOD_MENU, FoodItem, CartItem } from '../data/coffeeData';

interface FoodMenuSectionProps {
  onAddToCart: (item: Omit<CartItem, 'cartItemId'>) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const FoodMenuSection: React.FC<FoodMenuSectionProps> = ({
  onAddToCart,
  favorites,
  onToggleFavorite
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'brunch' | 'dessert' | 'drinks'>('all');
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);

  const filteredItems = FOOD_MENU.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const handleAddItem = (item: FoodItem) => {
    onAddToCart({
      itemId: item.id,
      name: item.name,
      category: item.category === 'drinks' ? 'drink' : 'food',
      option: item.category === 'drinks' ? '冷飲 / 標準冰量' : '現烤手作',
      unitPrice: item.price,
      quantity: 1,
      image: item.image
    });

    setAddedItemNotice(item.id);
    setTimeout(() => {
      setAddedItemNotice((prev) => (prev === item.id ? null : prev));
    }, 2000);
  };

  return (
    <section id="menu" className="py-20 bg-[#F7F3EC] border-b border-[#E5DDD0]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#8A796B] mb-2">
              <span>Artisan Kitchen & Patisserie</span>
              <span aria-hidden="true">·</span>
              <span>晨光烘焙與私房甜點</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#2C2420] tracking-tight">
              咖啡館手作餐點與私房甜點
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#615248] max-w-2xl">
              料理與咖啡在舌尖的對話。每一道輕食與手作甜點皆經過烘焙師精密風味測試，讓天然酵母麥香、乳酪焦香與果酸在口中達到絕妙平衡。
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#E8E1D5] rounded-xl self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-[#FAF7F2] text-[#2C2420] shadow-sm font-semibold'
                  : 'text-[#6B5E55] hover:text-[#2C2420]'
              }`}
            >
              全部餐點 ({FOOD_MENU.length})
            </button>
            <button
              onClick={() => setSelectedCategory('brunch')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === 'brunch'
                  ? 'bg-[#FAF7F2] text-[#2C2420] shadow-sm font-semibold'
                  : 'text-[#6B5E55] hover:text-[#2C2420]'
              }`}
            >
              手作早午餐 & 裸麥酸種
            </button>
            <button
              onClick={() => setSelectedCategory('dessert')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === 'dessert'
                  ? 'bg-[#FAF7F2] text-[#2C2420] shadow-sm font-semibold'
                  : 'text-[#6B5E55] hover:text-[#2C2420]'
              }`}
            >
              私房常溫與冰心甜點
            </button>
            <button
              onClick={() => setSelectedCategory('drinks')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === 'drinks'
                  ? 'bg-[#FAF7F2] text-[#2C2420] shadow-sm font-semibold'
                  : 'text-[#6B5E55] hover:text-[#2C2420]'
              }`}
            >
              義式特調與冷萃
            </button>
          </div>
        </div>

        {/* Food Menu Grid: 2-column on tablet, 2 or 3 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredItems.map((item) => {
            const isFav = favorites.includes(item.id);

            return (
              <div
                key={item.id}
                className="bg-[#FFFFFF] border border-[#E8E1D5] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row group"
              >
                {/* Thumbnail Image */}
                <div className="sm:w-2/5 relative aspect-[4/3] sm:aspect-auto bg-[#EBE4DA] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                  <button
                    onClick={() => onToggleFavorite(item.id)}
                    className="absolute top-3 left-3 p-1.5 rounded-full bg-white/85 text-[#2C2420] hover:bg-white hover:text-red-600 transition-colors cursor-pointer shadow-xs"
                    title={isFav ? '取消收藏' : '加入收藏'}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${isFav ? 'fill-red-500 text-red-500' : ''}`}
                    />
                  </button>
                </div>

                {/* Content Area */}
                <div className="sm:w-3/5 p-6 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Quiet Unboxed Metadata */}
                    <div className="flex items-center gap-1.5 text-xs text-[#8A796B] mb-1">
                      <span>{item.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.dietary}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#8A796B]" />
                        <span>{item.prepTime}</span>
                      </span>
                    </div>

                    {/* Dish Name */}
                    <h3 className="font-display text-lg font-bold text-[#2C2420] group-hover:text-[#C47D42] transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#8A796B] italic mt-0.5">{item.nameEn}</p>

                    <p className="text-xs text-[#615248] mt-2.5 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>

                    {/* Coffee Pairing Suggestion Box */}
                    <div className="mt-3 p-2.5 rounded-lg bg-[#FAF7F2] border border-[#EBE4DA] text-xs text-[#52443C] flex items-start gap-2">
                      <Coffee className="w-3.5 h-3.5 text-[#C47D42] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-[#2C2420]">風味佐飲：</span>
                        <span className="ml-1 text-[#615248]">{item.coffeePairing}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Add to Order Bar */}
                  <div className="pt-3 border-t border-[#F2ECE3] flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#8A796B]">NT$ </span>
                      <span className="font-display text-xl font-bold text-[#2C2420] tabular-nums">
                        {item.price}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddItem(item)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                        addedItemNotice === item.id
                          ? 'bg-emerald-700 text-white'
                          : 'bg-[#2C2420] hover:bg-[#433832] text-white'
                      }`}
                    >
                      {addedItemNotice === item.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>已點入</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>點選加入</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
