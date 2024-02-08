(async () => {                                           //await use karne ke liye pura function async ke under banana padega nehi to error aaega 

    const productContainerEl = document.getElementById("productContainer");
    const searchInputEl = document.getElementById("search_input");
    const url = "https://fakestoreapi.com/products";    //API ke url ko wait karayenge
    const fetchProducts = async () => {
        try {
            const res = await fetch(url);
            return await res.json();
        }
        catch (error) {
            return error;
        }
    };

    // data show karane ka code:

    const products = await fetchProducts();
    const generateProducts = (product) => {
        return `<div class="product_card">
    <div class="image_container">
        <img src="${product.image}" alt="">
    </div>
    <div class="product_content">
        <h2>${product.title}</h2>
        <p>${product.description.split(" ").slice(0, 20).join(" ")}</p>
        <button>${product.price} $</button>
    </div>
</div>`;
    };

    const renderProducts = (products) => {
        productContainerEl.innerHTML = "";
        products.forEach(product => {
            productContainerEl.innerHTML += generateProducts(product);
        });
    };
    const checkTextContain = (text, searchText) => {
        return text.toString().toLowerCase().includes(searchText);
      };
    

    const filterHandler = (event) => {
        const searchText = event.target.value.toLowerCase();
        const filteredProducts = products.filter((product) => {
            return (
                checkTextContain(product.description, searchText) ||
                checkTextContain(product.title, searchText) ||
                checkTextContain(product.price, searchText) 

            );
    });
        renderProducts(filteredProducts);
};
searchInputEl.addEventListener("keyup", filterHandler);
renderProducts(products);
}) ()