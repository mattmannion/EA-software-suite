import 'bootstrap/dist/css/bootstrap.min.css';
import './sass/sass/index.scss';
import { render } from 'react-dom';
import AppRouter from './pages/Router';
import axios from 'axios';

axios.defaults.withCredentials = true;

render(<AppRouter />, document.getElementById('root'));
