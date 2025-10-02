interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'product' | 'article';
  productData?: {
    price?: string;
    availability?: 'in_stock' | 'out_of_stock';
    brand?: string;
    category?: string;
  };
}

export function SEO({ 
  title = 'DrinkSip — Wake Up Happy',
  description = 'Non-alcoholic beer with real taste. Lower calories, delicious taste. Choose better with DrinkSip.',
  image = 'https://drinksip.com/og-image.jpg',
  url = 'https://drinksip.com',
  type = 'website',
  productData
}: SEOProps) {
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type === 'product' ? 'Product' : 'Organization',
    name: title,
    description,
    image,
    url,
    ...(type === 'product' && productData && {
      brand: {
        '@type': 'Brand',
        name: productData.brand || 'DrinkSip'
      },
      offers: {
        '@type': 'Offer',
        price: productData.price,
        availability: `https://schema.org/${productData.availability === 'in_stock' ? 'InStock' : 'OutOfStock'}`,
        priceCurrency: 'USD'
      },
      category: productData.category
    }),
    ...(type === 'website' && {
      '@type': 'Organization',
      name: 'DrinkSip',
      description: 'Premium non-alcoholic beer company',
      url: 'https://drinksip.com',
      logo: 'https://drinksip.com/logo.png',
      sameAs: [
        'https://instagram.com/drinksip',
        'https://twitter.com/drinksip',
        'https://facebook.com/drinksip'
      ]
    })
  };

  return (
    <>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content="non-alcoholic beer, craft beer, DrinkSip, alcohol-free, low calorie, premium beer" />
      <meta name="author" content="DrinkSip" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="DrinkSip" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:site" content="@drinksip" />
      <meta property="twitter:creator" content="@drinksip" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="DrinkSip" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://cdn.shopify.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
    </>
  );
}

export function generateProductSEO(product: any) {
  return {
    title: `${product.title} | DrinkSip — Premium Non-Alcoholic Beer`,
    description: product.description || `Experience ${product.title}, our premium non-alcoholic beer with real taste and lower calories. Order online or find it near you.`,
    image: product.featuredImage?.url || 'https://drinksip.com/og-image.jpg',
    url: `https://drinksip.com/products/${product.handle}`,
    type: 'product' as const,
    productData: {
      price: '4.99',
      availability: 'in_stock' as const,
      brand: 'DrinkSip',
      category: 'Non-Alcoholic Beer'
    }
  };
}

export function generateCollectionSEO(collection: any) {
  return {
    title: `${collection.title} | DrinkSip — Premium Non-Alcoholic Beer Collection`,
    description: collection.description || `Explore our ${collection.title} collection of premium non-alcoholic beers. Real taste, lower calories, choose better.`,
    image: 'https://drinksip.com/og-image.jpg',
    url: `https://drinksip.com/collections/${collection.handle}`,
    type: 'website' as const
  };
}
