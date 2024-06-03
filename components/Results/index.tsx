import { FC } from 'react';

import { TCategoryList } from '@/types/types';

interface ResultsProps {
  data: TCategoryList[];
  deletedArray: string[];
}

const Results: FC<ResultsProps> = ({ data, deletedArray }) => {
  return (
    <div className="border border-gray-300 p-10 rounded-xl w-1/4 shadow-md mt-10">
      <h2 className="text-xl font-bold mb-4">Results!</h2>
      {data.map(category => (
        <div key={category.title}>
          {category.title} {'=>'}{' '}
          {category.itemArray
            .filter(item => !deletedArray.includes(item))
            .join(', ')}
        </div>
      ))}
    </div>
  );
};

export default Results;
