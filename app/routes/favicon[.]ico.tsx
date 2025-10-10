/**
 * Favicon.ico route handler
 * Serves the favicon in ICO format for browsers that specifically request it
 */

import type { LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { redirect } from 'react-router';

export async function loader({ request }: LoaderFunctionArgs) {
  // Redirect .ico requests to the SVG favicon
  // Most modern browsers prefer SVG but some still request .ico
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;
  
  // Redirect to the SVG favicon which is already configured in root.tsx
  return redirect(`${baseUrl}/favicon.svg`, 301);
}
