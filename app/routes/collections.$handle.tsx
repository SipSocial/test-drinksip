import {Link, useLoaderData} from 'react-router';
import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {ProductCard} from '~/components/ProductCard';
import {shopQuery} from '~/lib/shopify.server';
import {COLLECTION_QUERY} from '~/graphql/queries';
import {getAccentHexForProduct} from '~/lib/accents';

export async function loader({params}: LoaderFunctionArgs) {
  const handle = params.handle ?? 'all';
  
  try {
    const data = await shopQuery<{
      collection: {
        id: string;
        handle: string;
        title: string;
        description: string;
        products: {
          nodes: Array<{
            id: string;
            handle: string;
            title: string;
            description: string;
            tags: string[];
            featuredImage?: {
              url: string;
              altText?: string;
            };
            metafields: Array<{
              key: string;
              value: string;
              namespace: string;
            }>;
          }>;
        };
      };
    }>(COLLECTION_QUERY, {handle, first: 20});

    if (!data.collection) {
      throw new Response('Collection not found', { status: 404 });
    }

    return { 
      collection: {
        ...data.collection,
        products: data.collection.products.nodes
      }
    };
  } catch (error) {
    console.error('Collection API Error:', error);
    
    // Fallback mock data with proper structure for ProductCard
    const mockCollections: Record<string, any> = {
      'core-series': {
        title: 'Core Series',
        description: 'Bold, traditional beers for clean daytime refreshment. Lower calories, great taste.',
        products: [
          { id: '1', handle: 'hazy-ipa', title: 'DrinkSip Hazy IPA', tags: ['core-series'], featuredImage: { url: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Hazy_IPA_0645f5ce-2ec5-4fda-87ee-fb36a4ee4295.png?v=1759017824' }, metafields: [] }
        ]
      },
      'refresher-series': {
        title: 'Refresher Series', 
        description: 'Crisp, refreshing beers with real fruit extracts. Light & refreshing.',
        products: [
          { id: '2', handle: 'watermelon-refresher', title: 'Watermelon Refresher', tags: ['refresher-series'], featuredImage: { url: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Watermelon_Refresher_e64ca8fe-8af8-43b5-8b3a-d20dc04152c2.png?v=1759017823' }, metafields: [] },
          { id: '3', handle: 'blood-orange-refresher', title: 'Blood Orange Refresher', tags: ['refresher-series'], featuredImage: { url: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Blood_Orange_Refresher_82f1cfff-dfdd-44c5-bb02-6f8e74183f36.png?v=1759017824' }, metafields: [] },
          { id: '4', handle: 'lemon-lime-refresher', title: 'Lemon Lime Refresher', tags: ['refresher-series'], featuredImage: { url: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Lemon_Lime_Refresher_9565ca39-8832-48ab-8c6b-bcd0899f87e9.png?v=1759017824' }, metafields: [] }
        ]
      },
      'artist-series': {
        title: 'Artist Series',
        description: 'Limited edition collaborations with legendary artists. Exclusive drops, bold flavors.',
        products: [
          { id: '5', handle: '311-hazy-ipa', title: 'DrinkSip x 311 Hazy IPA', tags: ['artist-series', '311', 'limited-edition'], featuredImage: { url: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/311_Hazy_IPA_607644d9-92cb-4a02-af68-0eb18d34063a.png?v=1759017824' }, metafields: [] },
          { id: '6', handle: 'deftones-tone-zero-lager', title: 'DrinkSip x Deftones Tone Zero Lager', tags: ['artist-series', 'deftones', 'limited-edition'], featuredImage: { url: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Deftones_Tone_Zero_Lager_dcc52426-36ee-42ee-a3b5-b49f7d2d7480.png?v=1759017824' }, metafields: [] }
        ]
      },
      'all': {
        title: 'All Products',
        description: 'Our complete range of non-alcoholic beers.',
        products: [
          { id: '1', handle: 'hazy-ipa', title: 'DrinkSip Hazy IPA', tags: ['core-series'], featuredImage: { url: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Hazy_IPA_0645f5ce-2ec5-4fda-87ee-fb36a4ee4295.png?v=1759017824' }, metafields: [] },
          { id: '2', handle: 'watermelon-refresher', title: 'DrinkSip Watermelon Refresher', tags: ['refresher-series'], featuredImage: { url: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Watermelon_Refresher_e64ca8fe-8af8-43b5-8b3a-d20dc04152c2.png?v=1759017823' }, metafields: [] },
          { id: '3', handle: 'blood-orange-refresher', title: 'DrinkSip Blood Orange Refresher', tags: ['refresher-series'], featuredImage: { url: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Blood_Orange_Refresher_82f1cfff-dfdd-44c5-bb02-6f8e74183f36.png?v=1759017824' }, metafields: [] },
          { id: '4', handle: 'lemon-lime-refresher', title: 'DrinkSip Lemon Lime Refresher', tags: ['refresher-series'], featuredImage: { url: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Lemon_Lime_Refresher_9565ca39-8832-48ab-8c6b-bcd0899f87e9.png?v=1759017824' }, metafields: [] },
          { id: '5', handle: '311-hazy-ipa', title: 'DrinkSip x 311 Hazy IPA', tags: ['artist-series'], featuredImage: { url: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/311_Hazy_IPA_607644d9-92cb-4a02-af68-0eb18d34063a.png?v=1759017824' }, metafields: [] },
          { id: '6', handle: 'deftones-tone-zero-lager', title: 'DrinkSip x Deftones Tone Zero Lager', tags: ['artist-series'], featuredImage: { url: 'https://cdn.shopify.com/s/files/1/0407/8580/5468/files/Deftones_Tone_Zero_Lager_dcc52426-36ee-42ee-a3b5-b49f7d2d7480.png?v=1759017824' }, metafields: [] }
        ]
      }
    };

    const collection = mockCollections[handle] || mockCollections['all'];
    return { collection };
  }
}

export default function CollectionHandle() {
  const {collection} = useLoaderData<typeof loader>();
  
  return (
    <div style={{
      background: '#000',
      color: '#fff',
      minHeight: '100vh',
      paddingTop: '0px' // No padding below header
    }}>
      {/* Collection Header - BodyArmor Style */}
      <section style={{
        padding: '15px 2rem 0.5rem', // 15px top padding
        background: '#000',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: 'clamp(4rem, 8vw, 6rem)', // BodyArmor bigger header size
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            lineHeight: 0.9,
            color: '#fff',
            marginBottom: '0.5rem',
            marginTop: '0' // Reset h1 margin
          }}>
            {collection.title}
          </h1>
          <p style={{
            fontSize: '1.3rem', // BodyArmor bigger subtitle
            color: '#fff',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.5,
            marginTop: '12px' // Add 12px spacing between header and paragraph
          }}>
            {collection.description}
          </p>
        </div>
      </section>

      {/* BodyArmor JUMBO Responsive Product Grid */}
      <section style={{
        padding: '4rem clamp(1rem, 3vw, 2rem) clamp(1rem, 3vw, 2rem)', // 4rem top padding for increased spacing between paragraph and cards
        background: '#000',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{
          display: 'grid',
          // ALWAYS 3 jumbo cards - responsive scaling to fit screen
          gridTemplateColumns: 'repeat(3, 1fr)', // 3 equal columns always
          gap: 'clamp(0.25rem, 0.75vw, 0.5rem)', // Ultra-tight gap for maximum closeness between cards
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '100%',
          placeItems: 'center',
          padding: '0 clamp(0.5rem, 2vw, 1rem)' // Responsive side padding
        }}>
          {collection.products.map((product: any) => (
            <ProductCard
              key={product.id}
              id={product.id}
              handle={product.handle}
              title={product.title}
              image={product.featuredImage?.url || `https://via.placeholder.com/400x600/${getAccentHexForProduct(product.handle, product.title, product.tags, product.metafields).replace('#', '')}/FFFFFF?text=${encodeURIComponent(product.title)}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
