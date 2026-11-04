import React, { useState } from 'react';
import { Mail, Check, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setNewsletterEmail('');
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#241C18] text-[#D4C8BC] pt-16 pb-12 border-t border-[#3A2F28]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#3A2F28]">
          {/* Brand & Manifesto */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-display text-2xl font-bold tracking-tight text-[#FAF7F2] block">
              嶼森珈琲
            </span>
            <p className="text-xs uppercase tracking-widest text-[#9C8C7E]">
              Yusen Specialty Coffee Roasters
            </p>
            <p className="text-xs text-[#B8ADA0] leading-relaxed max-w-sm">
              在城市一隅，以直火慢烘與細膩水流，還原世界高海拔咖啡產區的微氣候與純淨風味。提供手作輕食、私房甜點與自家烘焙精品單品豆。
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold tracking-wider text-[#FAF7F2] uppercase">
              網站導覽
            </h4>
            <ul className="space-y-2 text-xs text-[#B8ADA0]">
              <li>
                <a href="#varieties" className="hover:text-white transition-colors">
                  咖啡品種與處理法
                </a>
              </li>
              <li>
                <a href="#beans" className="hover:text-white transition-colors">
                  當季單品豆選品
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  手作輕食與私房甜點
                </a>
              </li>
              <li>
                <a href="#store" className="hover:text-white transition-colors">
                  門市交通與空間預約
                </a>
              </li>
            </ul>
          </div>

          {/* Business Hours & Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold tracking-wider text-[#FAF7F2] uppercase">
              營業與服務
            </h4>
            <div className="space-y-1.5 text-xs text-[#B8ADA0]">
              <p>平日：08:30 – 18:30</p>
              <p>週末與假日：09:00 – 19:30</p>
              <p className="text-[#8A796B]">每週二公休（直火烘焙日）</p>
              <p className="pt-2 text-white font-medium">門市電話：(02) 2368-9812</p>
              <p>台北市大安區溫州街 48 巷 12 號</p>
            </div>
          </div>

          {/* Newsletter for Coffee Notes */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold tracking-wider text-[#FAF7F2] uppercase">
              每週產區烘焙手札
            </h4>
            <p className="text-xs text-[#B8ADA0] leading-relaxed">
              訂閱嶼森風味刊物，搶先獲知本月競標微批次到貨與會員專屬優惠。
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="輸入您的 Email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-3 py-2 bg-[#1A1411] border border-[#433730] rounded-lg text-xs text-white placeholder-[#78695E] focus:outline-hidden focus:border-[#C47D42]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#C47D42] text-white text-xs font-medium rounded-lg hover:bg-[#9A5A28] transition-colors cursor-pointer shrink-0"
                >
                  {subscribed ? <Check className="w-4 h-4" /> : '訂閱'}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-400">
                  感謝訂閱！首發手沖風味指南已寄出。
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar: Quiet Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A796B] gap-4">
          <p>© {new Date().getFullYear()} 嶼森珈琲 YUSEN COFFEE ROASTERS. 保留所有權利。</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#B8ADA0] cursor-pointer">隱私權政策</span>
            <span className="hover:text-[#B8ADA0] cursor-pointer">食品安全宣言</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#B8ADA0] hover:text-white transition-colors cursor-pointer"
            >
              <span>回到頂部</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
