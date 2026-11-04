import React, { useState } from 'react';
import { User, Mail, Lock, Phone, Sparkles, Check, Gift } from 'lucide-react';
import { MemberUser, DEMO_USER } from '../data/coffeeData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: MemberUser) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState<'signup' | 'login'>('signup');

  // Form states
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [favoriteRoast, setFavoriteRoast] = useState<string>('淺焙花果香');
  const [errorMessage, setErrorMessage] = useState<string>('');

  if (!isOpen) return null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('請填寫姓名');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('請填寫有效的電子信箱');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage('密碼長度至少需 6 個字元');
      return;
    }

    const newUser: MemberUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || '0900-000-000',
      tier: '咖啡探索家',
      stamps: 1, // New member gets 1 welcome stamp!
      points: 100, // New member gets 100 welcome bonus points!
      favoriteRoast,
      favorites: [],
      joinedDate: new Date().toISOString().split('T')[0].replace(/-/g, '.')
    };

    // Save to localStorage
    try {
      localStorage.setItem('yusen_member_user', JSON.stringify(newUser));
    } catch (e) {
      console.error(e);
    }

    onLoginSuccess(newUser);
    onClose();
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMessage('請填寫帳號或電子信箱');
      return;
    }
    if (!password) {
      setErrorMessage('請輸入密碼');
      return;
    }

    // Check if there is saved user with this email
    let userToLogin = DEMO_USER;
    try {
      const saved = localStorage.getItem('yusen_member_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.email === email.trim()) {
          userToLogin = parsed;
        }
      }
    } catch (e) {
      console.error(e);
    }

    onLoginSuccess(userToLogin);
    onClose();
  };

  const handleQuickDemoLogin = () => {
    onLoginSuccess(DEMO_USER);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF7F2] border border-[#E3DACD] rounded-2xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[95vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-xl font-bold text-[#8A796B] hover:text-[#2C2420] cursor-pointer"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="border-b border-[#EBE4DA] pb-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C47D42] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Yusen Coffee Club</span>
          </div>
          <h3 className="font-display text-2xl font-bold text-[#2C2420]">
            {mode === 'signup' ? '註冊成為嶼森會員' : '會員登入'}
          </h3>
          <p className="text-xs text-[#8A796B] mt-1">
            {mode === 'signup'
              ? '註冊即享新會員禮：$50 咖啡折價券、首點集點印章與專屬品飲權益。'
              : '歡迎回到嶼森珈琲，查看您的品飲集點卡與訂單。'}
          </p>
        </div>

        {/* Tabs: Sign Up vs Login */}
        <div className="grid grid-cols-2 p-1 bg-[#E8E1D5] rounded-xl text-xs font-medium">
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMessage('');
            }}
            className={`py-2 rounded-lg transition-colors cursor-pointer ${
              mode === 'signup'
                ? 'bg-[#FAF7F2] text-[#2C2420] font-bold shadow-xs'
                : 'text-[#6B5E55] hover:text-[#2C2420]'
            }`}
          >
            新會員註冊
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMessage('');
            }}
            className={`py-2 rounded-lg transition-colors cursor-pointer ${
              mode === 'login'
                ? 'bg-[#FAF7F2] text-[#2C2420] font-bold shadow-xs'
                : 'text-[#6B5E55] hover:text-[#2C2420]'
            }`}
          >
            現有會員登入
          </button>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        {mode === 'signup' ? (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-[#6B5E55] block mb-1">
                會員姓名 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="例：林予安"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#E0D7CA] rounded-xl text-xs text-[#2C2420] focus:outline-hidden focus:border-[#C47D42]"
                />
                <User className="w-4 h-4 text-[#8A796B] absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-[#6B5E55] block mb-1">
                電子信箱 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#E0D7CA] rounded-xl text-xs text-[#2C2420] focus:outline-hidden focus:border-[#C47D42]"
                />
                <Mail className="w-4 h-4 text-[#8A796B] absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-[#6B5E55] block mb-1">
                手機號碼 (自取通知用)
              </label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="0912-345-678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#E0D7CA] rounded-xl text-xs text-[#2C2420] focus:outline-hidden focus:border-[#C47D42]"
                />
                <Phone className="w-4 h-4 text-[#8A796B] absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-[#6B5E55] block mb-1">
                設定登入密碼 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="至少 6 位密碼"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#E0D7CA] rounded-xl text-xs text-[#2C2420] focus:outline-hidden focus:border-[#C47D42]"
                />
                <Lock className="w-4 h-4 text-[#8A796B] absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-[#6B5E55] block mb-1">
                喜愛的咖啡焙度風味偏好
              </label>
              <select
                value={favoriteRoast}
                onChange={(e) => setFavoriteRoast(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-[#E0D7CA] rounded-xl text-xs text-[#2C2420] focus:outline-hidden focus:border-[#C47D42]"
              >
                <option value="淺焙花果香">淺焙 · 花果香明亮 (衣索比亞、藝伎)</option>
                <option value="中焙堅果焦糖">中焙 · 堅果焦糖平衡 (瓜地馬拉、哥倫比亞)</option>
                <option value="深焙黑巧醇厚">深焙 · 濃郁黑巧克力沉木 (森嵐經典義式)</option>
              </select>
            </div>

            {/* Perks reminder banner */}
            <div className="p-3 bg-[#F5EFE6] rounded-xl border border-[#E8DFD3] flex items-start gap-2.5 text-xs text-[#615248]">
              <Gift className="w-4 h-4 text-[#C47D42] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#2C2420]">新會員開卡禮遇：</span>
                <span className="block text-[11px] text-[#8A796B] mt-0.5">
                  自動贈送 1 點咖啡集點卡印章與 100 點紅利點數（滿8點兌換精品手沖）。
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#2C2420] text-white text-xs font-medium rounded-xl hover:bg-[#433832] transition-colors cursor-pointer"
            >
              完成註冊並登入
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-[#6B5E55] block mb-1">
                會員信箱或手機
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#E0D7CA] rounded-xl text-xs text-[#2C2420] focus:outline-hidden focus:border-[#C47D42]"
                />
                <Mail className="w-4 h-4 text-[#8A796B] absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-[#6B5E55] block mb-1">
                密碼
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="請輸入密碼"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#E0D7CA] rounded-xl text-xs text-[#2C2420] focus:outline-hidden focus:border-[#C47D42]"
                />
                <Lock className="w-4 h-4 text-[#8A796B] absolute left-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#2C2420] text-white text-xs font-medium rounded-xl hover:bg-[#433832] transition-colors cursor-pointer"
            >
              登入會員帳號
            </button>
          </form>
        )}

        {/* Quick Demo Helper */}
        <div className="pt-2 border-t border-[#EBE4DA] text-center">
          <p className="text-[11px] text-[#8A796B] mb-2">快速體驗？點擊下方立即載入完整會員展示資料：</p>
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-2.5 bg-[#EFE9DF] hover:bg-[#E5DDD0] text-[#2C2420] text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            以展示帳號「林予安（品鑑師 · 已集5點）」一鍵登入
          </button>
        </div>
      </div>
    </div>
  );
};
