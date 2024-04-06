import React, { useState } from 'react';
import { modifierArticle,modifierArticle_valid } from '../services/auth';
import { useMutation, useQuery, useQueryClient } from 'react-query'; // Correction de l'import
import { useParams } from 'react-router-dom';

export default function Modifier() {
  const { id } = useParams();

  const { data: article, isLoading: loadingArticle, isError } = useQuery(['detail', id], async () => {
    try {
      const response = await modifierArticle(id); // Correction de la fonction
      return response; // Correction pour récupérer les données de la réponse
    } catch (error) {
      console.log('Une erreur ', error);
      throw error;
    }
  });

  
  const [reference, setReference] = useState(article?.reference || ''); // Correction de l'initialisation de l'état
  const [prix, setPrix] = useState(article?.prix || ''); // Correction de l'initialisation de l'état
  const [image, setImage] = useState(null); // Correction de l'initialisation de l'état

  const queryClient = useQueryClient();

  const { mutate, isLoading: isMutating } = useMutation(
    async (data) => {
      try {
        const response = await modifierArticle_valid(data,article?.id); // Correction de la fonction
        console.log(response);
      } catch (error) {
        console.error('Erreur !!', error);
        throw error;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('files');
      }
    }
  );

  async function onHandleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('reference', reference);
    formData.append('prix', prix);
    formData.append('image', image);
    mutate(formData);
  }

  if (loadingArticle  || !article) {
    return <div>Chargement...</div>; // Correction de la typo
  }

  return (
    <div>
      <h2>Modifier votre article</h2> {/* Correction du titre */}
      <form onSubmit={onHandleSubmit}>
        <div>
          <label htmlFor="reference">Référence</label> {/* Correction du libellé */}
          <input
            type="text"
            id="reference"
            placeholder="Référence ..."
            value={reference}
            onChange={(e) => setReference(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="prix">Prix</label> {/* Correction du libellé */}
          <input
            type="text"
            id="prix"
            placeholder="Prix ..."
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="image">Image</label> {/* Correction du libellé */}
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit">{isMutating ? 'En cours' : 'Modifier'}</button> 
      </form>
    </div>
  );
}
