const calculateAge = (date) => {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
}

const formValidation = (email, dob, accepted) => {
    // if (!name) {
    //     alert('Please enter a name');
    //     return false;
    // }

    // if (!email) {
    //     alert('Please enter an email');
    //     return false;
    // }

    const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email');
        return false;
    }

    if(!dob) {
        alert('Please enter a date of birth');
        return false;
    }

    // if (!password) {
    //     alert('Please enter a password');
    //     return false;
    // }

    const age = calculateAge(dob);
    if (age < 18 || age > 55) {
        alert('Age should be between 18 and 55');
        return false;
    }

    if (!accepted) {
        alert('Please accept the terms and conditions');
        return false;
    }

    return true;
}

const handleSubmit = (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const accepted = document.getElementById('terms').checked;

    if (!formValidation(email, dob, accepted)) {
        return;
    }

    // add to local storage
    const user = {
        name,
        email,
        password,
        dob,
        accepted
    };

    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    fetchAndRenderUsers();
}

const createHTMLRow = (user) => {
    const css = `px-4 py-2 text-center`;
    return `
        <tr>
            <td class="${css}">${user.name}</td>
            <td class="${css}">${user.email}</td>
            <td class="${css}">${user.password}</td>
            <td class="${css}">${user.dob}</td>
            <td class="${css}">${user.accepted}</td>
        </tr>
    `;
}


const fetchAndRenderUsers = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const usersList = document.getElementById('users-list');
    usersList.innerHTML = users.map(createHTMLRow).join('');
}

const submitBtn = document.getElementById('submit-btn');
submitBtn.addEventListener('click', handleSubmit);
fetchAndRenderUsers();