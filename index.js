const colorInput = document.getElementById("color-input")
const getColor = document.getElementById("get-color")
const schemeSelect = document.getElementById("scheme-select")
const schemeCount = document.getElementById("scheme-count")

/* Get rgb Function */
function getRGB() {
    const inputVal = colorInput.value

    const red = parseInt(inputVal.substring(1, 3), 16);
    const green = parseInt(inputVal.substring(3, 5), 16);
    const blue = parseInt(inputVal.substring(5, 7), 16);

    const rgb = [red, green, blue]; // [229, 229, 229]
    return rgb
}

/* Button Function */
getColor.addEventListener('click', function(e) {
    e.preventDefault()
    fetchScheme()
}) 

/* Fetch Function */
function fetchScheme() {
    const scheme = schemeSelect.value
    const count = schemeCount.value
    if (schemeCount.value > 0) {
        fetch(`https://www.thecolorapi.com/scheme?rgb=${getRGB()}&mode=${scheme}&count=${count}`)
            .then(res => res.json())
            .then(data => {    
                renderHTML(data)
                copyText(data)
            })
    } else {
        document.getElementById("color-section").innerHTML = "You need to pick a count"
    }
}

/* Copy Text Function */
function copyText(a) {
    document.addEventListener('click', function(e) {
        const color = a.colors
        
        for(let i = 0; i < color.length; i++) {
            const className = color[i].name.value
            const classColor = color[i].hex.value
            const imgColor = color[i].image.bare
            
            if(e.target.id === classColor){
                navigator.clipboard.writeText(classColor)
                document.getElementById(e.target.id).classList.add("click")
                document.getElementById("copy-msg").style.opacity = 1
                document.getElementById("copy-msg").style.bottom = "40px"
                setTimeout(function(){
                    document.getElementById(e.target.id).classList.remove("click")
                }, 100)
                setTimeout(function(){
                     document.getElementById("copy-msg").style.opacity = 0
                document.getElementById("copy-msg").style.bottom = 0
                }, 1500)
            }
        }
    })
}

/* Render Function */
function renderHTML(e) {
    let html = ""
    const color = e.colors
    
    for(let i = 0; i < color.length; i++) {
        const className = color[i].name.value
        const classColor = color[i].hex.value
        const imgColor = color[i].image.bare
        
        html += `
            <div class="color-group">
                <p class="color-info">${className}</p>
                    <div class="img-group">
                        <img class="colors" id="${classColor}" src="${imgColor}">
                    </div>
                <p class="hex-info" id="${classColor}">${classColor}</p>
            </div>
        `
        
    }
    document.getElementById("color-section").innerHTML = html
}

