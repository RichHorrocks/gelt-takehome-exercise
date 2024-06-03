import { FC } from 'react';

const styles = {
  active: 'text-3xl font-bold text-gray-600',
  inactive: 'text-3xl font-bold text-red-300 line-through',
  deleting: 'text-3xl font-bold animate-ping text-red-600',
};

interface MashItemProps {
  item: string;
  deletedArray: string[];
}

const MashItem: FC<MashItemProps> = ({ item, deletedArray }) => {
  if (item === deletedArray[deletedArray.length - 1]) {
    return <div className={styles.deleting}>{item[0]}</div>;
  }
  if (deletedArray.includes(item)) {
    return <div className={styles.inactive}>{item[0]}</div>;
  }
  return <div className={styles.active}>{item[0]}</div>;
};

export default MashItem;
