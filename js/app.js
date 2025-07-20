//declare
let title = document.getElementById("title")
let total = document.getElementById("total")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let count = document.getElementById("count")
let category = document.getElementById("category")
let create = document.getElementById("create")
let tbody = document.getElementById("tbody")

// get total
total.onclick=function () {
    if (price.value>0) {
        total.innerHTML=(+price.value)+(+taxes.value)+(+ads.value)-(+discount.value)
        total.style.backgroundColor="green"
    }
}
//create product ** **

let date = localStorage.product!=null ?JSON.parse(localStorage.product) : []
function createProduct(){
    let info={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value
    }
    if (title.value!=""&&price.value!=""&&taxes.value!=""&&ads.value!="&&"&&discount.value!=""&&total.innerHTML!=""&&count.value!=""&&category.value!="") {
        date.push(info)
        localStorage.setItem("product",JSON.stringify(date))  
}
}

create.onclick=createProduct
//clear date **
create.addEventListener("click", function () {
    title.value="",price.value="",taxes.value=""
    ads.value="",discount.value="",category.value=""
    count.value="",total.innerHTML=""
});
//read date ** 
function readDate() {
    date = JSON.parse(localStorage.product)
    tbody.innerHTML=""
    btnDelete.remove()
    for (let i = 0; i < date.length; i++) {
        tr = document.createElement("tr")
        tbody.appendChild(tr)
        tr.innerHTML=
        `<td>${i+1}</td><td>${date[i].title}</td><td>${date[i].price}</td><td>${date[i].taxes}</td><td>${date[i].ads}</td><td>${date[i].discount}</td><td>${date[i].total}</td><td>${date[i].count}</td><td>${date[i].category}</td><td><button onclick="updateProduct(${i})" type="button">Update</button></td><td><button onclick="deleteProduct(${i})" type="button">delete</button></td>`   
    } 
    deleteAll()
}// **
create.addEventListener("click",readDate)
// delete **
function deleteProduct(i) {
    date.splice(i,1)
    localStorage.setItem("product",JSON.stringify(date))  
    readDate()
}

// delete all
let divDelete = document.getElementById("deleteAll")
let btnDelete = document.createElement("button")
function deleteAll() {
    if (date.length>0) {
        btnDelete.innerHTML="delete all"
        btnDelete.setAttribute("id","button")
        divDelete.appendChild(btnDelete)
}
btnDelete.onclick=function () {
    //date.splice(0,date.length)
    date=[]
    localStorage.setItem("product",JSON.stringify(date))  
    readDate()
}
}
//update
function updateProduct (i) {
    title.value=date[i].title
    price.value=date[i].price
    taxes.value=date[i].taxes
    ads.value=date[i].ads
    discount.value=date[i].discount
    total.innerHTML=date[i].total
    count.value=date[i].count
    category.value=date[i].category
    create.innerHTML="update"
    window.scrollTo({top:0,behavior:"smooth"})
    create.onclick=function () {
        date[i].title=title.value
        date[i].price=price.value
        date[i].taxes=taxes.value
        date[i].ads=ads.value
        date[i].discount=discount.value
        date[i].total=total.innerHTML
        date[i].count=count.value
        date[i].category=category.value
        localStorage.setItem("product",JSON.stringify(date))
        create.innerHTML="create"
        create.onclick=createProduct
    }   
}
window.onload=readDate