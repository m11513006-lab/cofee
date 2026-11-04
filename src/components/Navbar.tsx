import React from 'react';
import { ShoppingBag, User as UserIcon, Sparkles } from 'lucide-react';
import { MemberUser } from '../data/coffeeData';

interface NavbarProps {
  currentUser: MemberUser | null;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
  onOpenQuiz: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  cartCount,
  onOpenCart,
  onOpenAuth,
  onOpenProfile,
  onOpenQuiz
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#EBE4DA] transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display face) */}
        <a href="#" className="flex items-center gap-2 group whitespace-nowrap shrink-0">
          <span className="font-display text-2xl font-bold tracking-tight text-[#2C2420] group-hover:text-[#C47D42] transition-colors">
            嶼森珈琲
          </span>
          <span className="text-xs uppercase tracking-widest text-[#8A796B] font-medium hidden sm:inline">
            Yusen Coffee Roasters
          </span>
        </a>

        {/* Zone 2: 4–5 single-line nav links with subtle hover underlines */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#6B5E55]">
          <a
            href="#varieties"
            className="hover:text-[#2C2420] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#C47D42]"
          >
            咖啡品種與烘焙
          </a>
          <a
            href="#beans"
            className="hover:text-[#2C2420] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#C47D42]"
          >
            莊園單品豆
          </a>
          <a
            href="#menu"
            className="hover:text-[#2C2420] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#C47D42]"
          >
            手作餐點與甜點
          </a>
          <button
            onClick={onOpenQuiz}
            className="hover:text-[#2C2420] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#C47D42] flex items-center gap-1.5 cursor-pointer text-[#C47D42]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>尋豆師測驗</span>
          </button>
          <a
            href="#store"
            className="hover:text-[#2C2420] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#C47D42]"
          >
            門市與席位
          </a>
        </nav>

        {/* Zone 3: 1 primary action cluster */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Shopping Bag Trigger */}
          <button
            onClick={onOpenCart}
            aria-label="開啟購物車"
            className="relative p-2.5 rounded-full text-[#3D322B] hover:bg-[#EFE9DF] transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C47D42] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Member Authentication / Profile Trigger */}
          {currentUser ? (
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2 pl-2 pr-3.5 py-1.5 bg-[#EFE9DF] hover:bg-[#E5DDD0] text-[#2C2420] rounded-full text-xs font-medium transition-colors cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-[#C47D42] text-white flex items-center justify-center font-bold text-xs">
                {currentUser.name.slice(0, 1)}
              </div>
              <span className="whitespace-nowrap font-medium">{currentUser.name}</span>
              <span className="text-[10px] text-[#8A796B] hidden sm:inline">({currentUser.tier})</span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#2C2420] text-white text-xs font-medium rounded-full hover:bg-[#433832] transition-colors cursor-pointer whitespace-nowrap"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>會員註冊 / 登入</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
