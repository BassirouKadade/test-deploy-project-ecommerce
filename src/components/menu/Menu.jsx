import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FaMale, FaShopware, FaFemale, FaChild, FaPhone, FaTag, FaUser, FaShoppingCart } from 'react-icons/fa';
import './menu.css';

export default function Menu() {
  return (
    <section className='container-fluid'>
      <nav className="nav">
        <div>
          <Link style={{color:"cadetblue"}} to={"/"}>
          <FaShopware className='icons' />

          </Link>
           </div>
        <ul>
             <span>
             <li>
            <Link  className='afirst liens' to="/">Acceuil</Link>
          </li>
             <li>
            <Link   className="liens" to="chassure-hommes"><FaMale /> Hommes</Link>
          </li>
          <li>
            <Link   className="liens" to="/"><FaFemale /> Femmes</Link>
          </li>
          <li>
            <Link  className="liens" to="/"><FaChild /> Enfants</Link>
          </li>
             </span>
       
          <span>
          <li>
            <Link className='panier liens' to="/"><FaUser /> Compte</Link>
          </li>
          <li>
            <Link className='compte liens' to="panier"><FaShoppingCart /> Panier</Link>
          </li>
          </span>
        </ul>
      </nav>
     
      <Outlet />
    </section>
  );
}
