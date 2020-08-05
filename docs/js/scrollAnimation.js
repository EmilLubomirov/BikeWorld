function scrollAnimation() {

    const articles = document.querySelectorAll('.bikes-collection .bike');
    let prevViewportHeight = 0;
    const effectVal = 70;

    const viewportHeight = window.innerHeight;

    if (prevViewportHeight > viewportHeight){
        return;
    }

    for (const article of Array.from(articles)){
        const rect = article.getBoundingClientRect();
        const articlePositionTop = rect.top + effectVal;

        if (articlePositionTop < viewportHeight){
            article.style.opacity = '1';
        }
    }

    prevViewportHeight = viewportHeight;
}

window.addEventListener('scroll', scrollAnimation);