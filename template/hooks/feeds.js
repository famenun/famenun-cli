(() => {
    setTimeout(() => {
        __famenun__.emit({
            id: "bio",
            layout: "banner",
            data: {
                title: "Update your bio",
                background: "https://cdn.pixabay.com/photo/2016/03/26/13/09/cup-of-coffee-1280537_960_720.jpg",
                path: "./index.html"
            }
        });
    }, 5000);
    setTimeout(() => {
        __famenun__.emit({
            id: "settings",
            layout: "banner",
            data: {
                title: "Review your settings",
                background: "#2196F3",
                path: "./index.html"
            }
        });
    }, 10000);
    setTimeout(() => {
        __famenun__.emit({
            id: "tales",
            layout: "banner",
            data: {
                title: "Watch your friends tales",
                background: "https://cdn.pixabay.com/photo/2020/03/16/14/58/people-4937226_960_720.jpg",
                path: "./index.html"
            }
        });
    }, 15000);
})();