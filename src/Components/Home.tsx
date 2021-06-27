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
      <div className={styles.editor}>
        <Editor />
      </div>
      <div className={styles.output}>
        <Output />
      </div>
    </div>
  </div>
);

export default Home;
