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
    navbarMenu.classList.remove('open');
    scrollIntoView(link)
});

//Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar_toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
});

// Handle click on "contact me" button home
const homeContactBtn = document.querySelector('.home_contact');
homeContactBtn.addEventListener('click', () => {
    scrollIntoView('#contact')
});

//Make home slowly fade to transparent as window scrolls down
const home = document.querySelector('.home_container');//querySelector로 home의 정보를 가져온다.
//.home_container에 넣으면 배경 빼고 contents만 scroll 내릴수록 희미해짐
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    home.style.opacity = 1 - window.scrollY / homeHeight;
});


//Show "arrow up" button when scrolling down
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', ()=> {
    if(window.scrollY > homeHeight / 2) {
        arrowUp.classList.add('visible');
    } else{
        arrowUp.classList.remove('visible');
    }
});

// Handle click on the "arrow up" button
arrowUp.addEventListener('click', () => {
    scrollIntoView('#home');
});



// Project
const workBtnContainer = document.querySelector('.work_categories');
const projectContainer = document.querySelector('.work_projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter == null) {
        return;
    }

    //Remove selection from the previous item and select new one
    const active = document.querySelector('.category_btn.selected');
    active.classList.remove('selected');
    const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    target.classList.add('selected');

    projectContainer.classList.add('anim-out');  
    // console.log(filter); 
        setTimeout(() => {
            projects.forEach((project) => {
                console.log(project.dataset.type);
                if (filter === '*' || filter === project.dataset.type) {
                    project.classList.remove('invisible');
                } else {
                    project.classList.add('invisible');
                }
            });
            projectContainer.classList.remove('anim-out');
        }, 300);
    });
//     console.log('--------------'); // forEach와 같은 방법임
//     for( let project of projects) {
//         console.log(project);
//     }
    
//     console.log('--------------');
//     let project;
//     for(let i = 0; i < projects.length ; i++){
//         project = projects[i];
//         console.log(project);
//     }

//1. 모든 섹션 요소들과 메뉴아이템들을 가지고 온다
//2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다
//3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다 
const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#work',
    '#testimonials',
    '#contact',
  ];
  const sections = sectionIds.map((id) => document.querySelector(id));
  const navItems = sectionIds.map((id) =>
    document.querySelector(`[data-link="${id}"]`)
  );
  
  let selectedNavIndex = 0;
  let selectedNavItem = navItems[0];
  function selectNavItem(selected) {
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
  }

  function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: "smooth"});
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
  };
  
  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting && entry.intersectionRatio > 0) {
        console.log('y');
        const index = sectionIds.indexOf(`#${entry.target.id}`);
        // 스크롤링이 아래로 되어서 페이지가 올라옴
        if (entry.boundingClientRect.y < 0) {
          selectedNavIndex = index + 1;
        } else {
          selectedNavIndex = index - 1;
        }
      }
    });
  };
  
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach((section) => observer.observe(section));
 
  window.addEventListener('wheel', () => {
    if (window.scrollY === 0) {
      selectedNavIndex = 0;
    } else if (Math.round(window.scrollY + window.innerHeight) >=
            document.body.clientHeight
    ) {
      selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
  });

  

  
