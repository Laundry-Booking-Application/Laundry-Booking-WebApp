import './App.css';
import Homepage from './js/presenters/homepage';
import ShowView from './js/presenters/viewManager';
import Navigation from './js/presenters/navigation';
import NavigationLogin from './js/presenters/navigationLogin';
import NavigationLogout from './js/presenters/navigationLogout';
import NavigationOptions from './js/presenters/navigationOptions';
import BookingSchedule from './js/presenters/bookingSchedule';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';

const homepageHref = '#home';
const bookingScheduleHref = "#bookingSchedule";

function App({userModel, bookingModel}) {
  return (
    <div className='App'>
      <Navigation userModel={userModel} homepageHref={homepageHref}>
        <NavigationLogin userModel={userModel}/>
        <NavigationLogout userModel={userModel} goToHomePageHref={homepageHref} bookingScheduleHref={bookingScheduleHref}/>
        <NavigationOptions userModel={userModel} bookingScheduleHref={bookingScheduleHref}/>
      </Navigation>

      <ShowView hash={homepageHref}>
        <div>
          <Homepage/>
        </div>
      </ShowView>

      <ShowView hash={bookingScheduleHref}>
        <div>
          <BookingSchedule userModel={userModel} bookingModel={bookingModel}/>
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
  const appRoutes = [homepageHref, bookingScheduleHref];
  if (!appRoutes.find(knownRoute => knownRoute === window.location.hash)) {
    window.location.hash = homepageHref;
  }
}

defaultRoute();
window.addEventListener('hashchange', defaultRoute);

export default App;