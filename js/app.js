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
                                    <a href=""  data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right fs-3 fw-bold text-primary pe-4"></i></a>

                                    <!-- Modal body start-->
                                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                                        <div class="modal-content">
                                          <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                          </div>
                                          <div class="modal-body">
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic dolorum reprehenderit adipisci incidunt nesciunt, repudiandae laboriosam consequatur dolore id sit voluptate atque praesentium, iusto placeat repellat eius? Rerum error molestias illo pariatur aliquid cum sapiente, officiis blanditiis unde culpa quos soluta! Sunt voluptate dicta placeat, iure, quibusdam deserunt molestiae repellat, provident quia id quis? Cumque earum molestiae corporis consequatur vel nisi fuga quo obcaecati maiores vitae possimus, ullam aperiam dolorem, tempora maxime commodi a voluptas distinctio illo cum tempore, necessitatibus sapiente dolore veritatis. Tenetur dicta est iusto rerum tempora quaerat possimus nam beatae. Aliquam nesciunt accusamus asperiores sapiente exercitationem error, officia quod perferendis laboriosam eius aut. Nihil iure, est beatae praesentium nam molestias consectetur dolorem facilis ipsa ullam quo delectus dolorum. Esse sit eligendi accusantium eaque assumenda maxime corrupti, perspiciatis libero, impedit aperiam eveniet consequuntur hic ducimus dignissimos odit ut sequi quasi quam enim?</p>
                                          </div>
                                          <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <!-- Modal body end-->
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

const loadNewsDetails = async news_id => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data[0]);
}

const displayNewsDetails = newsDetails => {
    const modalTitle = document.getElementById('detailsModalTitle');
    modalTitle.innerText = newsDetails.title;

    const modelDetails = document.getElementById('model-details');
    modelDetails.innerHTML = `
    
    `;
}


loadAllNews();