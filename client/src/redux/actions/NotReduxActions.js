//Las pongo aca asi los localhost que hay que cambiarlos para el deploy quedan en 1 solo archivo

const baseURL = 'https://ztreamgames-backend-dev-bfgm.1.us-1.fl0.io'

export const sendContactEmail = async (data) => {
  return fetch(`${baseURL}/email/sendContact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((e) => e);
};

export const changeImage = async (data, idUser) => {
  return fetch(`${baseURL}/users/putUser/${idUser}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: data }),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((e) => e);
};

export const changeImageBackground = async (data, idUser) => {
  return fetch(`${baseURL}/users/putUser/${idUser}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ backgroundImage: data }),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((e) => e);
};

export const saveProfileConfig = async (data, idUser) => {
  return fetch(`${baseURL}/users/putUser/${idUser}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data }),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((e) => e);
};

export const handleImage = async (e, setImage) => {
  const formData = new FormData();

  formData.append("file", e.target.files[0]);
  formData.append("upload_preset", "ur82rmeu");
  await fetch("https://api.cloudinary.com/v1_1/dl1itu05s/image/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      setImage(data.secure_url);
    })

    .catch((e) => console.log(e));
};
