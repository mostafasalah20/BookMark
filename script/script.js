let UrlMark = document.getElementById("UrlMark");
let inputMark = document.getElementById("inputMark");
let sumbtn = document.getElementById("sumbtn");
let create = document.getElementById("create");
let searchinput = document.getElementById("search");
let sunMode=document.getElementById("sunMode");
let moonMode=document.getElementById("moonMode");
let label=document.getElementsByClassName("label");
let h1=document.getElementById("h1");

let ArrayBookMark = [];

loaditem();
let index;
sumbtn.addEventListener("click", function () {
    if (validationUrl() == true && validateName() == true) {
        let bookMark = {
            UrlMark: UrlMark.value,
            inputMark: inputMark.value
        }
        ArrayBookMark.push(bookMark);
        save()
        Display()
        clear()
    }
    else {
        Swal.fire({
            title: "Invalid Data ?",
            text: `${validationUrl() == false ? "Please Enter valid Url" : ""} ${validateName() == false ? "Please Enter Site Name" : ""} `,

            icon: "error"
        });
    }

})
function Display() {
    let cartona = '';
    for (let i = 0; i < ArrayBookMark.length; i++) {
        cartona += `
        <tr>
                        <th scope="row">${i}</th>
                        <td>${ArrayBookMark[i].inputMark}</td>
                        <td><a href="${ArrayBookMark[i].UrlMark}"class="btn btn-info" target="_blank">Visit</a></td>
                        <td><a class="btn btn-success"onclick="Update(${i})">Update</button></td>
                        <td><button  class="btn btn-danger"onclick="DeleteMark(${i})">Delete</button></td>
                    </tr> 
        
        `

    }
    document.getElementById("tbody").innerHTML = cartona;
}

function clear() {
    UrlMark.value = '';
    inputMark.value = '';
}
function save() {
    localStorage.setItem("ArrayBOOK", JSON.stringify(ArrayBookMark));
}

function loaditem() {
    if (localStorage.getItem("ArrayBOOK")) {
        ArrayBookMark = JSON.parse(localStorage.getItem("ArrayBOOK"));
        Display();
    }
}

function DeleteMark(i) {
    ArrayBookMark.splice(i, 1);
    save()
    Display();
}

function Update(i) {
    index = i;
    UrlMark.value = ArrayBookMark[i].UrlMark;
    inputMark.value = ArrayBookMark[i].inputMark;
    create.classList.remove("d-none")
    sumbtn.classList.add("d-none")
}

function Updateitem(index) {
    ArrayBookMark[index].UrlMark = UrlMark.value;
    ArrayBookMark[index].inputMark = inputMark.value;
    sumbtn.classList.remove("d-none");
    create.classList.add("d-none")
}
create.addEventListener('click', function () {
    Updateitem(index);
    save();
    Display();
    clear();
})
searchinput.addEventListener('input', function (e) {
    let box = '';
    for (let i = 0; i < ArrayBookMark.length; i++) {
        if (ArrayBookMark[i].inputMark.toUpperCase().includes(e.target.value.toUpperCase())) {
            box += `
        <tr>
                        <th scope="row">${i}</th>
                        <td>${ArrayBookMark[i].inputMark}</td>
                        <td><a href="${ArrayBookMark[i].UrlMark}"class="btn btn-info" target="_blank">Visit</a></td>
                        <td><a class="btn btn-success"onclick="Update(${i})">Update</button></td>
                        <td><button  class="btn btn-danger"onclick="DeleteMark(${i})">Delete</button></td>
                    </tr> 
        
        `
        }
    }
    document.getElementById("tbody").innerHTML = box;

})

function validationUrl() {
    let text = UrlMark.value;
    let urlR = /^http(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
    if (urlR.test(text)) {
        UrlMark.classList.add("is-valid");
        UrlMark.classList.remove("is-invalid");
        return true;
    } else {
        UrlMark.classList.add("is-invalid");
        UrlMark.classList.remove("is-valid");
        return urlR.test(text);
    }
}

function validateName(){
    let text=inputMark.value;
    let validName=/^[a-zA-Z ]{2,30}$/gm;
    if(validName.test(text)){
        inputMark.classList.add("is-valid");
        inputMark.classList.remove("is-invalid");
        return true;
    }else{
        inputMark.classList.add("is-invalid");
        inputMark.classList.remove("is-valid");
        return validName.test(inputMark);
    }
}

moonMode.addEventListener("click",function(){
    document.body.classList.add("dark");
    moonMode.style.color=" #fff";
    sunMode.style.color=" #fff";
    h1.style.color="#ffffffad";
    for(let i=0;i<label.length;i++){
        label[i].style.color=" #fff";
    };

})

sunMode.addEventListener("click",function(){
    document.body.classList.remove("dark");
    moonMode.style.color=" #000";
    sunMode.style.color=" #000";
    h1.style.color="#000";
    for(let i=0;i<label.length;i++){
        label[i].style.color=" #000";
    }
})
console.log(h1);