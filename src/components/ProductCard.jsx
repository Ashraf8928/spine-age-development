export default function ProductCard({ product }) {

  const image = product.images?.[0]?.src;
  const price = product.variants?.[0]?.price;
  const comparePrice = product.variants?.[0]?.compare_at_price;

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden max-w-sm">

      {/* Image */}
      <div className="relative">
        <img
          src={image}
          alt={product.title}
          className="w-full h-[260px] object-cover"
        />

        <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs px-3 py-1 rounded-lg">
          SPINE SCORE
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">

        <h3 className="text-lg font-semibold text-indigo-900">
          {product.title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-2">
          {product.body_html.replace(/<[^>]+>/g, "").slice(0, 90)}...
        </p>

        {/* Price Box */}
        <div className="flex items-center gap-3">
          <span className="bg-yellow-400 px-3 py-1 font-bold text-lg">
            Rs. {price}
          </span>

          {comparePrice && (
            <span className="text-gray-400 line-through">
              Rs. {comparePrice}
            </span>
          )}
        </div>

        {/* Button */}
        <a
          href={`/products/${product.handle}`}
          className="inline-block border border-indigo-700 text-indigo-700 px-5 py-2 rounded-full hover:bg-indigo-700 hover:text-white transition"
        >
          Shop Now
        </a>

      </div>
    </div>
  );
}