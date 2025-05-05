document.addEventListener('DOMContentLoaded', function() {
    // 侧边栏菜单切换
    const menuItems = document.querySelectorAll('.nav-menu li');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // 根据点击的菜单项进行页面导航
            const menuSpan = this.querySelector('span');
            const menuText = menuSpan ? menuSpan.textContent.trim() : '';
            console.log(menuText);
            if (menuText === 'Dashboard') {
                window.location.href = 'dashboard.html';
            } else if (menuText === 'Project') {
                window.location.href = 'project.html';
            } else if (menuText === 'Login') {
                window.location.href = 'index.html';
            } else if (menuText === 'User') {
                window.location.href = 'user.html';
            } else if (menuText === 'Register') {
                window.location.href = 'register.html';
            }
        });
    });

    // 菜单按钮点击事件
    const menuIcon = document.querySelector('.menu-icon');
    const sidebar = document.querySelector('.sidebar');
    const contentArea = document.querySelector('.content-area');
    
    menuIcon.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        if (sidebar.classList.contains('collapsed')) {
            sidebar.style.width = '64px';
            contentArea.style.marginLeft = '64px';
            // 隐藏文本内容
            document.querySelectorAll('.nav-menu li span, .user-info').forEach(el => {
                el.style.display = 'none';
            });
        } else {
            sidebar.style.width = 'var(--sidebar-width)';
            contentArea.style.marginLeft = 'var(--sidebar-width)';
            // 显示文本内容
            document.querySelectorAll('.nav-menu li span, .user-info').forEach(el => {
                el.style.display = 'block';
            });
        }
    });

    // 上传数据按钮点击事件
    const uploadBtn = document.querySelector('.upload-btn');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', function() {
            // 创建一个隐藏的文件输入
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = '.csv,.xlsx,.json';
            fileInput.multiple = true;
            fileInput.style.display = 'none';
            
            // 当选择文件后触发
            fileInput.addEventListener('change', function(e) {
                if (this.files.length > 0) {
                    // 显示选中的文件
                    let fileNames = '';
                    for (let i = 0; i < this.files.length; i++) {
                        fileNames += this.files[i].name + (i < this.files.length - 1 ? ', ' : '');
                    }
                    alert(`已选择文件: ${fileNames}`);
                    
                    // 这里可以添加上传逻辑
                }
            });
            
            // 触发文件选择对话框
            document.body.appendChild(fileInput);
            fileInput.click();
            document.body.removeChild(fileInput);
        });
    }

    // 创建项目表单提交
    const projectForm = document.querySelector('.project-form');
    if (projectForm) {
        projectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const projectName = document.getElementById('projectName').value;
            const projectDescription = document.getElementById('projectDescription').value;
            
            // 验证表单
            if (!projectName) {
                alert('请输入项目名称');
                return;
            }
            
            // 显示处理中状态
            const createBtn = document.querySelector('.create-btn');
            const originalBtnText = createBtn.textContent;
            createBtn.disabled = true;
            createBtn.textContent = '创建中...';
            
            // 模拟创建过程
            setTimeout(() => {
                alert(`项目 "${projectName}" 创建成功!`);
                
                // 恢复按钮状态
                createBtn.disabled = false;
                createBtn.textContent = originalBtnText;
                
                // 创建成功后跳转到项目列表页
                window.location.href = 'project.html';
            }, 1500);
        });
    }
}); 