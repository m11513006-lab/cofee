import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, RotateCcw, Coffee, Utensils } from 'lucide-react';
import { COFFEE_BEANS, FOOD_MENU, CoffeeBean, FoodItem, CartItem } from '../data/coffeeData';

interface FlavorQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: Omit<CartItem, 'cartItemId'>) => void;
}

export const FlavorQuizModal: React.FC<FlavorQuizModalProps> = ({
  isOpen,
  onClose,
  onAddToCart
}) => {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<{
    acidity: 'high' | 'medium' | 'low';
    scene: 'morning' | 'afternoon' | 'evening';
    aroma: 'floral' | 'sweet' | 'nutty' | 'dark';
    brew: 'pourover' | 'americano' | 'latte';
  }>({
    acidity: 'high',
    scene: 'morning',
    aroma: 'floral',
    brew: 'pourover'
  });

  const [matchedBean, setMatchedBean] = useState<CoffeeBean | null>(null);
  const [matchedFood, setMatchedFood] = useState<FoodItem | null>(null);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCalculate = () => {
    // Recommendation logic based on answers
    let bean: CoffeeBean;
    let food: FoodItem;

    if (answers.acidity === 'high' || answers.aroma === 'floral') {
      bean = COFFEE_BEANS.find((b) => b.id === 'bean-geisha-panama') || COFFEE_BEANS[0];
      food = FOOD_MENU.find((f) => f.id === 'food-lemon-tart') || FOOD_MENU[0];
    } else if (answers.acidity === 'low' || answers.brew === 'latte' || answers.aroma === 'dark') {
      bean = COFFEE_BEANS.find((b) => b.id === 'bean-house-blend-dark') || COFFEE_BEANS[5];
      food = FOOD_MENU.find((f) => f.id === 'food-cinnamon-roll') || FOOD_MENU[2];
    } else {
      bean = COFFEE_BEANS.find((b) => b.id === 'bean-guatemala-floran') || COFFEE_BEANS[4];
      food = FOOD_MENU.find((f) => f.id === 'food-basque-cheesecake') || FOOD_MENU[3];
    }

    setMatchedBean(bean);
    setMatchedFood(food);
    setIsCalculated(true);
  };

  const handleReset = () => {
    setStep(1);
    setIsCalculated(false);
    setMatchedBean(null);
    setMatchedFood(null);
    setAddedSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF7F2] border border-[#E3DACD] rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-xl font-bold text-[#8A796B] hover:text-[#2C2420] cursor-pointer"
        >
          ✕
        </button>

        {!isCalculated ? (
          <div className="space-y-6">
            <div className="border-b border-[#EBE4DA] pb-4">
              <div className="flex items-center gap-2 text-xs font-medium text-[#C47D42] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Specialty Coffee Taste Matcher</span>
                <span aria-hidden="true">·</span>
                <span>第 {step} / 4 題</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-[#2C2420]">
                嶼森尋豆師：探索專屬命定咖啡
              </h3>
              <p className="text-xs text-[#8A796B] mt-1">
                簡單四個生活喜好問題，即時為你推薦最契合你舌尖的咖啡豆與絕配甜點。
              </p>
            </div>

            {/* Question 1: Acidity Preference */}
            {step === 1 && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-[#2C2420]">
                  Q1. 平時品嚐咖啡時，你對「果酸」的感受與喜好是？
                </h4>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setAnswers((prev) => ({ ...prev, acidity: 'high' }));
                      setStep(2);
                    }}
                    className="w-full text-left p-3.5 rounded-xl border border-[#E0D7CA] hover:border-[#C47D42] bg-white transition-colors cursor-pointer text-xs"
                  >
                    <span className="font-bold text-[#2C2420] block">喜歡果酸明亮、水蜜桃多汁感</span>
                    <span className="text-[#8A796B] block mt-0.5">如柑橘花果茶般清透甘甜，追求豐富果酸層次。</span>
                  </button>
                  <button
                    onClick={() => {
                      setAnswers((prev) => ({ ...prev, acidity: 'medium' }));
                      setStep(2);
                    }}
                    className="w-full text-left p-3.5 rounded-xl border border-[#E0D7CA] hover:border-[#C47D42] bg-white transition-colors cursor-pointer text-xs"
                  >
                    <span className="font-bold text-[#2C2420] block">偏好溫和平衡、甘甜圓潤</span>
                    <span className="text-[#8A796B] block mt-0.5">有如烤杏仁與焦糖香，酸甜適中，溫柔滑順。</span>
                  </button>
                  <button
                    onClick={() => {
                      setAnswers((prev) => ({ ...prev, acidity: 'low' }));
                      setStep(2);
                    }}
                    className="w-full text-left p-3.5 rounded-xl border border-[#E0D7CA] hover:border-[#C47D42] bg-white transition-colors cursor-pointer text-xs"
                  >
                    <span className="font-bold text-[#2C2420] block">不喜歡酸味，追求濃郁厚醇回甘</span>
                    <span className="text-[#8A796B] block mt-0.5">偏好黑巧克力苦甜與深邃沉木香，油脂感飽滿。</span>
                  </button>
                </div>
              </div>
            )}

            {/* Question 2: Occasion */}
            {step === 2 && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-[#2C2420]">
                  Q2. 你通常在什麼情境下最渴望一杯好咖啡？
                </h4>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setAnswers((prev) => ({ ...prev, scene: 'morning' }));
                      setStep(3);
                    }}
                    className="w-full text-left p-3.5 rounded-xl border border-[#E0D7CA] hover:border-[#C47D42] bg-white transition-colors cursor-pointer text-xs"
                  >
                    <span className="font-bold text-[#2C2420] block">晨曦初醒，需要清爽明亮的甦醒儀式</span>
                    <span className="text-[#8A796B] block mt-0.5">伴隨晨光，喚醒思緒與感官。</span>
                  </button>
                  <button
                    onClick={() => {
                      setAnswers((prev) => ({ ...prev, scene: 'afternoon' }));
                      setStep(3);
                    }}
                    className="w-full text-left p-3.5 rounded-xl border border-[#E0D7CA] hover:border-[#C47D42] bg-white transition-colors cursor-pointer text-xs"
                  >
                    <span className="font-bold text-[#2C2420] block">悠閒午後，想要搭配肉桂捲或焦糖甜點</span>
                    <span className="text-[#8A796B] block mt-0.5">甜點與咖啡交融的甜蜜療癒時光。</span>
                  </button>
                  <button
                    onClick={() => {
                      setAnswers((prev) => ({ ...prev, scene: 'evening' }));
                      setStep(3);
                    }}
                    className="w-full text-left p-3.5 rounded-xl border border-[#E0D7CA] hover:border-[#C47D42] bg-white transition-colors cursor-pointer text-xs"
                  >
                    <span className="font-bold text-[#2C2420] block">專注工作與閱讀，需要溫暖沉靜的相伴</span>
                    <span className="text-[#8A796B] block mt-0.5">安靜舒心、回甘悠長的溫潤風味。</span>
                  </button>
                </div>
              </div>
            )}

            {/* Question 3: Aroma Preference */}
            {step === 3 && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-[#2C2420]">
                  Q3. 以下哪組香氣意象最能打動你？
                </h4>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setAnswers((prev) => ({ ...prev, aroma: 'floral' }));
                      setStep(4);
                    }}
                    className="w-full text-left p-3.5 rounded-xl border border-[#E0D7CA] hover:border-[#C47D42] bg-white transition-colors cursor-pointer text-xs"
                  >
                    <span className="font-bold text-[#2C2420] block">茉莉花香、水蜜桃、大吉嶺紅茶</span>
                    <span className="text-[#8A796B] block mt-0.5">如初春花園與香水般的纖細芬芳。</span>
                  </button>
                  <button
                    onClick={() => {
                      setAnswers((prev) => ({ ...prev, aroma: 'sweet' }));
                      setStep(4);
                    }}
                    className="w-full text-left p-3.5 rounded-xl border border-[#E0D7CA] hover:border-[#C47D42] bg-white transition-colors cursor-pointer text-xs"
                  >
                    <span className="font-bold text-[#2C2420] block">黑醋栗果乾、熟莓果、蜂蜜焦糖</span>
                    <span className="text-[#8A796B] block mt-0.5">飽滿的發酵果香與扎實甘甜感。</span>
                  </button>
                  <button
                    onClick={() => {
                      setAnswers((prev) => ({ ...prev, aroma: 'dark' }));
                      setStep(4);
                    }}
                    className="w-full text-left p-3.5 rounded-xl border border-[#E0D7CA] hover:border-[#C47D42] bg-white transition-colors cursor-pointer text-xs"
                  >
                    <span className="font-bold text-[#2C2420] block">烤堅果、黑巧克力、香草與沉木</span>
                    <span className="text-[#8A796B] block mt-0.5">低調奢華、深邃厚重的古典尾韻。</span>
                  </button>
                </div>
              </div>
            )}

            {/* Question 4: Brewing Preference */}
            {step === 4 && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-[#2C2420]">
                  Q4. 你最習慣或偏好的萃取品飲方式是？
                </h4>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setAnswers((prev) => ({ ...prev, brew: 'pourover' }));
                      handleCalculate();
                    }}
                    className="w-full text-left p-3.5 rounded-xl border border-[#E0D7CA] hover:border-[#C47D42] bg-white transition-colors cursor-pointer text-xs"
                  >
                    <span className="font-bold text-[#2C2420] block">手沖黑咖啡 (Pour Over V60)</span>
                    <span className="text-[#8A796B] block mt-0.5">品味乾淨細緻的花果風土與層次。</span>
                  </button>
                  <button
                    onClick={() => {
                      setAnswers((prev) => ({ ...prev, brew: 'americano' }));
                      handleCalculate();
                    }}
                    className="w-full text-left p-3.5 rounded-xl border border-[#E0D7CA] hover:border-[#C47D42] bg-white transition-colors cursor-pointer text-xs"
                  >
                    <span className="font-bold text-[#2C2420] block">經典黑咖啡 / 冰美式 (Americano)</span>
                    <span className="text-[#8A796B] block mt-0.5">爽快乾脆，風味飽滿醒腦。</span>
                  </button>
                  <button
                    onClick={() => {
                      setAnswers((prev) => ({ ...prev, brew: 'latte' }));
                      handleCalculate();
                    }}
                    className="w-full text-left p-3.5 rounded-xl border border-[#E0D7CA] hover:border-[#C47D42] bg-white transition-colors cursor-pointer text-xs"
                  >
                    <span className="font-bold text-[#2C2420] block">拿鐵 / 馥芮白 / 燕麥奶特調 (Latte & Milk)</span>
                    <span className="text-[#8A796B] block mt-0.5">熱愛綿密奶泡與濃縮咖啡交織的絲滑滋味。</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step navigation indicator */}
            <div className="flex items-center justify-between text-xs text-[#8A796B] pt-2">
              {step > 1 ? (
                <button
                  onClick={() => setStep((prev) => Math.max(1, prev - 1))}
                  className="hover:text-[#2C2420] cursor-pointer"
                >
                  ← 返回上一題
                </button>
              ) : (
                <span />
              )}
              <span>步驟 {step} / 4</span>
            </div>
          </div>
        ) : (
          /* Result View */
          matchedBean && (
            <div className="space-y-6">
              <div className="border-b border-[#EBE4DA] pb-4">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C47D42] mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>尋豆師風味分析報告</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-[#2C2420]">
                  為你匹配的命定單品
                </h3>
              </div>

              {/* Recommended Bean Card */}
              <div className="p-4 bg-white rounded-xl border border-[#E0D7CA] space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg bg-[#EFE9DF] overflow-hidden shrink-0">
                    <img
                      src={matchedBean.image}
                      alt={matchedBean.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#8A796B]">{matchedBean.origin} · {matchedBean.roastLevel}</span>
                    <h4 className="font-display text-base font-bold text-[#2C2420]">
                      {matchedBean.name}
                    </h4>
                    <p className="text-xs text-[#C47D42] font-medium mt-0.5">
                      {matchedBean.flavorNotes.join(' · ')}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-[#615248] leading-relaxed">
                  {matchedBean.description}
                </p>
              </div>

              {/* Recommended Food Pairing Card */}
              {matchedFood && (
                <div className="p-3.5 bg-[#F5EFE6] rounded-xl border border-[#E8DFD3] flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <Utensils className="w-4 h-4 text-[#C47D42] shrink-0" />
                    <div>
                      <span className="text-[#8A796B] block">絕妙搭配手作餐點：</span>
                      <span className="font-semibold text-[#2C2420]">{matchedFood.name}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#2C2420] tabular-nums whitespace-nowrap">
                    NT$ {matchedFood.price}
                  </span>
                </div>
              )}

              {/* Actions */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  onClick={handleReset}
                  className="px-3 py-2 text-xs text-[#8A796B] hover:text-[#2C2420] flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>重新測驗</span>
                </button>

                <button
                  onClick={() => {
                    onAddToCart({
                      itemId: matchedBean.id,
                      name: matchedBean.name,
                      category: 'bean',
                      option: '200g 熟豆 (原豆不磨)',
                      unitPrice: matchedBean.price200g,
                      quantity: 1,
                      image: matchedBean.image
                    });
                    setAddedSuccess(true);
                  }}
                  className={`px-5 py-2.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                    addedSuccess
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#2C2420] hover:bg-[#433832] text-white'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>已加入購物袋</span>
                    </>
                  ) : (
                    <>
                      <Coffee className="w-3.5 h-3.5" />
                      <span>將推薦豆加入購物袋</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
