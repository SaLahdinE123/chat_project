let posts = document.getElementById("posts");
let btnMore = document.getElementById("btn-more");
let btnRegester = document.getElementById("btn-register");
let regesterForm = document.getElementById("regester-form");
// get info from regester form
let name = document.getElementById("name");
let userName = document.getElementById("user-name");
let email = document.getElementById("email");
let pass = document.getElementById("pass");
let submit = document.getElementById("btn-regester");
// login 
let btnLogin = document.getElementById("btn-login")
let loginForm = document.getElementById("login-form")
btnLogin.addEventListener(("click"), ()=>{
    console.log('df');
    loginForm.style.display = "flex"
    posts.style.display = "none";
    regesterForm.style.display = "none"
    btnMore.style.display = 'none'

})
function login() {

}
function regesterUser(){
    axios.post("https://tarmeezacademy.com/api/v1/register" , 
            {
                "username" : `${userName.value}`,
                "password" : `${pass.value}`,
                "name":`${name.value}`,
                "email" : `${email.value}`
            })
        .then((response)=>{
            token = response.data.token
            localStorage.setItem("token" , token)
            alert("account create successfully")
        })
        .catch((error)=>{
            alert(error.response.data.message);
        })
}
submit.addEventListener(("click") , ()=>{regesterUser()})
// hide pots and learn mor and show login form
btnRegester.addEventListener(("click"), ()=>{
    posts.style.display = "none";
    regesterForm.style.display = "flex"
    btnMore.style.display = 'none'
})
function getPosts(pageNation){
    axios.get(`https://tarmeezacademy.com/api/v1/posts?page=${pageNation}`)
    .then((response)=>{
        response.data.data.map((item)=>{
            posts.innerHTML += `<div class="card">
                                <h1>${item.author.name}</h1>
                                <img src=${item.image} alt="">
                                <h4>${item.title ?? 'title'}</h4>
                                <p>${item.body}</p>
                                <ul>
                                    <li><i class="fa-solid fa-heart"></i></li>
                                    <li><i class="fa-solid fa-comment"></i>${item.comments_count}</li>
                                </ul>
                            </div>`
        })
    })
}
let page = 1
getPosts(1)
btnMore.addEventListener(('click') , ()=>{
    page ++
    getPosts(page)
})