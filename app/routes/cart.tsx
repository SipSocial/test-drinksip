import { useState } from 'react';
import { Link } from 'react-router';
import type { MetaFunction } from '@shopify/remix-oxygen';
import { LoadingSpinner } from '~/components/LoadingSpinner';

export const meta: MetaFunction = () => ([
  { title: 'Shopping Cart | DrinkSip' },
  { name: 'description', content: 'Review your DrinkSip non-alcoholic beer selection and proceed to checkout.' }
]);

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      handle: 'hazy-ipa',
      title: 'DrinkSip Hazy IPA',
      image: 'https://via.placeholder.com/400x600/E8B122/000000?text=DrinkSip+Hazy+IPA',
      price: 4.99,
      quantity: 2,
      color: '#E8B122'
    }
  ]);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + (subtotal * 0.08); // Add tax

  return (
    <div style={{
      background: '#000',
      color: '#fff',
      minHeight: '100vh',
      paddingTop: '120px',
      padding: '120px 2rem 2rem'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 900,
          textTransform: 'uppercase',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>🛒</div>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem' }}>
              Your Cart is Empty
            </h2>
            <Link to="/collections/all" style={{
              padding: '1.2rem 2.5rem',
              border: '3px solid #fff',
              background: '#fff',
              color: '#000',
              textDecoration: 'none',
              fontWeight: 900,
              textTransform: 'uppercase',
              borderRadius: '8px',
              display: 'inline-block'
            }}>
              Shop All Products
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '4rem' }}>
            <div>
              {cartItems.map((item) => (
                <div key={item.id} style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr auto',
                  gap: '2rem',
                  padding: '2rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '15px',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    background: item.color,
                    borderRadius: '10px',
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img src={item.image} alt={item.title} style={{
                      width: '80px',
                      height: '100px',
                      objectFit: 'contain'
                    }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '0.5rem' }}>
                      {item.title}
                    </h3>
                    <p style={{ color: '#888', marginBottom: '1rem' }}>
                      ${item.price.toFixed(2)} each
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span>Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '15px',
              padding: '2rem',
              height: 'fit-content'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '2rem' }}>
                Order Summary
              </h3>
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span>Tax</span>
                  <span>${(subtotal * 0.08).toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: 900 }}>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button style={{
                width: '100%',
                padding: '1.2rem',
                border: '3px solid #fff',
                background: '#fff',
                color: '#000',
                fontSize: '1rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                borderRadius: '8px',
                cursor: 'pointer'
              }}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}