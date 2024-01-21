const containerProducts = document.querySelector(".container");
const showMore_btn = document.querySelector(".btn_prod");
const filter = document.querySelector(".filter");
const categoriesBtn = document.querySelectorAll(".category");
const cartBtn = document.querySelector(".cart_icon")
const cartMenu = document.querySelector(".cart")
const menuBtn = document.querySelector(".hamb-men")
const menuResp = document.querySelector(".menu")

//Guardo datos de carrito en localstorage

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart))
};

//Sección Productos

const template = (product) =>{
const {id, name, category, price, img} = product

return ` 

<div class="producto">
    <article class="conten">
        <div class="foto">
            <img src=${img} alt=${name} />
        </div>

        <div class="descr">
            <h4>${name}</h4>
            <h6>$ ${price}</h6>
            <button 
            data-id ='${id}'
            data-name='${name}'
            data-category='${category}'
            data.img='${img}'
            data-price='${price}'>Comprar</button>
        </div>
    </article>
</div>`

};

const rendProduct = (productList) => {

 containerProducts.innerHTML += productList.map(template).join("");

};

const lastIndex = () => {
 return appState.prodIndex === appState.limit - 1;
};

const showProds = () => {
 appState.prodIndex += 1;
 let {products, prodIndex} = appState;

 rendProduct(products[prodIndex]);
 if (lastIndex()){
    showMore_btn.style.display = "none";
    }
};

const showMoreFilter = () => {
    if(!appState.activeFilter){
        showMore_btn.style.display = "block";
        return
    }
    showMore_btn.style.display = "none";
}

const activeBtn = (selectedCategory) => {
 const categories = [...categoriesBtn];
 categories.forEach((categoryBtn) => {
    const isActive = categoryBtn.dataset.category === selectedCategory;
    categoryBtn.classList.toggle("active", isActive);
    categoryBtn.classList.toggle("inactive", !isActive);
 });
}

const changeFilterState = (btn) => {
  appState.activeFilter = btn.dataset.category;
  activeBtn(appState.activeFilter);
  showMoreFilter(appState.activeFilter);
}

const applyFilter = ({target}) =>{
 if (!inactiveFilterBtn(target)) {
      return
 }
 changeFilterState(target);
 containerProducts.innerHTML = "";
 if(appState.activeFilter){
   renderFilter();
   appState.prodIndex = 0;
   return
 }
 rendProduct(appState.products[0]);
}

const inactiveFilterBtn = (element) => {
    return (
     element.classList.contains("category") && !element.classList.contains("active")
    ) 
}

const renderFilter = () => {

    const filterProducts = productsList.filter((product) => {
        return product.category === appState.activeFilter;
    })
    rendProduct(filterProducts);
}


//Carrito de compras

const toggleCart = () => {

 cartMenu.classList.toggle("open-cart");
 if (menuResp.classList.contains("open-menu")) {
    menuResp.classList.remove("open-menu");
    return;
}
}

const toggleMenu = () => {
    menuResp.classList.toggle("open-menu");
    if (cartMenu.classList.contains("open-cart")) {
        cartMenu.classList.remove("open-cart");
        return;
    }
}

const colseOnScroll = () =>{
if (!menuResp.classList.contains("open-menu") && (!cartMenu.classList.contains("open-cart"))){
    return
}
menuResp.classList.remove("open-menu");  
cartMenu.classList.remove("open-cart");
}

const closeOnClick = (e) => {
 if(e.target.classList.contains("navbar-link")){
    return
 }
}

const init = () => {
 rendProduct(appState.products[0]);
 showMore_btn.addEventListener("click", showProds);
 filter.addEventListener("click", applyFilter);
 cartBtn.addEventListener("click", toggleCart);
 menuBtn.addEventListener("click", toggleMenu);
 window.addEventListener("scroll", colseOnScroll)
 menuResp.addEventListener("click", closeOnClick)
};

init();