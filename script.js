var cartIcon =document.getElementById('carticon');
var cartItems=document.getElementById('cartitems');
var closeCart=document.getElementById("closecart");
cartIcon.addEventListener("click", ()=>{
    cartItems.classList.add("showcart")

    closeCart.addEventListener("click", ()=>{
        cartItems.classList.remove("showcart")
    })
});

// cards


let products=document.getElementById("products");
// let shop =document.getElementById("shop");


let basket=JSON.parse(localStorage.getItem("data")) || []

let cardItemsData=[ {
    productId:"item1",
    productName:"Denim Jacket",
    price:20.00,
    img:"images/unsplash-2.png",
    productDetails:"Available size: M, Lg, XL <br> Available colors: Blue, Black, Grey <br> Sex: Unisex ",
    button:"view more"

},
{
    productId:"item2",
    productName:"Plain White Shirt",
    price:29.00,
    img:"images/unsplash-1.png",
    button:"view more",
    productDetails:"Available size: M, Lg, XL <br> Available colors: Blue, Blue, Grble <br> Sex: Unisex "

},
{
    productId:"item3",
    productName:"Black Polo Shirt",
    price:49.00,
    img:"images/unsplash-3.png",
    button:"view more"

},
{
    productId:"item4",
    productName:"Blue Sweatshirt",
    price:79.00,
    img:"images/unsplash-4.png",
    button:"view more"

},
{
    productId:"item5",
    productName:"Blue Plain Shirt",
    price:49.00,
    img:"images/unsplash-5.png",
    button:"view more"

},
{
    productId:"item6",
    productName:"Dark Blue Shirt",
    price:89,
    img:"images/unsplash-6.png",
    button:"view more"

},
{
    productId:"item7",
    productName:"Outcast T Shirt",
    price:19.00,
    img:"images/unsplash-7.png",
    button:"view more"

},
{
    productId:"item8",
    productName:"Polo Plain Shirt",
    price:29.00,
    img:"images/unsplash-8.png",
    button:"view more"

},
{
    productId:"item9",
    productName:"Orange Beach Shirt",
    price:119.00,
    img:"images/unsplash-9.png",
    button:"view more"

},
{
    productId:"item10",
    productName:"Grey T Shirt",
    price:21.00,
    img:"images/unsplash-10.png",
    button:"view more"

}];


// let cardDetailsData=[]
// let getCardDetails=()=>{}



let generateProductCards=()=>{
    return ( products.innerHTML = cardItemsData.map((x)=>{
        let {productName, price, img, productDetails, button, productId}= x;
        let search=basket.find((x)=> x.id===productId) || []
        return `        
        <div id="product-id-${productId}"  class="relative h-fit max-md:w-72 max-md:mx-auto">
        <img class="w-full h-fit max-md:h-3/4" src=${img} alt="">

        <button id="viewbtn" class="viewbtn absolute top-[60%] right-[35%] max-md:top-[50%] max-sm:top-[65%] max-sm:right-[40%] max-md:text-[.75rem] max-sm:py-1 max-sm:px-2 bg-white rounded-3xl
        font-semibold px-3 py-2 items-center text-center text-blue-500
         text-sm">${button}</button>


        <div class="shadow-md px-2 py-3">
            <h3 id="product-name" class="font-bold mt-0 ">
                ${productName}
            </h3>

            <div class="flex justify-between mt-10 pb-5 ">
                <p class="text-blue-700">$${price}</p>
                <div id="addtocartbtn" class="flex space-x-1 items-center">
                    <svg  onclick="reduceQuantity(${productId})" class="w-5 h-5 text-gray-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/>
                      </svg>
                      <div id=${productId} class="font-semibold">${search.item===undefined? 0: search.item}</div>
                    <svg onclick="increaseQuantity(${productId})" class="w-5 h-5 text-gray-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                      </svg>       
                </div>
            </div>
        </div>
    </div>
</div>
<div id="modal"  class="h-full w-full hidden fixed top-0 backdrop-blur-sm overflow-hidden z-20"> 
<div id="modal-content" class="w-1/3 bg-white items-center mx-auto mt-20">
    <span id="close" class=" close text-3xl font-bold float-right cursor-pointer hover:bg-slate-300">&times;</span>
    <h2 class="text-3xl font-bold underline">Product Details</h2>
    <p id="productDetails" class="mt-10">${productDetails}</p>
</div>
</div> 

`; 


    }  ).join(''));
};
generateProductCards();



let reduceQuantity = (productId) => {
    let selectedItem =productId;
    let search = basket.find((x=>x.id===selectedItem.id))

    if(search.item===undefined) return

    else if(search.item===0) return;

    else{
        search.item -=1;
    }

    update( selectedItem.id );
    basket=basket.filter((x)=>x.item !==0);
   
    // console.log(basket);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};


let increaseQuantity = (productId) => {
    let selectedItem = productId;

    let search = basket.find((x=>x.id===selectedItem.id))

    if(search===undefined){

        basket.push({
            id:selectedItem.id,
            item:1
        });


    }else{
        search.item +=1;
    }

    localStorage.setItem("data", JSON.stringify(basket));
    // console.log(basket);
    update( selectedItem.id);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};


let update=(id)=>{
    
    let search=basket.find((x=>x.id===id));
    console.log(search.item);
    document.getElementById(id).innerHTML=search.item;
    cartCalc();

};


let cartCalc = () =>{
    let cartTotal = document.getElementById("cartamount");
    cartTotal.innerHTML=basket.map((x=>x.item)).reduce((x,y) => x + y, 0)
};

cartCalc();


let cartLabel=document.getElementById('cart-label');
let shoppingCart= document.getElementById('shopping-cart');



let generateCartItems=()=>{
    if(basket.length!==0){
        return shoppingCart.innerHTML=basket.map((x)=>{

            let {id, item}=x;
            let search =cardItemsData.find((y)=>y.productId===id) || []
            return`
            <div class=" cart-item w-2/5 border border-gray-200 flex
             justify-between max-sm:flex-col max-sm:w-[200px] max-md:w-3/4 max-md:mx-auto max-md:gap-6 max-md:text-sm ">
                <img width="" class="w-1/5 my-5 max-md:w-2/5 h-full" src=${search.img} alt="">
                <div class="details">
                    <div class="price flex space-x-5 items-center">
                        <h4 class="flex font-bold space-x-5 max-md:text-sm">         
                              <p>${search.productName}</p>
                              <p>$${search.price}</p>
                        </h4>
                        <svg onclick="removeItem(${id})" class="w-8 h-8 font-bold text-red-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/>
                        </svg>
                    </div>


                    <div id="addtocartbtn" class="flex space-x-1 items-center">
                        <svg  onclick="reduceQuantity(${id})" class="w-5 h-5 text-gray-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/>
                        </svg>
                        <div id=${id.productId} class="font-semibold">${item}</div>
                        <svg onclick="increaseQuantity(${id})" class="w-5 h-5 text-gray-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                        </svg>       
                    </div>
                    
                   <h3 class="mt-5 font-bold ">$${item*search.price}</h3>
                </div>                                            
            </div>

            `;
        }).join('');

    }else{
        shoppingCart.innerHTML=``
        cartLabel.innerHTML=`
        <h2 class="text-3xl font-bold">Cart is empty!</h2>
             
        `;
    };
};



generateCartItems();

cartCalc();



// this is not working!!!!!
let removeItem=(id)=>{
    let selectedItem=id;
    // console.log(selectedItem.id);
    let basket = basket.filter((x)=>id !== selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
};




let buttonDetails=[
    {
        id:"btn1",
        details:""
    },
    {
        id:"btn1",
        details:""
    },
    {
        id:"btn1",
        details:""
    },
    {
        id:"btn1",
        details:""
    },
    {
        id:"btn1",
        details:""

    },
    {
        id:"btn1",
        details:""

    },
    {
        id:"btn1",
        details:""

    },
    {
        id:"btn1",
        details:""

    },
    {
        id:"btn1",
        details:""

    },
    {
        id:"btn1",
        details:""

    }
]

let displayDetails=(x)=>{
    
}
