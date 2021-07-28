

import Switch from 'react-switch';
import {  useHistory } from "react-router-dom";

import {BiLogOutCircle} from 'react-icons/bi'
const Navbar = ({collapsed,handleCollapsedChange}) => {
  
let history = useHistory();


  
  const logout = () => {
    // console.log('m on call');
    localStorage.setItem('userName',"");
    // localStorage.removeItem("whpf_user");
    // setLoggedOut(true)
    history.push("/");
    window.location.reload(true);
  };

 
return (
    <div>
  
    <nav class="navbar navbar-expand-lg "style={{paddingTop:'60px',height:'35px'}}>  
    <div style={{marginBottom:'70px'}}>
    <Switch 
     height={16}
    width={30}
    checkedIcon={false}
    uncheckedIcon={false}
    onChange={handleCollapsedChange}
    checked={collapsed}
    onColor="#219de9"
    offColor="#bbbbbb"
    cursor="pointer"/>
</div>
    <div
      style={{
        padding: '2px',
       marginLeft:'120px',
       marginTop:'-32px',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 14,
        letterSpacing: '1px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
    >
    <p className="logo1">E<span className="logo2">ntema</span></p>
    </div>
    <div className="icon">
    <i className="BiLogOutCircle" col-sm-2 onClick={logout}><BiLogOutCircle/></i></div>
  </nav>

    </div>

    );
};

export default Navbar;