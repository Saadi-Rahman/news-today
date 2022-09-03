const loadAllCategories = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayAllCategories(data.data.news_category))
}


const displayAllCategories = categories =>{
    const newsCategories = document.getElementById("news-categories");
    categories.forEach(category => {
        console.log(category);
        const li = document.createElement('li');
        li.innerHTML = `
        <li class="nav-item px-md-3"><button class="btn btn-light fs-5 fw-semibold text-secondary">${category.category_name}</button></li>
        `;
        newsCategories.appendChild(li);
    })
}


loadAllCategories();