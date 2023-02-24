// start for controlling coding
let addBtn = document.getElementById("add-employee-btn");
addBtn.addEventListener("click", function () {
    // Get the modal element
    let modal = document.querySelector(".model");

    // Display the modal
    modal.style.width = "50%";
    modal.style.opacity = 1;
    modal.style.zIndex = 1;
});
// Add click event listener to the close icon
let closeBtn = document.querySelector(".close-icon");

closeBtn.addEventListener("click", function () {
    // Get the modal element
    let modal = document.querySelector(".model");

    // Hide the modal
    modal.style.width = "0%";
    modal.style.opacity = 0;
    modal.style.zIndex = -1;
});

//   start all global variable
let userData = [];
let profile_pic = document.getElementById("profile-pic");
let uploadPic = document.getElementById("upload-field");
let idEl = document.getElementById("id");
let nameEl = document.getElementById("name");
let lastNameEl = document.getElementById("lastName");
let emailEl = document.getElementById("email");
let officeCodeEl = document.getElementById("officeCode");
let jobTitleEl = document.getElementById("JobTitle");
let registerBtnEl = document.getElementById("register-btn");
let updateBtn = document.getElementById("update-btn");
let registerForm = document.getElementById("register-form");
let imgUrl;
// end global variable

// register button click event listener
registerBtnEl.addEventListener("click", function (e) {
    e.preventDefault();
    registrationData();
    getDataFromLocal();
    registerForm.reset();
    closeBtn.click();
});

// check if user data exists in local storage
if (localStorage.getItem("userData") !== null) {
    userData = JSON.parse(localStorage.getItem("userData"));
}

// function to register data
function registrationData() {
    userData.push({
        id: idEl.value,
        name: nameEl.value,
        l_name: lastNameEl.value,
        e_mail: emailEl.value,
        officeCode: officeCodeEl.value,
        job_title: jobTitleEl.value,
        profilePic: imgUrl == undefined ? "./assets/images/profile.png" : imgUrl,
    });

    let userString = JSON.stringify(userData);
    localStorage.setItem("userData", userString);
    swal("Good job!", "Registered Successfully!", "success");
}

// start returning data on page from localstorage
let tableData = document.getElementById("table-data");
const getDataFromLocal = () => {
    tableData.innerHTML = "";
    let userData = JSON.parse(localStorage.getItem("userData")) || [];
    userData.forEach((data, index) => {
        tableData.innerHTML += `
            <tr index="${index}">
                <td>${index + 1}</td>
                <td><img src="${data.profilePic}" width="40"></td>
                <td>${data.id}</td>
                <td>${data.name}</td>
                <td>${data.l_name}</td>
                <td>${data.e_mail}</td>
                <td>${data.officeCode}</td>
                <td>${data.job_title}</td>
                <td>
                    <button class="edit-btn"><i class="fa fa-eye"></i></button>
                    <button class="del-btn"><i class="fa fa-trash"></i></button>
                </td>
            </tr>
        `;
    });

    // start delete coding
    let allDelBtn = document.querySelectorAll(".del-btn");
    allDelBtn.forEach((btn) => {
        btn.addEventListener("click", function () {
            let tr = this.parentElement.parentElement;
            let id = tr.getAttribute("index");
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        userData.splice(id, 1);
                        localStorage.setItem("userData", JSON.stringify(userData));
                        tr.remove();
                        swal("Poof! Your imaginary file has been deleted!", {
                            icon: "success",
                        });
                    } else {
                        swal("Your imaginary file is safe!");
                    }
                });
        });
    });

    //start update coding
    let allEdit = document.querySelectorAll(".edit-btn");
    for (let i = 0; i < allEdit.length; i++) {
        allEdit[i].onclick = function () {
            let tr = this.parentElement.parentElement;
            let td = tr.getElementsByTagName("TD");
            let index = tr.getAttribute("index");
            let imgTag = td[1].getElementsByTagName("IMG");
            let profilePic = imgTag[0].src;
            let id = td[2].innerHTML;
            let name = td[3].innerHTML;
            let l_name = td[4].innerHTML;
            let e_mail = td[5].innerHTML;
            let officeCode = td[6].innerHTML;
            let job_title = td[7].innerHTML;
            addBtn.click();
            registerBtnEl.disabled = true;
            updateBtn.disabled = false;
            idEl.value = id;
            nameEl.value = name;
            lastNameEl.value = l_name;
            emailEl.value = e_mail;
            officeCodeEl.value = officeCode;
            jobTitleEl.value = job_title;
            profile_pic.src = profilePic;
            updateBtn.addEventListener("click", function (e) {
                userData[index] = {
                    id: idEl.value,
                    name: nameEl.value,
                    l_name: lastNameEl.value,
                    e_mail: emailEl.value,
                    officeCode: officeCodeEl.value,
                    job_title: jobTitleEl.value,
                    profilePic: uploadPic.value == "" ? profile_pic.src : imgUrl,
                }
                localStorage.setItem("userData",JSON.stringify(userData));
                swal("Good job!", "Updated", "success");
                tableData.innerHTML = "";
                getDataFromLocal();
                closeBtn.click();
                
            });
        };
    }
};

getDataFromLocal();
//image processing
uploadPic.onchange = function () {
    if (uploadPic.files[0].size < 1000000) {

        let fReader = new FileReader();
        fReader.onload = function (e) {
            imgUrl = e.target.result;
            profile_pic.src = imgUrl;
            console.log(imgUrl);
        }
        fReader.readAsDataURL(uploadPic.files[0]);

    } else {
        alert("File Size Is Too Long");
    }
}

//start search coding
let searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", function() {
    searchEmployees();
});

function searchEmployees() {
    let input = document.getElementById("search-input");
    let filter = input.value.toUpperCase();
    let tableData = document.getElementById("table-data");
    let tr = tableData.getElementsByTagName("tr");
    for (let i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td");
        for (let j = 0; j < td.length; j++) {
            let cell = td[j];
            if (cell) {
                let textValue = cell.textContent || cell.innerText;
                if (textValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    break;
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}
//start clear all data 
let delAllBtn = document.getElementById("del-all-btn");
let allDelBox = document.getElementById("del-all-box");
delAllBtn.addEventListener("click", function(){
    if(allDelBox.checked == true){
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    localStorage.removeItem("userData");
                 window.location = location.href;
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
   }
    else{
        swal("Check The Box!", "Please check the box to delete data", "warning");
    }
})



