import { FC, useState } from 'react';
import ListItem from '../ListItem';
import { TCategoryList } from '@/types/types';

interface CategoryListProps {
  list: TCategoryList;
  handleAddItem: (listTitle: string, newValue: string) => void;
  deletedArray: string[];
}

const CategoryList: FC<CategoryListProps> = ({
  list,
  handleAddItem,
  deletedArray,
}) => {
  const [newItem, setNewItem] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setNewItem('');
      handleAddItem(list.title, newItem);
    }
  };

  return (
    <div className="border-gray-300 border px-10 py-10 rounded-xl shadow-md">
      <div className="text-lg mb-5">{list.title}</div>
      <div>
        {list.itemArray.map(item => (
          <ListItem key={item} item={item} deletedArray={deletedArray} />
        ))}
      </div>
      {list.itemArray.length < 4 && (
        <input
          type="text"
          width={300}
          value={newItem}
          className="border border-gray-300 rounded-md p-2"
          placeholder="Add new item and press Enter"
          onChange={e => setNewItem(e.target.value)}
          onKeyDown={e => handleKeyDown(e)}
        />
      )}
    </div>
  );
};

export default CategoryList;
