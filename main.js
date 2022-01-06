'use strict'

//Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    if (window.scrollY > navbarHeight){
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
});

// Handle Scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar_menu');
navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;
    if(link == null){
        return; //아무것도 하지 않음
    }
    // console.log(event.target.dataset.link);
    scrollIntoView(link)
})

// Handle click on "contact me" button home
const homeContactBtn = document.querySelector('.home_contact');
homeContactBtn.addEventListener('click', () => {
    scrollIntoView('#contact')
})

//Make home slowly fade to transparent as window scrolls down
const home = document.querySelector('.home_container');//querySelector로 home의 정보를 가져온다.
//.home_container에 넣으면 배경 빼고 contents만 scroll 내릴수록 희미해짐
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    home.style.opacity = 1 - window.scrollY / homeHeight;
})


function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: "smooth"});
}