jQuery(window).on("load", function () {
    jQuery(".dounlowd").addClass("d-none");
});
/** 
* close the navbar by using jQuery, in Line==>{ 7 }
*/
function CloseToggel() {
    jQuery("i.open-close-icon").toggleClass("fa-x").toggleClass("fa-align-justify");
    if (window.innerHeight <= 500) {
        jQuery(".toggel-div-inner").animate({ left: '-50%' }, 600);
    } else if (window.innerWidth <= 960) {
        jQuery(".toggel-div-inner").animate({ left: '-25%' }, 600);
    } else {
        jQuery(".toggel-div-inner").animate({ left: '-18%' }, 600);
    }
    jQuery(".toggel-div-outter").animate({ left: '0%' }, 600);
    jQuery(".toggel-div-inner div.overflow-hidden ol li:eq(0)").animate({ marginTop: '200px' }, 400);
    jQuery(".toggel-div-inner div.overflow-hidden ol li:eq(1)").animate({ marginTop: '150px' }, 500);
    jQuery(".toggel-div-inner div.overflow-hidden ol li:eq(2)").animate({ marginTop: '150px' }, 500);
    jQuery(".toggel-div-inner div.overflow-hidden ol li:eq(3)").animate({ marginTop: '150px' }, 500);
    jQuery(".toggel-div-inner div.overflow-hidden ol li:eq(4)").animate({ marginTop: '150px' }, 500);
}
document.body.addEventListener("keyup", function (eventObject) {
    if (jQuery(".toggel-div-outter").css("left") != "0px") {
        if (eventObject.key == "Escape") {
            CloseToggel();
        }
    }
})
let toggel_div_inner=document.querySelector(".toggel-div-inner");
let toggel_div_outter=document.querySelector(".toggel-div-outter");
document.addEventListener('click', function(event) {
    if (!(toggel_div_inner.contains(event.target)) && !(toggel_div_outter.contains(event.target))) {
        if (jQuery(".toggel-div-outter").css("left") != "0px") {
            CloseToggel();
        }
    }
});
jQuery("i.open-close-icon").on("click", function () {
    if (jQuery(".toggel-div-outter").css("left") != "0px") {
        CloseToggel();
    } else {
        jQuery("i.open-close-icon").toggleClass("fa-x").toggleClass("fa-align-justify");
        jQuery(".toggel-div-inner").animate({ left: '0' }, 800);
        if (window.innerHeight <= 500) {
            jQuery(".toggel-div-outter").animate({ left: '+50%' }, 800);
        } else {
            if (window.innerWidth <= 960) {
                jQuery(".toggel-div-outter").animate({ left: '+25%' }, 800);
            } else {
                jQuery(".toggel-div-outter").animate({ left: '+18%' }, 800);
            }
        }
        jQuery(".toggel-div-inner div.overflow-hidden ol li:eq(0)").animate({ marginTop: '0%' }, 750);
        jQuery(".toggel-div-inner div.overflow-hidden ol li:eq(1)").animate({ marginTop: '0%' }, 800);
        jQuery(".toggel-div-inner div.overflow-hidden ol li:eq(2)").animate({ marginTop: '0%' }, 850);
        jQuery(".toggel-div-inner div.overflow-hidden ol li:eq(3)").animate({ marginTop: '0%' }, 900);
        jQuery(".toggel-div-inner div.overflow-hidden ol li:eq(4)").animate({ marginTop: '0%' }, 900);
    }
});
let sec1 = document.getElementById("sec1");
let sec2 = document.getElementById("sec2");
let cartona = ``;
/** 
* fill the cartona to display, in Line==>{ 63 }
*/
function fillcartona(myData, i) {
    cartona += `
        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-11 position-relative" >
            <div class=" w-100 position-relative overflow-hidden carusel-pointer-hover" onclick="displayMeal('${myData.meals[i].strMeal}')">
                <img src="${myData.meals[i].strMealThumb}" alt="${myData.meals[i].strMeal}" width="100%" class="rounded-2">
                <div class="overlay-item-hover bg-custom3 position-absolute top-140 start-0 end-0 bottom-0 rounded-2 d-flex align-items-center justify-content-center">
                    <h2 class="fs-4 font-monostor fw-500 fs-26px">${myData.meals[i].strMeal}</h2>
                </div>
            </div>
        </div>
        `;
}
(function () {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
        .then(function (request) {
            jQuery(".dounlowd").addClass("d-none");
            return request.json();
        })
        .then((myData) => {
            for (let i = 0; i < myData.meals.length; i++) {
                fillcartona(myData, i);
            }
            sec1.innerHTML += `<div class="row gx-5 gy-4">${cartona}</div>`;
            sec2.innerHTML = ``;
        })
        .catch(function (error) {
            jQuery(".dounlowd").addClass("d-none");
            console.log("error is : " + error.message);
        })
})();
/** 
* display every meal when you click on it, in Line==>{ 96 }
*/
function displayMeal(x) {
    let arr1 = [];
    let arr2 = [];
    jQuery(".dounlowd").removeClass("d-none");
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=` + x)
        .then(function (request) {
            if (request.status == 200) {
                jQuery(".dounlowd").addClass("d-none");
            }
            return request.json();
        })
        .then((myData) => {
            let cartona_soghaiara1 = ``;
            let cartona_soghaiara2 = ``;
            arr1 = [];
            arr2 = [];
            let counter = 1;
            for (const key in myData.meals[0]) {
                if (Object.hasOwnProperty.call(myData.meals[0], key)) {
                    if (counter >= 10 && counter <= 29) {
                        arr1.push(myData.meals[0][key]);
                    }
                    if (counter >= 30 && counter <= 49) {
                        arr2.push(myData.meals[0][key]);
                    }
                    counter++;
                }
            }
            for (let i = 0; i < arr1.length; i++) {
                if (arr1[i] == "" || arr1[i] === null || arr1[i] == " ") {
                    break;
                }
                cartona_soghaiara1 += `
                <div class="float-start bg-custom4 text-custom3 fw-400 font-monostor fs-16px  ms-3 p-1 text-center rounded-3 mb-3 ">${arr2[i]} ${arr1[i]}</div>
                `;
            }
            let strTagsArr;
            if (myData.meals[0].strTags != null) {
                strTagsArr = myData.meals[0].strTags.split(",");
                for (let i = 0; i < strTagsArr.length; i++) {
                    cartona_soghaiara2 += `
                    <div class="float-start bg-custom5 text-custom4 fw-400 font-monostor fs-16px  ms-3 p-1 text-center rounded-3 ">${strTagsArr[i]}</div>
                    `;
                }
            } else {
                cartona_soghaiara2 = `
                    <div class="float-start bg-custom5 text-custom4 fw-400 font-monostor fs-16px  ms-3 p-1 text-center rounded-3 ">There are no tags</div>
                    `;
            }
            cartona = `
                <div  class="row gx-4 gy-4 ms-4 me-0 pe-2" >
                <div class="col-lg-4">
                    <div>
                        <img src="${myData.meals[0].strMealThumb}" alt="${myData.meals[0].strMeal}" width="100%" class="rounded-2">
                    </div>
                    <h1 class="fw-500 fs-32px font-monostor text-custom2">${myData.meals[0].strMeal}</h1>
                </div>
                <div class="col-lg-8">
                    <h2 class="text-custom2 fw-500 fs-32px font-monostor">Instructions</h2>
                    <p class="text-custom2 fw-400 fs-16px font-monostor">
                        ${myData.meals[0].strInstructions}
                    </p>
                    <h2 class="fw-500 fs-28px text-custom2 font-monostor py-0 my-0">
                        <strong class="fw-700 fs-28px text-custom2 font-monostor">Area :</strong> ${myData.meals[0].strArea}
                    </h2>
                    <h2 class="fw-500 fs-28px text-custom2 font-monostor py-0 my-0">
                        <strong class="fw-700 fs-28px text-custom2 font-monostor">Category :</strong> ${myData.meals[0].strCategory}
                    </h2>
                    <h2 class="fw-500 fs-28px text-custom2 font-monostor py-0 my-0">
                        <strong class="fw-700 fs-28px text-custom2 font-monostor">Recipes :</strong> 
                    </h2>
                    <div class="overflow-hidden my-3">
                        ${cartona_soghaiara1}
                    </div>
                    <h2 class="fw-500 fs-28px text-custom2 font-monostor py-0 my-0 mb-3">
                        <strong class="fw-700 fs-28px text-custom2 font-monostor">Tags :</strong> 
                    </h2>
                    <div class="overflow-hidden my-3">
                        ${cartona_soghaiara2}
                    </div>
                    <div class="text-end mt-5 ">
                        <a href="${myData.meals[0].strSource}" class="btn btn-success me-2" target="_blank">Source</a>
                        <a href="${myData.meals[0].strYoutube}" class="btn btn-danger" target="_blank">Youtube</a>
                    </div>
                </div>
            </div>
            `;
            sec1.innerHTML = cartona;
            sec2.innerHTML = ``;
        })
        .catch(function (error) {
            jQuery(".dounlowd").addClass("d-none");
            console.log("error is : " + error.message);
        })
}
let ContactUS = document.getElementById("ContactUS");
ContactUS.addEventListener("click", function () {
    jQuery(".dounlowd").removeClass("d-none");
    CloseToggel();
    cartona = `
        <div class="position-absolute top-50 start-50 translate-middle w-60 h-33 ">
            <div class="row gx-4 gy-4">
                <div class="col-lg-6">
                    <input type="text" name="FullName" placeholder="Enter Your Name.."  id="FullName"
                        class="form-control inputt">
                </div>
                <div class="col-lg-6">
                    <input type="email" name="Email" placeholder="Enter Your Email.."  id="Email" class="form-control inputt">
                </div>
                <div class="col-lg-6">
                    <input type="text" name="Phone" placeholder="Enter Your Phone.."  id="Phone" class="form-control inputt">
                </div>
                <div class="col-lg-6">
                    <input type="number" name="Age" placeholder="Enter Your Age.."  id="Age" class="form-control inputt">
                </div>
                <div class="col-lg-6">
                    <input type="password" name="Password" placeholder="Enter Your Password.."  id="Password" class="form-control inputt">
                </div>
                <div class="col-lg-6">
                    <input type="password" name="RePassword" placeholder="RePassword.."  id="RePassword" class="form-control inputt rePassword disabled">
                </div>
            </div>
            <div class="row mt-3 justify-content-center text-center ">
                <div class="col-3">
                    <button type="button" class="btn btn-outline-secondary disabled " id="btnSubmit">Submit</button>
                </div>
            </div>
        </div>
        `;
    sec1.innerHTML = cartona;
    sec2.innerHTML = ``;
    jQuery(".dounlowd").addClass("d-none");
    let Age = document.getElementById("Age");
    let RePassword = document.getElementById("RePassword");
    let IsAge = false; let IsRePassword = false;
    let passwordWord = '';
    let DivsObjects = {
        arr1: [document.getElementById("FullName"), document.getElementById("Email"), document.getElementById("Phone"), document.getElementById("Age"), document.getElementById("Password")],
        arr2: [false, false, false, false, false],
        arr3: [/^[\w][^0-9!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'\-,._]{2,}$/, /^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, /^\+?(\d{1,3})?[-.\s]?(\(?\d{3}\)?)?[-.\s]?\d{3}[-.\s]?\d{4}$/, /^(1[89]|[2-9][0-9]|1[01][0-9]|120)$/, /^(?=.*\d)?(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/]
    }
    /** 
    * check if the inputs value is true or no and enabel the button, in Line==>{ 240 }
    */
    function inputAbled() {
        if (DivsObjects.arr2[0] == true && DivsObjects.arr2[1] == true && DivsObjects.arr2[2] == true && (DivsObjects.arr2[3] == true && IsAge == true) && DivsObjects.arr2[4] && IsRePassword == true) {
            document.getElementById("btnSubmit").setAttribute("class", "btn btn-outline-secondary");
        } else {
            document.getElementById("btnSubmit").setAttribute("class", "btn btn-outline-secondary disabled");
        }
    }
    for (let i = 0; i < 5; i++) {
        DivsObjects.arr1[i].addEventListener("keyup", function () {
            if (DivsObjects.arr3[i].test(DivsObjects.arr1[i].value)) {
                DivsObjects.arr2[i] = true;
                if (i == 4) {
                    passwordWord = DivsObjects.arr1[i].value;
                    $("#RePassword").removeClass("disabled");
                } else if (i == 3) {
                    IsAge = true;
                }
            } else {
                DivsObjects.arr2[i] = false;
                if (i == 4) {
                    $("#RePassword").addClass("disabled");
                }
                else if (i == 3) {
                    IsAge = false;
                }
            }
            inputAbled();
            // console.log(`${DivsObjects.arr1[i].value} is ${DivsObjects.arr2[i]}`);
        })
    }
    Age.addEventListener("change", function () {
        if (/^(1[89]|[2-9][0-9]|1[01][0-9]|120)$/.test(Age.value)) {
            IsAge = true;
            DivsObjects.arr2[3] = true;
        } else {
            IsAge = false;
            DivsObjects.arr2[3] = false;
        }
        inputAbled();
        // console.log(`${Age.value} is ${IsAge}`);
        // console.log(`${Age.value} is ${DivsObjects.arr2[3]}`);
    })
    RePassword.addEventListener("keyup", function () {
        if (RePassword.value == passwordWord) {
            IsRePassword = true;
        } else {
            IsRePassword = false;
        }
        inputAbled();
        // console.log(`${RePassword.value} is ${IsRePassword}`);
    })
});
let Search = document.getElementById("Search");
Search.addEventListener("click", function () {
    jQuery(".dounlowd").removeClass("d-none");
    CloseToggel();
    cartona = `
        <div class="row gx-4 gy-4 w-75 mx-auto">
            <div class="col-lg-6">
                <input type="text" name="SearchByName" placeholder="Search By Name.."  id="SearchByName" class="form-control inputt py-3 fs-6 rounded-5">
            </div>
            <div class="col-lg-6">
                <input type="text" name="SearchByFLetter" placeholder="Search By First Letter.."  id="SearchByFLetter" class="form-control inputt py-3 fs-6 rounded-5">
            </div>
        </div>
        `;
    sec1.innerHTML = cartona;
    sec2.innerHTML = ``;
    jQuery(".dounlowd").addClass("d-none");
    let SearchByName = document.getElementById("SearchByName");
    let SearchByFLetter = document.getElementById("SearchByFLetter");
    /** 
    * make fetch depend on: @param {character} character
    *                       @param {object} divObject     , and display the cartona, in Line==>{ 314 }
    */
    function fillSearchDiv(character, divObject) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?${character}=${divObject.value}`)
            .then(function (request) {
                jQuery(".dounlowd").removeClass("d-none");
                return request.json();
            })
            .then((myData) => {
                cartona = ``;
                let counter = 0;
                for (let i = 0; i < myData.meals.length; i++) {
                    counter++;
                    if (counter == 21) {
                        break;
                    }
                    fillcartona(myData, i);
                }
                counter = 0;
                sec2.innerHTML = `<div class="row gx-4 gy-4 mt-3">${cartona}</div>`;
                cartona = ``;
                jQuery(".dounlowd").addClass("d-none");
            })
            .catch(function (error) {
                jQuery(".dounlowd").addClass("d-none");
                sec2.innerHTML = ``;
                console.log("error is : " + error.message);
            })
    }
    SearchByName.addEventListener("keyup", function () {
        fillSearchDiv(`s`, this);
    })
    SearchByFLetter.addEventListener("keyup", function () {
        if (this.value.length == 1) {
            fillSearchDiv(`f`, this);
        } else {
            cartona = ``;
            sec2.innerHTML = cartona;
        }
    })
});
/**
 * @param {character} y 
 * @param {string} x 
 * display All meals of Categories or Area or Ingredients
 */
function displayCAI(y, x) {
    jQuery(".dounlowd").removeClass("d-none");
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?${y}=` + x)
        .then(function (request) {
            jQuery(".dounlowd").removeClass("d-none");
            return request.json();
        })
        .then((myData) => {
            cartona = ``;
            let counter = 0;
            for (let i = 0; i < myData.meals.length; i++) {
                counter++;
                if (counter == 21) {
                    break;
                }
                fillcartona(myData, i);
            }
            counter = 0;
            sec1.innerHTML = `<div class="row gx-4 gy-4 mt-3" >${cartona}</div>`;
            sec2.innerHTML = ``;
            cartona = ``;
            jQuery(".dounlowd").addClass("d-none");
        })
        .catch(function (error) {
            jQuery(".dounlowd").addClass("d-none");
            sec2.innerHTML = ``;
            console.log("error is : " + error.message);
        })
}
let Categories = document.getElementById("Categories");
Categories.addEventListener("click", function () {
    jQuery(".dounlowd").removeClass("d-none");
    CloseToggel();
    fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
        .then(function (request) {
            jQuery(".dounlowd").removeClass("d-none");
            return request.json();
        })
        .then((myData) => {
            cartona = ``;
            for (let i = 0; i < myData.categories.length; i++) {
                cartona += `
                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-11 position-relative" >
                        <div class=" w-100 position-relative overflow-hidden carusel-pointer-hover" onclick="displayCAI('c','${myData.categories[i].strCategory}')">
                            <img src="${myData.categories[i].strCategoryThumb}" alt="${myData.categories[i].strCategory}" width="100%" class="rounded-2">
                            <div class="overlay-item-hover bg-custom3 position-absolute top-110 start-0 end-0 bottom-0 rounded-2 text-center">
                                <h2 class="fs-4 font-monostor fw-500 fs-26px pt-2">${myData.categories[i].strCategory}</h2>
                                <p class="fw-400 fs-16px font-monostor text-dark px-2">${myData.categories[i].strCategoryDescription.slice(0, 100)}</p>
                            </div>
                        </div>
                    </div>
                    `
            }
            sec1.innerHTML = `<div class="row gx-4 gy-4 mt-3">${cartona}</div>`;
            sec2.innerHTML = ``;
            cartona = ``;
            jQuery(".dounlowd").addClass("d-none");
        })
        .catch(function (error) {
            jQuery(".dounlowd").addClass("d-none");
            sec2.innerHTML = ``;
            console.log("error is : " + error.message);
        })
});
let Area = document.getElementById("Area");
Area.addEventListener("click", function () {
    jQuery(".dounlowd").removeClass("d-none");
    CloseToggel();
    fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
        .then(function (request) {
            jQuery(".dounlowd").removeClass("d-none");
            return request.json();
        })
        .then((myData) => {
            cartona = ``;
            for (let i = 0; i < myData.meals.length; i++) {
                cartona += `
                    <div class="col-xl-3 col-lg-4 col-sm-6">
                        <div class="text-center" >
                            <i class="carusel-pointer-hover fa-solid fa-house-laptop fa-4x text-custom2 fw-900 fs-64px" onclick="displayCAI('a','${myData.meals[i].strArea}')"></i>
                            <h2 class="carusel-pointer-hover font-monostor fw-500 fs-28px pt-1 text-custom2 " onclick="displayCAI('a','${myData.meals[i].strArea}')">${myData.meals[i].strArea}</h2>
                        </div>
                    </div>
                    `
            }
            sec1.innerHTML = `<div class="row gx-4 gy-4 mt-3  mx-5 py-4">${cartona}</div>`;
            sec2.innerHTML = ``;
            cartona = ``;
            jQuery(".dounlowd").addClass("d-none");
        })
        .catch(function (error) {
            jQuery(".dounlowd").addClass("d-none");
            sec2.innerHTML = ``;
            console.log("error is : " + error.message);
        })
});
let Ingredients = document.getElementById("Ingredients");
Ingredients.addEventListener("click", function () {
    jQuery(".dounlowd").removeClass("d-none");
    CloseToggel();
    fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
        .then(function (request) {
            jQuery(".dounlowd").removeClass("d-none");
            return request.json();
        })
        .then((myData) => {
            cartona = ``;
            for (let i = 0; i < myData.meals.length; i++) {
                if (i > 21) {
                    break;
                }
                cartona += `
                    <div class="col-xl-3 col-lg-4 col-sm-6">
                        <div class="text-center" >
                            <i class="carusel-pointer-hover fa-solid fa-utensils text-custom2 fw-900 fs-64px" onclick="displayCAI('i','${myData.meals[i].strIngredient}')"></i>
                            <h2 class="carusel-pointer-hover font-monostor fw-500 fs-28px pt-1 text-custom2 " onclick="displayCAI('i','${myData.meals[i].strIngredient}')">${myData.meals[i].strIngredient}</h2>
                            <p class="carusel-pointer-hover font-monostor fw-400 fs-16px pt-2 text-custom2" onclick="displayCAI('i','${myData.meals[i].strIngredient}')">${myData.meals[i].strDescription.slice(0, 100)}</p>
                        </div>
                    </div>
                    `
            }
            sec1.innerHTML = `<div class="row gx-4 gy-4 mt-3  mx-5 py-4">${cartona}</div>`;
            sec2.innerHTML = ``;
            cartona = ``;
            jQuery(".dounlowd").addClass("d-none");
        })
        .catch(function (error) {
            jQuery(".dounlowd").addClass("d-none");
            sec2.innerHTML = ``;
            console.log("error is : " + error.message);
        })
});