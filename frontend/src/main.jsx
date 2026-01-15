import { createRoot } from 'react-dom/client';
import './index.css';
import Shop from './Shop.jsx';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { NotificationProvider } from '@/context';
import { ScrollToTop } from './utils';

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<ScrollToTop />
		<Provider store={store}>
			<NotificationProvider>
				<Shop />
			</NotificationProvider>
		</Provider>
	</BrowserRouter>,
);
