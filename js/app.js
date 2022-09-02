const newsCategories = () =>{
    const url = 'https://openapi.programming-hero.com/api/news/categories';

    fetch(url)
    .then(res => res.json())
    .then(data => displayNewsCategories(data.data.news_category))
}

const displayNewsCategories = (categories) =>{
    // console.log(categories);
    categories.forEach( category => {
        console.log(category.category_name);
        
    });
}

newsCategories();