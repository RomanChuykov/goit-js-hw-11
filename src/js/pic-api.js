const APIkey='39058769-694048bcc655f58ad46bf26e2';
const url='https://pixabay.com/api/?'
const probaUrl='https://pixabay.com/api/?key=39058769-694048bcc655f58ad46bf26e2&q=yellow+flowers&image_type=photo';
// const probaUrl='https://pixabay.com/api/?';


export function fetchApi(query,page){
   
    const queryUrl=`${url}key=${APIkey}&q=${query}&page=${page}&per_page=40&image_type=photo&orientation=horizontal&safesearch=true`;
   
 return fetch(queryUrl).then(response =>{
    return response.json();
 });
}
