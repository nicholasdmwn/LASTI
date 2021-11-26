import Register from './Register';
import Qrcode from './Qrcode';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Keluar, Masuk } from './KeluarMasuk';

const routes = [
    { path: '/', Component: Register },
    { path: '/status', Component: Qrcode },
    { path: '/keluar/:id', Component: Keluar },
    { path: '/masuk/:id', Component: Masuk },
];

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {routes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={<route.Component></route.Component>}
                        ></Route>
                    ))}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
