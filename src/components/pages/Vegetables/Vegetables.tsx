import {
  useAddVegetableMutation,
  useDeleteVegetableMutation,
  useGetVegetablesQuery,
  useUpdateVegetableMutation,
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
import { Vegetable } from 'types/Vegetable';

export const Vegetables = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedVegie, setSelectedVegie] = useState<Vegetable | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deletingVegieId, setDeletingVegieId] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const { data: vegetables, isFetching } = useGetVegetablesQuery();
  const [updateVegetable, { isLoading: isUpdatingVegie }] =
    useUpdateVegetableMutation();
  const [addVegie, { isLoading: isAddingVegie }] = useAddVegetableMutation();
  const [deleteVegie, { isLoading: isDeleting }] = useDeleteVegetableMutation();

  useEffect(() => {
    setIsLoading(isAddingVegie || isUpdatingVegie || isDeleting || isFetching);
  }, [isAddingVegie, isUpdatingVegie, isDeleting, isFetching]);

  const filteredVegies =
    vegetables &&
    vegetables.filter((vegies) =>
      [vegies.name, vegies.description, ...(vegies.tags || []).map(getTagName)]
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleEditVegie = (vegie: Vegetable) => {
    setSelectedVegie(vegie);
  };

  const closeModal = () => {
    setSelectedVegie(null);
    setIsAdding(false);
  };

  const handleUpdateVegie = async (updatedVegie: Omit<Vegetable, 'id'>) => {
    if (!selectedVegie) {
      console.error('No selected vegetable to update');
      return;
    }

    try {
      await updateVegetable({ ...updatedVegie, id: selectedVegie.id });
      closeModal();
    } catch (error) {
      console.error(`Failed to update vegetable with error:`, error);
    }
  };

  const handleAddProduct = () => {
    setSelectedVegie(null);
    setIsAdding(true);
  };

  const handleAddVegie = async (newVegie: Omit<Vegetable, 'id'>) => {
    try {
      await addVegie(newVegie);
      closeModal();
      setIsAdding(false);
    } catch (error) {
      console.error(`Failed to add new vegetable with error:`, error);
    }
  };

  const handleDelete = (vegieId: string) => {
    setDeletingVegieId(vegieId);
  };

  const confirmDelete = async (vegieId: string) => {
    if (deletingVegieId) {
      try {
        await deleteVegie(deletingVegieId);
        setDeletingVegieId('');
      } catch (error) {
        console.error(
          `Failed to delete vegie with id ${deletingVegieId} with error:`,
          error
        );
      }
    }
  };

  const deletingVegie =
    vegetables &&
    vegetables.find((vegie: Vegetable) => vegie.id === deletingVegieId);

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
        data={filteredVegies || []}
        handleEdit={handleEditVegie}
        handleDelete={handleDelete}
      />
      {isLoading ? (
        <LoadWrapper>
          <ClipLoader size={200} color="blue" />
        </LoadWrapper>
      ) : (
        <>
          <ProductModal
            productType="vegetable"
            product={null}
            isOpen={isAdding}
            onClose={closeModal}
            onSubmit={handleAddVegie}
          />
          <Modal
            title={`Deleting ${deletingVegie?.name}`}
            isOpen={!!deletingVegieId}
            onClose={() => setDeletingVegieId(null)}
          >
            <p>Are you sure you want to delete this fruit?</p>
            <div className="delete-btn-wrapper">
              <PrimaryButton
                type="submit"
                variant="danger"
                onClick={() => {
                  if (deletingVegieId) {
                    confirmDelete(deletingVegieId);
                  }
                }}
              >
                Yes, delete
              </PrimaryButton>
              <PrimaryButton
                type="button"
                variant="primary"
                onClick={() => setDeletingVegieId(null)}
              >
                No, cancel
              </PrimaryButton>
            </div>
          </Modal>
          <ProductModal
            productType="vegetable"
            product={selectedVegie}
            isOpen={!!selectedVegie}
            onClose={closeModal}
            onSubmit={handleUpdateVegie}
          />
        </>
      )}
    </AdminLayout>
  );
};
