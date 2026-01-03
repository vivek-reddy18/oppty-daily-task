
let errors = [];
let clientErrorCount = 0; 
let serverErrorCount = 0; 


async function callApi() {
    const apiUrl = "https://httpbin.org/status/400,401,404,500,503";

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw {
                status: response.status,
                message: response.statusText
            };
        }

        await response.text();

    } catch (error) {
        logError(
            apiUrl,
            error.status || 500,
            error.message || "Network Error"
        );
    }
}



function logError(endpoint, status, message) {
    const error = {
        time: new Date().toLocaleTimeString(),
        endpoint: endpoint,
        status: status,
        message: message
    };

    errors.unshift(error);

    
    if (status >= 400 && status < 500) {
        clientErrorCount++;
    } else if (status >= 500) {
        serverErrorCount++;
    }


    renderDashboard();
}


function getStatusClass(status) {
    if (status >= 400 && status < 500) {
        return "status-4xx";
    }
    if (status >= 500) {
        return "status-5xx";
    }
    return "";
}

function renderDashboard() {
    const table = document.getElementById("errorTable");
    table.innerHTML = "";

    errors.forEach(error => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${error.time}</td>
            <td>${error.endpoint}</td>
            <td class="${getStatusClass(error.status)}">${error.status}</td>
            <td>${error.message}</td>
        `;

        table.appendChild(row);
    });


    document.getElementById("totalErrors").innerText = errors.length;
    document.getElementById("clientErrors").innerText = clientErrorCount;
    document.getElementById("serverErrors").innerText = serverErrorCount;
}
