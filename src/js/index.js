import Notiflix from 'notiflix';
// const axios = require('axios/dist/browser/axios.cjs');
// import axios from axios;
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchApi } from "./pic-api.js";

//******************  variables      ************************************ 
const html={
    button:document.querySelector('[type=submit]'),
    search:document.querySelector('[name=searchQuery]'),
    downloadMore:document.querySelector('.more_butt'),
    divmore:document.querySelector('.container_more'),
    gallery:document.querySelector('.gallery'),
}
let page;
let gallery_items='';
let totalImages;


//*****************    code  ***********************************  */

html.button.addEventListener('click',onClick);
html.downloadMore.addEventListener('click',loadMore);


//*******************  functions    *****************************
function onClick(e){

    e.preventDefault();  
    html.divmore.style.display='none';
    page=1;
    html.gallery.innerHTML='';
    let query=html.search.value;
     fetchApi(query,page).then((data)=>{
      totalImages=data.totalHits;
      Notiflix.Notify.info(`Hooray! We found ${totalImages} images.`);
      console.log('total',totalImages);
      gallery_items=doGalleryObject(data);
      gallery(gallery_items);
      if (data.hits.length=='40') {
        

      html.divmore.style.display='block';
}
    } )
    .catch(function(error) {
        console.log(error)
       
      });
      
}
// *******************************************
function loadMore(e){
  e.preventDefault(); 
  page+=1;
  console.log('page=',page);
  let query=html.search.value;
   fetchApi(query,page).then((data)=>{
      let query=html.search.value;
      // fetchApi(query,page).then((data)=>{
 gallery_items=doGalleryObject(data);
 gallery(gallery_items);
 if (data.hits.length<'40') {       
      console.log('how match',data.hits.length);
      html.divmore.style.display='none';
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      
}
    //  } )
     
     
     
  } );

}
//************************************************ 
function doGalleryObject(data){
 
   const querylist=[];
    for (const image of data.hits) {
        let img={
            preview:image.previewURL,
            original:image.webformatURL,
            description: image.tags,
            likes:image.likes,
            views:image.views,
            comments:image.comments,
            downloads:image.downloads,
          };
        querylist.push(img)
    }
    // console.log("image>",image);
    return querylist;
    
}
// ***************************************
function gallery(galleryItems){

    let insertHtml='';
    const list=document.querySelector(".gallery")
    
    for(const image of galleryItems){
        insertHtml+=`
       <li class="gallery__item">
      <a class="gallery__link" href="${image.original}">
          <div class="photo-card">
              <img
              class="gallery__image"
              src="${image.preview}"
              data-source="${image.original}"
              alt="${image.description}"
            />
            <div class="info">
            <p class="info-item">
            <b>Likes<br>${image.likes}</b>
            </p>
            <p class="info-item">
              <b>Views<br>${image.views}</b>
            </p>
            <p class="info-item">
              <b>Comments<br>${image.comments}</b>
            </p>
            <p class="info-item">
              <b>Downloads<br>${image.downloads}</b>
            </p>
        </div>
            </div>
         </div>  
          

      </a>
    </li> `;
    };
   
    html.gallery.insertAdjacentHTML("beforeend",insertHtml)
    let gallery = new SimpleLightbox('.gallery a',{
       captionsData:'alt',
       captionDelay:250,
    });
}
function clearGallery(){
  html.gallery.innerHTML='';

}