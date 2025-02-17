var experimentCounter = 0;

document.addEventListener("DOMContentLoaded", function(event) {
    var horizontal = document.getElementsByClassName('horizontal');
    var vertical = document.getElementsByClassName('vertical');
    var coordinate = document.getElementsByClassName('coordinate');
    var split = document.getElementsByClassName('split');
    var experiment = document.getElementsByClassName('experiment');
    var experimentTest = document.getElementsByClassName('experiment-test'); 
    var closeExperiment = document.getElementsByClassName('close-experiment'); 
    var sliderWdth = document.getElementsByClassName('slider-wdth'); 
    var sliderWght = document.getElementsByClassName('slider-wght'); 
    var sliderYtas = document.getElementsByClassName('slider-ytas'); 

    const alignments = ["left", "center", "right"];
    var algn = 2;

    for (const element of horizontal) {
        element.addEventListener("mousemove", function(e){
            var rect = e.target.getBoundingClientRect();
            var x = rect.right - e.clientX;
            if (element.classList.contains('fonetic') || element.classList.contains('non-binary') || element.classList.contains('letter-shape')){
                this.style.setProperty("font-variation-settings", "'wght'"+900/rect.width*x);    
            } else if (element.classList.contains('david-upright-italic')){
                this.style.setProperty("font-variation-settings", "'STYL'"+900/rect.width*x); 
            } else if (element.classList.contains('ashk')){
                this.style.setProperty("font-variation-settings", "'ASHK'"+900/rect.width*x);    
            } else if (element.classList.contains('pronunciation')){
                this.style.setProperty("font-variation-settings", "'YEMN'"+900/rect.width*x);    
            } else {
                this.style.setProperty("font-variation-settings", "'wdth'"+900/rect.width*x);
            }

        });
    }

    for (const element of vertical) {
        element.addEventListener("mousemove", function(e){
            var rect = e.target.getBoundingClientRect();
            var y = e.clientY - rect.top;
            this.style.setProperty("font-variation-settings", "'ytas'"+900/rect.height*y);
        });
    }

    for (const element of coordinate) {
        element.addEventListener("mousemove", function(e){
            var rect = element.getBoundingClientRect();
            console.log(rect);
            var x = rect.right - e.clientX;
            var y = e.clientY - rect.top;
            document.getElementsByClassName('frankg-arial')[0].style.setProperty("font-variation-settings", "'TYPE'"+900/rect.width*x);
            document.getElementsByClassName('frankg-arial')[0].style.setProperty("line-height", 0.2/rect.height*y+1);
            document.getElementsByClassName('frankg-arial')[0].style.setProperty("margin-top", -110+0.2/rect.height*y+1+"px");
        });
    }

    for (const element of sliderWdth) {
        element.addEventListener("input", function (e) {
            let axisValue = element.value;
            element.parentNode.getElementsByClassName("experiment-text")[0].style.setProperty("font-variation-settings", "'wdth' " +axisValue);
        });
    }

    for (const element of sliderWght) {
        element.addEventListener("input", function (e) {
            let axisValue = element.value;
            element.parentNode.getElementsByClassName("experiment-text")[0].style.setProperty("font-variation-settings", "'wght' " +axisValue);
        });
    }

    for (const element of sliderYtas) {
        element.addEventListener("input", function (e) {
            let axisValue = element.value;
            element.parentNode.getElementsByClassName("experiment-text")[0].style.setProperty("font-variation-settings", "'ytas' " +axisValue);
        });
    }


    for (const element of split) {
        var txt = element.innerText.split('');
        element.innerHTML="";
        for (i = 0;  i < txt.length; i++) {
            const span = document.createElement("span");
            span.innerHTML = txt[i];
            if (element.classList.contains('hadassah-letterpress')){
                span.classList.add("animate-hover-insp");
            } else if (element.classList.contains('decorative')){
                span.classList.add("animate-hover-wdth");
            } else {
                span.classList.add("animate-hover-insp-rev");
            }
            element.append(span);
        }
    }

    for (const element of experiment) {
        element.addEventListener("click", function(e){
            experimentCounter++;
            e.target.style.color = "var(--black)";
            document.getElementById(e.target.getAttribute('data-type')).style.display = "block";
            document.getElementById(e.target.getAttribute('data-type')).style.setProperty("width", randomIntFromInterval(20,40)+'%');
            if (experimentCounter == 1){
                document.querySelector(".placeholder").style.display = "none";
            }
        });
    }

    for (const element of experimentTest) {
        element.addEventListener("click", function(e){
            for (const element of experimentTest) {
                element.style.setProperty("border", "none");
                element.classList.remove("active");
            }
            e.target.closest('.experiment-test').style.setProperty("border", "1px dashed white");
            e.target.closest('.experiment-test').classList.add("active");
            document.getElementById("slider-var").value = document.querySelector(".active").getAttribute('data-value');
            /*document.getElementById("value-size").innerText = document.querySelector(".active").getAttribute('data-value');*/
            document.getElementById("algnt").src="/assets/icons/"+alignments[document.querySelector(".active").getAttribute('data-alignment') || 1]+".svg";
        });
        dragElement(element.querySelector('.experiment-header'));
    }

    for (const element of closeExperiment) {
        element.addEventListener("click", function(e){
            e.target.closest('.experiment-test').style.setProperty("display", "none");
            document.querySelectorAll('[data-type="'+e.target.closest('.experiment-test').getAttribute('id')+'"]')[0].style.color = "white";;
            experimentCounter--;
            if (experimentCounter == 0){
                document.querySelector(".placeholder").style.display = "block";
                document.querySelector(".active").classList.remove("active");
            }
        });
    }

    /*document.getElementById("slider-size").addEventListener("input", function () {
        if(experimentCounter == 0 || document.querySelector(".active") == null){
            let axisValue = document.getElementById("slider-size").value;
            document.getElementById("testarea").style.fontSize = axisValue+"px";
            document.getElementById("value-size").innerText = axisValue;
        }
        let axisValue = document.getElementById("slider-size").value;
        document.querySelector(".active").style.fontSize = axisValue+"px";
        document.getElementById("value-size").innerText = axisValue;
    });*/

    document.getElementById("slider-var").addEventListener("input", function () {
        let axisValue = document.getElementById("slider-var").value;
        document.querySelector(".active").style.setProperty("font-variation-settings", "'"+document.querySelector(".active").getAttribute('data-axis')+"' "+ axisValue);
        /*document.getElementById("value-size").innerText = axisValue;*/
        document.querySelector(".active").setAttribute('data-value', axisValue);
    });

    document.getElementById("text-align").addEventListener("click", function () {
        if(document.querySelector(".active") == null){
            document.getElementById("testarea").getAttribute('data-alignment') || 2;
            document.getElementById("testarea").style.textAlign = alignments[algn%3];
            document.getElementById("algnt").src="/assets/icons/"+alignments[algn%3]+".svg";
            document.getElementById("testarea").setAttribute('data-alignment', ((algn + 1)%3));
        } else {
            algn = document.querySelector(".active").getAttribute('data-alignment') || 2;
            document.querySelector(".active").style.textAlign = alignments[algn%3];
            document.getElementById("algnt").src="/assets/icons/"+alignments[algn%3]+".svg";
            document.querySelector(".active").setAttribute('data-alignment', ((algn + 1)%3));
        }
    });

    document.getElementById("increase-size").addEventListener("click", function () {
        if(document.querySelector(".active") == null){
            document.getElementById("testarea").style.fontSize = parseFloat(document.getElementById("testarea").style.fontSize) + 4 + "px";
        } else {
            document.querySelector(".active").style.fontSize = parseFloat(document.querySelector(".active").style.fontSize) + 4 + "px";
        }
    });

    document.getElementById("decrease-size").addEventListener("click", function () {
        if(document.querySelector(".active") == null){
            document.getElementById("testarea").style.fontSize = parseFloat(document.getElementById("testarea").style.fontSize) - 4 + "px";
        } else {
            document.querySelector(".active").style.fontSize = parseFloat(document.querySelector(".active").style.fontSize) - 4 + "px";
        }
    });


    document.getElementById("change-color").addEventListener("click", function () {
        if(document.querySelector("tester").getAttribute('data-color') != "inverted" || null){
            document.querySelector("tester").style.color = "var(--mid-green)";
            document.querySelector("tester").style.backgroundColor = "white";
            document.querySelector("tester").setAttribute('data-color', "inverted");
            document.getElementById("change-color").src="/assets/icons/inverted.svg";
            document.getElementById("slider-var").style.setProperty('--slider-color', "#00ac3c");
        } else {
            document.querySelector("tester").style.color = "white";
            document.querySelector("tester").style.backgroundColor = "var(--mid-green)";
            document.querySelector("tester").setAttribute('data-color', "");
            document.getElementById("change-color").src="/assets/icons/normal.svg";
            document.getElementById("slider-var").style.setProperty('--slider-color', "white");
        }
    });



    document.getElementsByClassName('close')[0].addEventListener("click", function (e) { popup() });

    document.getElementsByClassName('close')[1].addEventListener("click", function (e) { popupCredits() });


});

function popup() {
    var popup = document.getElementsByClassName('popup-container')[0];
    if (popup.style.display === "none") {
        popup.style.display = "grid";
    } else {
        popup.style.display = "none";
    }
}

function popupCredits() {
    var popup = document.getElementsByClassName('popup-container')[1];
    if (popup.style.display === "none") {
        popup.style.display = "grid";
    } else {
        popup.style.display = "none";
    }
}

function isVisible(elem) {
    return elem.bottom-108 >=0 && elem.top-108 <= 0;
}


window.addEventListener('scroll', function() {
    for(i = 1; i<=4; i++){
        var element = document.getElementsByClassName('section-'+i)[0];
        var elementPosition = element.getBoundingClientRect();

        if (isVisible(elementPosition)) {
            document.getElementById("sect"+i).classList.add('highlight');
        } else {
            document.getElementById("sect"+i).classList.remove('highlight');
        }   
    }

    var element = document.getElementById('test');
    var elementPosition = element.getBoundingClientRect();
    if (isVisible(elementPosition)) {
        document.getElementById("tst").classList.add('highlight');
    } else {
        document.getElementById("tst").classList.remove('highlight');
    }   
});


function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.closest(".experiment-test").style.top = (elmnt.closest(".experiment-test").offsetTop - pos2) + "px";
        elmnt.closest(".experiment-test").style.left = (elmnt.closest(".experiment-test").offsetLeft - pos1) + "px";
        elmnt.closest(".experiment-test").style.position = "absolute";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}