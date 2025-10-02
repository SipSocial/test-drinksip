// DrinkSip product accent color mapping

export const DRINKSIP_COLORS = {
  // Core Series
  'hazy-ipa': '#E8B122',
  'core-series': '#E8B122',
  
  // Refresher Series
  'watermelon-refresher': '#F05757',
  'watermelon': '#F05757',
  'blood-orange-refresher': '#ED5335',
  'blood-orange': '#ED5335',
  'lemon-lime-refresher': '#77C14A',
  'lemon-lime': '#77C14A',
  'refresher-series': '#F05757',
  
  // Artist Series
  '311-hazy-ipa': '#1E3A8A', // Deep blue for 311 can
  '311': '#1E3A8A', // Deep blue for 311 can
  'deftones-tone-zero-lager': '#2D2D2D', // Charcoal for Deftones
  'deftones': '#2D2D2D', // Charcoal for Deftones  
  'artist-series': '#1E3A8A',
  
  // Fallback
  'default': '#000000'
} as const;

export function getAccentHexForProduct(
  handle?: string | null,
  title?: string | null,
  tags?: string[] | null,
  metafields?: Array<{key: string; value: string; namespace: string}> | null
): string {
  // Check metafields first for custom color override
  if (metafields) {
    const colorMetafield = metafields.find(
      m => m.namespace === 'custom' && m.key === 'flavor_color'
    );
    if (colorMetafield?.value) {
      return colorMetafield.value;
    }
  }

  // Create search haystack from all available data
  const haystack = [
    handle || '',
    title?.toLowerCase() || '',
    ...(tags || [])
  ].join(' ').toLowerCase();

  // Check for specific product matches
  for (const [key, color] of Object.entries(DRINKSIP_COLORS)) {
    if (key !== 'default' && haystack.includes(key.toLowerCase())) {
      return color;
    }
  }

  // Fallback to black
  return DRINKSIP_COLORS.default;
}

export function getSeriesFromProduct(
  handle?: string | null,
  title?: string | null,
  tags?: string[] | null,
  metafields?: Array<{key: string; value: string; namespace: string}> | null
): string {
  // Check metafields first
  if (metafields) {
    const seriesMetafield = metafields.find(
      m => m.namespace === 'custom' && m.key === 'series'
    );
    if (seriesMetafield?.value) {
      return seriesMetafield.value;
    }
  }

  // Create search haystack
  const haystack = [
    handle || '',
    title?.toLowerCase() || '',
    ...(tags || [])
  ].join(' ').toLowerCase();

  // Determine series based on content
  if (haystack.includes('311') || haystack.includes('deftones') || haystack.includes('artist')) {
    return 'Artist Series';
  }
  if (haystack.includes('refresher') || haystack.includes('watermelon') || haystack.includes('blood-orange') || haystack.includes('lemon-lime')) {
    return 'Refresher Series';
  }
  if (haystack.includes('hazy') || haystack.includes('ipa') || haystack.includes('core')) {
    return 'Core Series';
  }

  return 'Core Series'; // Default fallback
}