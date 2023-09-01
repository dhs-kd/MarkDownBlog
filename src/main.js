
// To open .md files and convert them to HTML files
function open_md(entry) {
    fetch(`${entry}`)
        .then((res) => res.text())
        .then((t) => {
            var converter = new showdown.Converter();
            var html = converter.makeHtml(t);
            document.getElementById("body").innerHTML = html;

        })
        .catch((e) => console.error(e));
}


// Rendering
window.onload = function () {
    fetch("./pages/index.md")
        .then((res) => res.text())
        .then((t) => {
            var converter = new showdown.Converter(),
                html = converter.makeHtml(t);
            document.getElementById("body").innerHTML = html;
        })
        .catch((e) => console.error(e));

    

    fetch("./files.json")
        .then(res => res.json())
        .then(files => {
            console.log(files)
            var list = files["files"];
            create_folders(list);
        })
        .then( ()=>{ 
            var toggler = document.getElementsByClassName("caret");
            var i;
            for (i = 0; i < toggler.length; i++) {
                toggler[i].addEventListener("click", function() {
                    this.parentElement.querySelector(".nested").classList.toggle("active");
                });
            }
        })
        .catch(e => console.log(e));



        

}

//parse the json into treeview file system 
function create_folders(list) {
    var path = "./pages/"
    for (var entry of list) {
        if (typeof entry === "string") {
            document.getElementById("navBarList").innerHTML += create_file(entry , path);
        }

        else if (typeof entry === "object") {
            document.getElementById("navBarList").innerHTML  += create_folder(entry ,path)

        }
    }

}


function create_file(name , path) {
    var html = `<li><a herf="#" onclick='open_md("${path}${name}")'>${name}</a></li>`
    return html ;
}

function create_folder(object , p) {
    var name = object["name"];
    var list = object["content"];

    var path = p +`${name}/` ; 
    
    var entries = "";
    for ( var li of list){ 
        if (typeof li === "string") {
            entries += create_file(li , path);
        }
        else if (typeof li === "object") {
           entries +=  create_folder(li , path);
        }
    }
    var html = 
    `<li><span class="caret"><i class="fa-solid fa-folder"></i>\xA0 ${name}</span>
        <ul class="nested">
        ${entries}
        </ul></li>` ;

    return html
}



