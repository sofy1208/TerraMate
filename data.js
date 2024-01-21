const productsList = [
    {
        id: 1,
        name: "Vaso Camping Waterdog",
        category: "Vasos",
        price: 11399,
        img: "./imagenes/Productos/TDA/Vasos/2.jpg",
    },

    {
        id: 2,
        name: "Vaso Coffe",
        category: "Vasos",
        price: 4899,
        img: "./imagenes/Productos/TDA/Vasos/Mesadetrabajo21.jpg",
    },

    {
        id: 3,
        name: "Vaso Mug",
        category: "Vasos",
        price: 5399,
        img: "./imagenes/Productos/TDA/Vasos/14.jpg",
    },

    {
        id: 4,
        name: "Vaso Work",
        category: "Vasos",
        price: 6899,
        img: "./imagenes/Productos/TDA/Vasos/Vaso_Termico_1.jpg",
    },

    {
        id: 5,
        name: "Botella Baby 350ml",
        category: "Botellas",
        price: 5399,
        img: "./imagenes/Productos/TDA/botellas/Baby/Babyceleste.png",
    },

    {
        id: 6,
        name: "Botella Inova 1L",
        category: "Botellas",
        price: 12399,
        img: "./imagenes/Productos/TDA/botellas/Inova/Grupo2.png",
    },

    {
        id: 7,
        name: "Botella Munich 500ml",
        category: "Botellas",
        price: 7499,
        img: "./imagenes/Productos/TDA/botellas/Munich/Portadaverde2.jpg",
    },

    {
        id: 8,
        name: "Botella Rolan 750ml",
        category: "Botellas",
        price: 8899,
        img: "./imagenes/Productos/TDA/botellas/ROLAN/BotellaRolan.jpg",
    },

    {
        id: 9,
        name: "Matera Eco",
        category: "Mochilas",
        price: 11899,
        img: "./imagenes/Productos/MARROQUINERÍA/MATERATERRA.jpg",
    },

    {
        id: 10,
        name: "Mochila Matera Notebook",
        category: "Mochilas",
        price: 14399,
        img: "./imagenes/Productos/MARROQUINERÍA/MOCHILAKOTE.jpg",
    },

    {
        id: 11,
        name: "Cartera Camille",
        category: "Mochilas",
        price: 10699,
        img: "./imagenes/Productos/MARROQUINERÍA/TOTECAMILLE.jpg",
    },

    {
        id: 12,
        name: "Cartetra Nina",
        category: "Mochilas",
        price: 10899,
        img: "./imagenes/Productos/MARROQUINERÍA/TOTENINAMILITAR.jpg",
    },

    {
        id: 13,
        name: "Termo Bala 1L",
        category: "Termos",
        price: 8299,
        img: "./imagenes/Productos/TDA/Termos/Bala/Termo_Bala_Acero_Estuche_Tapon_12.jpg",
    },

    {
        id: 14,
        name: "Termo Inova 1L",
        category: "Termos",
        price: 21399,
        img: "./imagenes/Productos/Madu/termoverde.png",
    },

    {
        id: 15,
        name: "Termo Media Manija 1L",
        category: "Termos",
        price: 9899,
        img: "./imagenes/Productos/TDA/Termos/Mediamanija/8.jpg",
    },

    {
        id: 16,
        name: "Termo Bala Eco Cuero 1L",
        category: "Termos",
        price: 11899,
        img: "./imagenes/Productos/Madu/termocuero.jpg",
    },

    {
        id: 17,
        name: "Mate Termico Copa",
        category: "Mates",
        price: 4399,
        img: "./imagenes/Productos/TDA/Mate/Copa_1.jpg",
    },

    {
        id: 18,
        name: "Mate Viajero Termico",
        category: "Mates",
        price: 3999,
        img: "./imagenes/Productos/TDA/Mate/Copa_10.jpg",
    },

    {
        id: 19,
        name: "Mate Camionero Calabaza",
        category: "Mates",
        price: 7599,
        img: "./imagenes/Productos/TDA/Mate/Mate_Camionero_Calabaza_Uruguaya_Imnportada_2.jpg",
    },

    {
        id: 20,
        name: "Mate Pampa",
        category: "Mates",
        price: 7899,
        img: "./imagenes/Productos/TDA/Mate/Mate_Pampa_Caja_1.jpg",
    },  
]
   

const divideProds = (size) => {

    let prodList = [];

    for (let i=0; i < productsList.length; i += size) {
        prodList.push(productsList.slice(i, i + size));
    }

    return prodList;
}

const appState = {

 products: divideProds(8),
 limit: divideProds(8).length,
 prodIndex: 0,
 activeFilter: null,

}