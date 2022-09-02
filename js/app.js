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
        <div class="fw-semibold">${category.category_name}</div>
        `;

        newsCategoryContainer.appendChild(newsCategoryDiv);
    });
}

newsCategories();