import React, { useState } from 'react';
import { MapPin, Clock, Wifi, Zap, Heart, Calendar, Check, Users } from 'lucide-react';

export const StoreSection: React.FC = () => {
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);
  const [bookingName, setBookingName] = useState<string>('');
  const [bookingPhone, setBookingPhone] = useState<string>('');
  const [bookingDate, setBookingDate] = useState<string>('2026-11-05');
  const [bookingTime, setBookingTime] = useState<string>('14:00');
  const [bookingGuests, setBookingGuests] = useState<string>('2 位');
  const [seatType, setSeatType] = useState<string>('手沖吧台交流席 (可觀賞咖啡師沖煮)');
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setShowBookingModal(false);
      setBookingName('');
    }, 2500);
  };

  return (
    <section id="store" className="py-20 bg-[#FAF7F2] border-b border-[#EBE4DA]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Store Details & Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#8A796B]">
              <span>Architecture & Sanctuary</span>
              <span aria-hidden="true">·</span>
              <span>台北溫州街棲所</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#2C2420] tracking-tight">
              在木質溫潤的日光角落，給自己留一段手沖時光。
            </h2>

            <p className="text-sm sm:text-base text-[#615248] leading-relaxed">
              「嶼森珈琲」座落於台北溫州街靜巷，以灰泥抹牆、日本老檜木與亞麻布幔構築出靜謐的感官空間。店內設有開放式手沖吧台，咖啡師樂於在每一次注水時與你分享不同微批次莊園的風土故事。
            </p>

            {/* Practical Info List */}
            <div className="space-y-4 pt-2 text-xs sm:text-sm text-[#4A3E37]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C47D42] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2C2420] block">門市地址</strong>
                  <span className="text-[#615248]">台北市大安區溫州街 48 巷 12 號 (捷運台電大樓站 2 號出口步行 5 分鐘)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C47D42] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2C2420] block">營業時間</strong>
                  <span className="text-[#615248]">
                    平日 08:30 – 18:30 · 週末與例假日 09:00 – 19:30 (週二為自家生豆烘焙公休日)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Zap className="w-4 h-4 text-[#C47D42] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2C2420] block">店內設施與規範</strong>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-[#8A796B]">
                    <span>全席附設插座</span>
                    <span aria-hidden="true">·</span>
                    <span>高速光纖 Wi-Fi</span>
                    <span aria-hidden="true">·</span>
                    <span>寵物牽繩友善</span>
                    <span aria-hidden="true">·</span>
                    <span>無障礙平整入口</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking trigger CTA */}
            <div className="pt-2">
              <button
                onClick={() => setShowBookingModal(true)}
                className="px-6 py-3 bg-[#2C2420] text-white text-xs font-semibold rounded-lg hover:bg-[#433832] transition-colors cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>線上預約席位 / 手沖吧台位</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Atmosphere */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#E0D7CA] shadow-md aspect-[4/3] bg-[#EFE9DF]">
              <img
                src="/src/assets/images/hero_coffee_roastery_1793773966325.jpg"
                alt="嶼森珈琲店內光景"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <p className="font-display text-lg font-bold">歡迎來到我們的咖啡吧台</p>
                  <p className="text-xs text-amber-100">
                    不只是一杯咖啡，更是一段放慢步調、感受香氣的沉澱時刻。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reservation Modal */}
        {showBookingModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[#FAF7F2] border border-[#E3DACD] rounded-2xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
              <button
                onClick={() => setShowBookingModal(false)}
                className="absolute top-5 right-5 text-xl font-bold text-[#8A796B] hover:text-[#2C2420] cursor-pointer"
              >
                ✕
              </button>

              <div className="border-b border-[#EBE4DA] pb-4">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C47D42] mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Table & Bar Reservation</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-[#2C2420]">
                  預約門市席位
                </h3>
                <p className="text-xs text-[#8A796B] mt-1">
                  每時段座位保留 10 分鐘，我們將為您預先安排最適宜品飲的靜謐空間。
                </p>
              </div>

              {bookingSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <h4 className="font-display text-xl font-bold text-[#2C2420]">
                    預約席位已保留！
                  </h4>
                  <p className="text-xs text-[#615248]">
                    已為您預約 {bookingDate} {bookingTime}（{bookingGuests}），確認簡訊已傳送至手機。
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="text-xs font-medium text-[#6B5E55] block mb-1">
                      預約姓名 *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="請輸入姓名"
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#E0D7CA] rounded-xl focus:outline-hidden focus:border-[#C47D42]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#6B5E55] block mb-1">
                      聯絡電話 *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0912-345-678"
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#E0D7CA] rounded-xl focus:outline-hidden focus:border-[#C47D42]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-[#6B5E55] block mb-1">
                        預約日期
                      </label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#E0D7CA] rounded-xl focus:outline-hidden focus:border-[#C47D42]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-[#6B5E55] block mb-1">
                        預約時段
                      </label>
                      <select
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#E0D7CA] rounded-xl focus:outline-hidden focus:border-[#C47D42]"
                      >
                        <option value="10:00">10:00 晨光清涼時段</option>
                        <option value="11:30">11:30 早午餐時段</option>
                        <option value="14:00">14:00 經典午後手沖</option>
                        <option value="16:00">16:00 甜點時段</option>
                        <option value="17:30">17:30 傍晚放鬆時光</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-[#6B5E55] block mb-1">
                        預約人數
                      </label>
                      <select
                        value={bookingGuests}
                        onChange={(e) => setBookingGuests(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#E0D7CA] rounded-xl focus:outline-hidden focus:border-[#C47D42]"
                      >
                        <option value="1 位">1 位 (個人專注讀書席)</option>
                        <option value="2 位">2 位</option>
                        <option value="3-4 位">3 - 4 位 (方桌沙發區)</option>
                        <option value="5-6 位">5 - 6 位 (長木桌會議)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-[#6B5E55] block mb-1">
                        偏好區域
                      </label>
                      <select
                        value={seatType}
                        onChange={(e) => setSeatType(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#E0D7CA] rounded-xl focus:outline-hidden focus:border-[#C47D42]"
                      >
                        <option value="手沖吧台交流席">手沖吧台交流席</option>
                        <option value="靠窗日光席">靠窗日光席</option>
                        <option value="靜謐木桌區">靜謐木桌工作區</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#2C2420] text-white text-xs font-bold rounded-xl hover:bg-[#433832] transition-colors cursor-pointer mt-2"
                  >
                    確認預約並保留席位
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
