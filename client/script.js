const API_BASE_URL = "http://127.0.0.1:8000";

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const output = document.getElementById("output");
const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");

function getFormData() {
    return {
        username: usernameInput.value.trim(),
        password: passwordInput.value,
    };
}

function renderResult(data) {
    output.textContent = JSON.stringify(data, null, 2);
}

async function sendAuthRequest(path) {
    const payload = getFormData();

    if (!payload.username || !payload.password) {
        renderResult({ error: "아이디와 비밀번호를 모두 입력하세요." });
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}${path}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (!response.ok) {
            renderResult({ error: data.detail || "요청 실패" });
            return;
        }

        renderResult(data);
    } catch (error) {
        renderResult({ error: "서버에 연결할 수 없습니다.", detail: error.message });
    }
}

signupBtn.addEventListener("click", () => sendAuthRequest("/signup"));
loginBtn.addEventListener("click", () => sendAuthRequest("/login"));
