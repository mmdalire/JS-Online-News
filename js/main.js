const wholeBody = document.querySelector('html');

//Image slider
const slider = document.querySelector('.image-slider');
const next = document.querySelector('#right-btn');
const previous = document.querySelector('#left-btn');

//Mobile navigation bar
const mobileNavOpen = document.querySelector('#bars');
const mobileNavClose = document.querySelector('#close');
const mobileNav = document.querySelector('.mobile-nav-bar');

//Headline grid
const headlineContainer = document.querySelector('.headline-grid');

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

/*Display news in top-headlines section*/
/*Text formatting*/
const formatTitle = title => {
    const limitedChar = 85;
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

const displayNews = data => {
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

        headlineContainer.appendChild(newsCard);
        console.log(newsCard);
    }
    data.articles.splice(0, displayNewsMaximum);
    headlineContainer.appendChild(loadMoreNews);

    if(data.articles.length <= displayNewsMaximum) {
        displayNewsMaximum = data.articles.length;
        if(data.articles.length === 0) headlineContainer.removeChild(loadMoreNews);
    }
    
    loadMoreNews.addEventListener('click', () => {
        headlineContainer.removeChild(loadMoreNews);
        displayNews(data);
    });
}

/*News info*/
const readNews = () => {
    const url = 'js/sample.json';

    fetch(url)
    .then(res => res.json())
    .then(data => {
        createSlide(data);
        displayNews(data);
    })
    .catch(error => console.log(error))
}

automaticSlide();
readNews();

next.addEventListener('click', () => {
    nextSlide();
});

previous.addEventListener('click', () => {
    prevSlide();
});

mobileNavOpen.addEventListener('click', () => {
    mobileNav.style.display = 'block';
    wholeBody.style.overflowY = 'hidden';
});

mobileNavClose.addEventListener('click', () => {
    mobileNav.style.display = 'none';
    wholeBody.style.overflowY = 'auto';
});