
// var observer = new IntersectionObserver(function(entries) {
// 	// no intersection with screen
// 	if(entries[0].intersectionRatio === 0)
// 		document.querySelector(".navbar").classList.add("sticky");
// 	// fully intersects with screen
// 	else if(entries[0].intersectionRatio === 1)
// 		document.querySelector(".navbar").classList.remove("sticky");
// }, { threshold: [0,1] });

// observer.observe(document.querySelector(".bottom-navbar"));


let navbar = document.querySelector('.navbar');
let header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    let navHeight = navbar.getBoundingClientRect().height;
    let headerHeight = header.getBoundingClientRect().height;
    let scrolly = window.scrollY;
    
    if(scrolly > headerHeight-navHeight){
        navbar.classList.add('is-pinned')
    } else{
        navbar.classList.remove('is-pinned')
    }
}, {passive:true})