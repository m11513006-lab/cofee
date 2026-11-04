import React from 'react';
import { Coffee, Award, Star, Clock, LogOut, Heart, Gift, ShoppingBag } from 'lucide-react';
import { MemberUser, OrderRecord, DEMO_ORDERS, COFFEE_BEANS, FOOD_MENU } from '../data/coffeeData';

interface MemberProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: MemberUser;
  onLogout: () => void;
  userOrders: OrderRecord[];
}

export const MemberProfileModal: React.FC<MemberProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onLogout,
  userOrders
}) => {
  if (!isOpen) return null;

  const totalStamps = 8;
  const stampsArray = Array.from({ length: totalStamps });
  const displayOrders = userOrders.length > 0 ? userOrders : DEMO_ORDERS;

  // Resolve favorite names
  const favoriteItems = user.favorites.map((favId) => {
    const bean = COFFEE_BEANS.find((b) => b.id === favId);
    if (bean) return { id: bean.id, name: bean.name, type: '咖啡豆', price: bean.price200g };
    const food = FOOD_MENU.find((f) => f.id === favId);
    if (food) return { id: food.id, name: food.name, type: '餐點/甜點', price: food.price };
    return { id: favId, name: favId, type: '選品', price: 0 };
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF7F2] border border-[#E3DACD] rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-xl font-bold text-[#8A796B] hover:text-[#2C2420] cursor-pointer"
        >
          ✕
        </button>

        {/* Member Header Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#EBE4DA] gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-full bg-[#2C2420] text-amber-100 flex items-center justify-center font-display text-2xl font-bold shadow-xs">
              {user.name.slice(0, 1)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-2xl font-bold text-[#2C2420]">
                  {user.name}
                </h3>
                <span className="text-xs font-semibold text-[#C47D42] bg-[#F5EFE6] px-2.5 py-0.5 rounded-full border border-[#E5DDD0]">
                  {user.tier}
                </span>
              </div>
              <p className="text-xs text-[#8A796B] mt-0.5">
                {user.email} · 加入時間：{user.joinedDate}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="self-start sm:self-auto px-3 py-1.5 text-xs text-[#8A796B] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>登出帳號</span>
          </button>
        </div>

        {/* Loyalty Stamp Card (滿8杯手沖送1杯) */}
        <div className="p-5 sm:p-6 bg-[#2C2420] text-[#FAF7F2] rounded-2xl space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-300" />
              <div>
                <h4 className="font-display text-base font-bold text-white">
                  嶼森咖啡品飲集點卡
                </h4>
                <p className="text-[11px] text-[#B8ADA0]">
                  內用或外帶精品單品，每杯累積 1 印章 · 滿 8 點兌換 $200 內手沖咖啡
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono text-2xl font-bold text-amber-300 tabular-nums">
                {user.stamps}
              </span>
              <span className="text-xs text-[#B8ADA0] font-mono"> / 8</span>
            </div>
          </div>

          {/* 8 stamp slots */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 pt-2">
            {stampsArray.map((_, idx) => {
              const isStamped = idx < user.stamps;
              const isLast = idx === totalStamps - 1;

              return (
                <div
                  key={idx}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center p-2 border transition-all ${
                    isStamped
                      ? 'bg-amber-100 text-[#2C2420] border-amber-300 shadow-xs'
                      : 'bg-[#3A302A] text-[#8A796B] border-[#4A3E37]'
                  }`}
                >
                  {isStamped ? (
                    <Coffee className="w-5 h-5 text-[#C47D42]" />
                  ) : (
                    <span className="font-mono text-xs">{idx + 1}</span>
                  )}
                  <span className="text-[9px] mt-1 font-medium">
                    {isLast ? '免費杯' : `${idx + 1}點`}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs pt-1 text-[#B8ADA0] border-t border-[#433832]">
            <span>當前紅利點數：<strong className="text-white font-mono">{user.points} pt</strong></span>
            <span>偏好焙度：<span className="text-amber-200">{user.favoriteRoast}</span></span>
          </div>
        </div>

        {/* Member Perks & Tier Rights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 bg-white border border-[#E5DDD0] rounded-xl text-xs space-y-1">
            <span className="text-[#8A796B] block">目前等級禮遇</span>
            <span className="font-bold text-[#2C2420] text-sm block">{user.tier}</span>
            <p className="text-[11px] text-[#615248]">
              每週五享自選咖啡豆 9 折，每月免費獲贈杯測樣品豆 20g。
            </p>
          </div>

          <div className="p-3.5 bg-white border border-[#E5DDD0] rounded-xl text-xs space-y-1">
            <span className="text-[#8A796B] block">生日禮遇</span>
            <span className="font-bold text-[#2C2420] text-sm block">生日當月贈送私房甜點</span>
            <p className="text-[11px] text-[#615248]">
              憑券內用可免費任選焦糖布丁或巴斯克蛋糕乙份。
            </p>
          </div>

          <div className="p-3.5 bg-white border border-[#E5DDD0] rounded-xl text-xs space-y-1">
            <span className="text-[#8A796B] block">預約優先權</span>
            <span className="font-bold text-[#2C2420] text-sm block">吧台手沖席位免候位</span>
            <p className="text-[11px] text-[#615248]">
              享週末繁忙時段吧台手沖交流席位優先保留服務。
            </p>
          </div>
        </div>

        {/* Wishlist & Order History Tabs/Lists */}
        <div className="space-y-4 pt-2">
          {favoriteItems.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8A796B] mb-2 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-[#C47D42]" />
                <span>我的收藏品項 ({favoriteItems.length})</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {favoriteItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-white border border-[#EBE4DA] rounded-xl flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="text-[10px] text-[#8A796B]">{item.type}</span>
                      <p className="font-bold text-[#2C2420] truncate max-w-[180px]">{item.name}</p>
                    </div>
                    {item.price > 0 && (
                      <span className="font-bold text-[#2C2420] tabular-nums">NT$ {item.price}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8A796B] mb-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C47D42]" />
              <span>歷史訂單與點餐紀錄</span>
            </h4>
            <div className="space-y-2.5">
              {displayOrders.map((order) => (
                <div
                  key={order.orderId}
                  className="p-4 bg-white border border-[#EBE4DA] rounded-xl space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between border-b border-[#F2ECE3] pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#2C2420]">{order.orderId}</span>
                      <span className="text-[#8A796B]">{order.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-[#FAF7F2] rounded text-[11px] text-[#6B5E55]">
                        {order.diningType}
                      </span>
                      <span className="text-emerald-700 font-semibold text-[11px]">
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    {order.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between text-[#615248]">
                        <span>
                          {it.name} <span className="text-[#8A796B]">({it.option})</span> × {it.quantity}
                        </span>
                        <span className="tabular-nums font-medium text-[#2C2420]">
                          NT$ {it.price * it.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between pt-1 font-semibold text-[#2C2420] border-t border-[#F5EFE6]">
                    <span>訂單總金額</span>
                    <span className="tabular-nums">NT$ {order.total}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
