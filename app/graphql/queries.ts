// GraphQL queries for DrinkSip Shopify API

import {
  PRODUCT_CARD_FRAGMENT,
  PRODUCT_FULL_FRAGMENT,
  COLLECTION_FRAGMENT,
} from './fragments';

export const HOME_QUERY = `#graphql
  query HomeQuery($first: Int = 10) {
    products(first: $first, query: "title:DrinkSip OR title:Hazy OR title:Watermelon OR title:Blood Orange OR title:Lemon Lime OR title:311 OR title:Deftones") {
      nodes {
        ...ProductCard
      }
    }
    collections(first: 5, query: "title:DrinkSip OR title:Core OR title:Refresher OR title:Artist") {
      nodes {
        ...Collection
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
  ${COLLECTION_FRAGMENT}
`;

export const COLLECTION_QUERY = `#graphql
  query CollectionQuery($handle: String!, $first: Int = 20) {
    collection(handle: $handle) {
      ...Collection
      products(first: $first) {
        nodes {
          ...ProductCard
        }
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
  ${COLLECTION_FRAGMENT}
`;

export const PRODUCT_QUERY = `#graphql
  query ProductQuery($handle: String!) {
    product(handle: $handle) {
      ...ProductFull
    }
  }
  ${PRODUCT_FULL_FRAGMENT}
`;

export const PRODUCT_RECOMMENDATIONS_QUERY = `#graphql
  query ProductRecommendationsQuery($productId: ID!, $first: Int = 4) {
    productRecommendations(productId: $productId) {
      ...ProductCard
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

export const SEARCH_QUERY = `#graphql
  query SearchQuery($query: String!, $first: Int = 20) {
    products(first: $first, query: $query) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;