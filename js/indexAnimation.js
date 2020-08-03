async function indexAnimation()  {

    const intervalTimeout = 9000;

    const helperFunctions = {
        getDeviceType:  (screenWidth) =>{

            const deviceDimensions = {
                'phone': 600,
                'tablet': 900,
                'mobile': 1024,
                'desktop': 1599,
            };

            switch (true) {

                case (screenWidth <= deviceDimensions.phone): return 'phone';
                case (screenWidth <= deviceDimensions.tablet): return 'tablet';
                case (screenWidth <= deviceDimensions.mobile): return 'mobile';
                case (screenWidth <= deviceDimensions.desktop): return 'desktop';
                default: return   'large';
            }
        },

        getAnimationImagePosition: (screenWidth) => {

            const devicePositions = {
                'phone': -650,
                'tablet': -850,
                'mobile': -1000,
                'desktop': -1500,
                'large': -1800,
            };

            const deviceType = helperFunctions.getDeviceType(screenWidth);
            return devicePositions[deviceType];
        },

        removeElementPadding: (elem) =>{
            elem.style.padding = '0';
        }
    };

    const elements = {
        imageParent: document.querySelector('.index-banner .index-images'),
        mainSection: document.querySelector('.site-main'),
    };

    let c = 0;

    if (!elements.imageParent){
        return;
    }

    const imagesLength = elements.imageParent.children.length;
    let nextImage = elements.imageParent.children[0];

    let id = -1;
    let isLast = false;
    let imageInitialPosition = helperFunctions.getAnimationImagePosition(window.innerWidth);

    const actions = {
        showNext: async () =>{

            id++;

            isLast = (id >= imagesLength);

            if (isLast){
                id = 0;
            }

            if (!elements.imageParent){
                return;
            }

            nextImage = elements.imageParent.children[id];
            actions.setImageProperties('100%', 'auto', 'translateX(0px)', nextImage);

            const prevIndex = (id - 1) >= 0 ? (id - 1) : (imagesLength - 1);
            const prevImage = elements.imageParent.children[prevIndex];

            const timeout = isLast ? 0 : 2000;

            await setTimeout(() =>{
                actions.setImageProperties('0', '0', `translateX(${imageInitialPosition}px)`,prevImage);
            }, timeout);
        },

        resetHeight: () =>{
            elements.imageParent.style.height = nextImage.clientHeight + 'px';
        },

        setImageProperties: (width, height, transform, img) => {
            img.style.width = width;
            img.style.height = height;
            img.style.transform = transform;
        }
    };

    helperFunctions.removeElementPadding(elements.mainSection);
    actions.resetHeight();
    window.addEventListener('resize', actions.resetHeight);

    await actions.showNext();
    c = setInterval(actions.showNext, intervalTimeout);

    window.onresize = async () =>{
        await clearInterval(c);
        id = imagesLength - 1;

        imageInitialPosition = helperFunctions.getAnimationImagePosition(window.innerWidth);

        for (let i = 0; i < imagesLength; i++){
            elements.imageParent.children[i].style.transform =
                `translateX(${imageInitialPosition}px)`
        }

        await actions.showNext();
        c = setInterval(actions.showNext, intervalTimeout);
    }
}