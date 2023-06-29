import AdminLayout from 'components/Layouts/AdminLayout';
import { ProductModal } from 'components/ProductModal/ProductModal';
import { SearchInput } from 'components/SearchInput/SearchInput';
import { Table } from 'components/Table/Table';
import { Modal } from 'components/assets/Modal/Modal';
import PrimaryButton from 'components/assets/PrimaryButton/PrimaryButton';
import { getTagName } from 'helpers/tagNameId';
import { useState } from 'react';
import { Fruit } from 'types/Fruit';
import { ProductTypeEnum } from 'types/Product';
import { Vegetable } from 'types/Vegetable';

interface ProductPageProps {
  data: (Fruit | Vegetable)[];
  productType: ProductTypeEnum;
  handleAdd: (product: Omit<Fruit, 'id'> | Omit<Vegetable, 'id'>) => void;
  handleUpdate: (product: Omit<Fruit, 'id'> | Omit<Vegetable, 'id'>) => void;
  handleDelete: (productId: string) => void;
  selectedProduct: Fruit | Vegetable | null;
  setSelectedProduct: (product: Fruit | Vegetable | null) => void;
  isAdding: boolean;
  setIsAdding: (isAdding: boolean) => void;
  deletingProductId: string | null;
  setDeletingProductId: (id: string | null) => void;
  closeModal: () => void;
}

export const ProductPage = ({
  data,
  productType,
  handleAdd,
  handleDelete,
  handleUpdate,
  selectedProduct,
  setSelectedProduct,
  deletingProductId,
  setDeletingProductId,
  isAdding,
  setIsAdding,
  closeModal,
}: ProductPageProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredData =
    data &&
    data.filter((product) =>
      [
        product.name,
        product.description,
        ...(product.tags || []).map(getTagName),
      ]
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleEditFruit = (product: Fruit | Vegetable) => {
    setSelectedProduct(product);
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsAdding(true);
  };

  const handleProductId = (productId: string) => {
    setDeletingProductId(productId);
  };

  const deletingProduct =
    data &&
    data.find((product: Fruit | Vegetable) => product.id === deletingProductId);

  return (
    <AdminLayout>
      <div className="buttons-wrapper">
        <SearchInput size="15rem" onChange={handleChange} />
        <div className="buttons">
          <PrimaryButton
            type="button"
            variant="success"
            onClick={handleAddProduct}
          >
            Add Product
          </PrimaryButton>
        </div>
      </div>
      <Table
        data={filteredData || []}
        handleEdit={handleEditFruit}
        handleDelete={handleProductId}
      />
      <ProductModal
        productType={productType}
        product={null}
        isOpen={isAdding}
        onClose={closeModal}
        onSubmit={handleAdd}
      />
      <Modal
        title={`Deleting ${deletingProduct?.name}`}
        isOpen={!!deletingProductId}
        onClose={() => setDeletingProductId(null)}
      >
        <p>Are you sure you want to delete this fruit?</p>
        <div className="delete-btn-wrapper">
          <PrimaryButton
            type="submit"
            variant="danger"
            onClick={() => {
              if (deletingProductId) {
                handleDelete(deletingProductId);
                setDeletingProductId(null);
              }
            }}
          >
            Yes, delete
          </PrimaryButton>
          <PrimaryButton
            type="button"
            variant="primary"
            onClick={() => setDeletingProductId(null)}
          >
            No, cancel
          </PrimaryButton>
        </div>
      </Modal>
      <ProductModal
        productType={productType}
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={closeModal}
        onSubmit={handleUpdate}
      />
    </AdminLayout>
  );
};
