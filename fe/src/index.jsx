import 'bootstrap/dist/css/bootstrap.min.css';
import './sass/sass/index.scss';
import { render } from 'react-dom';
import ApplicationRouter from './pages/Router';

render(<ApplicationRouter />, document.getElementById('root'));
