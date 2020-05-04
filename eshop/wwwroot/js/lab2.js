const url = 'api/manufacturers';
let manufacturers = [];

function getManufacturers() {
    fetch(url)
        .then(response => response.json())
        .then(data => _displayManufacturers(data))
        .catch(error => console.error('Unable to get manufacturers.', error));
}

function addManufacturer() {
    const addNameTextbox = document.getElementById('add-name');
    const addAddressTextbox = document.getElementById('add-address');

    const manufacturer = {
        name: addNameTextbox.value.trim(),
        address: addAddressTextbox.value.trim(),
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(manufacturer)
    })
        .then(response => response.json())
        .then(() => {
            getManufacturers();
            addNameTextbox.value = '';
            addAddressTextbox.value = '';
        })
        .catch(error => console.error('Unable to add manufacturer.', error));
}

function deleteManufacturer(id) {
    fetch(`${url}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getManufacturers())
        .catch(error => console.error('Unable to delete manufacturer.', error));
}

function displayEditForm(id) {
    const manufacturer = manufacturers.find(manufacturer => manufacturer.id === id);

    document.getElementById('edit-id').value = manufacturer.id;
    document.getElementById('edit-name').value = manufacturer.name;
    document.getElementById('edit-address').value = manufacturer.address;
    document.getElementById('editForm').style.display = 'block';
}

function updateManufacturer() {
    const manufacturerId = document.getElementById('edit-id').value;
    const manufacturer = {
        id: parseInt(manufacturerId, 10),
        name: document.getElementById('edit-name').value.trim(),
        address: document.getElementById('edit-address').value.trim()
    };

    fetch(`${url}/${manufacturerId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(manufacturer)
    })
        .then(() => getManufacturers())
        .catch(error => console.error('Unable to update manufacturer.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}


function _displayManufacturers(data) {
    const tBody = document.getElementById('manufacturers');
    tBody.innerHTML = '';


    const button = document.createElement('button');

    data.forEach(manufacturer => {
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${manufacturer.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteManufacturer(${manufacturer.id})`);

        let tr = tBody.insertRow();


        let td1 = tr.insertCell(0);
        let textNode = document.createTextNode(manufacturer.name);
        td1.appendChild(textNode);

        let td2 = tr.insertCell(1);
        let textNodeAddress = document.createTextNode(manufacturer.address);
        td2.appendChild(textNodeAddress);

        let td3 = tr.insertCell(2);
        td3.appendChild(editButton);

        let td4 = tr.insertCell(3);
        td4.appendChild(deleteButton);
    });

    manufacturers = data;
}
