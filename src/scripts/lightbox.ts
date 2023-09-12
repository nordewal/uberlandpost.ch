import PhotoSwipeLightbox from "photoswipe/lightbox";
import PhotoSwipe from "photoswipe";


// PhotoSwipeLightbox is the nice UI when clicking on a picture

// fullscreen capability
const fullscreenAPI = getFullscreenAPI();
const pswpContainer = getContainer();
function getFullscreenPromise() {
    // Always resolve promise,
    // as wa want to open lightbox
    // (no matter if fullscreen is supported or not)
    return new Promise((resolve) => {
        if (!fullscreenAPI || fullscreenAPI.isFullscreen()) {
            // fullscreen API not supported, or already fullscreen
            resolve();
            return;
        }

        document.addEventListener(
            fullscreenAPI.change,
            (event) => {
                pswpContainer.style.display = "block";
                // delay to make sure that browser fullscreen animation is finished
                setTimeout(function () {
                    resolve();
                }, 300);
            },
            { once: true }
        );

        fullscreenAPI.request(pswpContainer);
    });
}
// Simple fullscreen API helper,
// supports unprefixed and webkit-prefixed versions
function getFullscreenAPI() {
    let api;
    let enterFS;
    let exitFS;
    let elementFS;
    let changeEvent;
    let errorEvent;

    if (document.documentElement.requestFullscreen) {
        enterFS = "requestFullscreen";
        exitFS = "exitFullscreen";
        elementFS = "fullscreenElement";
        changeEvent = "fullscreenchange";
        errorEvent = "fullscreenerror";
    } else if (document.documentElement.webkitRequestFullscreen) {
        enterFS = "webkitRequestFullscreen";
        exitFS = "webkitExitFullscreen";
        elementFS = "webkitFullscreenElement";
        changeEvent = "webkitfullscreenchange";
        errorEvent = "webkitfullscreenerror";
    }

    if (enterFS) {
        api = {
            request: function (el) {
                if (enterFS === "webkitRequestFullscreen") {
                    el[enterFS](Element.ALLOW_KEYBOARD_INPUT);
                } else {
                    el[enterFS]();
                }
            },

            exit: function () {
                return document[exitFS]();
            },

            isFullscreen: function () {
                return document[elementFS];
            },

            change: changeEvent,
            error: errorEvent,
        };
    }

    return api;
}
function getContainer() {
    const pswpContainer = document.createElement("div");
    pswpContainer.style.background = "#000";
    pswpContainer.style.width = "100%";
    pswpContainer.style.height = "100%";
    pswpContainer.style.display = "none";
    document.body.appendChild(pswpContainer);
    return pswpContainer;
}

const lightbox = new PhotoSwipeLightbox({
    gallery: "#gallery",
    children: "a",
    pswpModule: PhotoSwipe,
    openPromise: getFullscreenPromise,
    // Append PhotoSwipe to our container
    appendToEl: fullscreenAPI ? pswpContainer : document.body,

    // disable opening/closing animations for fullscreen
    showAnimationDuration: 0,
    hideAnimationDuration: 0,

    paddingFn: (viewportSize) => {
        return {
            top: 0,
            bottom: 40,
            left: 0,
            right: 0,
        };
    },
});
lightbox.on("close", () => {
    pswpContainer.style.display = "none";
    if (fullscreenAPI && fullscreenAPI.isFullscreen()) {
        fullscreenAPI.exit();
    }
});
lightbox.on("uiRegister", function () {
    lightbox.pswp.ui.registerElement({
        name: "custom-caption",
        order: 9,
        isButton: false,
        appendTo: "root",
        html: "Caption text",
        onInit: (el, pswp) => {
            lightbox.pswp.on("change", () => {
                const currSlideElement =
                    lightbox.pswp.currSlide.data.element;
                let captionHTML = "";
                if (currSlideElement) {
                    captionHTML = currSlideElement
                        .querySelector("img")
                        .getAttribute("alt");
                }
                el.innerHTML = captionHTML || "";
            });
        },
    });
});

export default lightbox;