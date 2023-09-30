import React,{useState,useEffect} from 'react'
import Loding from '../logo.svg';

function TopNaviagation() {
  const [Theme,SetTheme] = useState('dark');
  useEffect(()=>{
    if(localStorage.getItem("THEME-MODE") === 'dark'){
      document.body.classList.add('dark');
      document.body.classList.remove('light');
      SetTheme('dark')
    }else{
      document.body.classList.add('light');
      document.body.classList.remove('dark');
      SetTheme('light')
    }

  },[Theme])

  const ChangeTheme = (e) =>{
      if(Theme === 'light'){
        document.body.classList.add('light');
        document.body.classList.remove('dark');
        SetTheme('dark');
        localStorage.setItem("THEME-MODE", 'dark');
      }else{
        document.body.classList.add('dark');
        document.body.classList.remove('light');
        SetTheme('light')
        localStorage.setItem("THEME-MODE", 'light');


      }
    
  }

  return (
   <>
   <nav className={Theme === 'light' ?"fixed-top navbar  mb-5 topNav":" fixed-top navbar bg-dark mb-5"}>
  <div className="container">
    <a className="navbar-brand p-0 m-0" href={void(0)}>
      <img src={Loding} alt="Logo" style={{height:"35px"}} className="  align-text-top"/>
    </a>
    <div className='float-right'>  
    <input type="checkbox" className="checkbox" id="checkbox" onChange={(e)=>{ChangeTheme(e)}}/>
  <label for="checkbox" className="label">
    <i className="fas fa-moon"></i>
    <i className='fas fa-sun'></i>
    <div className='ball'></div>
  </label>
</div>
  </div>
  </nav>
   </>
  )
}

export default TopNaviagation