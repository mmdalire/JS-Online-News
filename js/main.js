const wholeBody = document.querySelector('html');

//Logo
const logo = document.querySelector('.nav-logo');

//Image slider
const slider = document.querySelector('.image-slider');
const next = document.querySelector('#right-btn');
const previous = document.querySelector('#left-btn');

//Mobile navigation bar
const mobileNavOpen = document.querySelector('#bars');
const mobileNavClose = document.querySelector('#close');
const mobileNav = document.querySelector('.mobile-nav-bar');

//Grids
const headlineContainer = document.querySelector('.headline-grid');
const everythingContainer = document.querySelector('.everything-grid');

//Category
const categoryList = document.querySelectorAll('[data-category]');

//Keyword
const keywordSearch = document.querySelector('#search-keyword');
const keywordBtn = document.querySelector('#search-keyword-btn');
const mobileKeywordSearch = document.querySelector('#mobile-search-keyword');
const mobileKeywordBtn = document.querySelector('#mobile-keyword-btn');

//Advanced search variables
const domain = document.querySelector('#domains');
const dateFrom = document.querySelector('#date-from');
const dateUntil = document.querySelector('#date-until');
const sortBy = document.querySelector('#sort-by');
const advancedSearchBtn = document.querySelector('#advanced-search-btn');

//News page request
const PAGE_SIZE = 60;

/*Image selector section*/
const nextSlide = () => {
    const active = document.querySelector('.active');
    active.classList.remove('active');
    if(active.nextElementSibling) {
        active.nextElementSibling.classList.add('active');
    }
    else {
        slider.firstElementChild.classList.add('active');
    }
    setTimeout(() => active.classList.remove('active'));
}

const prevSlide = () => {
    const active = document.querySelector('.active');
    active.classList.remove('active');
    if(active.previousElementSibling) {
        active.previousElementSibling.classList.add('active');
        console.log(active);
    }
    else {
        slider.lastElementChild.classList.add('active');
    }
    setTimeout(() => active.classList.remove('active'), 5000);
}

const automaticSlide = () => {
    const delay = 5000;
    setInterval(nextSlide, delay);
}

//Create the slide dynamically based on current news
const createSlide = data => {
    const numberOfSlides = 5;
    for(let i = 0; i < numberOfSlides; i++) {
        const newSlide = document.createElement('div');
        const newCapture = document.createElement('div');
        const newHeadline = document.createElement('a');
        const newAuthor = document.createElement('div');

        newSlide.className = 'image-slide';
        newCapture.className = 'image-capture';

        newHeadline.className = 'image-headline';
        newHeadline.href = data.articles[i].url;
        newHeadline.target = '_blank';

        newAuthor.className = 'image-author';

        if(i === 0) newSlide.classList.add('active');

        newSlide.style.background = `url(${data.articles[i].urlToImage})`;
        newSlide.style.backgroundPosition = 'center';
        newSlide.style.backgroundSize = 'cover';

        newHeadline.textContent = data.articles[i].title;
        newAuthor.textContent = data.articles[i].author;

        newCapture.appendChild(newHeadline);
        newCapture.appendChild(newAuthor);
        newSlide.appendChild(newCapture);
        slider.appendChild(newSlide);
    }
}

/*Display description*/
const createNewsDescription = data => {
    const descriptionModalContainer = document.createElement('section');
    const descriptionModal = document.createElement('div');
    const descriptionModalImage = document.createElement('img');
    const descriptionModalInfo = document.createElement('div');
    const descriptionModalHeadline = document.createElement('h2');
    const descriptionModalDate = document.createElement('small');
    const descriptionModalSeparator = document.createElement('hr');
    const descriptionModalFull = document.createElement('div');
    const descriptionModalSources = document.createElement('div');
    const descriptionModalBtns = document.createElement('div');
    const descriptionModalBtnRedirect = document.createElement('button');
    const descriptionModalBtnLink = document.createElement('a');
    const descriptionModalBtnClose = document.createElement('button');

    descriptionModalContainer.setAttribute('class', 'news-modal-container');
    descriptionModal.setAttribute('class', 'news-modal');
    descriptionModalImage.setAttribute('id', 'full-image');
    descriptionModalInfo.setAttribute('class', 'news-modal-info');
    descriptionModalFull.setAttribute('class', 'news-modal-description');
    descriptionModalSources.setAttribute('class', 'news-modal-sources');
    descriptionModalBtns.setAttribute('class', 'news-modal-btns');
    descriptionModalBtnRedirect.setAttribute('id', 'redirect');
    descriptionModalBtnClose.setAttribute('id', 'close-modal');

    descriptionModalImage.src = data.urlToImage;
    descriptionModalHeadline.textContent = data.title;
    descriptionModalDate.textContent = formatDate(data.publishedAt);
    descriptionModalFull.textContent = data.description;
    descriptionModalSources.textContent = data.source.name;
    descriptionModalBtnLink.href = data.url;
    descriptionModalBtnLink.target = '_blank';
    descriptionModalBtnLink.textContent = 'Click here to view more';
    descriptionModalBtnClose.textContent = 'Close';

    descriptionModalBtnRedirect.appendChild(descriptionModalBtnLink);
    descriptionModalBtns.appendChild(descriptionModalBtnRedirect);
    descriptionModalBtns.appendChild(descriptionModalBtnClose);
    descriptionModalInfo.appendChild(descriptionModalHeadline);
    descriptionModalInfo.appendChild(descriptionModalDate);
    descriptionModalInfo.appendChild(descriptionModalSeparator);
    descriptionModalInfo.appendChild(descriptionModalFull);
    descriptionModalInfo.appendChild(descriptionModalSources);
    descriptionModalInfo.appendChild(descriptionModalBtns);
    descriptionModal.appendChild(descriptionModalImage);
    descriptionModal.appendChild(descriptionModalInfo);
    descriptionModalContainer.appendChild(descriptionModal);
    
    document.querySelector('body').appendChild(descriptionModalContainer);
    descriptionModalContainer.style.display = 'block';
    descriptionModalContainer.style.top = `${document.documentElement.scrollTop}px`;
    wholeBody.style.overflowY = 'hidden';

    descriptionModalBtnClose.addEventListener('click', () => {
        document.querySelector('body').removeChild(descriptionModalContainer);
        descriptionModalContainer.style.display = 'none';
        wholeBody.style.overflowY = 'auto';
    });
}

/*Display news in top-headlines section*/
/*Text formatting*/
const formatTitle = title => {
    const limitedChar = 80;
    if(title.length > limitedChar) return `${title.substring(0, limitedChar)}...`;
    return title;
}

/*Dates formatting*/
const parseZero = (hours, minutes) => {
    let time = (hours < 10) ? `0${hours}:` : `${hours}:`;
    time += (minutes < 10) ? `0${minutes}` : `${minutes}`;
    return time;
}

const formatDate = date => {
    const newDate = new Date(date);
    const monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return `${monthsArray[newDate.getMonth()]} ${newDate.getDate()}, ${newDate.getFullYear()} - ${parseZero(newDate.getHours(),newDate.getMinutes())}`;
}

//Display the news in the grid whether it is top-headline or everything
const displayNews = (data, endpoint) => {
    //Container of variables 
    const containers = [headlineContainer, everythingContainer];
    let index;

    //Change the variables depending on the endpoint
    if(endpoint === 'top-headlines?') index = 0;
    else index = 1;

    let displayNewsMaximum = (data.articles.length < 6) ? data.articles.length : 6;

    const loadMoreNews = document.createElement('button');
    loadMoreNews.setAttribute('id', 'load-more-news');
    loadMoreNews.textContent = 'Load more';

    for(let i = 0; i < displayNewsMaximum; i++) {
        const newsCard = document.createElement('div');
        const newsCardThumbnail = document.createElement('img');
        const newsCardInfo = document.createElement('div');
        const newsCardHeadline = document.createElement('h2');
        const newsCardDate = document.createElement('small');
        const newsClickMore = document.createElement('div');
        const newsClickMoreDown = document.createElement('i');
        const newsClickMoreDescription = document.createElement('span');

        newsCard.setAttribute('class', 'news-card');
        newsCardThumbnail.setAttribute('id', 'thumbnail');
        newsCardInfo.setAttribute('class', 'news-info');
        newsClickMore.setAttribute('class', 'click-more');
        newsClickMoreDown.setAttribute('class', 'fas fa-chevron-down');
        newsClickMoreDescription.setAttribute('class', 'click-more-text');

        newsCardThumbnail.src = data.articles[i].urlToImage;
        newsCardHeadline.textContent = formatTitle(data.articles[i].title);
        newsCardDate.textContent = formatDate(data.articles[i].publishedAt);
        newsClickMoreDescription.textContent = ' Click to view description';

        newsClickMore.appendChild(newsClickMoreDown);
        newsClickMore.appendChild(newsClickMoreDescription);

        newsCardInfo.appendChild(newsCardHeadline);
        newsCardInfo.appendChild(newsCardDate);
        newsCardInfo.appendChild(newsClickMore);

        newsCard.appendChild(newsCardThumbnail);
        newsCard.appendChild(newsCardInfo);

        containers[index].appendChild(newsCard);

        newsClickMoreDescription.addEventListener('click', () => {
            createNewsDescription(data.articles[i]);
        })
    }
    containers[index].appendChild(loadMoreNews);

    //Removes the load more button whenever there are no news to show
    if(data.articles.length <= displayNewsMaximum) {
        displayNewsMaximum = data.articles.length;
        if(data.articles.length === 0) containers[index].removeChild(loadMoreNews);
    }
    
    //Display more news when load more is clicked
    loadMoreNews.addEventListener('click', () => {
        data.articles.splice(0, displayNewsMaximum); //Remove the articles being showed
        containers[index].removeChild(loadMoreNews);
        displayNews(data, endpoint);
    });
}

//Displays the active tab
const addCategoryActive = category => {
    const active = document.querySelector('.active-nav');
    if(active === null) {
        category.classList.add('active-nav');
        return;
    }
    active.classList.remove('active-nav');
    category.classList.add('active-nav');
}

//Remove active in headers
const removeCategoryActive = () => {
    const active = document.querySelector('.active-nav');
    if(active !== null) active.classList.remove('active-nav');
}

const clearDisplay = () => {
    document.querySelector('.image-slider').textContent = '';
    document.querySelector('.headline-grid').textContent = '';
    document.querySelector('.everything-grid').textContent = '';
}

/*News info*/
const readNews = (category, country, keyword, filter) => {
    const apiKey = `apiKey=${key.NEWS_KEY}`;
    const apiUrl = 'https://newsapi.org/v2/';
    const apiCategory = (category.textContent === '' || category.textContent === undefined || category.textContent === null) ? '' : `&category=${category.textContent}`;
    const apiCountry = (country === '' || country === undefined) ? '' : `&country=${country}`;
    const apiKeyword = (keyword.value === '' || keyword.value === undefined) ? '' : `&q=${keyword.value}`;
    const apiEndpoint = (keyword.value === '' || keyword.value === undefined) ? 'top-headlines?' : 'everything?';
    const apiPageSize = `&pageSize=${PAGE_SIZE}`;
    let otherParameters = '';

    //Added advanced filter parameters
    if(filter !== undefined) {
        if(filter[0] !== '' && filter[0] !== undefined) otherParameters += `&domain=${filter[0]}`;
        if(filter[1] !== '' && filter[1] !== undefined) otherParameters += `&from=${filter[1]}`;
        if(filter[2] !== '' && filter[2] !== undefined) otherParameters += `&to=${filter[2]}`;
        if(filter[3] !== '' && filter[3] !== undefined && filter[3] !== 'none') otherParameters += `&sortBy=${filter[3]}`;
    }

    const url = `${apiUrl}${apiEndpoint}${apiKey}${apiCategory}${apiCountry}${apiKeyword}${otherParameters}${apiPageSize}`;
    
    clearDisplay(); //Clear display when switched categories

    fetch(url)
    .then(res => res.json())
    .then(data => {
        createSlide(data);
        displayNews(data, apiEndpoint);
    })
    .catch(error => console.log(error))
}

//Change displays
const changeDisplays = device => {
    //Change displays whether the user wants to view category or keyword
    if(device.value === undefined || device.value === '') {
        document.querySelector('.display-keyword').style.display = 'none';
        document.querySelector('.display-category').style.display = 'block';
    }
    else {
        document.querySelector('.display-keyword').style.display = 'block';
        document.querySelector('.display-category').style.display = 'none';
    }
}

automaticSlide();
readNews('', 'ph', '', undefined);

//Transfer page when logo is clicked
logo.addEventListener('click', () => {
    if(document.querySelector('.display-keyword').style.display === 'block') {
        document.querySelector('.display-keyword').style.display = 'none';
        document.querySelector('.display-category').style.display = 'block';
    } 

    readNews('', 'ph', '', undefined);
    removeCategoryActive();
    //Remove contents in textbox
    keywordSearch.value = '';
    mobileKeywordSearch.value = '';
});

//Next slide in image slider
next.addEventListener('click', () => {
    nextSlide();
});

//Previous slide in image slider
previous.addEventListener('click', () => {
    prevSlide();
});

//Mobile navigation bar opens
mobileNavOpen.addEventListener('click', () => {
    mobileNav.style.display = 'block';
    wholeBody.style.overflowY = 'hidden';
});

//Mobile navigation bar closes
mobileNavClose.addEventListener('click', () => {
    mobileNav.style.display = 'none';
    wholeBody.style.overflowY = 'auto';
});

/*Nav bar*/
categoryList.forEach(category => {
    //Change the display of news based on category
    category.addEventListener('click', () => {
        if(document.querySelector('.display-keyword').style.display === 'block') {
            document.querySelector('.display-keyword').style.display = 'none';
            document.querySelector('.display-category').style.display = 'block';
        }
        addCategoryActive(category); //Make that category active 
        readNews(category, 'ph', '', undefined); //Fetch the news data based on category

        //Closes the navigation bar in mobile
        mobileNav.style.display = 'none';
        wholeBody.style.overflowY = 'auto';

        //Remove contents in textbox
        keywordSearch.value = '';
        mobileKeywordSearch.value = '';
    });
});

/*Keyword search*/
keywordBtn.addEventListener('click', () => {
    //Remove active in the links
    removeCategoryActive();

    //Change displays whether the user wants to view category or keyword
    changeDisplays(keywordSearch); //For non-mobile version

    //Closes the navigation bar in mobile
    mobileNav.style.display = 'none';
    wholeBody.style.overflowY = 'auto';

    clearDisplay(); //Clears the display in the grid
    readNews('', '', keywordSearch, undefined); //Fetch the news based on keywords
});

//Mobile search
mobileKeywordBtn.addEventListener('click', () => {
    //Remove active in the links
    removeCategoryActive();

    //Change displays whether top-headline or everything
    changeDisplays(mobileKeywordSearch); //For mobile version

    //Closes the navigation bar in mobile
    mobileNav.style.display = 'none';
    wholeBody.style.overflowY = 'auto';

    clearDisplay(); //Clears the display in the grid
    readNews('', '', mobileKeywordSearch, undefined); //Fetch the news based on keywords
});

//Advanced search filtering
advancedSearchBtn.addEventListener('click', () => {
    const isMobile = window.matchMedia('(max-width: 1020px)');    
    const filterParameters = [domain.value, dateFrom.value, dateUntil.value, sortBy.value];

    if(isMobile.matches) {
        readNews('', '', mobileKeywordSearch, filterParameters);
        keywordSearch.value = mobileKeywordSearch.value;
    }
    else {
        readNews('', '', keywordSearch, filterParameters);
        mobileKeywordSearch.value = keywordSearch.value;
    }
})
