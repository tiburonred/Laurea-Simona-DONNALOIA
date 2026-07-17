const cloudName = "xcc0isj0";
const uploadPreset = "laurea-simona";

function caricaFoto() {

    const files = document.getElementById("uploadFoto").files;

    if (files.length === 0) {
        document.getElementById("messaggioUpload").innerHTML =
        "Seleziona prima una foto";
        return;
    }

    for (let i = 0; i < files.length; i++) {

        let formData = new FormData();

        formData.append("file", files[i]);
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
            console.log("Foto caricata:", data.secure_url);

            document.getElementById("messaggioUpload").innerHTML =
            "✅ Foto caricata con successo!";
        })
        .catch(error => {
            console.error(error);
            document.getElementById("messaggioUpload").innerHTML =
            "Errore durante il caricamento";
        });

    }
}
