/**
 * GameLikeShoppablePanel - Next-level interactive product selector
 * Game-inspired UI with premium animations and shoppable interface
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';

interface Product {
  id: string;
  title: string;
  handle: string;
  color: string;
  series: string;
  image?: string;
  description?: string;
}

interface GameLikeShoppablePanelProps {
  allProducts: Product[];
  currentProduct: Product;
  onProductSelect: (product: Product) => void;
  className?: string;
}

export function GameLikeShoppablePanel({ 
  allProducts, 
  currentProduct, 
  onProductSelect,
  className = '' 
}: GameLikeShoppablePanelProps) {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [isGridExpanded, setIsGridExpanded] = useState(false);

  // Dynamic product image mapping
  const getProductImage = (handle: string): string => {
    const imageMap: Record<string, string> = {
      'hazy-ipa': 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Hazy_IPA_0645f5ce-2ec5-4fda-87ee-fb36a4ee4295.png?v=1759017824',
      'watermelon-refresher': 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/box-mockup-refresher-watermelon-no-bottom.png?v=1759862531',
      'blood-orange-refresher': 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Blood_Orange_Refresher_82f1cfff-dfdd-44c5-bb02-6f8e74183f36.png?v=1759017824',
      'lemon-lime-refresher': 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Lemon_Lime_Refresher_9565ca39-8832-48ab-8c6b-bcd0899f87e9.png?v=1759017824',
      '311-hazy-ipa': 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/311_Hazy_IPA_607644d9-92cb-4a02-af68-0eb18d34063a.png?v=1759017824',
      'deftones-tone-zero-lager': 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Deftones_Tone_Zero_Lager_dcc52426-36ee-42ee-a3b5-b49f7d2d7480.png?v=1759017824',
    };
    return imageMap[handle] || imageMap['hazy-ipa'];
  };

  // Clean product title
  const getCleanTitle = (title: string, series?: string) => {
    if (series === 'ARTIST SERIES') {
      return title
        .replace(/DrinkSip\s*/gi, '')
        .replace(/Artist Series\s*/gi, '')
        .replace(/\s*Refresher\s*/gi, '')
        .replace(/\s*Series\s*/gi, '')
        .trim();
    }
    return title.replace(/\s*Refresher\s*/gi, '').replace(/DrinkSip\s*/gi, '').trim();
  };

  // Handle product selection with animation
  const handleProductClick = (product: Product) => {
    if (product.handle !== currentProduct.handle) {
      onProductSelect(product);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  } as const;

  const productVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -4,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  } as const;

  return (
    <motion.div 
      className={`game-panel ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(30px) saturate(1.8)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        padding: 'clamp(1.5rem, 3vw, 2.2rem)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        position: 'relative',
        overflow: 'hidden',
        minWidth: 'clamp(280px, 25vw, 350px)',
        maxWidth: '380px'
      }}
    >
      {/* Panel Header */}
      <motion.div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'clamp(1.5rem, 2.5vw, 2rem)',
          paddingBottom: '1rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div>
          <h3 
            style={{
              fontFamily: 'Peridot PE, Inter, sans-serif',
              fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
              fontWeight: '900',
              color: 'rgba(255, 255, 255, 0.95)',
              margin: '0 0 0.5rem 0',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em'
            }}
          >
            SELECT FLAVOR
          </h3>
          <p 
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(0.75rem, 1.2vw, 0.85rem)',
              color: 'rgba(255, 255, 255, 0.6)',
              margin: 0,
              fontWeight: '500'
            }}
          >
            Choose any flavor to switch
          </p>
        </div>
        
        {/* Expand/Collapse Button */}
        <motion.button
          onClick={() => setIsGridExpanded(!isGridExpanded)}
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'rgba(255, 255, 255, 0.8)'
          }}
          whileHover={{ 
            background: 'rgba(255, 255, 255, 0.2)',
            scale: 1.05 
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isGridExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            ⌄
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Products Grid */}
      <motion.div
        style={{
          display: 'grid',
          gridTemplateColumns: isGridExpanded ? '1fr 1fr' : '1fr 1fr 1fr',
          gap: 'clamp(0.8rem, 1.5vw, 1.2rem)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        layout
      >
        <AnimatePresence mode="wait">
          {allProducts.map((product, index) => {
            const isCurrent = product.handle === currentProduct.handle;
            const isHovered = hoveredProduct === product.handle;
            
            return (
              <motion.div
                key={product.handle}
                variants={productVariants}
                whileHover="hover"
                style={{
                  position: 'relative',
                  cursor: isCurrent ? 'default' : 'pointer',
                  opacity: isCurrent ? 1 : 0.85
                }}
                onHoverStart={() => setHoveredProduct(product.handle)}
                onHoverEnd={() => setHoveredProduct(null)}
                onClick={() => handleProductClick(product)}
                layout
              >
                {/* Product Card */}
                <motion.div
                  style={{
                    background: isCurrent 
                      ? 'rgba(255, 255, 255, 0.25)' 
                      : 'rgba(255, 255, 255, 0.12)',
                    borderRadius: '16px',
                    padding: 'clamp(1rem, 2vw, 1.4rem)',
                    border: isCurrent 
                      ? `2px solid ${product.color}80` 
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: isCurrent 
                      ? `0 12px 40px ${product.color}20, 0 0 0 1px ${product.color}30` 
                      : '0 8px 24px rgba(0, 0, 0, 0.1)',
                    aspectRatio: isGridExpanded ? '3/4' : '1',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'clamp(0.6rem, 1.2vw, 0.8rem)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  {/* Current Badge */}
                  {isCurrent && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        background: product.color,
                        color: '#fff',
                        fontSize: '0.65rem',
                        fontWeight: '700',
                        padding: '4px 8px',
                        borderRadius: '8px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontFamily: 'Inter, sans-serif',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      CURRENT
                    </motion.div>
                  )}

                  {/* Product Image */}
                  <motion.img
                    src={getProductImage(product.handle)}
                    alt={product.title}
                    style={{
                      width: isGridExpanded ? 'clamp(50px, 8vw, 70px)' : 'clamp(40px, 6vw, 55px)',
                      height: isGridExpanded ? 'clamp(65px, 10vw, 85px)' : 'clamp(52px, 8vw, 68px)',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2))',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    animate={{
                      scale: isCurrent ? 1.1 : (isHovered ? 1.05 : 1),
                      filter: isCurrent 
                        ? 'drop-shadow(0 6px 16px rgba(0, 0, 0, 0.3))' 
                        : 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2))'
                    }}
                  />

                  {/* Product Info */}
                  <div 
                    style={{
                      textAlign: 'center',
                      width: '100%'
                    }}
                  >
                    {/* Series Badge */}
                    <div 
                      style={{
                        fontSize: 'clamp(0.6rem, 1vw, 0.7rem)',
                        fontWeight: '600',
                        color: 'rgba(255, 255, 255, 0.5)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: '0.3rem',
                        fontFamily: 'Inter, sans-serif'
                      }}
                    >
                      {product.series}
                    </div>

                    {/* Product Name */}
                    <div 
                      style={{
                        fontSize: isGridExpanded 
                          ? 'clamp(0.75rem, 1.3vw, 0.9rem)' 
                          : 'clamp(0.65rem, 1.1vw, 0.75rem)',
                        fontWeight: '700',
                        color: isCurrent ? '#fff' : 'rgba(255, 255, 255, 0.9)',
                        lineHeight: 1.2,
                        fontFamily: 'Inter, sans-serif',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {getCleanTitle(product.title, product.series)}
                    </div>

                    {/* Action Indicator */}
                    {!isCurrent && (
                      <motion.div
                        style={{
                          marginTop: '0.5rem',
                          fontSize: '0.6rem',
                          fontWeight: '600',
                          color: 'rgba(255, 255, 255, 0.4)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          fontFamily: 'Inter, sans-serif'
                        }}
                        animate={{
                          opacity: isHovered ? 1 : 0.4,
                          color: isHovered ? product.color : 'rgba(255, 255, 255, 0.4)'
                        }}
                      >
                        TAP TO SWITCH
                      </motion.div>
                    )}
                  </div>

                  {/* Hover Overlay */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: '16px',
                      background: `linear-gradient(135deg, ${product.color}20 0%, transparent 70%)`,
                      opacity: 0,
                      pointerEvents: 'none'
                    }}
                    animate={{
                      opacity: isHovered && !isCurrent ? 0.6 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Interactive Pulse Effect */}
                  {isCurrent && (
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: '16px',
                        background: `radial-gradient(circle, ${product.color}15 0%, transparent 70%)`,
                        pointerEvents: 'none'
                      }}
                      animate={{
                        scale: [1, 1.02, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    />
                  )}
                </motion.div>

                {/* Game-like Selection Ring */}
                {isHovered && !isCurrent && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: '-2px',
                      left: '-2px',
                      right: '-2px',
                      bottom: '-2px',
                      borderRadius: '18px',
                      background: `conic-gradient(from 0deg, ${product.color}, transparent, ${product.color})`,
                      zIndex: -1,
                      opacity: 0.8
                    }}
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Panel Footer */}
      <motion.div
        style={{
          marginTop: 'clamp(1.5rem, 2.5vw, 2rem)',
          paddingTop: '1rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center'
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div 
          style={{
            fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)',
            color: 'rgba(255, 255, 255, 0.5)',
            fontWeight: '500',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          {allProducts.length} flavors available
        </div>
        
        {/* All Products Link */}
        <Link 
          to="/products"
          style={{
            display: 'inline-block',
            marginTop: '0.8rem',
            padding: '0.6rem 1.2rem',
            background: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            color: 'rgba(255, 255, 255, 0.9)',
            textDecoration: 'none',
            fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)',
            fontWeight: '600',
            fontFamily: 'Inter, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          VIEW ALL
        </Link>
      </motion.div>

      {/* Background Pattern */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)`,
          borderRadius: '24px',
          pointerEvents: 'none',
          zIndex: -1
        }}
      />
    </motion.div>
  );
}
