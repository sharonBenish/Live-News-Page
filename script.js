let data = [];
const others = document.querySelector(".others");
const mainStory = document.querySelector(".main-article");
const mobileMenu = document.querySelector(".mobile-menu");
const menu = document.querySelector(".menu-items");
const loadingImg = document.querySelector(".loading");
const headings = document.querySelectorAll(".headings");
const container = document.querySelector(".container");
const typeHeading = document.querySelector(".headings.type");
let value = ''

async function fetchFromAPI () {
    mainStory.innerHTML=""
    others.innerHTML=""
    loadingImg.style.display='flex';
    headings.forEach(heading=>{
        heading.style.display ="none"
    })
    const response = await fetch("https://inshorts.deta.dev/news?category=" +value)
    const res = await response.json();

    if (res) {
        loadingImg.style.display = 'none';
        headings.forEach(heading=>{
            heading.style.display ="block"
        })
    }

    data = res.data;
    //console.log(data);

    const stories = data.slice(1).map(d => {
        return `<div class="article">
            <div class="non-text">
                <div class="image"><img src="${d.imageUrl}" alt=""></div>
            </div>
            <div class="main">
                <div class="date_auth">
                    <div class="date">${d.date}</div>
                    <div class="author">By: ${d.author}</div>
                </div>
                <h3 class="title">${d.title}</h3>
                <div class="story">${d.content}</div>
                <div class="more"><a href="${d.readMoreUrl}">Read more</a></div>
            </div>
        </div>`
    })
    mainStory.innerHTML = `<div class="article">
    <div class="non-text">
        <div class="image"><img src="${data[0].imageUrl}" alt=""></div>
    </div>
    <div class="main">
    <div class="date_auth">
            <div class="date">${data[0].date}</div>
            <div class="author">By: ${data[0].author}</div>
        </div>
    <h3 class="title">${data[0].title}</h3>
    <div class="story">${data[0].content}</div>
    <div class="more"><a href="${data[0].readMoreUrl}">Read more</a></div>
    </div>
</div>`
  others.innerHTML = stories.join("");     
}

fetchFromAPI()


mobileMenu.addEventListener("click", ()=>{
    menu.classList.toggle("open");

})

menu.addEventListener("click", (e)=>{
    key = e.target;
    const links = [...menu.children];
    if (key.tagName == 'LI'){
        typeHeading.textContent = `${key.dataset.type} News`
        for (link of links){
            link.classList.remove("active");
        }
        key.classList.add("active");
        value=key.id;
        fetchFromAPI()
    }
})
