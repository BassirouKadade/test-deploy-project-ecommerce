import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { detail } from '../../../services/auth';
import './DetailChaussure.css';
import { base_url } from '../../../services/api';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';

export default function DetailChaussure() {
  const { id } = useParams();

  const [qte, setQte] = useState(""); // État pour la quantité d'articles à ajouter au panier
  const [showConfirmation, setShowConfirmation] = useState(false); // État pour afficher la confirmation
  const [cartItemCount, setCartItemCount] = useState(0); // État pour le nombre d'articles dans le panier

  useEffect(() => {
    const panierExiste = Cookies.get('__user_panier');
    if (panierExiste) {
      const liste = JSON.parse(panierExiste);
      setCartItemCount(liste.length); // Récupérer la longueur de la liste des articles dans le panier
    }
  }, []);

  const { data: article, isLoading, isError } = useQuery(['detail_articles_info', id], async () => {
    const response = await detail(id); // Appel de la fonction detail avec l'id
    return response.data; // En supposant que la réponse est au format { data: articleData }
  });

  function ajouterAuPanier() {
    const panierExiste = Cookies.get('__user_panier');
    let liste = [];
    if (panierExiste) {
      liste = JSON.parse(panierExiste);
    }
    const existListeIndex = liste.findIndex(element => element.id === id);
    const quantity = Number(qte);
    if (quantity > 0) {
      if (existListeIndex !== -1) {
        liste[existListeIndex].qte += quantity;
      } else {
        liste.push({image:article.image, prix:article.prix,reference:article.reference, id: id, qte: quantity });
      }
      Cookies.set('__user_panier', JSON.stringify(liste), { expires: 7 });
      setCartItemCount(liste.length); // Mettre à jour le nombre total d'articles dans le panier
      setShowConfirmation(true); // Afficher la confirmation après l'ajout au panier
      setTimeout(() => setShowConfirmation(false), 2000); // Masquer la confirmation après 2 secondes
    } else {
      // Gérer le cas où la quantité est invalide
      console.error("La quantité doit être supérieure à zéro.");
    }
  }

  if (isLoading) {
    return <h4>Chargement ...</h4>;
  }

  if (isError) {
    return <h4>Une erreur s'est produite lors du chargement des détails de l'article.</h4>;
  }

  return (
    <section className='detail-section'>
      <p className='alert alert-info'>Détail de chaussure ci-dessous</p>
      <article className='detail-article'>
        <img src={`${base_url}/${article.image}`} alt="" />
        <div className='detail-panier'>
          <h1>{article.reference}</h1>
          <h4>{article.prix} €</h4>
          <div>
            <label htmlFor="quantite">Quantité</label>
            <input onChange={(e) => setQte(e.target.value)} type="number" id="quantite" />
          </div>
          <button onClick={ajouterAuPanier}>Ajouter au panier</button>
          <div>
            {showConfirmation && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1,y:180 }}
                transition={{ duration: 0.5 }}
                className="confirmation"
              >
                <p>Article ajouté au panier avec succès!</p>
                <p>Nombre total d'articles dans le panier: {cartItemCount}</p>
              </motion.div>
            )}
          </div>
        </div>
      </article>
    </section>
  );
}
