const dropZone=document.querySelector(".drop-zone");
const browsebtn=document.querySelector(".browsebtn");
const fileinput = document.querySelector("#fileinput")
const host =" https://innshare.herokuapp.com/"  //it will change after backend
const uploadURL = host + "api/files"; //gateway
//const uploadURL = host + "api/files";  //for email, vid 56.15min

dropZone.addEventListener("dragover", (e)=>{
    e.preventDefault()
    //console.log("dragging");
    if(!dropZone.classList.contains("dragged"))
   { dropZone.classList.add("dragged");}
})

dropZone.addEventListener("dragleave", ()=>{
   // console.log("dragging");
    dropZone.classList.remove("dragged");
})

dropZone.addEventListener("drop", (e)=>{
    // console.log("dragging");
    e.preventDefault();
     dropZone.classList.remove("dragged");
     //console.log(e.dataTransfer.files);
     const files=e.dataTransfer.files
     //console.log(files);
     if(files.length){
        fileinput.files=files;
        uploadFile()    //upload function called
     }

 })

 fileinput.addEventListener("change", ()=>{
     uploadFile();
 })

 browsebtn.addEventListener("click", ()=>{
     fileinput.click();
 });


 ////////////////////////////////////////////////upload function/////////
 const uploadFile = ()=>{
     const file =fileinput.files[0]
     const formData = new FormData()
     formData.append("myfile", file);  //some backend concept

     const xhr= new XMLHttpRequest();
     xhr.onreadystatechange= ()=>{
        // console.log(xhr.readyState);

        if(xhr.readyState=== XMLHttpRequest.DONE){
            console.log(xhr.response);
        }
     };

     xhr.open("POST", uploadURL);
     xhr.send(formData)
 }