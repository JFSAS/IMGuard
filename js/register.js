document.addEventListener('DOMContentLoaded', function() {
    // 处理密码可见性切换
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.querySelector('#password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // 切换图标
            togglePassword.textContent = type === 'password' ? 'visibility_off' : 'visibility';
        });
    }
    
    // 表单字段验证
    const validateField = (field, condition) => {
        if (condition) {
            field.style.borderColor = '';
            return true;
        } else {
            field.style.borderColor = 'var(--error)';
            return false;
        }
    };
    
    // 为所有输入字段添加焦点失去时验证
    const firstnameInput = document.querySelector('#firstname');
    const lastnameInput = document.querySelector('#lastname');
    const emailInput = document.querySelector('#email');
    
    if (firstnameInput) {
        firstnameInput.addEventListener('blur', function() {
            validateField(this, this.value.trim() !== '');
        });
    }
    
    if (lastnameInput) {
        lastnameInput.addEventListener('blur', function() {
            validateField(this, this.value.trim() !== '');
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            validateField(this, emailRegex.test(this.value));
        });
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('blur', function() {
            validateField(this, this.value.length >= 6);
        });
    }
});

// 注册函数
function register() {
    const firstname = document.querySelector('#firstname').value.trim();
    const lastname = document.querySelector('#lastname').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value;
    
    // 验证所有字段
    let isValid = true;
    
    if (firstname === '') {
        document.querySelector('#firstname').style.borderColor = 'var(--error)';
        isValid = false;
    }
    
    if (lastname === '') {
        document.querySelector('#lastname').style.borderColor = 'var(--error)';
        isValid = false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.querySelector('#email').style.borderColor = 'var(--error)';
        isValid = false;
    }
    
    if (password.length < 6) {
        document.querySelector('#password').style.borderColor = 'var(--error)';
        isValid = false;
    }
    
    if (isValid) {
        // 这里可以添加实际的注册逻辑
        console.log('注册信息:', { firstname, lastname, email });
        
        // 模拟注册成功，跳转到登录页面
        alert('注册成功！请登录您的账号。');
        window.location.href = 'index.html';
    } else {
        alert('请正确填写所有字段。');
    }
} 