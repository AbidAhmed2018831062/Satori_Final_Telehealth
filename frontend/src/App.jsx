
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Administrator/Registration/Login'
import Register from './Administrator/Registration/Register'
import Payment from './Administrator/Payment/Payment'
import Dashboard from './Administrator/Dashboard.jsx/Dashboard'
import StripePayment from './Administrator/Payment/StripePayment'
import AdminOutlet from './Outlets/AdminOutlet'
import EditProfile from './Administrator/Dashboard.jsx/EditProfile'
import InviteMembers from './Administrator/Payment/InviteMembers'
import Redirection from './Common/Redirection'
import ManageSlots from './Administrator/Dashboard.jsx/ManageSubscription/ManageSlots'
import UpgradePlanPayment from './Administrator/Dashboard.jsx/ManageSubscription/UpgradePlanPayment'
import CancelSubscription from './Administrator/Dashboard.jsx/ManageSubscription/CancelSubscription'
import SuperAdminLogin from './SuperAdmin/SuperAdminLogin'
import SuperAdminDashboard from './SuperAdmin/SuperAdminDashboard/Dashboard'
import OTPInput from './Common/OTPPage'
import ChangePayment from './Administrator/Dashboard.jsx/ChangePayment'
import SuperAdminOutlet from './Outlets/SuperAdminOutlet'
import CareProviderRegister from './CareProvider/Registration/CareProviderRegister'
import CompleteProfile from './Common/CompleteProfile'
import CareProviderDashboard from './CareProvider/Dashboard/CareProviderDashboard'
import CareProviderLogin from './CareProvider/Registration/CareProviderLogin'
import MemberRegister from './Members/Registration/MemberRegistyer'
import CompleteandEditProfile from './Members/Profile/CompleteandEditProfile'
import MemberDashboard from './Members/Profile/MemberDashboard'
import Calednly from './SuperAdmin/CalendlyTest'
import AllCareProviders from './Members/AppointmentBooking/AllCareProviders'
import BookAppointment from './Members/AppointmentBooking/BookAppointment'
import MemberOUtlet from './Outlets/MemberOutlet'
import CareOUtlet from './Outlets/CareOutlet'
import RateUSer from './Members/AppointmentBooking/RateUser'
import MemberLogin from './Members/Registration/MemberLogin'
import Questions from './Members/Questions'

function App() {
  return (
 <div>
  <Routes>
  <Route path="/member/register" element={<MemberRegister />}></Route>
  <Route path="/member/login" element={<MemberLogin />}></Route>

  <Route path="/member/onboarding" element={<CompleteandEditProfile />}></Route>
  <Route path="/member" element={<MemberDashboard />}></Route>

    <Route path="/" element={<Redirection/>}></Route>
  <Route path="/login" element={<Login />}></Route>
  <Route path="/register" element={<Register />}></Route>
  <Route path="/cp/register" element={<CareProviderRegister />}></Route>
  <Route path="/member/*" element={<MemberOUtlet />}>
  <Route path="questions" element={<Questions />}></Route>

  <Route path="showcareproviders" element={<AllCareProviders />}></Route>
  <Route path="review/:id" element={<RateUSer />}></Route>

  <Route path="showprovider/:id" element={<BookAppointment />}></Route>
</Route>
  <Route path="/cp/onboarding" element={<CompleteProfile />}></Route>
  <Route path="/cp/login" element={<CareProviderLogin />}></Route>
  <Route path="/calendly" element={<Calednly />}></Route>


  <Route path="/cp/*" element={<CareOUtlet />}>
  <Route path="" element={<CareProviderDashboard />}></Route>
  </Route>


  <Route path="/admin/*" element={<AdminOutlet />}>
  <Route path="onboarding/plan" element={<Payment />}></Route>
  <Route path="" element={<Dashboard />}></Route>
  <Route path="pay" element={<StripePayment />}></Route>
  <Route path="manage/slots" element={<ManageSlots />}></Route>
  <Route path="manage/upgrade/:id" element={<UpgradePlanPayment />}></Route>
  <Route path="manage/cancel" element={<CancelSubscription />}></Route>
  <Route path='change/payment' element={<ChangePayment/>}></Route>
  <Route path='invoices' element={<ChangePayment/>}></Route>

  <Route path="profile" element={<EditProfile />}></Route>
</Route>
<Route path='/adminlogin' element={<SuperAdminLogin/>}></Route>
<Route path="/superadmin/*" element={<SuperAdminOutlet />}>
  <Route path=''element={<SuperAdminDashboard/>}></Route>
</Route>
<Route path="/csv" element={<InviteMembers />}></Route>
<Route path="/otp" element={<OTPInput />}></Route>

</Routes>
 </div>
  )
}

export default App
