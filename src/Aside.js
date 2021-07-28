import { useIntl } from "react-intl";

import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { CgNotes } from "react-icons/cg";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
} from "react-pro-sidebar";
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import sidebarBg from "./assets/bg1.jpg";
import { RiUserSettingsFill } from "react-icons/ri";
import { BiPurchaseTag } from "react-icons/bi";
import { BsBlockquoteRight } from "react-icons/bs";
import { GoCalendar } from "react-icons/go";

const Aside = ({ image, collapsed, rtl, toggled, handleToggleSidebar }) => {
  const intl = useIntl();

  return (
    <>
      <ProSidebar
        image={image ? sidebarBg : false}
        rtl={rtl}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<MdDashboard />}>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu
              title={intl.formatMessage({ id: "Users" })}
              icon={<FaUsers />}
            >
              <MenuItem>
                <NavLink to="/adduser">Create User</NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to="/Viewuser">List of Users</NavLink>
              </MenuItem>
              {/*<MenuItem>
               <NavLink to="/activities">Create Activities</NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to="/viewactivities">List Activities</NavLink>
              </MenuItem>*/}
              <MenuItem>
                <NavLink to="/roles">Create Roles</NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to="/ViewRoles">List Roles</NavLink>
              </MenuItem>
            </SubMenu>

            <SubMenu
              title={intl.formatMessage({ id: "Vendors" })}
              icon={<RiUserSettingsFill />}
            >
              <MenuItem>
                <NavLink to="/addVendors">Create Vendor</NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to="/ViewVendors">List of Vendors</NavLink>
              </MenuItem>
              
            </SubMenu>

            <SubMenu
              title={intl.formatMessage({ id: "Clients" })}
              icon={
                <img
                  src="client.png"
                  style={{ width: "15px", color: "white" }}
                  alt="logo"
                />
              }
            >
              <MenuItem>
                <NavLink to="/addClients">Create Client</NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to="/ViewClients">List of Clients</NavLink>
              </MenuItem>
            </SubMenu>

            <SubMenu
              title={intl.formatMessage({ id: "Purchase Order" })}
              icon={<BiPurchaseTag />}
            >
              <MenuItem>
                <NavLink to="/Createpurchaseorder">
                  Create Purchase Order
                </NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to="/Viewpurchaseorder">
                  List of Purchase Orders
                </NavLink>
              </MenuItem>
            </SubMenu>

            <SubMenu
              title={intl.formatMessage({ id: "Quotation" })}
              icon={<BsBlockquoteRight />}
            >
              <MenuItem>
                <NavLink to="/CreateQuotation">Create Quotation</NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to="/ViewQuotation">List of Quotations</NavLink>
              </MenuItem>
            </SubMenu>

            <SubMenu
              title={intl.formatMessage({ id: "Timesheet" })}
              icon={<GoCalendar />}
            >
              <MenuItem>
                <NavLink to="/CreateTimesheet">Create Timesheet</NavLink>
              </MenuItem>
              {/* <MenuItem><NavLink to="/CloneTimesheet">Clone Timesheet</NavLink></MenuItem> */}
              <MenuItem>
                <NavLink to="/ViewTimesheet">List of Timesheets</NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to="/AddPayments">Vendor Payment</NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to="/ViewVendorPayments">Vendor Claims</NavLink>
              </MenuItem>
              {/* <MenuItem><NavLink to="/ApprovedTimesheet">Approved Timesheet</NavLink></MenuItem> */}
            </SubMenu>

            <SubMenu
              title={intl.formatMessage({ id: "Manpower" })}
              icon={
                <img
                  src="manpower.png"
                  style={{ width: "15px", color: "white" }}
                  alt="logo"
                />
              }
            >
              <MenuItem>
                <NavLink to="/AddManpower">Create Manpower</NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to="/ViewManpower">List of Manpower</NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to="/CreateManpower">Create Timesheet for MP</NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to="/ViewTimesheetm">List of MP TS</NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to="/ManpowerPayment">Create ManPower Payment</NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to="/ManPowerClaims">ManPower Claims</NavLink>
              </MenuItem>
              {/* <MenuItem><NavLink to="/PendinRequest">Pending Request</NavLink></MenuItem> */}
              {/* <MenuItem><NavLink to="/ApprovedRequest">Approved Request</NavLink></MenuItem> */}
            </SubMenu>

            <SubMenu
              title={intl.formatMessage({ id: "Delivery Notes" })}
              icon={<CgNotes />}
            >
              <MenuItem>
                <NavLink to="/CreateNote">Generate Note</NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to="/ViewNotes">List of Notes</NavLink>
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>
      </ProSidebar>

      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        <FaBars />
      </div>
      <div></div>
    </>
  );
};

export default Aside;
