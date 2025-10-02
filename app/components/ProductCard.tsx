import { Link } from 'react-router';
import { getAccentHexForProduct } from '~/lib/accents';

interface ProductCardProps {
  id: string;
  handle: string;
  title: string;
  image: string;
  className?: string;
}

export function ProductCard({ id, handle, title, image, className = '' }: ProductCardProps) {
  const accentColor = getAccentHexForProduct(handle, title, [], []);
  
  return (
    <Link 
      to={`/products/${handle}`}
      className={`bodyarmor-product-card ${className}`}
      style={{
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
        transition: 'transform 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* BodyArmor JUMBO Cards - Always 3 Per Row, Responsive Scaling */}
      <div style={{
        // Always fit 3 jumbo cards - scales to available space
        width: 'clamp(200px, 28vw, 735px)', // Scales to fit 3 cards: Mobile: 200px → Desktop: 735px
        height: 'clamp(250px, 35vw, 910px)', // Proportional height scaling
        border: 'clamp(3.3px, 0.825vw, 15.4px) solid #ffffff', // 10% increased responsive white border
        borderRadius: '0px',
        overflow: 'hidden',
        // Removed shadow to prevent interference with product titles
        position: 'relative',
        background: accentColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        flexGrow: 0
      }}>
        {/* Product Image - BodyArmor Scale */}
        <img 
          src={image}
          alt={title}
          style={{
            width: '85%',
            height: '85%',
            objectFit: 'contain',
            filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))'
          }}
          onError={(e) => {
            // BodyArmor-style fallback
            e.currentTarget.style.display = 'none';
            const parent = e.currentTarget.parentElement;
            if (parent) {
              parent.innerHTML = `
                <div style="
                  width: 70%;
                  height: 85%;
                  background: linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 100%);
                  border-radius: 25px 25px 12px 12px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: #fff;
                  font-size: 0.8rem;
                  font-weight: 900;
                  text-align: center;
                  text-transform: uppercase;
                  letter-spacing: 0.08em;
                  line-height: 1.2;
                  padding: 1.5rem 0.8rem;
                  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
                  border: 2px solid rgba(255, 255, 255, 0.1);
                  position: relative;
                ">
                  <div style="position: absolute; top: -8px; left: 50%; transform: translateX(-50%); width: 30px; height: 16px; background: #333; border-radius: 4px;"></div>
                  <div>
                    <div style="font-size: 0.6rem; margin-bottom: 0.25rem;">DRINKSIP</div>
                    <div style="font-size: 0.5rem; line-height: 1.1;">${title.replace('DrinkSip ', '').toUpperCase()}</div>
                  </div>
                </div>
              `;
            }
          }}
        />
      </div>
      
      {/* BodyArmor Product Title - Responsive Styling */}
      <div style={{
        marginTop: 'clamp(1rem, 1.5vw, 1.5rem)', // BodyArmor responsive margin
        textAlign: 'center'
      }}>
        <h3 style={{
          fontSize: 'clamp(0.6rem, 1.2vw, 1.1rem)', // Much smaller font size
          fontWeight: '900',
          color: '#fff',
          margin: 0,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          lineHeight: 1,
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
        }}>
          {title.replace('DrinkSip ', '')}
        </h3>
      </div>
    </Link>
  );
}