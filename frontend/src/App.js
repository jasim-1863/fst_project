import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import DonorRegisterScreen from './screens/DonorRegisterScreen';
import InstitutionRegisterScreen from './screens/InstitutionRegisterScreen';
import DonorDashboardScreen from './screens/DonorDashboardScreen';
import InstitutionDashboardScreen from './screens/InstitutionDashboardScreen';
import BloodRequestsScreen from './screens/BloodRequestsScreen';
import BloodRequestDetailsScreen from './screens/BloodRequestDetailsScreen';
import CreateBloodRequestScreen from './screens/CreateBloodRequestScreen';
import EditBloodRequestScreen from './screens/EditBloodRequestScreen';
import DonationHistoryScreen from './screens/DonationHistoryScreen';
import EligibleRequestsScreen from './screens/EligibleRequestsScreen';
import AboutScreen from './screens/AboutScreen';
import NotFoundScreen from './screens/NotFoundScreen';
import InstitutionBloodRequestsScreen from './screens/InstitutionBloodRequestsScreen';

// Import CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './index.css';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/donor/register' element={<DonorRegisterScreen />} />
            <Route path='/institution/register' element={<InstitutionRegisterScreen />} />
            <Route path='/donor/dashboard' element={<DonorDashboardScreen />} />
            <Route path='/institution/dashboard' element={<InstitutionDashboardScreen />} />
            <Route path='/blood-requests' element={<BloodRequestsScreen />} />
            <Route path='/blood-request/:id' element={<BloodRequestDetailsScreen />} />
            <Route path='/institution/create-request' element={<CreateBloodRequestScreen />} />
            <Route path='/institution/edit-request/:id' element={<EditBloodRequestScreen />} />
            <Route path='/institution/blood-requests' element={<InstitutionBloodRequestsScreen />} />
            <Route path='/donor/history' element={<DonationHistoryScreen />} />
            <Route path='/donor/eligible-requests' element={<EligibleRequestsScreen />} />
            <Route path='/about' element={<AboutScreen />} />
            <Route path='*' element={<NotFoundScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
