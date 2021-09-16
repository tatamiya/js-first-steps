const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

// Looping through the images
for (let i = 1; i < 6; i++) {
    const imageUrl = `images/pic${i}.jpg`
    const newImage = document.createElement('img');
    newImage.setAttribute('src', imageUrl);
    thumbBar.appendChild(newImage);
}

thumbBar.addEventListener('click', function (e) {
    displayedImage.src = e.target.src;
});