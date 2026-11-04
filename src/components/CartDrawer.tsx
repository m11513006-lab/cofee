import React, { useState } from 'react';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Check, Tag } from 'lucide-react';
import { CartItem, MemberUser, OrderRecord } from '../data/coffeeData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  currentUser: MemberUser | null;
  onOpenAuth: () => void;
  onOrderCompleted: (order: OrderRecord) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currentUser,
  onOpenAuth,
  onOrderCompleted
}) => {
  const [diningType, setDiningType] = useState<'外帶自取' | '內用' | '熟豆宅配'>('外帶自取');
  const [customerName, setCustomerName] = useState<string>(currentUser ? currentUser.name : '');
  const [customerPhone, setCustomerPhone] = useState<string>(currentUser ? currentUser.phone : '');
  const [pickupTime, setPickupTime] = useState<string>('儘速準備 (約15-20分鐘)');
  const [tableNumber, setTableNumber] = useState<string>('');
  const [shippingAddress, setShippingAddress] = useState<string>('');
  const [note, setNote] = useState<string>('');

  // Promo code
  const [promoInput, setPromoInput] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoMsg, setPromoMsg] = useState<string>('');

  // Confirmation view
  const [completedOrder, setCompletedOrder] = useState<OrderRecord | null>(null);

  if (!isOpen) return null;

  const rawSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const shippingFee = diningType === '熟豆宅配' && rawSubtotal < 1000 && rawSubtotal > 0 ? 80 : 0;
  const finalTotal = Math.max(0, rawSubtotal - appliedDiscount + shippingFee);

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (code === 'YUSEN100' && rawSubtotal >= 500) {
      setAppliedDiscount(100);
      setPromoMsg('已成功折抵 NT$ 100！');
    } else if (code === 'NEWBIE50') {
      setAppliedDiscount(50);
      setPromoMsg('已折抵新會員禮金 NT$ 50！');
    } else {
      setPromoMsg('優惠碼無效或未達消費門檻 (YUSEN100 需滿500)');
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const orderId = `YS-${new Date().getFullYear()}${(new Date().getMonth() + 1).toString().padStart(2, '0')}${new Date().getDate().toString().padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: OrderRecord = {
      orderId,
      date: new Date().toLocaleString('zh-TW', { hour12: false }),
      items: cart.map((c) => ({
        name: c.name,
        option: c.option,
        quantity: c.quantity,
        price: c.unitPrice
      })),
      total: finalTotal,
      status: '準備中',
      diningType,
      pickupTime: diningType === '外帶自取' ? pickupTime : diningType === '內用' ? `桌號 ${tableNumber || '吧台'}` : '宅配中'
    };

    onOrderCompleted(newOrder);
    setCompletedOrder(newOrder);
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between border-l border-[#E5DDD0]">
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#EBE4DA] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#2C2420]" />
            <h3 className="font-display text-xl font-bold text-[#2C2420]">
              我的點餐與選品袋
            </h3>
            <span className="text-xs text-[#8A796B] font-mono tabular-nums">
              ({cart.reduce((c, i) => c + i.quantity, 0)})
            </span>
          </div>
          <button
            onClick={() => {
              setCompletedOrder(null);
              onClose();
            }}
            className="text-xl font-bold text-[#8A796B] hover:text-[#2C2420] cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Order Completed Confirmation View */}
        {completedOrder ? (
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            <div className="text-center py-6 space-y-3">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h4 className="font-display text-2xl font-bold text-[#2C2420]">
                訂單已成功送出！
              </h4>
              <p className="text-xs text-[#615248]">
                取餐編號：<strong className="font-mono text-base text-[#2C2420]">{completedOrder.orderId}</strong>
              </p>
              <p className="text-xs text-[#8A796B]">
                {completedOrder.diningType === '外帶自取'
                  ? `預估取餐時間：${completedOrder.pickupTime}，請憑編號至門市出杯台領取。`
                  : completedOrder.diningType === '內用'
                  ? `吧台咖啡師已收到點單，現點手沖即將為您送上席位。`
                  : '熟豆烘焙後將於 48 小時內新鮮包裝寄出。'}
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#EBE4DA] space-y-3 text-xs">
              <div className="font-bold text-[#2C2420] border-b border-[#F2ECE3] pb-2">
                訂單明細清單
              </div>
              {completedOrder.items.map((it, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>
                    {it.name} <span className="text-[#8A796B]">({it.option})</span> × {it.quantity}
                  </span>
                  <span className="font-semibold tabular-nums">NT$ {it.price * it.quantity}</span>
                </div>
              ))}
              <div className="flex justify-between pt-2 border-t border-[#F2ECE3] font-bold text-[#2C2420]">
                <span>結帳實付金額</span>
                <span className="tabular-nums">NT$ {completedOrder.total}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setCompletedOrder(null);
                onClose();
              }}
              className="w-full py-3 bg-[#2C2420] text-white text-xs font-semibold rounded-xl hover:bg-[#433832] transition-colors cursor-pointer"
            >
              返回繼續瀏覽咖啡館
            </button>
          </div>
        ) : cart.length === 0 ? (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#EFE9DF] text-[#8A796B] flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-display text-lg font-bold text-[#2C2420]">
                您的購物袋目前是空的
              </h4>
              <p className="text-xs text-[#8A796B] mt-1 max-w-xs">
                前往探索我們的當季高海拔精品單品豆，或是挑選一份現作的裸麥酸種輕食與私房甜點。
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-[#2C2420] text-white text-xs font-medium rounded-lg hover:bg-[#433832] transition-colors cursor-pointer"
            >
              開始探索商品
            </button>
          </div>
        ) : (
          /* Cart List & Checkout Form */
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Dining Type Selector */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#8A796B] block mb-2">
                請選擇點餐取用方式
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setDiningType('外帶自取')}
                  className={`py-2 rounded-lg border font-medium transition-colors cursor-pointer ${
                    diningType === '外帶自取'
                      ? 'bg-[#2C2420] text-white border-[#2C2420]'
                      : 'bg-white text-[#6B5E55] border-[#E0D7CA] hover:border-[#C47D42]'
                  }`}
                >
                  外帶自取
                </button>
                <button
                  type="button"
                  onClick={() => setDiningType('內用')}
                  className={`py-2 rounded-lg border font-medium transition-colors cursor-pointer ${
                    diningType === '內用'
                      ? 'bg-[#2C2420] text-white border-[#2C2420]'
                      : 'bg-white text-[#6B5E55] border-[#E0D7CA] hover:border-[#C47D42]'
                  }`}
                >
                  門市內用
                </button>
                <button
                  type="button"
                  onClick={() => setDiningType('熟豆宅配')}
                  className={`py-2 rounded-lg border font-medium transition-colors cursor-pointer ${
                    diningType === '熟豆宅配'
                      ? 'bg-[#2C2420] text-white border-[#2C2420]'
                      : 'bg-white text-[#6B5E55] border-[#E0D7CA] hover:border-[#C47D42]'
                  }`}
                >
                  咖啡豆宅配
                </button>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#8A796B] block">
                已選品項
              </label>
              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-3.5 bg-white rounded-xl border border-[#E8E1D5] flex gap-3 text-xs"
                >
                  <div className="w-14 h-14 rounded-lg bg-[#EFE9DF] overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="font-bold text-[#2C2420] line-clamp-1">{item.name}</h5>
                        <button
                          onClick={() => onRemoveItem(item.cartItemId)}
                          className="text-[#8A796B] hover:text-red-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#8A796B] mt-0.5">{item.option}</p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center border border-[#E0D7CA] rounded-md">
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                          className="p-1 hover:bg-[#F5EFE6] text-[#6B5E55] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-mono tabular-nums text-xs">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                          className="p-1 hover:bg-[#F5EFE6] text-[#6B5E55] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-bold text-[#2C2420] tabular-nums">
                        NT$ {item.unitPrice * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Input */}
            <div className="p-3.5 bg-white rounded-xl border border-[#E8E1D5] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[#6B5E55] flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-[#C47D42]" />
                  <span>專屬優惠碼</span>
                </span>
                <span className="text-[10px] text-[#8A796B]">試試：YUSEN100 或 NEWBIE50</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="輸入優惠代碼"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="flex-1 px-3 py-1.5 border border-[#E0D7CA] rounded-lg text-xs uppercase focus:outline-hidden focus:border-[#C47D42]"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-3 py-1.5 bg-[#2C2420] text-white text-xs rounded-lg hover:bg-[#433832] transition-colors cursor-pointer"
                >
                  套用
                </button>
              </div>
              {promoMsg && (
                <p
                  className={`text-[11px] ${appliedDiscount > 0 ? 'text-emerald-700' : 'text-red-600'}`}
                >
                  {promoMsg}
                </p>
              )}
            </div>

            {/* Order Details Form */}
            <form onSubmit={handleSubmitOrder} className="space-y-3 text-xs">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#8A796B] block">
                訂購取餐資訊
              </label>

              <div>
                <input
                  type="text"
                  required
                  placeholder="訂購人姓名 *"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E0D7CA] rounded-lg focus:outline-hidden focus:border-[#C47D42]"
                />
              </div>

              <div>
                <input
                  type="tel"
                  required
                  placeholder="聯絡手機 (出餐簡訊通知) *"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E0D7CA] rounded-lg focus:outline-hidden focus:border-[#C47D42]"
                />
              </div>

              {diningType === '外帶自取' && (
                <div>
                  <select
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E0D7CA] rounded-lg focus:outline-hidden focus:border-[#C47D42]"
                  >
                    <option value="儘速準備 (約15-20分鐘)">儘速自取 (約15-20分鐘)</option>
                    <option value="30分鐘後自取">30分鐘後自取</option>
                    <option value="1小時後自取">1小時後自取</option>
                    <option value="今日傍晚 17:30 - 18:00">今日傍晚 17:30 - 18:00</option>
                  </select>
                </div>
              )}

              {diningType === '內用' && (
                <div>
                  <input
                    type="text"
                    placeholder="內用桌號 (例如：A3 桌，若尚未入座可填寫「吧台」)"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E0D7CA] rounded-lg focus:outline-hidden focus:border-[#C47D42]"
                  />
                </div>
              )}

              {diningType === '熟豆宅配' && (
                <div>
                  <input
                    type="text"
                    required
                    placeholder="宅配收件地址 *"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E0D7CA] rounded-lg focus:outline-hidden focus:border-[#C47D42]"
                  />
                  <p className="text-[10px] text-[#8A796B] mt-1">
                    全館單品豆消費滿 NT$ 1,000 免運費（未達收 NT$ 80）。
                  </p>
                </div>
              )}

              <div>
                <input
                  type="text"
                  placeholder="備註需求 (如：水波蛋全熟、冰咖啡少冰、請附提袋)"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E0D7CA] rounded-lg focus:outline-hidden focus:border-[#C47D42]"
                />
              </div>

              {!currentUser && (
                <div className="p-3 bg-[#F5EFE6] rounded-lg text-[11px] text-[#615248] flex items-center justify-between">
                  <span>登入會員可累積手沖集點卡印章</span>
                  <button
                    type="button"
                    onClick={onOpenAuth}
                    className="text-[#C47D42] font-semibold hover:underline cursor-pointer"
                  >
                    立即登入
                  </button>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="pt-3 border-t border-[#EBE4DA] space-y-1.5 text-xs text-[#6B5E55]">
                <div className="flex justify-between">
                  <span>品項小計</span>
                  <span className="tabular-nums font-mono">NT$ {rawSubtotal}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>優惠代碼折扣</span>
                    <span className="tabular-nums font-mono">- NT$ {appliedDiscount}</span>
                  </div>
                )}
                {diningType === '熟豆宅配' && (
                  <div className="flex justify-between">
                    <span>低溫熟豆運費</span>
                    <span className="tabular-nums font-mono">
                      {shippingFee === 0 ? '免運費' : `NT$ ${shippingFee}`}
                    </span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-[#EBE4DA] text-base font-bold text-[#2C2420]">
                  <span>應付總額</span>
                  <span className="tabular-nums font-display text-xl text-[#C47D42]">
                    NT$ {finalTotal}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 bg-[#2C2420] text-white text-xs font-bold rounded-xl hover:bg-[#433832] transition-colors cursor-pointer flex items-center justify-center gap-2 mt-4"
              >
                <span>確認送出訂單</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
