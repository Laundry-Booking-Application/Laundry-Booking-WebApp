import './App.css';
import Homepage from './js/presenters/homepage';
import ShowView from './js/presenters/viewManager';
import Navigation from './js/presenters/navigation';
import NavigationLogin from './js/presenters/navigationLogin';
import NavigationLogout from './js/presenters/navigationLogout';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const homepageHref = '#home';

function App({userModel}) {
  return (
    <div className='App'>
      <Navigation userModel={userModel} homepageHref={homepageHref}>
        <NavigationLogin userModel={userModel}/>
        <NavigationLogout userModel={userModel} goToHomePageHref={homepageHref}/>
      </Navigation>

      <ShowView hash={homepageHref}>
        <div>
          <Homepage/>
        </div>
      </ShowView>
      
      <ToastContainer/>
    </div>
  );
}

/**
 * Routes into the home page incase of invalid hash value was set.
 */
function defaultRoute() {
  const appRoutes = [homepageHref];
  if (!appRoutes.find(knownRoute => knownRoute === window.location.hash)) {
    window.location.hash = homepageHref;
  }
}

defaultRoute();
window.addEventListener('hashchange', defaultRoute);

export default App;