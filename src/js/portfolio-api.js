import axios from 'axios';

const categoryList = document.querySelector('.portfolio-category');
const imagesList = document.querySelector('.portfolio-images');
const buttonElement = document.querySelector('.show-more-button');

let selectedCategory = document.querySelector('#all-photos');

const LIMIT_IMAGE_PER_PAGE = 9;
const LIMIT_IMAGES_PER_SHOW_MORE = 3;
let countTotalImages = 0;
let countShowedImages = 0;

let countShowMoreClicks = 0;

categoryList.addEventListener('click', handleClickCategory);
buttonElement.addEventListener('click', handleShowMoreClick);

async function handleShowMoreClick() {
  countShowMoreClicks++;
  const data = await getWeddingPhotos(
    selectedCategory.id,
    LIMIT_IMAGES_PER_SHOW_MORE + countShowMoreClicks,
    LIMIT_IMAGES_PER_SHOW_MORE
  );
  const list = data.weddingPhotos.map(
    img => `<li><img src="${img.img}" alt="${img.title}"/></li>`
  );
  imagesList.insertAdjacentHTML('beforeend', list.join(''));
}
function handleClickCategory(e) {
  countShowMoreClicks = 0;
  countShowedImages = 0;
  countTotalImages = 0;
  console.log(e.target.tagName);

  if (e.target.tagName !== 'LI') {
    return;
  }

  selectedCategory.removeAttribute('class');
  selectedCategory = e.target;
  e.target.classList.add('selected-category');
  if (e.target.id === 'all-photos') {
    renderBasicImages();
  } else {
    renderBasicImages(e.target.id);
  }
}

async function getCategories() {
  const response = await axios.get(
    'https://wedding-photographer.b.goit.study/api/categories'
  );
  return response.data;
}

async function getWeddingPhotos(
  categories = undefined,
  page = 1,
  limit = LIMIT_IMAGE_PER_PAGE
) {
  if (categories === 'all-photos') {
    categories = undefined;
  }
  const response = await axios.get(
    'https://wedding-photographer.b.goit.study/api/wedding-photos',
    {
      params: {
        page: page,
        limit: limit,
        categoryId: categories,
      },
    }
  );
  console.log(response.data);
  countTotalImages = response.data.totalItems;
  countShowedImages += response.data.weddingPhotos.length;
  if (countShowedImages === countTotalImages) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
  return response.data;
}
renderCategories();
renderBasicImages();
async function renderCategories() {
  const categories = await getCategories();
  const list = categories.map(img => `<li id=${img._id}>${img.category}</li>`);
  categoryList.insertAdjacentHTML('beforeend', list.join(''));
}

async function renderBasicImages(category = undefined) {
  imagesList.innerHTML = '';
  const images = await getWeddingPhotos(category);
  const list = images.weddingPhotos.map(
    img => `<li><img src="${img.img}" alt="${img.title}"/></li>`
  );
  imagesList.insertAdjacentHTML('beforeend', list.join(''));
}
