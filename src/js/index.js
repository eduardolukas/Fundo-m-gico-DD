function setLoading(isLoading) {
    const btnSpam = document.getElementById("generate-btn");
    if (isLoading) {
        btnSpam.innerHTML = "Loading...";
    }
    else {
        btnSpam.innerHTML = "Generate Magic Background";
    }
}

document.addEventListener("DOMContentLoaded", function(){
    
    const form = document.querySelector(".form-group");
    const textArea = document.getElementById("description");
    const htmlcode = document.getElementById("html-code");
    const csscode = document.getElementById("css-code");
    const prewiew = document.getElementById("preview-section");

    form.addEventListener("submit", async function(event){
        event.preventDefault(); 

        const description = textArea.value.trim();

        if (!description) {
            return;
        }

        setLoading(true);

        try {
        
            const response = await fetch("https://eduardolukas.app.n8n.cloud/webhook/gerador-fundo", {
                method: "POST",
                headers: {"content-Type": "application/json"},
                body: JSON.stringify({description})
            });
            const data = await response.json();
            const parserd = new DOMParser();

            htmlcode.textContent = data.code || "";
            csscode.textContent = data.style || "";

            prewiew.style.display = "block";
            prewiew.innerHTML = data.code || "";

            let styleTag = document.getElementById("dynamic-style");

            if (styleTag) styleTag.remove();

            if (data.style) {
                styleTag = document.createElement("style");
                styleTag.id = "dynamic-style";
                styleTag.textContent = data.style;
                document.head.appendChild(styleTag);
            }

        }catch (error){
            console.error("Error", error);
            htmlcode.textContent = "An error occurred. Please try again.";
            csscode.textContent = "An error occurred. Please try again.";
            preview.innerHTML = "";

        }finally {
            setLoading(false);

        }

    
    });

});
