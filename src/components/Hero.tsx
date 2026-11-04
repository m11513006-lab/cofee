import React from 'react';
import { ArrowRight, Compass, Sparkles, Coffee } from 'lucide-react';

interface HeroProps {
  onOpenQuiz: () => void;
  onExploreBeans: () => void;
  onExploreFood: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuiz, onExploreBeans, onExploreFood }) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] border-b border-[#EBE4DA] pt-10 pb-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Brand Story & Call to Actions */}
          <div className="lg:col-span-6 space-y-6">
            {/* Quiet 1-line Text Kicker (No Pill Badges) */}
            <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#8A796B]">
              <span>自家直火慢烘</span>
              <span aria-hidden="true">·</span>
              <span>莊園小農直購</span>
              <span aria-hidden="true">·</span>
              <span>台北日常棲所</span>
            </div>

            {/* Main Headline with text-wrap: balance */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-[#2C2420] leading-[1.18] tracking-tight [text-wrap:balance]">
              以時間淬鍊的極致風味，在城市一隅品嚐風土故事。
            </h1>

            {/* Lead Narrative */}
            <p className="text-base sm:text-lg text-[#615248] leading-relaxed max-w-xl font-normal">
              嶼森珈琲從全球高海拔微批次莊園採集當季生豆，堅持淺中焙度保留純粹的花果香酸與甘美尾韻。搭配每日清晨新鮮手作裸麥酸種輕食與私房焦香甜點，為日常注入溫潤儀式感。
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreBeans}
                className="px-6 py-3.5 bg-[#2C2420] text-[#FAF7F2] text-sm font-medium rounded-lg hover:bg-[#433832] transition-colors flex items-center gap-2 cursor-pointer shadow-sm whitespace-nowrap"
              >
                <span>探索莊園單品豆</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreFood}
                className="px-6 py-3.5 bg-[#F0EAE1] text-[#2C2420] border border-[#DDD3C4] text-sm font-medium rounded-lg hover:bg-[#E7DFC5] transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>瀏覽手作餐點與甜點</span>
              </button>

              <button
                onClick={onOpenQuiz}
                className="px-4 py-3.5 text-[#C47D42] hover:text-[#9A5A28] text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4" />
                <span>尋豆測驗：找尋你的命定風味</span>
              </button>
            </div>

            {/* Trust Adjacency Proof Row */}
            <div className="pt-6 border-t border-[#EBE4DA] grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="font-display text-xl sm:text-2xl font-bold text-[#2C2420] tabular-nums">
                  100%
                </p>
                <p className="text-xs text-[#8A796B] mt-0.5">高海拔精品阿拉比卡</p>
              </div>
              <div>
                <p className="font-display text-xl sm:text-2xl font-bold text-[#2C2420] tabular-nums">
                  48<span className="text-sm font-normal text-[#8A796B]">hr</span>
                </p>
                <p className="text-xs text-[#8A796B] mt-0.5">直火新鮮烘焙出杯</p>
              </div>
              <div>
                <p className="font-display text-xl sm:text-2xl font-bold text-[#2C2420] tabular-nums">
                  8+
                </p>
                <p className="text-xs text-[#8A796B] mt-0.5">杯測師選拔世界產區</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#E0D7CA] shadow-lg aspect-[16/10] bg-[#EFE9DF]">
              <img
                src="/src/assets/images/hero_coffee_roastery_1793773966325.jpg"
                alt="嶼森珈琲咖啡師專注手沖精品咖啡"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6 sm:p-8">
                <div className="text-white space-y-1">
                  <p className="text-xs uppercase tracking-widest text-amber-200 font-medium">
                    職人注水工藝 · 慢活日常
                  </p>
                  <p className="font-display text-lg sm:text-xl font-medium leading-snug">
                    每一滴手沖萃取，都是大自然陽光、微氣候與烘焙者心意的凝結。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
