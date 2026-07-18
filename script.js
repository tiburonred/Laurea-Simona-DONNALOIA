const cloudName = "xcc0isj0";
const uploadPreset = "Laurea-Simona";

function caricaFoto() {

    const files = document.getElementById("uploadFoto").files;
    const messaggio = document.getElementById("messaggioUpload");

    if (files.length === 0) {
        messaggio.innerHTML = "Seleziona almeno una foto";
        return;
    }

    messaggio.innerHTML = "⏳ Caricamento in corso...";

    let caricamentiCompletati = 0;

    for (let i = 0; i < files.length; i++) {

        let formData = new FormData();

        formData.append("file", files[i]);
        formData.append("upload_preset", uploadPreset);

        fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
                method: "POST",
                body: formData
            }
        )
        .then(response => response.json())
        .then(data => {

            caricamentiCompletati++;

            if (caricamentiCompletati === files.length) {

                messaggio.innerHTML =
                `✅ ${files.length} foto caricate con successo!`;

            }

        })
        .catch(error => {

            console.error(error);

            messaggio.innerHTML =
            "❌ Errore durante il caricamento";

        });

    }

}


function mostraGalleria() {

    const galleria = document.getElementById("galleriaFoto");

    if (!galleria) {
        console.log("Galleria non trovata");
        return;
    }

    const immagini = [
        "https://res.cloudinary.com/xcc0isj0/image/upload/v1784399529/k8mh1zp9e5knvdroxevg.jpg"
    ];

    immagini.forEach(url => {

        const img = document.createElement("img");

        img.src = url;
        img.alt = "Foto della laurea";

        galleria.appendChild(img);

    });

}


mostraGalleria();
