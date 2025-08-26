import { Suspense } from 'react';
import './App.css';
import AppCore from './components/app-core/app-core.tsx';
import CircleLoader from './components/circle-loader/circle-loader.tsx';

function App() {
  return (
    <Suspense fallback={<CircleLoader />}>
      <AppCore />
    </Suspense>
  );
}

export default App;
