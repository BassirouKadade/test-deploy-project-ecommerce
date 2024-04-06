import api from "./api";

async function addArticle(data) {
  try {
    const response = await api.post('article-add', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}


async function listeArticles() {
      try {
        const response = await api.get('liste-file');
        return response;
      } catch (error) {
        throw error;
      }
    }


    async function supArticle(id) {
      try {
        const response = await api.delete(`article-delete/${id}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    }

    async function modifierArticle(id) {
      try {
        const response = await api.get(`get-produit/${id}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    }

    async function detail(id){
      try {
        const response = await api.get(`get-detail-produit/${id}`);
        return response;
      } catch (error) {
        throw error;
      }
    }

    async function modifierArticle_valid(data,id) {
      try {
        const response = await api.put(`update-produit/${id}`,data,{
              headers:{
                 "Content-Type":"multipart/form-data"
              }
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    }


export  {supArticle ,detail,modifierArticle_valid,modifierArticle, addArticle,listeArticles};
