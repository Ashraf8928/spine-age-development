import { useEffect, useState } from "react";
import { scoreBasedProduct } from "@/data/scoreBasedProduct";
import ProductCard from "./ProductCard";

export default function ProductRecom({ score }) {

  const [products, setProducts] = useState([]);

  // score cap at 19
  const finalScore = Math.min(score, 19);

  // find matched score data
  const scoreBasedData = scoreBasedProduct.find(
    item => item.score === finalScore
  );

  console.log("scoreBasedData" , scoreBasedData);

  // 🔥 fetch products using handle
  useEffect(() => {
    if (!scoreBasedData?.product) return;

    const fetchProducts = async () => {
      try {
        const responses = await Promise.all(
          scoreBasedData.product.map(async (item) => {
            const res = await fetch(
              `https://nilkamalsleep.com/products/${item.handle}.json`
            );
            const data = await res.json();
            return data.product;
          })
        );

        setProducts(responses);
      } catch (error) {
        console.error("Product fetch error:", error);
      }
    };

    fetchProducts();
  }, [scoreBasedData]);

  return (
    <div className="w-full">

      <h2 className="text-xl font-semibold mb-6">
        Product recommend {score}
      </h2>

      <h3>
        Key Message : {scoreBasedData.key_message}
      </h3>

      <h3>
        Description : {scoreBasedData.description}
      </h3>

      <h3>
        spineAgeIndication : {scoreBasedData.spineAgeIndication}
      </h3>

      {/* Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </div>
  );
}