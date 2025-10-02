// GraphQL fragments for DrinkSip Shopify API

export const MONEY_FRAGMENT = `#graphql
  fragment Money on MoneyV2 {
    currencyCode
    amount
  }
`;

export const IMAGE_FRAGMENT = `#graphql
  fragment Image on Image {
    id
    url
    altText
    width
    height
  }
`;

export const PRODUCT_CARD_FRAGMENT = `#graphql
  fragment ProductCard on Product {
    id
    handle
    title
    description
    tags
    featuredImage {
      ...Image
    }
    priceRange {
      minVariantPrice {
        ...Money
      }
      maxVariantPrice {
        ...Money
      }
    }
    variants(first: 1) {
      nodes {
        id
        availableForSale
        selectedOptions {
          name
          value
        }
        price {
          ...Money
        }
      }
    }
  }
  ${IMAGE_FRAGMENT}
  ${MONEY_FRAGMENT}
`;

export const PRODUCT_FULL_FRAGMENT = `#graphql
  fragment ProductFull on Product {
    id
    handle
    title
    description
    descriptionHtml
    tags
    vendor
    productType
    createdAt
    updatedAt
    featuredImage {
      ...Image
    }
    images(first: 10) {
      nodes {
        ...Image
      }
    }
    priceRange {
      minVariantPrice {
        ...Money
      }
      maxVariantPrice {
        ...Money
      }
    }
    variants(first: 10) {
      nodes {
        id
        title
        availableForSale
        selectedOptions {
          name
          value
        }
        price {
          ...Money
        }
        compareAtPrice {
          ...Money
        }
      }
    }
    metafields(identifiers: [
      {namespace: "custom", key: "flavor_color"}
      {namespace: "custom", key: "series"}
      {namespace: "custom", key: "features"}
      {namespace: "custom", key: "nutrition_facts"}
      {namespace: "custom", key: "ingredients"}
    ]) {
      key
      value
      namespace
    }
    seo {
      title
      description
    }
  }
  ${IMAGE_FRAGMENT}
  ${MONEY_FRAGMENT}
`;

export const COLLECTION_FRAGMENT = `#graphql
  fragment Collection on Collection {
    id
    handle
    title
    description
    image {
      ...Image
    }
    seo {
      title
      description
    }
  }
  ${IMAGE_FRAGMENT}
`;