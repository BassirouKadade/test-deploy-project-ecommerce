import React, { useState, useEffect } from 'react';
import { base_url } from '../../../services/api';
import Cookies from 'js-cookie';
import './panier.css'; // Importer le fichier CSS pour appliquer les styles

export default function Panier() {
  const [panierItems, setPanierItems] = useState([]); // État pour les articles dans le panier

  useEffect(() => {
    const panierExiste = Cookies.get('__user_panier');
    if (panierExiste) {
      const liste = JSON.parse(panierExiste);
      setPanierItems(liste);
    }
  }, []);

  function passerCommande() {
    // Logique pour passer la commande, par exemple : 
    alert("Commande passée avec succès !");
    // Après avoir passé la commande, vous pouvez vider le panier en supprimant le cookie
    Cookies.remove('__user_panier');
    setPanierItems([]); // Mettre à jour l'état des articles dans le panier
  }

  return (
    <div className='parentsPanier'>
      <ul className="panier-list">
        {panierItems.map((item, index) => (
          <li key={index} className="panier-item">
            <img src={`${base_url}/${item.image}`} alt="" />
            <div className="panier-item-details">
              <h3 className="panier-item-title">{item.reference}</h3>
              <p className="panier-item-price">Prix unitaire: {item.prix} €</p>
              <p className="panier-item-quantity">Quantité: {item.qte}</p>
              <p className="panier-item-total">Total: {item.prix * item.qte} €</p> {/* Calcul du prix total de l'article */}
            </div>
          </li>
        ))}
      </ul>
      {panierItems.length > 0 && (
        <div>
          <p className="panier-total-price">Prix total du panier: {panierItems.reduce((total, item) => total + (item.prix * item.qte), 0)} €</p> {/* Calcul du prix total du panier */}
          <button className="passer-commande-btn" onClick={passerCommande}>Passer la commande</button>
        </div>
      )}
    </div>
  );
}
