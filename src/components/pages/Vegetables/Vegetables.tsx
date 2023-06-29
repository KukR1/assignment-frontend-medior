import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { LoadWrapper } from 'styles/common/helpers/loaders';
import { ProductPage } from '../ProductPage/ProductPage';
import { Vegetable } from 'types/Vegetable';
import {
  useAddVegetableMutation,
  useDeleteVegetableMutation,
  useGetVegetablesQuery,
  useUpdateVegetableMutation,
} from 'app/api';

export const Vegetables = () => {
  const [selectedVegetable, setSelectedVegetable] = useState<Vegetable | null>(
    null
  );
  const [isAdding, setIsAdding] = useState(false);
  const [deletingVegetableId, setDeletingVegetableId] = useState<string | null>(
    null
  );

  const { data: vegetables, isFetching } = useGetVegetablesQuery();
  const [updateVegetables, { isLoading: isUpdatingVegetables }] =
    useUpdateVegetableMutation();
  const [addVegetables, { isLoading: isAddingVegetables }] =
    useAddVegetableMutation();
  const [deleteVegetables, { isLoading: isDeleting }] =
    useDeleteVegetableMutation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(
      isAddingVegetables || isUpdatingVegetables || isDeleting || isFetching
    );
    closeModal();
  }, [isAddingVegetables, isUpdatingVegetables, isDeleting, isFetching]);

  const closeModal = () => {
    setSelectedVegetable(null);
    setIsAdding(false);
  };

  const handleUpdateVegetable = async (
    updatedVegetables: Omit<Vegetable, 'id'>
  ) => {
    if (!selectedVegetable) {
      console.error('No selected Vegetables to update');
      return;
    }

    try {
      await updateVegetables({
        ...updatedVegetables,
        id: selectedVegetable.id,
      });
    } catch (error) {
      console.error(
        `Failed to update ${selectedVegetable.name} with error:`,
        error
      );
    }
  };

  const handleAddVegetables = async (newVegetable: Omit<Vegetable, 'id'>) => {
    try {
      await addVegetables(newVegetable);
      setIsAdding(false);
    } catch (error) {
      console.error(`Failed to add ${newVegetable.name} with error:`, error);
    }
  };

  const confirmDelete = async () => {
    if (deletingVegetableId)
      try {
        await deleteVegetables(deletingVegetableId);
        setDeletingVegetableId(null);
      } catch (error) {
        console.error(
          `Failed to delete Vegetables with id ${deletingVegetableId} with error:`,
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
        data={vegetables || []}
        productType="vegetable"
        handleAdd={handleAddVegetables}
        handleUpdate={handleUpdateVegetable}
        handleDelete={confirmDelete}
        selectedProduct={selectedVegetable}
        setSelectedProduct={setSelectedVegetable}
        isAdding={isAdding}
        setIsAdding={setIsAdding}
        setDeletingProductId={setDeletingVegetableId}
        deletingProductId={deletingVegetableId}
        closeModal={closeModal}
      />
    </>
  );
};
