console.log("VERSIONE NUOVA SCRIPT OK");

const cloudName = "xcc0isj0";
const uploadPreset = "laurea_simona_2026";

function caricaFoto() {

    const files = document.getElementById("uploadFoto").files;
    const messaggio = document.getElementById("messaggioUpload");

    if (files.length === 0) {
        messaggio.innerHTML = "Seleziona almeno una foto";
        return;
    }

    messaggio.innerHTML = "⏳ Caricamento in corso...";

    let completate = 0;

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

            console.log("Foto caricata:", data);

            completate++;

            if (completate === files.length) {

                messaggio.innerHTML =
                `✅ ${files.length} foto caricate con successo!`;
                mostraGalleria();

            }

        })
                .catch(error => {

            console.error(error);

            messaggio.innerHTML =
            "❌ Errore caricamento";

        });

    }
    

}

async function mostraGalleria() {

    const galleria = document.getElementById("galleriaFoto");

    if (!galleria) {
        console.log("Galleria non trovata");
        return;
    }

    try {

        const risposta = await fetch(
            "https://galleria-laurea-simona-v2.tiburonred.workers.dev/api"
        );

        const immagini = await risposta.json();

        galleria.innerHTML = "";

        immagini.forEach(url => {

            const img = document.createElement("img");

            img.src = url;
            img.alt = "Foto della laurea";

            img.style.width = "300px";
            img.style.margin = "10px";
            img.style.borderRadius = "10px";

            galleria.appendChild(img);

        });

    } catch (errore) {

        console.error("Errore galleria:", errore);

    }

}


mostraGalleria();
