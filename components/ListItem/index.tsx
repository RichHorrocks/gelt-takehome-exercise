import { FC } from 'react';

const styles = {
  active: 'text-gray-600',
  inactive: 'text-red-300 line-through',
  deleting: 'animate-ping text-lg text-red-600',
};

interface ListItemProps {
  item: string;
  deletedArray: string[];
}

const ListItem: FC<ListItemProps> = ({ item, deletedArray }) => {
  if (item === deletedArray[deletedArray.length - 1]) {
    return <div className={styles.deleting}>{item}</div>;
  }
  if (deletedArray.includes(item)) {
    return <div className={styles.inactive}>{item}</div>;
  }
  return <div className={styles.active}>{item}</div>;
};

export default ListItem;
