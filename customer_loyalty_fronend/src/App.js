import "./App.css";
import React, { Suspense} from "react";
import { Route, Routes } from "react-router-dom";
import Notification from "./components/Notifications/Notifications";
import Login from "./pages/Login/Login"

const Home = React.lazy(() => import("./pages/Home/Home"));
const UserRegistration = React.lazy(() =>
  import("./pages/UserRegistration/UserRegistration")
);
const CompanyRegistration = React.lazy(() =>
  import("./pages/CompanyRegistration/CompanyRegistration")
);
const Company = React.lazy(() =>
  import("./dashboards/CompanyDashboard/CompanyDashboard")
);
const User = React.lazy(() =>
  import("./dashboards/UserDashboard/UserDashboard")
);
const Admin = React.lazy(()=> import( "./dashboards/AdminDashboard/AdminDashboard"))
const List = React.lazy(()=> import( "./dashboards/AdminDashboard/components/List"))
const Memberships = React.lazy(()=> import( "./dashboards/UserDashboard/components/Memberships"))
const UserActivities = React.lazy(()=> import( "./dashboards/UserDashboard/components/UserActivities"))
const UserRelations = React.lazy(()=> import( "./dashboards/UserDashboard/components/UserRelations"))
const Activitiy = React.lazy(()=> import( "./dashboards/AdminDashboard/components/Activitiy"))
const AddBill = React.lazy(()=> import( "./dashboards/AdminDashboard/components/AddBill"))
const Members = React.lazy(()=> import( "./dashboards/CompanyDashboard/components/Members"))
const MembersActivity = React.lazy(()=> import( "./dashboards/CompanyDashboard/components/MembersActivity"))
const Rules = React.lazy(()=> import( "./dashboards/CompanyDashboard/components/Rules"))
const Configurations = React.lazy(()=> import( "./dashboards/CompanyDashboard/components/Configurations"))
const Gifts = React.lazy(()=> import( "./dashboards/CompanyDashboard/components/MembersGifts"))
const CompanyMembersRelations = React.lazy(()=> import( "./dashboards/CompanyDashboard/components/MemberRelations"))
const AdminMembersRelations = React.lazy(()=> import( "./dashboards/AdminDashboard/components/MemberRelation"))
const AdminMembers = React.lazy(()=> import( "./dashboards/AdminDashboard/components/AdminMembers"))
const AdminUsers = React.lazy(()=> import( "./dashboards/AdminDashboard/components/AdminUsers"))
const AdminCompanies = React.lazy(()=> import( "./dashboards/AdminDashboard/components/AdminCompanies"))




const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Suspense><Home /></Suspense>} />
        <Route path="/login" element={<Suspense><Login /></Suspense>} />
        <Route path="/userregister" element={<Suspense><UserRegistration /></Suspense>} />
        <Route path="/companyregister" element={<Suspense><CompanyRegistration /></Suspense> } />
        
        <Route path="company/" element={<Suspense><Company /></Suspense>} >
          <Route path="membersactivities" element={<Suspense> <MembersActivity/></Suspense>}/>
          <Route path="rules" element={<Suspense> <Rules/></Suspense>}/>
          <Route path="configurations" element={<Suspense><Configurations/></Suspense>}/>
          <Route path="gifts" element={<Suspense><Gifts /></Suspense>}/>
          <Route path="relations" element={<Suspense><CompanyMembersRelations /></Suspense>}/>
          <Route path="" element={<Suspense> <Members/></Suspense>}/>

        </Route>

        <Route exact path="/user" element={<Suspense><User /> </Suspense>} >
          <Route path="activities" element={<Suspense><UserActivities/></Suspense>}></Route>
          <Route path="relations" element={<Suspense><UserRelations/></Suspense>}></Route>
          <Route exact path="" element={<Suspense> <Memberships/></Suspense>}></Route>
        </Route>

        <Route path="admin/" element={<Suspense><Admin /></Suspense>} > 
          <Route path="list" element={<Suspense><List /></Suspense>} /> 
          <Route path="activities" element={<Suspense><Activitiy /></Suspense>} /> 
          <Route path="" element={<Suspense><AddBill /></Suspense>} /> 
          <Route path="relations" element={<Suspense><AdminMembersRelations /></Suspense>} /> 
          <Route path="members" element={<Suspense><AdminMembers /></Suspense>} /> 
          <Route path="users" element={<Suspense><AdminUsers /></Suspense>} /> 
          <Route path="companies" element={<Suspense><AdminCompanies /></Suspense>} /> 

        </Route>
      </Routes>
      <Notification />
    </>
  );
};

export default App;
