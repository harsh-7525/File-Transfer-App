const dropZone=document.querySelector(".drop-zone");
const browsebtn=document.querySelector(".browsebtn");
const fileinput = document.querySelector("#fileinput");

const progressContainer=document.querySelector(".progress-container");
const bgProgress =document.querySelector(".bg-Progress");
const percentDiv =document.querySelector("#percent");

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
     progressContainer.style.display="block";
     const file =fileinput.files[0]
     const formData = new FormData()
     formData.append("myfile", file);  //some backend concept

     const xhr= new XMLHttpRequest();

     xhr.onreadystatechange= ()=>{  //when event khatam hua
        // console.log(xhr.readyState);

        if(xhr.readyState=== XMLHttpRequest.DONE){
            console.log(xhr.response);
            showLink(JSON.parse(xhr.response)) //parse lagane se javascript object bngya 
        }
     };

   xhr.upload.onprogress= updateProgress;//progress of upload batayega///////////////////////////  



     xhr.open("POST", uploadURL);
     xhr.send(formData)
 };

 const updateProgress=(e)=>{ /////progress fnt
   //  console.log(e);
     const percent= Math.round((e.loaded/e.total) *100);
     bgProgress.style.width = `${percent}%`
     percentDiv.innerText =percent;
 };

 const showLink=({file})=>{
       console.log(file);
       progressContainer.style.display="none"; //1:36 hr
 }