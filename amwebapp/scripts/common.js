let currentpopup = '';
let themes = [
    [[0, 0, 0], [255, 255, 255], [2, 77, 75]],
    [[0, 0, 0], [255, 255, 255], [135, 0, 47]],
    [[0, 0, 0], [255, 255, 255], [21, 77, 0]],
    [[0, 0, 0], [255, 255, 255], [39, 0, 74]],
    [[0, 0, 0], [255, 255, 255], [122, 104, 0]],
    [[0, 33, 23], [255, 255, 255], [135, 0, 47]],
    [[0, 0, 0], [255, 255, 255], [55, 55, 55]]
];
let themeindex = 0;

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(name) {
    if (getCookie(name) != "") {
        return getCookie(name);
    }
    return false;
}

function getMostVisible(elements) {
    var element,
        viewportHeight = window.innerHeight,
        max = 0;

    elements.forEach(e => {
        var visiblePx = getVisibleHeightPx(e, viewportHeight);
        if (visiblePx > max) {
            max = visiblePx;
            element = e;
        }
    });

    return element;
}

function getVisibleHeightPx(element, viewportHeight) {
    var rect = element.getBoundingClientRect(),
        height = rect.bottom - rect.top,
        visible = {
            top: rect.top >= 0 && rect.top < viewportHeight,
            bottom: rect.bottom > 0 && rect.bottom < viewportHeight
        },
        visiblePx = 0;

    if (visible.top && visible.bottom) {
        visiblePx = height;
    } else if (visible.top) {
        visiblePx = viewportHeight - rect.top;
    } else if (visible.bottom) {
        visiblePx = rect.bottom;
    } else if (height > viewportHeight && rect.top < 0) {
        var absTop = Math.abs(rect.top);
        if (absTop < height) {
            visiblePx = height - absTop;
        }
    }

    return visiblePx / height;
}

window.onload = function(e) {
    if (checkCookie("theme")) {
        if (parseInt(checkCookie("theme")) >= themes.length) {
            setCookie("theme", themes.length - 1, 365);
        }
        themeindex = parseInt(getCookie("theme"));
        document.body.style.setProperty("--marginalbg", `rgb(${themes[themeindex][0][0]}, ${themes[themeindex][0][1]}, ${themes[themeindex][0][2]})`)
        document.body.style.setProperty("--text", `rgb(${themes[themeindex][1][0]}, ${themes[themeindex][1][1]}, ${themes[themeindex][1][2]})`)
        document.body.style.setProperty("--accentr", themes[themeindex][2][0]);
        document.body.style.setProperty("--accentg", themes[themeindex][2][1]);
        document.body.style.setProperty("--accentb", themes[themeindex][2][2]);
    }
    var navs = document.getElementsByClassName("nav");
    navs[0].classList.add("current-nav");
    document.addEventListener("scroll", function() {
        var panels = document.getElementsByClassName("panel");
        const mostVisible = getMostVisible(Array.from(panels));
        for (var i = 0; i < panels.length; i++) {
            if (panels[i] == mostVisible) {
                navs[i].classList.add("current-nav");
            } else {
                navs[i].classList.remove("current-nav");
            }
        }
    })
    document.getElementById("settingsbtn").addEventListener("click", function() {
        if (currentpopup == '') {
            document.getElementById("settings").style.display = "flex";
            currentpopup = 'settings';
            document.getElementById("shade").style.display = "flex";
        } else if (currentpopup == 'settings') {
            document.getElementById("settings").style.display = "none";
            currentpopup = '';
            document.getElementById("shade").style.display = "none";
        }
    })
    document.getElementById("accent").addEventListener("click", function() {
        if (themeindex == themes.length - 1) {
            themeindex = 0;
        } else {
            themeindex += 1;
        }
        document.body.style.setProperty("--marginalbg", `rgb(${themes[themeindex][0][0]}, ${themes[themeindex][0][1]}, ${themes[themeindex][0][2]})`)
        document.body.style.setProperty("--text", `rgb(${themes[themeindex][1][0]}, ${themes[themeindex][1][1]}, ${themes[themeindex][1][2]})`)
        document.body.style.setProperty("--accentr", themes[themeindex][2][0]);
        document.body.style.setProperty("--accentg", themes[themeindex][2][1]);
        document.body.style.setProperty("--accentb", themes[themeindex][2][2]);
        setCookie("theme", themeindex, 365);
    })
    document.getElementById("exit").addEventListener("click", function() {
        document.getElementById(currentpopup).style.display = "none";
        currentpopup = '';
        document.getElementById("shade").style.display = "none";
    })
}