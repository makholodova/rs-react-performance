import { Suspense } from 'react';
import styles from './app.module.css';
import AppCore from './components/app-core/app-core.tsx';
import CircleLoader from './components/circle-loader/circle-loader.tsx';

function App() {
  return (
    <Suspense
      fallback={
        <div className={styles.fallback}>
          <CircleLoader />
        </div>
      }
    >
      <AppCore />
    </Suspense>
  );
}

export default App;
