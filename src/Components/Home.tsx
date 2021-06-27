import Editor from './Editor';
import Header from './Header';
import styles from './Home.module.scss';
import Output from './Output';

const Home: React.FC = () => (
  <div className={styles.home}>
    <div className={styles.header}>
      <Header />
    </div>
    <div className={styles.mainBody}>
      <Editor />
    </div>
  </div>
);

export default Home;
