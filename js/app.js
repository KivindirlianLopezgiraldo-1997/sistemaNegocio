let products = [];

function addProduct() {
    const product = document.getElementById('productSelect').value;
    const color = document.getElementById('colorInput').value.trim();
    const quantity = parseInt(document.getElementById('quantityInput').value.trim(), 10);

    console.log("Intentando agregar producto:", { product, color, quantity });

    if (!color || isNaN(quantity) || quantity <= 0) {
        alert("Por favor, ingrese un color válido y una cantidad mayor a 0.");
        return;
    }

    products.push({ product, color, quantity });
    console.log("Lista actualizada de productos:", products);
    renderList();
    clearInputs();
}

function clearInputs() {
    document.getElementById('colorInput').value = '';
    document.getElementById('quantityInput').value = '';
}

function renderList() {
    console.log("Renderizando lista de productos...");
    const list = document.getElementById('productList');
    list.innerHTML = '';
    products.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('product-item');
        li.innerHTML = `
            <span>${item.product} - Color: ${item.color}, Cantidad: ${item.quantity}</span>
            <div>
                <button onclick="editProduct(${index})">Editar</button>
                <button onclick="deleteProduct(${index})">Eliminar</button>
            </div>
        `;
        list.appendChild(li);
    });
}

function editProduct(index) {
    const newColor = prompt("Editar color:", products[index].color);
    const newQuantity = parseInt(prompt("Editar cantidad:", products[index].quantity), 10);
    if (newColor !== null && newColor.trim() !== '' && !isNaN(newQuantity) && newQuantity > 0) {
        products[index].color = newColor.trim();
        products[index].quantity = newQuantity;
        console.log("Producto editado:", products[index]);
        renderList();
    } else {
        alert("Por favor, ingrese valores válidos.");
    }
}

function deleteProduct(index) {
    console.log("Eliminando producto en índice:", index);
    products.splice(index, 1);
    renderList();
}

function downloadPDF() {
    if (products.length === 0) {
        alert("No hay productos para descargar.");
        return;
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("lista de materiales", 10, 10);
    products.forEach((item, index) => {
        doc.text(`${index + 1}. ${item.product} - Color: ${item.color}, Cantidad: ${item.quantity}`, 10, 20 + index * 10);
    });
    console.log("Descargando PDF...");
    doc.save("productos_guardados.pdf");
}

//loguin
const users = [
    { username: "kivinlopez", password: "1077475520", role: "admin" },
    { username: "user", password: "user123", role: "user" }
];

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        localStorage.setItem("loggedUser", JSON.stringify(user));
        window.location.href = user.role === "admin" ? "./html/pagina.html" : "./html/pagina.html";
    } else {
        alert("Credenciales incorrectas");
    }
}


//menu hamburguesa  
function toggleMenu() {
    const nav = document.getElementById("nav-menu");
    nav.classList.toggle("active");
}

//cerrar sesion
function logout() {
    localStorage.removeItem("loggedUser");
    window.location.href = "../index.html";
}

//chequeo loguin

function checkLogin() {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    if (!user) {
        window.location.href = "../index.html";
    }
    if (user.role !== "admin") {
        const adminLinks = document.querySelectorAll(".admin-link");
        adminLinks.forEach(link => link.style.display = "none");
    }
}


//crear usuario
function addUser() {
    const username = document.getElementById("new-username").value;
    const password = document.getElementById("new-password").value;
    const role = document.getElementById("new-role").value;
    
    if (username && password) {
        users.push({ username, password, role });
        loadUsers();
    } else {
        alert("Complete todos los campos");
    }
}

function loadUsers() {
    const userList = document.getElementById("user-list");
    userList.innerHTML = "";
    users.forEach((user, index) => {
        const li = document.createElement("li");
        li.textContent = `${user.username} - ${user.role}`;
        const btn = document.createElement("button");
        btn.textContent = "Eliminar";
        btn.onclick = () => deleteUser(index);
        li.appendChild(btn);
        userList.appendChild(li);
    });
}

function deleteUser(index) {
    users.splice(index, 1);
    loadUsers();
}

//listar usuarios editar y eliminar
function renderUsers() {
    const list = document.getElementById('userList');
    list.innerHTML = '';
    users.forEach((user, index) => {
        const li = document.createElement('li');
        li.classList.add('user-item');
        li.innerHTML = `
            <span>${user.username} - Rol: ${user.role}</span>
            <div>
                <button onclick="editUser(${index})">Editar</button>
                <button onclick="deleteUser(${index})">Eliminar</button>
            </div>
        `;
        list.appendChild(li);
    });
}

//funcion guardar usuario en local storage
function saveUser() {
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;
    const role = document.getElementById('new-role').value;

    if (!username || !password || !role) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    const user = { username, password, role };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    renderUsers();
    clearUserInputs();
}


//listar usuarios
function displayUsers() {
    const userList = document.getElementById("user-list");
    userList.innerHTML = "";
    users.forEach((user, index) => {
        const li = document.createElement("li");
        li.textContent = `${user.username} - ${user.role}`;
        const btn = document.createElement("button");
        btn.textContent = "Eliminar";
        btn.onclick = () => deleteUser(index);
        li.appendChild(btn);
        userList.appendChild(li);
    });
}