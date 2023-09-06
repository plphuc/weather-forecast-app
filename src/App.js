import MainSection from 'components/MainSection/MainSection';
import DetailsSection from 'components/DetailsSection/DetailsSection';
import SearchSection from 'components/SearchSection/SearchSection';

import styles from './App.module.css';

function App() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainSectionWrapper}>
        <SearchSection />
        <MainSection />
      </div>
      <div className={styles.detailsSectionWrapper}><DetailsSection /></div>
    </div>
  );
}

export default App;
