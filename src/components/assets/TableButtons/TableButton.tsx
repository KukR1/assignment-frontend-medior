import DeleteButton from '../DeleteButton/DeleteButton';
import EditButton from '../EditButton/EditButton';

interface TableButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const TableButtons: React.FC<TableButtonsProps> = ({
  onEdit,
  onDelete,
}) => (
  <div style={{ display: 'flex', flexDirection: 'row', gap: '0.2rem' }}>
    <EditButton onEdit={onEdit} />
    <DeleteButton onDelete={onDelete} />
  </div>
);
