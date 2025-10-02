import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import type { MetaFunction, LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData } from 'react-router';
import { ProductCard } from '~/components/ProductCard';
import { LoadingSpinner } from '~/components/LoadingSpinner';
import { shopQuery } from '~/lib/shopify.server';
import { SEARCH_QUERY } from '~/graphql/queries';

export const meta: MetaFunction = ({ location }) => {
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  
  return [
    { title: query ? `Search results for "${query}" | DrinkSip` : 'Search | DrinkSip' },
    { name: 'description', content: `Search our premium non-alcoholic beer collection. Find your perfect DrinkSip flavor.` },
    { name: 'robots', content: 'noindex, follow' }
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get('q') || '';
  
  if (!searchQuery) {
    return { results: [], query: '', suggestions: [] };
  }

  try {
    // Mock search results for now - replace with real Shopify search
    const mockResults = [
      { id: '1', handle: 'hazy-ipa', title: 'DrinkSip Hazy IPA', tags: ['core-series'], featuredImage: { url: 'https://via.placeholder.com/400x600/E8B122/000000?text=DrinkSip+Hazy+IPA' }, metafields: [] },
      { id: '2', handle: 'watermelon-refresher', title: 'Watermelon Refresher', tags: ['refresher-series'], featuredImage: { url: 'https://via.placeholder.com/400x600/F05757/FFFFFF?text=Watermelon' }, metafields: [] },
      { id: '3', handle: 'blood-orange-refresher', title: 'Blood Orange Refresher', tags: ['refresher-series'], featuredImage: { url: 'https://via.placeholder.com/400x600/ED5335/FFFFFF?text=Blood+Orange' }, metafields: [] },
      { id: '4', handle: 'lemon-lime-refresher', title: 'Lemon Lime Refresher', tags: ['refresher-series'], featuredImage: { url: 'https://via.placeholder.com/400x600/77C14A/FFFFFF?text=Lemon+Lime' }, metafields: [] },
      { id: '5', handle: '311-hazy-ipa', title: 'DrinkSip x 311 Hazy IPA', tags: ['artist-series'], featuredImage: { url: 'https://via.placeholder.com/400x600/E8B122/000000?text=DrinkSip+x+311' }, metafields: [] },
      { id: '6', handle: 'deftones-tone-zero-lager', title: 'DrinkSip x Deftones Tone Zero Lager', tags: ['artist-series'], featuredImage: { url: 'https://via.placeholder.com/400x600/ED5335/FFFFFF?text=DrinkSip+x+Deftones' }, metafields: [] }
    ];

    // Filter results based on search query
    const results = mockResults.filter(product => 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const suggestions = ['hazy ipa', 'refresher', 'watermelon', 'blood orange', '311', 'deftones', 'core series', 'artist series'];

    return { results, query: searchQuery, suggestions };
  } catch (error) {
    console.error('Search error:', error);
    return { results: [], query: searchQuery, suggestions: [] };
  }
}

export default function Search() {
  const { results, query, suggestions } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(query);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (newQuery: string) => {
    if (newQuery.trim()) {
      setIsSearching(true);
      setSearchParams({ q: newQuery.trim() });
      setTimeout(() => setIsSearching(false), 500); // Simulate search delay
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchInput);
  };

  return (
    <div style={{
      background: '#000',
      color: '#fff',
      minHeight: '100vh',
      paddingTop: '120px' // Account for header
    }}>
      {/* Search Header */}
      <section style={{
        padding: '2rem',
        background: '#000',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            marginBottom: '2rem',
            color: '#fff',
            textAlign: 'center'
          }}>
            Search DrinkSip
          </h1>

          {/* Search Form */}
          <form onSubmit={handleSubmit} style={{
            maxWidth: '600px',
            margin: '0 auto',
            position: 'relative'
          }}>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search for products, flavors, series..."
                style={{
                  width: '100%',
                  padding: '1.5rem 2rem',
                  paddingRight: '5rem',
                  fontSize: '1.1rem',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '50px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#fff',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#fff';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
              />
              <button
                type="submit"
                disabled={isSearching}
                style={{
                  position: 'absolute',
                  right: '8px',
                  width: '50px',
                  height: '50px',
                  border: 'none',
                  borderRadius: '50%',
                  background: '#fff',
                  color: '#000',
                  fontSize: '1.2rem',
                  cursor: isSearching ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  opacity: isSearching ? 0.6 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isSearching) {
                    e.currentTarget.style.background = '#f0f0f0';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSearching) {
                    e.currentTarget.style.background = '#fff';
                  }
                }}
              >
                {isSearching ? <LoadingSpinner size="small" color="#000" /> : '🔍'}
              </button>
            </div>
          </form>

          {/* Search Suggestions */}
          {!query && suggestions.length > 0 && (
            <div style={{
              maxWidth: '600px',
              margin: '2rem auto 0',
              textAlign: 'center'
            }}>
              <p style={{
                color: '#888',
                fontSize: '0.9rem',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Popular Searches
              </p>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                justifyContent: 'center'
              }}>
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSearch(suggestion)}
                    style={{
                      padding: '0.5rem 1rem',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '20px',
                      background: 'transparent',
                      color: '#fff',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.borderColor = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Search Results */}
      <section style={{
        padding: '4rem 2rem',
        background: '#000'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {query && (
            <div style={{
              marginBottom: '3rem',
              textAlign: 'center'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                color: '#fff',
                marginBottom: '0.5rem'
              }}>
                {results.length > 0 ? `${results.length} Results` : 'No Results'}
              </h2>
              <p style={{
                color: '#888',
                fontSize: '1rem'
              }}>
                {results.length > 0 
                  ? `Showing results for "${query}"`
                  : `No products found for "${query}". Try a different search term.`
                }
              </p>
            </div>
          )}

          {/* Results Grid */}
          {results.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              marginBottom: '4rem'
            }}>
              {results.map((product: any) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  handle={product.handle}
                  title={product.title}
                  image={product.featuredImage?.url || `https://via.placeholder.com/400x600/E8B122/FFFFFF?text=${encodeURIComponent(product.title)}`}
                />
              ))}
            </div>
          )}

          {/* No Results - Show Popular Products */}
          {query && results.length === 0 && (
            <div style={{
              textAlign: 'center',
              marginTop: '4rem'
            }}>
              <h3 style={{
                fontSize: '1.8rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                color: '#fff',
                marginBottom: '2rem'
              }}>
                Popular Products
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem',
                maxWidth: '800px',
                margin: '0 auto'
              }}>
                <ProductCard
                  id="1"
                  handle="hazy-ipa"
                  title="DrinkSip Hazy IPA"
                  image="https://via.placeholder.com/400x600/E8B122/000000?text=DrinkSip+Hazy+IPA"
                />
                <ProductCard
                  id="2"
                  handle="watermelon-refresher"
                  title="Watermelon Refresher"
                  image="https://via.placeholder.com/400x600/F05757/FFFFFF?text=Watermelon"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}