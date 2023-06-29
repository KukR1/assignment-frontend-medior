import { Fruit } from 'types/Fruit';
import React, { useState, useEffect } from 'react';
import { Modal } from 'components/assets/Modal/Modal';
import { Vegetable } from 'types/Vegetable';
import PrimaryButton from 'components/assets/PrimaryButton/PrimaryButton';
import { fruitTags } from 'app/mocks/fruitTags';
import { Tag } from 'types/Tag';
import { FormLayout } from 'components/ProductModal/layout';
import { vegetableTags } from 'app/mocks/vegetableTags';

interface ProductModalProps {
  product: Fruit | Vegetable | null;
  productType: 'fruit' | 'vegetable';
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: Omit<Fruit | Vegetable, 'id'>) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  productType,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Omit<Fruit | Vegetable, 'id'>>({
    name: product ? product.name : '',
    description: product ? product.description : '',
    tags: product ? product.tags || [] : ([] as string[]),
    isArchived: product ? product.isArchived || false : false,
  });

  const tags = productType === 'fruit' ? fruitTags : vegetableTags;

  useEffect(() => {
    setFormData({
      name: product ? product.name : '',
      description: product ? product.description : '',
      tags: product ? product.tags || [] : ([] as string[]),
      isArchived: product ? product.isArchived || false : false,
    });
  }, [product]);

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      tags: event.target.checked
        ? [...(formData.tags || []), event.target.name]
        : (formData.tags || []).filter((tag) => tag !== event.target.name),
    });
  };

  const handleArchivedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      isArchived: event.target.checked,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (product) {
      onSubmit({
        ...product,
        ...formData,
      });
    } else {
      onSubmit(formData);
    }
    setFormData({
      name: '',
      description: '',
      tags: [],
      isArchived: false,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      title={!product ? 'Add new product' : `Updating ${product.name}`}
      onClose={onClose}
    >
      <FormLayout>
        <form onSubmit={handleSubmit}>
          <div className="form-wrapper">
            <div className="input-wrapper">
              <p> Name</p>
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-wrapper">
              <p> Description</p>
              <textarea
                required
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="lower-form-wrapper">
              <div>
                <p>Tags</p>
                {tags.map((tag: Tag) => (
                  <div key={tag.id}>
                    <label>
                      <input
                        type="checkbox"
                        name={tag.id}
                        checked={
                          formData.tags && formData.tags.includes(tag.id)
                        }
                        onChange={handleCheckboxChange}
                      />
                      {tag.name}
                    </label>
                  </div>
                ))}
              </div>
              <div className="archive-wrapper">
                <p>Archive</p>
                <input
                  type="checkbox"
                  name="isArchived"
                  checked={formData.isArchived}
                  onChange={handleArchivedChange}
                />
              </div>
            </div>
            <div className="buttons-wrapper">
              <PrimaryButton type="submit" variant={'primary'}>
                {!product ? 'Submit' : 'Update'}
              </PrimaryButton>
              <PrimaryButton
                variant={'secondary'}
                type="button"
                onClick={onClose}
              >
                Cancel
              </PrimaryButton>
            </div>
          </div>
        </form>
      </FormLayout>
    </Modal>
  );
};
