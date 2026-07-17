const cloudName = "xcc0isj0";
const uploadPreset = "Laurea-Simona";

function caricaFoto() {

    const files = document.getElementById("uploadFoto").files;
    const messaggio = document.getElementById("messaggioUpload");

    if (files.length === 0) {
        messaggio.innerHTML = "Seleziona prima una foto";
        return;
    }

    messaggio.innerHTML = "⏳ Caricamento in corso...";

    let formData = new FormData();

    formData.append("file", files[0]);
    formData.append("upload_preset", uploadPreset);

    fetch(
        https://api.cloudinary.com/v1_1/${cloudName}/image/upload,
        {
            method: "POST",
            body: formData
        }
    )
    .then(response => response.json())
    .then(data => {

        console.log(data);

        if (data.secure_url) {

            messaggio.innerHTML =
            "✅ Foto caricata con successo!";

        } else {

            messaggio.innerHTML =
            "❌ Errore: " + JSON.stringify(data);

        }

    })
    .catch(error => {

        console.error(error);

        messaggio.innerHTML =
        "❌ Errore durante il caricamento";

    });

}
