import { useGetFruitsQuery, useGetVegetablesQuery } from 'app/api';
import { Product } from 'components/Product/Product';
import { SearchInput } from 'components/SearchInput/SearchInput';
import GenericLoader from 'components/assets/Loaders/GenericLoader';
import { getTagName } from 'helpers/tagNameId';
import React, { useState } from 'react';
import { SyncLoader } from 'react-spinners';
import { ProductLayout } from 'styles/common/Product/layout';

export default function ProductList() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { data: fruits, isLoading: loadingFruit } = useGetFruitsQuery();
  const { data: vegies, isLoading: loadingVegie } = useGetVegetablesQuery();

  const products = [...(fruits || []), ...(vegies || [])];

  const filteredProducts =
    products &&
    products.filter((item) =>
      [item.name, item.description, ...(item.tags || []).map(getTagName)]
        .join('')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <ProductLayout>
      <div className="title">Products List</div>
      <SearchInput size="auto" onChange={handleChange} />
      <div className="products">
        {filteredProducts
          .filter((item) => !item.isArchived)
          .map((item) => (
            <Product key={item.id} product={item} />
          ))}
      </div>
      {filteredProducts.length === 0 && !loadingFruit && !loadingVegie && (
        <div>No products found..</div>
      )}
      {loadingFruit && loadingVegie && <GenericLoader size={20} color="grey" />}
    </ProductLayout>
  );
}
