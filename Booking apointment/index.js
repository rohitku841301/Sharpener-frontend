const url =
  "https://crudcrud.com/api/458b978a72a04561bc0a2f8287c7f4ea/bookingData";
let bookingId = null;

const form = document.querySelector("form");
async function handleFormSubmit(event) {
  try {
    event.preventDefault();
    const bookingDetails = {
      name: event.target.username.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
    };
    if (bookingId === null) {
      const bookingData = await axios.post(url, bookingDetails);
      console.log(bookingData);
      showUser(bookingData.data);
    } else {
      await axios.put(`${url}/${bookingId}`, bookingDetails);
      showUser({ ...bookingDetails, _id: bookingId });
    }
  } catch (error) {
    console.log(error);
  }
}


async function deleteUserDetail(event) {
  try {
    const parent = event.target.parentNode;
    bookingId = parent.querySelector("._id").innerText;
    await axios.delete(`${url}/${bookingId}`);
    parent.remove();
  } catch (error) {
    console.log(error);
  }
}

function editUserDetail(event) {
  const parent = event.target.parentNode;
  const input = document.querySelectorAll("input");
  input[0].value = parent.querySelector(".name").innerText;
  input[1].value = parent.querySelector(".email").innerText;
  input[2].value = parent.querySelector(".phone").innerText;
  parent.remove();
  
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    console.log("1");
    const allBookingDetails = await axios.get(url);
    console.log("3");
    const newObj = allBookingDetails.data;
    for (let i = 0; i < newObj.length; i++) {
      showUser(newObj[i]);
    }
  } catch (error) {
    console.log("2");
    console.log(error);
  }
});

function showUser(newObj) {
  const entries = Object.entries(newObj);

  const ul = document.createElement("ul");
  entries.forEach(([key, value]) => {
      const li = document.createElement("li");
      li.innerText = value;
      li.classList.add(key);
      ul.append(li);
  });
  const btn = document.createElement("button");
  btn.innerText = "delete";
  btn.setAttribute("type", "click");
  btn.setAttribute("onclick", "deleteUserDetail(event)");

  const editBtn = document.createElement("button");
  editBtn.innerText = "edit";

  editBtn.setAttribute("type", "click");
  editBtn.setAttribute("class", "edit");
  editBtn.setAttribute("onclick", "editUserDetail(event)");
  ul.append(btn);
  ul.append(editBtn);
  form.after(ul);

  const input = document.querySelectorAll("input");
  for (let i = 0; i < input.length; i++) {
    input[i].value = "";
  }
}
