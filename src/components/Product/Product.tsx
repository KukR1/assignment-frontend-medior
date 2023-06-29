import { getTagColor } from 'helpers/getTagColor';
import { getTagName } from 'helpers/tagNameId';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Fruit } from 'types/Fruit';
import { Vegetable } from 'types/Vegetable';
import { StyledProduct } from './layout';

interface ProductProps {
  product: Fruit | Vegetable;
}

export const Product = ({ product }: ProductProps) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/product/${product.id}`);
  };
  return (
    <StyledProduct>
      <div onClick={handleOnClick}>
        <div className="name">{product.name}</div>
      </div>
      <div className="tags">
        {product.tags &&
          product.tags
            .filter((tagId) => tagId !== null && tagId !== undefined)
            .map((tagId) => ({ tagId, tagName: getTagName(tagId) }))
            .map(({ tagId, tagName }) => {
              return (
                tagName && (
                  <p
                    key={tagId}
                    style={{ backgroundColor: getTagColor(tagName) }}
                  >
                    {tagName}
                  </p>
                )
              );
            })}
      </div>
    </StyledProduct>
  );
};
