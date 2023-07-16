window.onload = function(){
    console.log(window.location.origin);
    if (window.location.origin.toLowerCase().includes("digikar99.github.io")){
        document.body.innerHTML = "Redirecting to <a href=\"https://drblayare.com\">drblayare.com</a>...";
        setTimeout(() => {
            window.location.replace("https://drblayare.com");
        }, 3000);
    }
    reload_data("teaching");
};

function load_data(filepath){
    let xhr = new XMLHttpRequest();
    let data = null;
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = xhr.responseText;
        }
    };
    xhr.open("GET", filepath, false);
    xhr.send();
    return data;
}

function make_n_col_table(data, n){
    let header = data.slice(0, n);
    let table_header = [];
    for(let i=0; i<n; i++){
        table_header.push(`<th>${data[i]}</th>`);
    }
    table_header = `<tr>${table_header.join("\n")}</tr>`;
    let table_body = [];
    for(let idx=n; idx+n<data.length; idx+=n){
        let table_row = [];
        for(let i=0; i<n; i++){
            table_row.push(`<td>${data[idx+i]}</td>`);
        }
        table_body.push(`<tr>${table_row.join("\n")}</th>`);
    }
    return `<table>${table_header}${table_body.join("\n")}</table>`;
}

const reload_data_fn = {};

reload_data_fn["teaching"] = function(){
    let data = load_data("courses.txt").split("\n");
    let html_table = make_n_col_table(data, 6);
    return `<h3>Teaching</h3>${html_table}`;
}

reload_data_fn["paper-publications"] = function(){
    let data = load_data("pubs.txt").split("\n");
    let html_table = make_n_col_table(data, 6);
    return `<h3>Paper Publications</h3>${html_table}`;
}

reload_data_fn["books"] = function(){
    let data = load_data("books.txt").split("\n");
    let html_table = make_n_col_table(data, 6);
    return `<h3>Books</h3>${html_table}`;
}


function reload_data(data_type){
    let fn = reload_data_fn[data_type];
    if (typeof(fn) === "function"){
        let html_data = fn();
        if (typeof(html_data) === "string")
            document.getElementById("data").innerHTML = html_data;
        else
            throw `Expected reload_data_fn['${data_type}'] to return a string, but it returned\n${html_data}`;
    }else{
        throw "data_type '" + data_type + "' does not have an associated data function;";
    }
}
