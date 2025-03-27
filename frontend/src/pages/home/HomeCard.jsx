import styles from './HomeCard.module.css';
import pointIcon from '/images/icon/ic_point.svg';

const HomeCard = ({ data }) => {
  return (
    <li key={data.id} className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.headerTop}>
          <div className={styles.pointsContainer}>
            <img className={styles.pointIcon} src={pointIcon} alt='points' />
            <span className={styles.pointsText}>{data.points}</span>
            <span className={styles.pointsText}>획득</span>
          </div>

          <div className={styles.cardTitleContainer}>
            {/* TODO: 조건에 따라 작성자에 색상 넣어주기 */}
            <span>{data.author}</span>
            <span>의</span>
            <span>{data.title}</span>
          </div>
        </div>

        <div className={styles.cardDayContainer}>
          <span className={styles.cardDay}>{data.day}일째 진행 중</span>
        </div>
      </div>

      <div className={styles.cardContentContainer}>
        <span className={styles.cardContent}>{data.content}</span>
      </div>

      <ul className={styles.emojiContainer}>
        {data.emoji.map((emoji) => (
          <li key={emoji.id} className={styles.emoji}>
            <span>{emoji.icon}</span>
            <span>{emoji.count}</span>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default HomeCard;
