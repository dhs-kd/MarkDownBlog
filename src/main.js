
// To open .md files and convert them to HTML files
function open_md(entry) {
    var path ; //TODO 

    fetch(`./pages/${entry}`)
        .then((res) => res.text())
        .then((t) => {
            var converter = new showdown.Converter();
            var html = converter.makeHtml(t);
            document.getElementById("body").innerHTML = html;

        })
        .catch((e) => console.error(e));
}

// To handle tree opening and closing
function showChildren(folder) {
    for (let page of document.getElementsByClassName(folder)) {
        if (page.style.display == "none") {
            page.style.display = "block"
            document.getElementById(folder.replaceAll(" ", "")).innerHTML = `<a href="#" onclick=showChildren("${folder}")>${folder}\xA0\xA0<i class="fa-solid fa-circle-chevron-up"></i></a>`

        }
        else if (page.style.display == "block") {
            page.style.display = "none"
            document.getElementById(folder.replaceAll(" ", "")).innerHTML = `<a href="#" onclick=showChildren("${folder}")>${folder}\xA0\xA0<i class="fa-solid fa-circle-chevron-down"></i></a>`
        }
    }
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
                this.classList.toggle("caret-down");
            });
        }
        console.log(toggler)

            })
            .catch(e => console.log(e));



        

}

//parse the json into treeview file system 
function create_folders(list) {
    var path = "./pages/"
    for (var entry of list) {
        if (typeof entry === "string") {

            document.getElementById("navBarList").innerHTML += create_file(entry);
        }
        else if (typeof entry === "object") {
            document.getElementById("navBarList").innerHTML  += create_folder(entry)

        }
    }

}


function create_file(name) {
    var html = `<li><a herf="#" id='${name}' onclick='open_md("${name}")'>${name}</a></li>`
    return html ;
}

function create_folder(object) {
    var name = object["name"];
    var list = object["content"];

    var entries = "";
    for ( var li of list){ 
        if (typeof li === "string") {
            entries += create_file(li);
        }
        else if (typeof li === "object") {
           entries +=  create_folder(li);
        }
    }
    var html = 
    `<li><span class="caret">${name}</span>
        <ul class="nested">
        ${entries}
        </ul></li>` ;

    return html
}



