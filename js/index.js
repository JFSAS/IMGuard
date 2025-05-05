function login() {
    // 获取输入值
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // 简单的输入验证
    if (!username || !password) {
        alert('请输入用户名和密码');
        return;
    }
    
    // 跳转到主页面
    window.location.href = 'dashboard.html';
}

// 添加回车键登录功能
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        login();
    }
}); 