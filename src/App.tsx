/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CoffeeVarietiesSection } from './components/CoffeeVarietiesSection';
import { CoffeeBeansSection } from './components/CoffeeBeansSection';
import { FoodMenuSection } from './components/FoodMenuSection';
import { StoreSection } from './components/StoreSection';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { MemberProfileModal } from './components/MemberProfileModal';
import { CartDrawer } from './components/CartDrawer';
import { FlavorQuizModal } from './components/FlavorQuizModal';
import { CartItem, MemberUser, OrderRecord, DEMO_ORDERS } from './data/coffeeData';

export default function App() {
  // Authentication & Member state
  const [currentUser, setCurrentUser] = useState<MemberUser | null>(() => {
    try {
      const saved = localStorage.getItem('yusen_member_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return null;
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('yusen_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (currentUser?.favorites?.length) return currentUser.favorites;
    return ['bean-geisha-panama', 'food-avocado-salmon'];
  });

  // Orders
  const [userOrders, setUserOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem('yusen_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEMO_ORDERS;
  });

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);

  // Floating toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('yusen_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Persist orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('yusen_orders', JSON.stringify(userOrders));
    } catch (e) {
      console.error(e);
    }
  }, [userOrders]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2500);
  };

  // Add to cart handler
  const handleAddToCart = (item: Omit<CartItem, 'cartItemId'>) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.itemId === item.itemId && i.option === item.option
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += item.quantity;
        return next;
      } else {
        const newItem: CartItem = {
          ...item,
          cartItemId: `${item.itemId}-${item.option}-${Date.now()}`
        };
        return [...prev, newItem];
      }
    });
    showToast(`已將「${item.name}」加入購物袋`);
  };

  // Update quantity
  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  // Remove item
  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  // Clear cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Toggle favorite
  const handleToggleFavorite = (itemId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(itemId);
      const next = exists ? prev.filter((id) => id !== itemId) : [...prev, itemId];
      if (currentUser) {
        const updatedUser = { ...currentUser, favorites: next };
        setCurrentUser(updatedUser);
        localStorage.setItem('yusen_member_user', JSON.stringify(updatedUser));
      }
      showToast(exists ? '已從我的收藏移除' : '已收藏至會員專區');
      return next;
    });
  };

  // Login success
  const handleLoginSuccess = (user: MemberUser) => {
    setCurrentUser(user);
    if (user.favorites?.length) {
      setFavorites(user.favorites);
    }
    showToast(`歡迎回來，${user.name}！已為您登入。`);
  };

  // Logout
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('yusen_member_user');
    showToast('您已成功登出會員帳號。');
  };

  // Order completed
  const handleOrderCompleted = (order: OrderRecord) => {
    setUserOrders((prev) => [order, ...prev]);
    // If logged in, add stamps!
    if (currentUser) {
      const addedStamps = Math.min(8, currentUser.stamps + 1);
      const updatedUser = {
        ...currentUser,
        stamps: addedStamps,
        points: currentUser.points + Math.round(order.total * 0.1)
      };
      setCurrentUser(updatedUser);
      localStorage.setItem('yusen_member_user', JSON.stringify(updatedUser));
      showToast('訂單已成立！為您累積 1 點手沖咖啡集點卡！');
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C2420] flex flex-col font-sans">
      {/* Top Bar Navigation (Strict 3-zone contract) */}
      <Navbar
        currentUser={currentUser}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenQuiz={() => setIsQuizOpen(true)}
          onExploreBeans={() => {
            const el = document.getElementById('beans');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onExploreFood={() => {
            const el = document.getElementById('menu');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Coffee Knowledge & Varieties Section */}
        <CoffeeVarietiesSection />

        {/* Featured Beans & Drip Bags Section */}
        <CoffeeBeansSection
          onAddToCart={handleAddToCart}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* Cafe Food & Desserts Section */}
        <FoodMenuSection
          onAddToCart={handleAddToCart}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* Store Atmosphere, Info & Reservations */}
        <StoreSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {currentUser && (
        <MemberProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          user={currentUser}
          onLogout={handleLogout}
          userOrders={userOrders}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        currentUser={currentUser}
        onOpenAuth={() => {
          setIsCartOpen(false);
          setIsAuthModalOpen(true);
        }}
        onOrderCompleted={handleOrderCompleted}
      />

      <FlavorQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2C2420] text-white text-xs font-medium px-4 py-3 rounded-xl shadow-lg border border-[#433832] transition-all">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
