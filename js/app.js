// news categories
const newsCategories = () =>{
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
    .then(res => res.json())
    .then(data => displayNewsCategories(data.data.news_category))
    .catch(error => console.log(error))
}

const displayNewsCategories = (categories) =>{

    const newsCategoryContainer = document.getElementById('news-category');

    categories.forEach( category => {
        const newsCategoryDiv = document.createElement('div');
        newsCategoryDiv.classList.add('col');
        newsCategoryDiv.innerHTML = `
        <p onclick="allNewsInCategories(${category.category_id})" class="fw-semibold">${category.category_name}</p>
        `;

        newsCategoryContainer.appendChild(newsCategoryDiv);
    });
}

newsCategories();








// all news

const allNewsInCategories = (category_id) =>{
    // console.log(category_id);
    const url = `https://openapi.programming-hero.com/api/news/category/0${category_id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayAllNewsInCategories(data.data))
    .catch(error => console.log(error))
}


const displayAllNewsInCategories = (allNews) =>{
    console.log(allNews.length);

    const allNewsCategoryContainer = document.getElementById('all-news-category');
    allNewsCategoryContainer.innerHTML = '';

    

    allNews.forEach(news => {
        // console.log(news);
        const allNewsCategoryDiv = document.createElement('div');
        allNewsCategoryDiv.classList.add('row')
        allNewsCategoryDiv.innerHTML = `
            <div class="col-md-4">
                <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                
                    <div>
                        <div>
                            <h5 class="card-title">${news.title}</h5>
                            <p class="card-text">${news.details}</p>
                        </div>

                        <div class="row mt-2">
                            <div class="col-md-5 d-flex align-items-center">
                                <img src="${news.author.img}" style="max-width: 10%; " class="img-fluid  rounded-circle me-3" alt="">
                                <p>${news.author.name}</p>
                            </div>
                            <p class="pb-0 col-md-6"><span class="me-2"><i class="fa-regular fa-eye"></i></span>${news.total_view}</p>
                            <div class="col-md-1">
                                <button  class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsDetailModal"><i class="fa-solid fa-arrow-right"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        allNewsCategoryContainer.appendChild(allNewsCategoryDiv);
    });
}

allNewsInCategories('1');






// const loadNewsDetail = () =>{
//     const url = `https://openapi.programming-hero.com/api/news/0282e0e58a5c404fbd15261f11c2ab6a`
//     fetch(url)
//     .then(res => res.json())
//     .then(data => console.log(data))
// }

// loadNewsDetail();

// onclick="loadNewsDetail('${_id}')"