import {
  useAddFruitMutation,
  useDeleteFruitMutation,
  useGetFruitsQuery,
  useUpdateFruitMutation,
} from 'app/api';
import AdminLayout from 'components/Layouts/AdminLayout';
import { ProductModal } from 'components/ProductModal/ProductModal';
import { SearchInput } from 'components/SearchInput/SearchInput';
import { Table } from 'components/Table/Table';
import { Modal } from 'components/assets/Modal/Modal';
import PrimaryButton from 'components/assets/PrimaryButton/PrimaryButton';
import { getTagName } from 'helpers/tagNameId';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { LoadWrapper } from 'styles/common/helpers/loaders';
import { Fruit } from 'types/Fruit';

export const Fruits = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedFruit, setSelectedFruit] = useState<Fruit | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deletingFruitId, setDeletingFruitId] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const { data: fruits, isFetching } = useGetFruitsQuery();
  const [updateFruit, { isLoading: isUpdatingFruit }] =
    useUpdateFruitMutation();
  const [addFruit, { isLoading: isAddingFruit }] = useAddFruitMutation();
  const [deleteFruit, { isLoading: isDeleting }] = useDeleteFruitMutation();

  useEffect(() => {
    setIsLoading(isAddingFruit || isUpdatingFruit || isDeleting || isFetching);
  }, [isAddingFruit, isUpdatingFruit, isDeleting, isFetching]);

  const filteredFruits =
    fruits &&
    fruits.filter((fruit) =>
      [fruit.name, fruit.description, ...(fruit.tags || []).map(getTagName)]
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleEditFruit = (fruit: Fruit) => {
    setSelectedFruit(fruit);
  };

  const closeModal = () => {
    setSelectedFruit(null);
    setIsAdding(false);
  };

  const handleUpdateFruit = async (updatedFruit: Omit<Fruit, 'id'>) => {
    if (!selectedFruit) {
      console.error('No selected fruit to update');
      return;
    }

    try {
      await updateFruit({ ...updatedFruit, id: selectedFruit.id });
      closeModal();
    } catch (error) {
      console.error(
        `Failed to update ${selectedFruit.name} with error:`,
        error
      );
    }
  };

  const handleAddProduct = () => {
    setSelectedFruit(null);
    setIsAdding(true);
  };

  const handleAddFruit = async (newFruit: Omit<Fruit, 'id'>) => {
    try {
      await addFruit(newFruit);
      closeModal();
      setIsAdding(false);
    } catch (error) {
      console.error(`Failed to add ${newFruit.name} with error:`, error);
    }
  };

  const handleDelete = (fruitId: string) => {
    setDeletingFruitId(fruitId);
  };

  const confirmDelete = async () => {
    if (deletingFruitId)
      try {
        await deleteFruit(deletingFruitId);
        setDeletingFruitId(null);
      } catch (error) {
        console.error(
          `Failed to delete fruit with id ${deletingFruitId} with error:`,
          error
        );
      }
  };

  const deletingFruit =
    fruits && fruits.find((fruit: Fruit) => fruit.id === deletingFruitId);

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
        data={filteredFruits || []}
        handleEdit={handleEditFruit}
        handleDelete={handleDelete}
      />
      {isLoading ? (
        <LoadWrapper>
          <ClipLoader size={200} color="blue" />
        </LoadWrapper>
      ) : (
        <>
          <ProductModal
            productType="fruit"
            product={null}
            isOpen={isAdding}
            onClose={closeModal}
            onSubmit={handleAddFruit}
          />
          <Modal
            title={`Deleting ${deletingFruit?.name}`}
            isOpen={!!deletingFruitId}
            onClose={() => setDeletingFruitId(null)}
          >
            <p>Are you sure you want to delete this fruit?</p>
            <div className="delete-btn-wrapper">
              <PrimaryButton
                type="submit"
                variant="danger"
                onClick={confirmDelete}
              >
                Yes, delete
              </PrimaryButton>
              <PrimaryButton
                type="button"
                variant="primary"
                onClick={() => setDeletingFruitId(null)}
              >
                No, cancel
              </PrimaryButton>
            </div>
          </Modal>
          <ProductModal
            productType="fruit"
            product={selectedFruit}
            isOpen={!!selectedFruit}
            onClose={closeModal}
            onSubmit={handleUpdateFruit}
          />
        </>
      )}
    </AdminLayout>
  );
};
