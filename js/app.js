// news categories
const newsCategories = () =>{
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
    .then(res => res.json())
    .then(data => displayNewsCategories(data.data.news_category))
    .catch(error => console.log(error))
}

// display news categories
const displayNewsCategories = (categories) =>{

    const newsCategoryContainer = document.getElementById('news-category');

    categories.forEach( category => {
        const newsCategoryDiv = document.createElement('div');
        newsCategoryDiv.classList.add('col');
        newsCategoryDiv.innerHTML = `
        <p onclick="loadAllNews(${category.category_id}) ; toggleSpinner(true)" class="fw-semibold">${category.category_name}</p>
        `;

        newsCategoryContainer.appendChild(newsCategoryDiv);
    });
}

newsCategories();




// all news

const loadAllNews = (category_id) =>{
    const url = `https://openapi.programming-hero.com/api/news/category/0${category_id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayLoadAllNews(data.data))
    .catch(error => console.log(error))
}

// display all news 
const displayLoadAllNews = (allNews) =>{

    const allNewsCategoryContainer = document.getElementById('all-news-category');
    allNewsCategoryContainer.innerHTML = '';

    const newsItemContainer = document.getElementById('news-item');
    newsItemContainer.innerHTML = '';

    const newsItemDiv = document.createElement('div');
    newsItemDiv.innerHTML = `
        <p class="fs-4 border p-2 text-center"><span class="fw-bold">${allNews.length}</span> News found.</p>
    `;
    newsItemContainer.appendChild(newsItemDiv);

    allNews.forEach(news => {
        const allNewsCategoryDiv = document.createElement('div');
        allNewsCategoryDiv.classList.add('row');
        allNewsCategoryDiv.innerHTML = `
            <div class="col-md-4">
                <img src="${news.image_url
                }" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8 mb-5">
                <div class="card-body">
                    <div>
                        <div>
                            <h5 class="card-title">${news.title}</h5>
                            <p class="card-text">${news.details.slice(0, 400)} ...</p>
                        </div>

                        <div class="row mt-2">
                            <div class="col-md-5 d-flex align-items-center">
                                <img src="${news.author.img}" style="max-width: 10%; " class="img-fluid  rounded-circle me-3" alt="">
                                <p>${news.author.name ? news.author.name : 'No data avilable'}</p>
                            </div>
                            <p class="pb-0 col-md-6"><span class="me-2"><i class="fa-regular fa-eye"></i></span>${news.total_view ? news.total_view : 'No data avilable'}</p>
                            <div class="col-md-1">
                                <button onclick="loadNewsDetails('${news._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsDetailModal"><i class="fa-solid fa-arrow-right"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        allNewsCategoryContainer.appendChild(allNewsCategoryDiv);
    });

    // spiiner end
    toggleSpinner(false);
}

loadAllNews('1');




// modal (news details)

const loadNewsDetails = (news_id) =>{
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayNewsDetails(data.data[0]))
    .catch(error => console.log(error))
}


const displayNewsDetails = (newsDetails) =>{
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = '';

    const modalTitle = document.getElementById('newsDetailModalLabel');
    modalTitle.innerText = newsDetails.title;

    const modalDiv = document.createElement('div');
    modalDiv.classList.add('card');
    modalDiv.innerHTML = `
        <img src="${newsDetails.image_url
        }" class="card-img-top" alt="...">
        <div class="card-body">
            <p>${newsDetails.details}</p>
        </div>
        <div class="row mt-2">
            <div class="col-md-6 d-flex justify-content-between align-items-center">
                <img src="${newsDetails.author.img}" style="max-width: 20%; " class="img-fluid  rounded-circle me-3" alt="">
                <p>${newsDetails.author.name ? newsDetails.author.name : 'No data avilable'}</p>
                <p>${newsDetails.author.published_date ? newsDetails.author.published_date : 'No data avilable'}</p>
            </div>
            <p class="pb-0 col-md-6"><span class="me-2"><i class="fa-regular fa-eye"></i></span>${newsDetails.total_view ? newsDetails.total_view : 'No data avilable'}</p>
        </div>
    `;
    modalBody.appendChild(modalDiv);
}


// spinner function

const toggleSpinner = isLoading => {
    const spinnerSection = document.getElementById('spinner');
    if(isLoading){
        spinnerSection.classList.remove('d-none');
    }
    else{
        spinnerSection.classList.add('d-none');
    }
}