import { sportList } from '@/constants/sportList';
import { UseFormSetValue } from 'react-hook-form';
import { useState } from 'react';

import iconArrowDown from '@/assets/images/icon-arrow-down.svg';
import iconCheck from '@/assets/images/icon-check.svg';

import './styles.scss';

type Props = {
  sportSelected: string;
  setValue: UseFormSetValue<any>;
};

export default function SelectSport({
  sportSelected,
  setValue,
}: Props) {
  const [openList, setOpenList] = useState<boolean>(false);

  return (
    <ul
      className="select-sport-list"
      onClick={() => setOpenList((prev) => !prev)}
    >
      <p className="label">
        {sportSelected
          ? sportSelected
          : 'Sélectionner une discipline'}
        <img src={iconArrowDown} alt="fleche" />
      </p>

      {openList && (
        <div>
          <li onClick={() => setValue('sport', '')}>Aucun</li>
          {sportList.map((sport) => (
            <li
              onClick={() => setValue('sport', sport.name)}
              key={sport.name}
            >
              <img
                className="icon-sport"
                src={sport.img}
                alt={sport.name}
              />
              <p>{sport.name}</p>

              {sportSelected === sport.name && (
                <img className="check" src={iconCheck} alt="check" />
              )}
            </li>
          ))}
        </div>
      )}
    </ul>
  );
}
