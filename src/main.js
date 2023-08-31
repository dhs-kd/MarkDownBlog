

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

                    }
                }
            })
            .catch(e => console.log(e));

    }

