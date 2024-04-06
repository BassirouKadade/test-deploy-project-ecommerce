import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { addArticle } from '../services/auth';
export default function Publier() {
  const [reference, setReference] = useState('');
  const [prix, setPrix] = useState('');
  const [image, setImage] = useState(null);

  const queryClient = useQueryClient(); // Correction de l'initialisation de queryClient

  const { mutate, isLoading } = useMutation(
    async (data) => {
      try {
        const response = await addArticle(data);
        console.log(response);
      } catch (error) {
        console.error('Erreur !!', error);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('files'); // Correction du nom de la méthode
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

  return (
    <div>
      <h2>Publier vos articles</h2>
      <form onSubmit={onHandleSubmit}>
        <div>
          <label htmlFor="reference">Références</label>
          <input
            type="text"
            id="reference"
            placeholder="Référence ..."
            value={reference}
            onChange={(e) => setReference(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="prix">Prix</label>
          <input
            type="text"
            id="prix"
            placeholder="Prix ..."
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit">{isLoading ? 'En cours' : 'Publier'}</button>
      </form>
    </div>
  );
}
