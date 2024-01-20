import ReactDOM from 'react-dom/client';

//provider redux
import { Provider } from 'react-redux';
import { store } from './app/store';

// routes
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

import './assets/styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
