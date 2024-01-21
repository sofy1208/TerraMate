const containerProducts = document.querySelector(".container");
const showMore_btn = document.querySelector(".btn_prod");
const filter = document.querySelector(".filter");
const categoriesBtn = document.querySelectorAll(".category");
const cartBtn = document.querySelector(".cart_icon");
const cartMenu = document.querySelector(".cart");
const menuBtn = document.querySelector(".hamb-men");
const menuResp = document.querySelector(".menu");
const productsCart = document.querySelector(".cart-container");
const totalPrice = document.querySelector(".total");
const bubble = document.querySelector(".cart-bubble"); 
const buyBtn = document.querySelector(".btn_cart");
const deleteBtn = document.querySelector(".btn-delete");
const succesModal = document.querySelector(".add-modal");
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
            <button class="btn-add"
            data-id ='${id}'
            data-name='${name}'
            data-category='${category}'
            data-img='${img}'
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
};

const activeBtn = (selectedCategory) => {
 const categories = [...categoriesBtn];
 categories.forEach((categoryBtn) => {
    const isActive = categoryBtn.dataset.category === selectedCategory;
    categoryBtn.classList.toggle("active", isActive);
    categoryBtn.classList.toggle("inactive", !isActive);
 });
};

const changeFilterState = (btn) => {
  appState.activeFilter = btn.dataset.category;
  activeBtn(appState.activeFilter);
  showMoreFilter(appState.activeFilter);
};

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
};

const inactiveFilterBtn = (element) => {
    return (
     element.classList.contains("category") && !element.classList.contains("active")
    ) 
};

const renderFilter = () => {

    const filterProducts = productsList.filter((product) => {
        return product.category === appState.activeFilter;
    })
    rendProduct(filterProducts);
};


//Carrito de compras

const toggleCart = () => {

 cartMenu.classList.toggle("open-cart");
 if (menuResp.classList.contains("open-menu")) {
    menuResp.classList.remove("open-menu");
    return;
}
};

const toggleMenu = () => {
    menuResp.classList.toggle("open-menu");
    if (cartMenu.classList.contains("open-cart")) {
        cartMenu.classList.remove("open-cart");
        return;
    }
};

const colseOnScroll = () =>{
if (!menuResp.classList.contains("open-menu") && (!cartMenu.classList.contains("open-cart"))){
    return
}
menuResp.classList.remove("open-menu");  
cartMenu.classList.remove("open-cart");
};

const closeOnClick = (e) => {
 if(e.target.classList.contains("navbar-link")){
    return
 }
};

const cartTemplate = (cartProduct) => {
    const {id, name, price, img, quantity} = cartProduct;
    return `
    <div class="cart-prod">
    <img src=${img} alt="producto del carrito" />
    <div class="item-info">
      <h3 class="item-title">${name}</h3>
      <span class="item-price">$ ${price} ARS</span>
    </div>
    <div class="item-handler">
      <span class="quantity-handler down" data-id=${id}>-</span>
      <span class="item-quantity">${quantity}</span>
      <span class="quantity-handler up" data-id=${id}>+</span>
    </div>
  </div>
    `
};

const renderCart = () => {
    productsCart.innerHTML = cart.map(cartTemplate).join("")
    
};

const totalCartPrice = () => {
   return cart.reduce((acc, curr) => acc + Number(curr.price) * curr.quantity, 0)
};

const totalCart = () => {
    totalPrice.innerHTML = `${totalCartPrice().toFixed(2)} $ ARS `
};

const renderBubble = () => {
    bubble.textContent = cart.reduce((acc, curr) => acc + curr.quantity, 0)
};

const disableBtn = (btn) => {
  if(!cart.length) {
    btn.classList.add("disabled")
  } else {
    btn.classList.remove("disabled")
  }

};

/*Actualizo estado de carrito*/
const updateCartState = () => {
 saveCart();
 renderCart();
 totalCart();
 disableBtn(buyBtn);
 disableBtn(deleteBtn);
 renderBubble();
};

/*agrego productos al carrito*/

const addProduct = (e) =>{
 if(!e.target.classList.contains("btn-add")){
    return
 }
 const product = createProductData(e.target.dataset);
 if (existProduct(product)) {
       addUnitCart(product)
       showModal("Nueva unidad agregada con éxito")
 } else {
      createCartProduct(product)
      showModal("Producto agregado con éxito")
 }
 updateCartState();
};

const showModal = (msg) => {
succesModal.classList.add("active-modal");
succesModal.textContent = msg;
setTimeout(()=>{
    succesModal.classList.remove("active-modal");
}, 1500)
};

const createCartProduct = (product) => {
    cart = [...cart, {...product , quantity: 1}]
};

const addUnitCart = (product) => {
    cart= cart.map((cartProduct)=>{
     return cartProduct.id === product.id ? {...cartProduct, quantity: cartProduct.quantity +1} : cartProduct
    })
};

const existProduct = (product) => {
     return cart.find((item)=> item.id === product.id)
};

const createProductData = (product) =>{
    const {id, name, price, img} = product;
    return {id, name, price, img};
};

/*Manejo de cantidades del carrito*/

const handleQuantity = (e) =>{
    if(e.target.classList.contains("down")) { 
        handleMinusBtnEvent(e.target.dataset.id)
    } else if (e.target.classList.contains("up")) {
        handlePlusBtnEvent(e.target.dataset.id)
    }
    updateCartState();
}

const handlePlusBtnEvent = (id) => {
        const existingCartProduct = cart.find((item) => item.id === id);
        addUnitCart(existingCartProduct);
}

const handleMinusBtnEvent = (id) => {
    const existingCartProduct = cart.find((item)=>item.id === id)
    if (existingCartProduct.quantity === 1) {
        if(window.confirm("¿Desea eliminar el producto del carrito?")) {
            removeProductFromCart(existingCartProduct)
        }
        return;
    }
    substractProductUnit(existingCartProduct)
}

const removeProductFromCart = (existingProduct) => {
    cart = cart.filter((product) => product.id !== existingProduct.id)
    updateCartState();
}

const substractProductUnit = (existingProduct) => {
    cart = cart.map((product) => {
        return product.id === existingProduct.id ? {...product, quantity: Number(product.quantity) - 1} : product
    })
}

/*Finalizar compra y vaciar carrito*/

const resetCartItems = () => {
    cart = [];
    updateCartState();
}

const completeCart = (confirmMsg, successMsg) => {
    if(!cart.length) return;
    if (window.confirm(confirmMsg)) {
        resetCartItems();
        alert(successMsg)
    }
}

const completeBuy = () => {
    completeCart("¿Desea finalizar la compra?","¡Gracias por su compra!")
}

const deleteCart = () => {
    completeCart("¿Desea vaciar el carrito?","No hay productos en el carrito")    
}

const init = () => {
 rendProduct(appState.products[0]);
 showMore_btn.addEventListener("click", showProds);
 filter.addEventListener("click", applyFilter);
 cartBtn.addEventListener("click", toggleCart);
 menuBtn.addEventListener("click", toggleMenu);
 window.addEventListener("scroll", colseOnScroll);
 menuResp.addEventListener("click", closeOnClick);
 document.addEventListener("DOMContentLoaded", renderCart);
 document.addEventListener("DOMContentLoaded", totalCart);
 containerProducts.addEventListener("click", addProduct);
 productsCart.addEventListener("click",handleQuantity);
 buyBtn.addEventListener("click", completeBuy);
 deleteBtn.addEventListener("click", deleteCart);
 disableBtn(buyBtn);
 disableBtn(deleteBtn);
 renderBubble();

};

init();