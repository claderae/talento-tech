const menuToggle = document.querySelector('.menu-toggle');
const navHeader = document.querySelector('.nav-header');

menuToggle.addEventListener('click', () => {
    navHeader.classList.toggle('active');
});
