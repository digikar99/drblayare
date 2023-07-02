window.onload = function(){
    console.log(window.location.origin);
    if (window.location.origin.toLowerCase().includes("file")){
        document.body.innerHTML = "Redirecting to <a href=\"https://drblayare.com\">drblayare.com</a>...";
        setTimeout(() => {
            window.location.replace("https://drblayare.com");
        }, 3000);
    }
}
