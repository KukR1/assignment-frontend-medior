import {
  useAddFruitMutation,
  useDeleteFruitMutation,
  useGetFruitsQuery,
  useUpdateFruitMutation,
} from 'app/api';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { LoadWrapper } from 'styles/common/helpers/loaders';
import { Fruit } from 'types/Fruit';
import { ProductPage } from '../ProductPage/ProductPage';
import { Vegetable } from 'types/Vegetable';

export const Fruits = () => {
  const [selectedFruit, setSelectedFruit] = useState<Fruit | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deletingFruitId, setDeletingFruitId] = useState<string | null>(null);

  const { data: fruits, isFetching } = useGetFruitsQuery();
  const [updateFruit, { isLoading: isUpdatingFruit }] =
    useUpdateFruitMutation();
  const [addFruit, { isLoading: isAddingFruit }] = useAddFruitMutation();
  const [deleteFruit, { isLoading: isDeleting }] = useDeleteFruitMutation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(isAddingFruit || isUpdatingFruit || isDeleting || isFetching);
    closeModal();
  }, [isAddingFruit, isUpdatingFruit, isDeleting, isFetching]);

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
    } catch (error) {
      console.error(
        `Failed to update ${selectedFruit.name} with error:`,
        error
      );
    }
  };

  const handleAddFruit = async (newFruit: Omit<Fruit, 'id'>) => {
    try {
      await addFruit(newFruit);
      setIsAdding(false);
    } catch (error) {
      console.error(`Failed to add ${newFruit.name} with error:`, error);
    }
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

  return (
    <>
      {isLoading && (
        <LoadWrapper>
          <ClipLoader size={200} color="blue" />
        </LoadWrapper>
      )}
      <ProductPage
        data={fruits || []}
        productType={'fruit'}
        handleAdd={handleAddFruit}
        handleUpdate={handleUpdateFruit}
        handleDelete={confirmDelete}
        selectedProduct={selectedFruit}
        setSelectedProduct={setSelectedFruit}
        isAdding={isAdding}
        setIsAdding={setIsAdding}
        setDeletingProductId={setDeletingFruitId}
        deletingProductId={deletingFruitId}
        closeModal={closeModal}
      />
    </>
  );
};
