import { useState, useRef } from 'react';
import { Inter } from 'next/font/google';

import CategoryList from '@/components/CategoryList';
import MashList from '@/components/MashList';
import CustomButton from '@/components/CustomButton';
import Results from '@/components/Results';

import { generateRandomDiceRoll } from '@/utils/diceHelper';
import { TCategoryList } from '@/types/types';
import { startData } from '@/data/startData';

const inter = Inter({ subsets: ['latin'] });

/**
 * The maximum number of the dice roll.
 * This is used to determine the number of items to skip in the list.
 */
const DICE_MAX = 8;

/**
 * The number of items a user must add to each category.
 */
const ITEMS_PER_CATEGORY = 4;

/**
 * The number of categories in the game.
 */
const CATEGORY_COUNT = 4;

export default function Home() {
  const [gameData, setGameData] = useState<TCategoryList[]>(startData);
  const [addedCount, setAddedCount] = useState(0);
  const [gameOn, setGameOn] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [deletedArray, setDeletedArray] = useState<string[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const gameStop = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setGameOn(false);
    setGameFinished(true);
  };

  /**
   * Main algorithm:
   * 1. Generate a random number between 1 and DICE_MAX.
   * 2. Increment a counter by that number.
   * 3. Use the counter to select an item from a flattened array of all options
   * across all categories.
   * 4. Add that item to the deletedArray.
   * 5. If any of the categories only have a single item
   * left, remove that item from the flattened array to prevent it being
   * considered from here on.
   * 6. If the flattened array is empty, stop the game.
   * 7. Repeat from step 1.
   */
  const handleStartClick = () => {
    let counter = 0;
    let deletedArray: string[] = [];

    const rollInterval = generateRandomDiceRoll(DICE_MAX);
    let flatArray = gameData.map(item => item.itemArray).flat();

    const id = setInterval(() => {
      counter += rollInterval;

      let toDelete = flatArray[counter % flatArray.length];
      flatArray = flatArray.filter(item => item !== toDelete);

      deletedArray = [...deletedArray, toDelete];
      setDeletedArray(deletedArray);

      /**
       * Algorithm gotcha: If any of the categories only have a single item
       * left, remove that item from the flattened array to prevent it being
       * considered from here on.
       *
       * There must be a better way to do this!?
       */
      for (let category of gameData) {
        if (
          category.itemArray.filter(item => flatArray.includes(item)).length ===
          1
        ) {
          flatArray = flatArray.filter(
            item => !category.itemArray.includes(item)
          );
        }
      }

      if (flatArray.length === 0) {
        setDeletedArray([...deletedArray, '']);
        gameStop();
      }
    }, 1000);

    intervalRef.current = id;
    setGameOn(true);
  };

  const handleAddItem = (listTitle: string, newValue: string) => {
    const updatedData = gameData.map(item => {
      if (item.title === listTitle) {
        return {
          ...item,
          itemArray: [...item.itemArray, newValue],
        };
      }
      return item;
    });

    setGameData(updatedData);
    setAddedCount(addedCount + 1);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center my-10 ${inter.className}`}
    >
      <div className="mb-10">
        <MashList mash={gameData[0]} deletedArray={deletedArray} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-1/2">
        {gameData.slice(1).map(categoryItem => (
          <CategoryList
            key={categoryItem.title}
            list={categoryItem}
            handleAddItem={handleAddItem}
            deletedArray={deletedArray}
          />
        ))}
      </div>

      {!gameOn && addedCount !== ITEMS_PER_CATEGORY * CATEGORY_COUNT && (
        <div className="mt-10 text-xl">
          <div>Please add 4 items per category.</div>
        </div>
      )}

      {!gameOn &&
        !gameFinished &&
        addedCount === ITEMS_PER_CATEGORY * CATEGORY_COUNT && (
          <div className="mt-10">
            <CustomButton
              handleClick={handleStartClick}
              text={'Start the game!'}
              emoji={'🚀'}
            />
          </div>
        )}

      {gameOn && (
        <div className="mt-10">
          <div className="text-2xl">
            Working... <span className="animate-ping">⌛</span>
          </div>
        </div>
      )}

      {gameFinished && !gameOn && (
        <>
          <Results data={gameData} deletedArray={deletedArray} />
          <div className="mt-10">
            <CustomButton
              handleClick={handleStartClick}
              text={'Play again!'}
              emoji={'🚀'}
            />
          </div>
        </>
      )}
    </main>
  );
}
