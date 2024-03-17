const list = document.querySelector(".section__list");

const name1 = document.querySelector('#name');
const description1 = document.querySelector('#description');
const price1 = document.querySelector('#price');
const image1 = document.querySelector('#linksImg');
const btnAddProduct = document.querySelector('#button-add-product');

const buttonShowForm = document.querySelector('#button-show-form');
const form = document.querySelector('form');
console.log(buttonShowForm);

let isHidden = false;

buttonShowForm.addEventListener('click', () => {

      if(isHidden) {
            form.style.display = 'block'
      } else {
            form.style.display = 'none';
      }

      isHidden = !isHidden;
})




btnAddProduct.addEventListener('click', async () => {
      const URL = "https://dummyjson.com/product/add";

      const newProduct = {
            title: name1.value,
            description: description1.value,
            price: price1.value,
            image: image1.value,
      }

      try {
            const response = await fetch(URL, {
                  method: 'POST',
                  headers: {
                        "Content-Type": "application/json"
                  },
                  body: JSON.stringify(newProduct)
            })

            if(!response.ok) throw new Error('error');

            const createdProduct = await response.json();
            console.log(createdProduct);

      } catch(error) {
            console.log(error);
      }

      const li = document.createElement('li');
      li.className = 'section__item';
      

      const h2 = document.createElement('h2');
      h2.className = 'section__h2';
      h2.textContent = newProduct.title;

      const description = document.createElement('p');
      description.className = 'section__descriptionProduct';
      description.textContent = newProduct.description;

      const price = document.createElement('p');
      price.className = 'section__price';
      price.textContent = newProduct.price;

      const img = document.createElement('img');
      img.className = 'section__image';
      img.setAttribute('src', newProduct.image);

      list.appendChild(li);
      li.append(h2, description, price, img);
});

const fetchProducts = async () => {
  const URL = "https://dummyjson.com/product";
  try {
    const response = await fetch(URL);

    if (!response.ok) throw new Error("Error");

    const { products } = await response.json();
    console.log(products);

    return products;
  } catch (error) {
    console.log(error);
  }
};

const showProducts = async () => {
      const products = await fetchProducts();
      console.log(products);

      products.forEach((product) => {
            
            const li = document.createElement('li');
            li.className = 'section__item';

            const h2 = document.createElement('h2');
            h2.className = 'section__h2';
            h2.textContent = product.title;

            const button = document.createElement('button');
            button.textContent = 'Wyświetl szczegóły';

            button.addEventListener('click', () => {
                  
                  const description = document.createElement('p');
                  description.className = 'section__descriptionProduct';
                  description.textContent = product.description;
                  
                  const price = document.createElement('p');
                  price.className = 'section__price';
                  price.textContent = product.price;
                  
                  const img = document.createElement('img');
                  img.className = 'section__image';
                  img.setAttribute('src', product.thumbnail);
                  li.append( description, price, img);
            })

            li.append(h2, button);
            list.append(li);
      })
};

showProducts();
