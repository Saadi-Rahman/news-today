const loadAllCategories = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayAllCategories(data.data.news_category))
}


const displayAllCategories = categories =>{
    const newsCategories = document.getElementById("news-categories");

    categories.forEach(category => {
        // console.log(category);
        const li = document.createElement('li');
        li.innerHTML = `
        <li class="nav-item px-md-3"><button onclick="loadAllNews(${category.category_id})" class="btn btn-light fs-5 fw-semibold text-secondary">${category.category_name}</button></li>
        `;
        newsCategories.appendChild(li);
    })
}


loadAllCategories();


const loadAllNews = (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${category_id}`;
    // console.log("get category details", category_id);
    fetch(url)
    .then(res => res.json())
    .then(data => displayNewsList(data.data))
}

const displayNewsList = allNews =>{
    console.log("allNews", allNews);

    // total news count
    const totalNewsCount = document.getElementById('total-news-count').innerHTML = `${allNews.length} items found for this news category!!`;
    console.log(totalNewsCount);

    // no news-found check
    const newsNotFoundAlart = document.getElementById('news-not-found');
    if (allNews.length === 0) {
        newsNotFoundAlart.classList.remove('d-none');
    }
    else {
        newsNotFoundAlart.classList.add('d-none');
    }


    // show news items
    const newsItemsContainer = document.getElementById("news-items-container");
    newsItemsContainer.textContent = "";
    allNews.forEach(news =>{
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        <div class="col">
        <div class="card mb-4">
        <div class="row g-0">
        <div class="col-md-4 p-3">
        <img src="${news.thumbnail_url}" class="img-fluid rounded-3 h-100 w-100" alt="...">
        </div>
        <div class="col-md-8">
        <div class="card-body">
            <h5 class="card-title">${news.title ? news.title : 'Title not found'}</h5>
            <p class="card-text">${news.details.length > 300 ? news.details.slice(0, 170) + '...' : news.details}</p>
            <!-- author and views info start -->
            <div class="d-flex flex-row justify-content-between align-items-center mt-2">
            <!-- author info start -->
            <div class="d-flex flex-row align-items-center gap-2">
                <div>
                    <img src="${news.author.img ? news.author.img : 'Image not found'}" class="rounded-circle" height="40" loading="lazy"/>
                </div>
                <div>
                    <h6 class="m-0">${news.author.name ? news.author.name : 'Author not found'}</h6>
                    <p class="m-0"><small class="text-muted">${news.author.published_date ? news.author.published_date : 'Date not found'}</small></p>
                </div>
            </div>
            <!-- author info end -->

            <!-- views start -->
            <div class="d-flex flex-row align-items-center gap-2 pe-1">
                <i class="fa-regular fa-eye fs-5"></i>
                <h5 class="fw-bolder m-0">${news.total_view ? news.total_view : 'Not found'}</h5>
            </div>
            <!-- views end -->

            <!-- modal start -->
            <div>
                <!-- icon trigger modal -->
                <a href="" onclick="loadNewsDetails('${news._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right fs-3 fw-bold text-primary pe-4"></i></a>
            </div>
            <!-- modal end -->
            </div>
            <!-- author and views info end -->
        </div>
        </div>
        </div>
        </div>
        </div>
        `;
        newsItemsContainer.appendChild(newsDiv);
    })
}


const loadNewsDetails = (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    console.log("get news details", news_id);
    fetch(url)
    .then(res => res.json())
    .then(data => displayNewsDetails(data.data[0]))
}



const displayNewsDetails = newsDetails => {
    console.log(newsDetails);
    const modalTitle = document.getElementById('modal-headline');
    modalTitle.innerText = newsDetails.title;

    const modelDetails = document.getElementById('modal-details');
    modelDetails.innerHTML = `
    <div class="card" >
    <img src="${newsDetails.thumbnail_url}" class="card-img-top" alt="...">
    <div class="card-body">
    <p class="card-text">${newsDetails.details}</p>
    </div>
    </div>

    <!-- author and views info start -->
    <div class="d-flex flex-row justify-content-between align-items-center mt-2">
    <!-- author info start -->
    <div class="d-flex flex-row align-items-center gap-2">
        <div>
            <img src="${newsDetails.author.img ? newsDetails.author.img : 'Image not found'}" class="rounded-circle" height="40" loading="lazy"/>
        </div>
        <div>
            <h6 class="m-0">${newsDetails.author.name ? newsDetails.author.name : 'Author not found'}</h6>
            <p class="m-0"><small class="text-muted">${newsDetails.author.published_date ? newsDetails.author.published_date : 'Published date not found'}</small></p>
        </div>
    </div>
    <!-- author info end -->

    <!-- views start -->
    <div class="d-flex flex-row align-items-center gap-2 pe-1">
        <i class="fa-regular fa-eye fs-5"></i>
        <h5 class="fw-bolder m-0">${newsDetails.total_view ? newsDetails.total_view : 'Not found'}</h5>
    </div>
    <!-- views end -->
    </div>
    <!-- author and views info end -->
    `;
}


loadAllNews(08);