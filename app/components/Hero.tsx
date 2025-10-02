// Giant "WAKE UP HAPPY" behind the can, black background
// Use a featured product or the first product for the can image

type ProductCard = {
  title: string;
  handle: string;
  featuredImage?: { url: string; altText?: string | null } | null;
};

export function Hero({product}: {product?: ProductCard | null}) {
  return (
    <section className="relative overflow-hidden bg-ds-black">
      <div className="max-w-7xl mx-auto px-4 pt-14 pb-24 md:pt-24 md:pb-32">
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="w-full h-full grid place-items-center">
            <span className="text-white/8 font-display font-black uppercase tracking-tightest text-hero text-center">
              WAKE<br/>UP<br/>HAPPY
            </span>
          </div>
        </div>
        <div className="relative mx-auto grid place-items-center">
          {product?.featuredImage ? (
            <img
              src={product.featuredImage.url}
              alt={product.featuredImage.altText ?? product.title}
              className="w-[60vw] max-w-[600px] h-auto drop-shadow-2xl"
            />
          ) : (
            <div className="w-[60vw] max-w-[600px] h-[60vw] max-h-[600px] bg-white/5 rounded-2xl" />
          )}
          <div className="mt-10 flex gap-4">
            <a href="/collections/all" className="px-6 py-3 rounded-2xl bg-ds-white text-ds-black font-bold uppercase">Shop Now</a>
            <a href="/pages/ar" className="px-6 py-3 rounded-2xl border border-white/40 text-ds-white font-bold uppercase">Try AR</a>
          </div>
        </div>
      </div>
    </section>
  );
}
