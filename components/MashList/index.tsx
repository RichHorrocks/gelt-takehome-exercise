import { FC } from 'react';
import MashItem from '../MashItem';

import { TCategoryList } from '@/types/types';

interface MashListProps {
  mash: TCategoryList;
  deletedArray: string[];
}

const MashList: FC<MashListProps> = ({ mash, deletedArray }) => {
  return (
    <div className="inline-flex">
      {mash.itemArray.map((item: string) => (
        <MashItem key={item} item={item} deletedArray={deletedArray} />
      ))}
    </div>
  );
};

export default MashList;
