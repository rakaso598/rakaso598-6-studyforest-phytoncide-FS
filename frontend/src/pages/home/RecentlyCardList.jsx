import HomeCard from './HomeCard';
import styles from './RecentlyCardList.module.css';
const EXAMPLE_DATA = [
  {
    id: 1,
    title: 'UX 스터디',
    day: '62',
    points: 310,
    emoji: [
      {
        id: 1,
        count: 37,
        icon: '👍',
      },
      {
        id: 2,
        count: 14,
        icon: '🔥',
      },
      {
        id: 3,
        count: 8,
        icon: '💪',
      },
    ],
    content: 'Slow And Steady Wins The Race!!',
    author: '이유디',
  },
  {
    id: 2,
    title: 'Algorithm',
    day: '31',
    points: 280,
    emoji: [
      {
        id: 1,
        count: 25,
        icon: '👍',
      },
      {
        id: 2,
        count: 18,
        icon: '🔥',
      },
      {
        id: 3,
        count: 32,
        icon: '💪',
      },
    ],
    content: 'Solve PS',
    author: '김코딩',
  },
  {
    id: 3,
    title: 'React Pro',
    day: '45',
    points: 295,
    emoji: [
      {
        id: 1,
        count: 42,
        icon: '👍',
      },
      {
        id: 2,
        count: 21,
        icon: '🔥',
      },
      {
        id: 3,
        count: 38,
        icon: '💪',
      },
    ],
    content: 'Advanced',
    author: '박리액트',
  },
  {
    id: 4,
    title: 'CS Basic',
    day: '15',
    points: 150,
    emoji: [
      {
        id: 1,
        count: 28,
        icon: '👍',
      },
      {
        id: 2,
        count: 12,
        icon: '🔥',
      },
      {
        id: 3,
        count: 19,
        icon: '💪',
      },
    ],
    content: 'OS & DB',
    author: '최컴공',
  },
  {
    id: 5,
    title: 'CS Study',
    day: '15',
    points: 150,
    emoji: [
      {
        id: 1,
        count: 28,
        icon: '👍',
      },
      {
        id: 2,
        count: 12,
        icon: '🔥',
      },
      {
        id: 3,
        count: 19,
        icon: '💪',
      },
    ],
    content: 'Theory',
    author: '정씨에스',
  },
  {
    id: 6,
    title: 'TypeScript 마스터',
    day: '28',
    points: 245,
    emoji: [
      {
        id: 1,
        count: 31,
        icon: '👍',
      },
      {
        id: 2,
        count: 15,
        icon: '🔥',
      },
      {
        id: 3,
        count: 22,
        icon: '💪',
      },
    ],
    content: 'TS Deep Dive',
    author: '한타입',
  },
  {
    id: 7,
    title: 'Next.js 스터디',
    day: '40',
    points: 320,
    emoji: [
      {
        id: 1,
        count: 45,
        icon: '👍',
      },
      {
        id: 2,
        count: 28,
        icon: '🔥',
      },
      {
        id: 3,
        count: 33,
        icon: '💪',
      },
    ],
    content: 'SSR Master',
    author: '김넥스트',
  },
  {
    id: 8,
    title: 'Python 기초',
    day: '20',
    points: 180,
    emoji: [
      {
        id: 1,
        count: 22,
        icon: '👍',
      },
      {
        id: 2,
        count: 11,
        icon: '🔥',
      },
      {
        id: 3,
        count: 16,
        icon: '💪',
      },
    ],
    content: 'Basic Python',
    author: '박파이썬',
  },
  {
    id: 9,
    title: 'Node.js 백엔드',
    day: '35',
    points: 275,
    emoji: [
      {
        id: 1,
        count: 33,
        icon: '👍',
      },
      {
        id: 2,
        count: 19,
        icon: '🔥',
      },
      {
        id: 3,
        count: 25,
        icon: '💪',
      },
    ],
    content: 'Backend Dev',
    author: '이노드',
  },
  {
    id: 10,
    title: 'Docker 실전',
    day: '25',
    points: 230,
    emoji: [
      {
        id: 1,
        count: 29,
        icon: '👍',
      },
      {
        id: 2,
        count: 16,
        icon: '🔥',
      },
      {
        id: 3,
        count: 21,
        icon: '💪',
      },
    ],
    content: 'Container',
    author: '최도커',
  },
  {
    id: 11,
    title: 'AWS 클라우드',
    day: '50',
    points: 340,
    emoji: [
      {
        id: 1,
        count: 48,
        icon: '👍',
      },
      {
        id: 2,
        count: 31,
        icon: '🔥',
      },
      {
        id: 3,
        count: 36,
        icon: '💪',
      },
    ],
    content: 'Cloud Infra',
    author: '정클라우드',
  },
  {
    id: 12,
    title: 'Vue.js 입문',
    day: '22',
    points: 195,
    emoji: [
      {
        id: 1,
        count: 24,
        icon: '👍',
      },
      {
        id: 2,
        count: 13,
        icon: '🔥',
      },
      {
        id: 3,
        count: 18,
        icon: '💪',
      },
    ],
    content: 'Vue Basic',
    author: '김뷰',
  },
  {
    id: 13,
    title: '데이터베이스',
    day: '33',
    points: 260,
    emoji: [
      {
        id: 1,
        count: 35,
        icon: '👍',
      },
      {
        id: 2,
        count: 20,
        icon: '🔥',
      },
      {
        id: 3,
        count: 27,
        icon: '💪',
      },
    ],
    content: 'SQL Master',
    author: '이디비',
  },
  {
    id: 14,
    title: '머신러닝 기초',
    day: '45',
    points: 310,
    emoji: [
      {
        id: 1,
        count: 41,
        icon: '👍',
      },
      {
        id: 2,
        count: 25,
        icon: '🔥',
      },
      {
        id: 3,
        count: 32,
        icon: '💪',
      },
    ],
    content: 'ML Basic',
    author: '박머신',
  },
  {
    id: 15,
    title: '웹 보안',
    day: '30',
    points: 255,
    emoji: [
      {
        id: 1,
        count: 32,
        icon: '👍',
      },
      {
        id: 2,
        count: 17,
        icon: '🔥',
      },
      {
        id: 3,
        count: 23,
        icon: '💪',
      },
    ],
    content: 'Security',
    author: '최보안',
  },
];

const RecentlyCardList = () => {
  return (
    <div className={styles.recentStudyContainer}>
      <div className={styles.title}>최근 조회한 스터디</div>
      <div className={styles.cardListContainer}>
        <ul className={styles.cardList}>
          {EXAMPLE_DATA.map((data) => (
            <div key={data.id} className={styles.cardWrapper}>
              <HomeCard data={data} />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecentlyCardList;
