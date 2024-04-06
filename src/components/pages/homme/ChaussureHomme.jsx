import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { listeArticles, detail } from '../../../services/auth';
import { Link } from 'react-router-dom';
import { base_url } from '../../../services/api';
import '../page.css';

const ChaussureHomme = () => {
  const queryClient = useQueryClient();


  const { data: files, isLoading, isError } = useQuery('files', async () => {
    try {
      const response = await listeArticles();
      return response.data;
    } catch (error) {
      console.error('Erreur lors du chargement des fichiers: ', error);
      throw error;
    }
  });

  if (isLoading) return <div>Chargement en cours...</div>;
  if (isError) return <div>Une erreur s'est produite lors du chargement des fichiers.</div>;

  return (
    <div className="article-list">
      <div className="prensentation">
        Trouver les collections des chaussures pour les Hommes
      </div>
      <div className='sectionsFilter'>
        <article className='article1'>
          <span>prix</span>
          <input type="" />
        </article>
        <article className='article2'>
          <div className='filter'>
            <span>
              <input type="text" placeholder='Rechercher ...' />
              <button>rechercher</button>
            </span>
            <span>
              <section>
                filter
                <select name="" id="">
                  <option value="">croissant</option>
                </select>
              </section>
            </span>
          </div>
          <div className='articlesImages'>
            {files.map((file) => (
              <div key={file.id} className="article-item">
                <Link onMouseOver={async() =>{
   try {
    await queryClient.prefetchQuery(['detail_articles_info', file.id], async () => {
      const response = await detail(file.id);
      return response.data;
    });
  } catch (error) {
    console.error('Erreur de prefetch des détails de l\'article: ', error);
  }
                }} to={`/detail/${file.id}`} >
                  <img src={`${base_url}/${file.image}`} className="article-image" alt="Article" />
                </Link>
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
};

export default ChaussureHomme;
