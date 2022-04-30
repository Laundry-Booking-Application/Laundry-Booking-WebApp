import './App.css';
import Homepage from './js/presenters/homepage';
import ShowView from './js/presenters/viewManager';
import Navigation from './js/presenters/navigation';
import NavigationLogin from './js/presenters/navigationLogin';
import NavigationLogout from './js/presenters/navigationLogout';
import NavigationOptions from './js/presenters/navigationOptions';
import BookingSchedule from './js/presenters/bookingSchedule';
import RegisterResident from './js/presenters/registerResident';
import BookSlot from './js/presenters/bookSlot';
import CancelSlot from './js/presenters/cancelSlot';
import ShowBookedPass from './js/presenters/showBookedPass';
import UsersList from './js/presenters/usersList';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';

const homepageHref = '#home';
const bookingScheduleHref = "#bookingSchedule";
const listUsersHref = "#usersList";

function App({userModel, bookingModel}) {
  return (
    <div className='App'>
      <Navigation userModel={userModel} bookingModel={bookingModel} homepageHref={homepageHref}>
        <NavigationLogin userModel={userModel}/>
        <NavigationLogout userModel={userModel} goToHomePageHref={homepageHref} bookingScheduleHref={bookingScheduleHref}/>
        <NavigationOptions userModel={userModel} bookingModel={bookingModel} bookingScheduleHref={bookingScheduleHref}>
          <RegisterResident userModel={userModel}/>
          <ShowBookedPass bookingModel={bookingModel}/>
        </NavigationOptions>
      </Navigation>

      <ShowView hash={homepageHref}>
        <div>
          <Homepage/>
        </div>
      </ShowView>

      <ShowView hash={bookingScheduleHref}>
        <div>
          <BookingSchedule userModel={userModel} bookingModel={bookingModel}>
            <BookSlot bookingModel={bookingModel}/>
            <CancelSlot bookingModel={bookingModel}/>
          </BookingSchedule>
        </div>
      </ShowView>

      <ShowView hash={listUsersHref}>
        <div>
          <UsersList userModel={userModel}/>
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
  const appRoutes = [homepageHref, bookingScheduleHref, listUsersHref];
  if (!appRoutes.find(knownRoute => knownRoute === window.location.hash)) {
    window.location.hash = homepageHref;
  }
}

defaultRoute();
window.addEventListener('hashchange', defaultRoute);

export default App;
