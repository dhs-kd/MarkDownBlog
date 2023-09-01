
// To open .md files and convert them to HTML files
function open_md(entry){ 
    fetch(`./pages/${entry}` )
        .then((res) => res.text())
        .then((t) => { 
            var converter = new showdown.Converter();
            var html      = converter.makeHtml(t);
            document.getElementById("body").innerHTML = html ; 
        
        })
        .catch((e) => console.error(e));
}

// To handle tree opening and closing
function showChildren(folder) {
    for (let page of document.getElementsByClassName(folder)) {
        if(page.style.display == "none") {    
            page.style.display = "block"
            document.getElementById(folder.replaceAll(" ", "")).innerHTML = `<a href="#" onclick=showChildren("${folder}")>${folder}         <i class="fa-solid fa-circle-chevron-up"></i></a>`

        }
        else if(page.style.display == "block") {
            page.style.display = "none"
            document.getElementById(folder.replaceAll(" ", "")).innerHTML = `<a href="#" onclick=showChildren("${folder}")>${folder}         <i class="fa-solid fa-circle-chevron-down"></i></a>`
        }
    }
}

// Rendering
window.onload = function () {
    fetch("./pages/index.md")
        .then((res) => res.text())
        .then((t) => { 
            var converter = new showdown.Converter(),
            html      = converter.makeHtml(t);
            
        
            document.getElementById("body").innerHTML = html ; 
        
        })
        .catch((e) => console.error(e));

   
       fetch("./files.json")
            .then(res => res.json())
            .then( files => {
                console.log(files)
                var list = files["files"];

                for (var entry of list) { 
                    if (typeof entry === "string") { 
                        document.getElementById("navbar").innerHTML +=`<a herf="#" onclick='open_md("${entry}")'>${entry}</a>`;
                    }
                    else if (typeof entry === "object"){ 
                        document.getElementById("navbar").innerHTML += `<span id="${entry["name"].replaceAll(" ", "")}"><a href="#" onclick=showChildren("${entry.name}")>${entry.name}<i class="fa-solid fa-circle-chevron-down"></i></a></span>`
                        for(let page of entry.content) {
                            document.getElementById("navbar").innerHTML +=`<tr><a herf="#" class="${entry.name}" style="display:none; padding-left:2rem;" onclick='open_md("${entry.name}/${page}")'>${page}</a></tr>`;
                        }
                    }
                }
            })
            .catch(e => console.log(e));

    }

