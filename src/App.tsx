import { Suspense } from 'react';
import styles from './app.module.css';
import AppCore from './components/app-core/app-core.tsx';
import { Skeleton } from './components/skeleton/skeleton.tsx';

function App() {
  return (
    <Suspense
      fallback={
        <div className={styles.fallback}>
          <Skeleton />
        </div>
      }
    >
      <AppCore />
    </Suspense>
  );
}

export default App;
