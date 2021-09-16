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

btn.onclick = function () {
    const className = btn.getAttribute('class');
    if (className === 'dark') {
        btn.setAttribute('class', 'light');
        btn.textContent = 'Lighten';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    } else if (className === 'light') {
        btn.setAttribute('class', 'dark');
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
}