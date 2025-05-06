document.addEventListener('DOMContentLoaded', function() {
    // 用户类型切换
    const normalUserTab = document.getElementById('normal-user');
    const adminUserTab = document.getElementById('admin-user');
    let userType = 'normal'; // 默认为普通用户

    normalUserTab.addEventListener('click', function() {
        normalUserTab.classList.add('active');
        adminUserTab.classList.remove('active');
        userType = 'normal';
    });

    adminUserTab.addEventListener('click', function() {
        adminUserTab.classList.add('active');
        normalUserTab.classList.remove('active');
        userType = 'admin';
    });
});

function login() {
    // 获取输入值
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const userType = document.getElementById('admin-user').classList.contains('active') ? 'admin' : 'normal';
    
    // 简单的输入验证
    if (!username || !password) {
        alert('请输入用户名和密码');
        return;
    }
    
    // 这里可以根据用户类型进行不同的登录逻辑
    if (userType === 'admin') {
        // 管理员登录逻辑
        console.log('管理员登录:', username, password);
        // 临时模拟登录成功
        window.location.href = 'dashboard.html';
    } else {
        // 普通用户登录逻辑
        console.log('普通用户登录:', username, password);
        // 临时模拟登录成功
        window.location.href = 'project.html';
    }
}

// 添加回车键登录功能
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        login();
    }
}); 