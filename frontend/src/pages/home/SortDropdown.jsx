import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import styles from "./SortDropdown.module.css";
import { useState } from "react";
import { SORT_OPTIONS } from "@api/home/home.api";

const SORT_LABEL_MAP = {
  latest: "최근 순",
  oldest: "오래된 순",
  highest_point: "많은 포인트 순",
  lowest_point: "적은 포인트 순",
};

const SortDropdown = ({ sortType, clickSortOption }) => {
  const options = Object.keys(SORT_OPTIONS);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.filterContainer}>
      <div className={styles.dropdown} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.selected}>{SORT_LABEL_MAP[sortType]}</span>

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
                {SORT_LABEL_MAP[option]}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;
