import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { Product } from 'components/Product/Product';
import React from 'react';
import { ProductLayout } from 'styles/common/Product/layout';

export default function RecentlyViewed() {
  const products = useAppSelector(
    (state: RootState) => state.recentlyViewedProducts.products
  );

  return (
    <ProductLayout>
      <div className="title">Recently Viewed Products</div>
      {!products || products.length === 0 ? (
        <div>No recently viewed products.</div>
      ) : (
        <div className="products">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      )}
    </ProductLayout>
  );
}
