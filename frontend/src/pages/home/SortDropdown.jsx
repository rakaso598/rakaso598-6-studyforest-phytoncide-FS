import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import styles from './SortDropdown.module.css';
import { useState } from 'react';
import { SORT_OPTIONS } from '@api/home/getStudy.api';

const SortDropdown = ({ sortType, clickSortOption }) => {
  const options = Object.keys(SORT_OPTIONS);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.filterContainer}>
      <div className={styles.dropdown} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.selected}>{sortType}</span>

        {isOpen ? (
          <span className={styles.arrow}>
            <RiArrowDownSFill />
          </span>
        ) : (
          <span className={styles.arrow}>
            <RiArrowUpSFill />
          </span>
        )}

        {isOpen && (
          <ul className={styles.dropdownMenu}>
            {options.map((option) => (
              <li
                key={option}
                onClick={() => clickSortOption(option)}
                className={styles.dropdownItem}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;
