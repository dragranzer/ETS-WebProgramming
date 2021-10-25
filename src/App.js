import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import Home from './UserPages/Home';
import Login from './UserPages/Login';
import Register from './UserPages/Register';
import AboutUs from './UserPages/AboutUs';
import NotFound from './UserPages/NotFound';
import LoginAdmin from './AdminPages/Login';
import Profile from './UserPages/Profile';
import HomeAdmin from './AdminPages/Home';
import InputAdmin from './AdminPages/Input';
import DetailFish from './UserPages/DetailFish';
import Keranjang from './UserPages/Keranjang';
import EditFish from './AdminPages/EditFish';
import Checkout from './UserPages/Checkout';
import Success from './UserPages/Success';
import ListReport from './AdminPages/ListReport';
import AboutUsAdmin from './AdminPages/AboutUsAdmin';
import AboutUsLogin from './UserPages/AboutUsLogin';

import {store, persistor} from "./store/store";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
            <Route exact path="/" render={() => <Login />}/>
            <Route exact path="/about-us-login" render={() => <AboutUsLogin />}/>
            <Route exact path="/home" render={() => <Home />}/>
            <Route exact path="/register" render={() => <Register />}/>
            <Route exact path="/about-us" render={() => <AboutUs />}/>
            <Route exact path="/profile" render={() => <Profile />}/>
            <Route exact path="/detail-fish" render={() => <DetailFish />}/>
            <Route exact path="/keranjang" render={() => <Keranjang />}/>
            <Route exact path="/checkout" render={() => <Checkout />}/>
            <Route exact path="/success" render={() => <Success />}/>
            <Route exact path="/log-admin" render={() => <LoginAdmin />}/>
            <Route exact path="/home-admin" render={() => <HomeAdmin />}/>
            <Route exact path="/input" render={() => <InputAdmin />}/>
            <Route exact path="/edit-fish" render={() => <EditFish />}/>
            <Route exact path="/report" render={() => <ListReport />}/>
            <Route exact path="/about-us-admin" render={() => <AboutUsAdmin />}/>
            <Route exact path="*" render={() => <NotFound />}/>
          </Switch>
        </Router>
     </PersistGate>
    </Provider>
  );
}

export default App;
