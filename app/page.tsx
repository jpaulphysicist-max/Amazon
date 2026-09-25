'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { INITIAL_PRODUCTS } from '@/data/products';
import { HOLIDAYS } from '@/data/holidays';
import { Product, HolidayId, CartItem, Order, Review } from '@/data/types';
import { AmazonHeader } from '@/components/AmazonHeader';
import { HolidayDepartmentBar } from '@/components/HolidayDepartmentBar';
import { AmazonHeroBanner } from '@/components/AmazonHeroBanner';
import { ProductCard } from '@/components/ProductCard';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import { CartDrawer } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';
import { OrdersModal } from '@/components/OrdersModal';
import { HolidayAdvisorDrawer } from '@/components/HolidayAdvisorDrawer';
import { AmazonSideMenu } from '@/components/AmazonSideMenu';
import { AmazonFooter } from '@/components/AmazonFooter';
import {
  Check,
  CheckCircle2,
  SlidersHorizontal,
  ArrowUpDown,
  Sparkles,
  ShoppingBag,
  RotateCcw,
} from 'lucide-react';

export default function HomePage() {
  // Products catalog with dynamic user reviews
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  // Filter & Search states
  const [selectedHoliday, setSelectedHoliday] = useState<HolidayId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [primeOnly, setPrimeOnly] = useState(false);
  const [dealsOnly, setDealsOnly] = useState(false);
  const [priceFilter, setPriceFilter] = useState<'all' | 'under25' | '25to50' | '50to100' | 'over100'>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortOption, setSortOption] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  // Delivery Location
  const [deliveryZip, setDeliveryZip] = useState('98101');

  // Cart & Orders State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);

  // Added to cart feedback toast
  const [lastAddedItem, setLastAddedItem] = useState<{ title: string; price: number } | null>(null);

  // Calculate product counts per holiday
  const productCountMap = useMemo(() => {
    const map: Record<string, number> = {};
    for (const h of HOLIDAYS) {
      map[h.id] = 0;
    }
    for (const p of products) {
      if (map[p.holidayId] !== undefined) {
        map[p.holidayId]++;
      }
    }
    return map;
  }, [products]);

  // Cart handlers
  const handleAddToCart = (product: Product, quantity: number = 1, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    setLastAddedItem({ title: product.title, price: product.price });
    setTimeout(() => {
      setLastAddedItem(null);
    }, 3500);
  };

  const handleUpdateQuantity = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleBuyNow = (product: Product, quantity: number = 1) => {
    // Add to cart and immediately open checkout modal
    handleAddToCart(product, quantity);
    setIsDetailOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderPlaced = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
  };

  // Add review handler (persists live in state and updates product rating)
  const handleAddReview = (productId: string, newReview: Review) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== productId) return p;

        const updatedReviews = [newReview, ...p.reviews];
        const newRatingCount = p.ratingCount + 1;
        // recalculate average rating
        const totalRatingSum = p.rating * p.ratingCount + newReview.rating;
        const newAvg = Number((totalRatingSum / newRatingCount).toFixed(1));

        // update rating distribution
        const rStar = newReview.rating as 1 | 2 | 3 | 4 | 5;
        const updatedDist = { ...p.ratingDistribution };
        if (updatedDist[rStar] !== undefined) {
          updatedDist[rStar] = Math.min(100, updatedDist[rStar] + 1);
        }

        return {
          ...p,
          rating: newAvg,
          ratingCount: newRatingCount,
          reviews: updatedReviews,
          ratingDistribution: updatedDist,
        };
      })
    );

    // Also update selectedProduct if currently viewing
    setSelectedProduct((prev) => {
      if (!prev || prev.id !== productId) return prev;
      const updatedReviews = [newReview, ...prev.reviews];
      const newRatingCount = prev.ratingCount + 1;
      const totalRatingSum = prev.rating * prev.ratingCount + newReview.rating;
      const newAvg = Number((totalRatingSum / newRatingCount).toFixed(1));

      return {
        ...prev,
        rating: newAvg,
        ratingCount: newRatingCount,
        reviews: updatedReviews,
      };
    });
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter by Holiday
    if (selectedHoliday !== 'all') {
      list = list.filter((p) => p.holidayId === selectedHoliday);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.department.toLowerCase().includes(q) ||
          p.about.some((b) => b.toLowerCase().includes(q))
      );
    }

    // Prime only
    if (primeOnly) {
      list = list.filter((p) => p.isPrime);
    }

    // Deals only
    if (dealsOnly) {
      list = list.filter((p) => Boolean(p.dealTag || (p.listPrice && p.listPrice > p.price)));
    }

    // Price range
    if (priceFilter === 'under25') {
      list = list.filter((p) => p.price < 25);
    } else if (priceFilter === '25to50') {
      list = list.filter((p) => p.price >= 25 && p.price <= 50);
    } else if (priceFilter === '50to100') {
      list = list.filter((p) => p.price > 50 && p.price <= 100);
    } else if (priceFilter === 'over100') {
      list = list.filter((p) => p.price > 100);
    }

    // Min rating
    if (minRating > 0) {
      list = list.filter((p) => p.rating >= minRating);
    }

    // Sort
    if (sortOption === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [products, selectedHoliday, searchQuery, primeOnly, dealsOnly, priceFilter, minRating, sortOption]);

  const activeHolidayObj = HOLIDAYS.find((h) => h.id === selectedHoliday);
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const resetFilters = () => {
    setSelectedHoliday('all');
    setSearchQuery('');
    setPrimeOnly(false);
    setDealsOnly(false);
    setPriceFilter('all');
    setMinRating(0);
    setSortOption('featured');
  };

  return (
    <div className="min-h-screen bg-[#eaeded] flex flex-col font-sans text-slate-900 antialiased">
      {/* 1. Amazon Header */}
      <AmazonHeader
        selectedHoliday={selectedHoliday}
        onSelectHoliday={(h) => setSelectedHoliday(h)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onOpenSideMenu={() => setIsSideMenuOpen(true)}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        deliveryZip={deliveryZip}
        onChangeZip={setDeliveryZip}
      />

      {/* 2. Interactive Holiday Department Strip (All 11 Holidays) */}
      <HolidayDepartmentBar
        selectedHoliday={selectedHoliday}
        onSelectHoliday={(h) => setSelectedHoliday(h)}
        productCountMap={productCountMap}
      />

      {/* 3. Hero Banner (shows on 'all' or when no restrictive search) */}
      {selectedHoliday === 'all' && !searchQuery && (
        <AmazonHeroBanner onSelectHoliday={(h) => setSelectedHoliday(h)} />
      )}

      {/* 4. Active Holiday Header Banner (if a specific holiday is selected) */}
      {selectedHoliday !== 'all' && activeHolidayObj && (
        <div className="bg-white border-b border-slate-200 py-6 px-4 md:px-8 shadow-xs">
          <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-800 font-bold uppercase tracking-wider mb-1">
                <span>Official Holiday Storefront</span>
                <span>·</span>
                <span>{activeHolidayObj.dateStr}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                {activeHolidayObj.name} Goods & Deals
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                {activeHolidayObj.description}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAdvisorOpen(true)}
                className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Ask AI Gift Advice for {activeHolidayObj.shortName}</span>
              </button>
              <button
                onClick={() => setSelectedHoliday('all')}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold"
              >
                All Holidays
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Main Catalog Content Area */}
      <main className="max-w-[1500px] mx-auto w-full px-3 md:px-6 py-6 flex-1">
        {/* Amazon Filter & Sort Control Bar */}
        <div className="bg-white rounded-xs p-3 md:p-4 mb-4 border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Results Count & Current Filter */}
          <div className="flex items-center gap-2 text-slate-700">
            <span className="font-semibold text-slate-900">
              {filteredProducts.length} results
            </span>
            <span>for</span>
            <span className="text-[#c45500] font-bold">
              &ldquo;{selectedHoliday === 'all' ? (searchQuery || 'All Holidays') : activeHolidayObj?.shortName}&rdquo;
            </span>
            {(primeOnly || dealsOnly || priceFilter !== 'all' || minRating > 0 || searchQuery) && (
              <button
                onClick={resetFilters}
                className="ml-2 text-blue-700 hover:underline flex items-center gap-1 text-[11px]"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset all filters</span>
              </button>
            )}
          </div>

          {/* Interactive Filters: Prime, Deals, Price, Rating, Sort */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            {/* Prime delivery toggle */}
            <button
              type="button"
              onClick={() => setPrimeOnly(!primeOnly)}
              className={`px-2.5 py-1 rounded border flex items-center gap-1 font-medium transition cursor-pointer ${
                primeOnly
                  ? 'bg-blue-50 border-blue-500 text-blue-900 font-bold'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="text-[#00a8e1] font-bold">prime</span>
              <Check className={`w-3.5 h-3.5 ${primeOnly ? 'text-blue-700' : 'text-slate-400'}`} />
            </button>

            {/* Deals Only toggle */}
            <button
              type="button"
              onClick={() => setDealsOnly(!dealsOnly)}
              className={`px-2.5 py-1 rounded border transition font-medium cursor-pointer ${
                dealsOnly
                  ? 'bg-red-50 border-red-400 text-red-900 font-bold'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Today&apos;s Deals
            </button>

            {/* Price Filter */}
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value as any)}
              className="px-2 py-1 bg-white border border-slate-300 rounded text-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="all">Any Price</option>
              <option value="under25">Under $25</option>
              <option value="25to50">$25 to $50</option>
              <option value="50to100">$50 to $100</option>
              <option value="over100">$100 & Above</option>
            </select>

            {/* Min Rating Filter */}
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="px-2 py-1 bg-white border border-slate-300 rounded text-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value={0}>Avg. Customer Review</option>
              <option value={4}>4 Stars & Up</option>
              <option value={4.5}>4.5 Stars & Up</option>
            </select>

            {/* Sort Order */}
            <div className="flex items-center gap-1 border-l border-slate-300 pl-2">
              <span className="text-slate-500 text-[11px] hidden sm:inline">Sort by:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="px-2 py-1 bg-white border border-slate-300 rounded text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Avg. Customer Review</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded p-12 text-center border border-slate-200 space-y-4 my-6">
            <ShoppingBag className="w-12 h-12 mx-auto text-slate-300" />
            <h3 className="text-lg font-bold text-slate-900">
              No holiday products matched your current filters
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Try adjusting your search terms, clearing the price/rating filters, or switching to &quot;All Holidays&quot;.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2 bg-[#ffd814] hover:bg-[#f7ca00] text-slate-900 text-xs font-bold rounded-full shadow-xs"
            >
              Reset Filters & View All Holiday Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetail={(p) => {
                  setSelectedProduct(p);
                  setIsDetailOpen(true);
                }}
                onAddToCart={(p, e) => handleAddToCart(p, 1, e)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Floating Added to Cart Notification Toast */}
      {lastAddedItem && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#131921] text-white p-4 rounded shadow-2xl border border-amber-400/40 max-w-sm flex items-start gap-3 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-white flex items-center justify-between">
              <span>Added to Cart</span>
              <span className="text-amber-400 font-bold">${lastAddedItem.price.toFixed(2)}</span>
            </div>
            <p className="text-[11px] text-slate-300 truncate mt-0.5">
              {lastAddedItem.title}
            </p>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="px-3 py-1 bg-[#ffd814] hover:bg-[#f7ca00] text-slate-900 text-[11px] font-bold rounded shadow-xs"
              >
                View Cart ({totalCartCount})
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCheckoutOpen(true);
                }}
                className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold rounded"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Product Detail Modal (PDP) */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onAddReview={handleAddReview}
        deliveryZip={deliveryZip}
      />

      {/* 7. Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* 8. Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderPlaced={handleOrderPlaced}
        defaultZip={deliveryZip}
      />

      {/* 9. Returns & Orders Modal */}
      <OrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
      />

      {/* 10. Rufus Holiday AI Assistant Drawer */}
      <HolidayAdvisorDrawer
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        selectedHoliday={selectedHoliday}
        onSelectHoliday={(h) => setSelectedHoliday(h)}
      />

      {/* 11. Amazon Side Menu Drawer ("☰ All") */}
      <AmazonSideMenu
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
        onSelectHoliday={(h) => setSelectedHoliday(h)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
      />

      {/* 12. Amazon Multi-Column Footer */}
      <AmazonFooter onSelectHoliday={(h) => setSelectedHoliday(h)} />
    </div>
  );
}
