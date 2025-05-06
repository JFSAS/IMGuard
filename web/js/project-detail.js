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
            if (menuText === 'Dashboard') {
                window.location.href = 'dashboard.html';
            } else if (menuText === 'Project') {
                window.location.href = 'project.html';
            } else if (menuText === 'Data-Manage') {
                window.location.href = 'data-management.html';
            } else if (menuText === 'User') {
                window.location.href = 'user.html';
            }
        });
    });

})
document.addEventListener('DOMContentLoaded', function() {
    // 初始化标签页切换
    initTabs();
    
    // 初始化图表
    initTrainingChart();
    initServerChart();
    initMetricChart();
    initCategoryChart();
    
    // 添加指标选择器事件监听
    document.getElementById('metric-select').addEventListener('change', function() {
        updateMetricChart(this.value);
    });
});

// 标签页切换功能
function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有标签的激活状态
            tabs.forEach(t => t.classList.remove('active'));
            
            // 添加当前标签的激活状态
            this.classList.add('active');
            
            // 隐藏所有内容
            const allContents = document.querySelectorAll('.tab-content');
            allContents.forEach(content => content.classList.add('hidden'));
            
            // 显示当前标签对应的内容
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-content`).classList.remove('hidden');
        });
    });
}

// 训练进度图表
function initTrainingChart() {
    const ctx = document.getElementById('trainingChart').getContext('2d');
    
    const trainingData = {
        labels: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
        datasets: [
            {
                label: '训练损失',
                data: [0.82, 0.61, 0.45, 0.36, 0.31, 0.29, 0.26, 0.24, 0.22, 0.21, 0.20],
                borderColor: '#1976d2',
                backgroundColor: 'rgba(25, 118, 210, 0.1)',
                fill: true,
                tension: 0.4
            },
            {
                label: '验证损失',
                data: [0.85, 0.65, 0.52, 0.46, 0.42, 0.41, 0.39, 0.38, 0.37, 0.36, 0.36],
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                fill: true,
                tension: 0.4
            }
        ]
    };
    
    new Chart(ctx, {
        type: 'line',
        data: trainingData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '损失值'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '迭代次数 (Epoch)'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            }
        }
    });
}

// 服务器负载图表
function initServerChart() {
    const ctx = document.getElementById('serverChart').getContext('2d');
    
    const currentTime = new Date();
    const labels = Array.from({length: 12}, (_, i) => {
        const time = new Date(currentTime);
        time.setHours(currentTime.getHours() - (11 - i));
        return time.getHours() + ':00';
    });
    
    const serverData = {
        labels: labels,
        datasets: [
            {
                label: 'GPU使用率 (%)',
                data: [65, 72, 86, 92, 95, 98, 96, 94, 85, 76, 82, 88],
                borderColor: '#1976d2',
                backgroundColor: 'rgba(25, 118, 210, 0.5)',
                yAxisID: 'y',
                tension: 0.4
            },
            {
                label: 'CPU使用率 (%)',
                data: [35, 42, 55, 62, 68, 72, 74, 70, 65, 58, 62, 68],
                borderColor: '#f39c12',
                backgroundColor: 'rgba(243, 156, 18, 0.5)',
                yAxisID: 'y',
                tension: 0.4
            },
            {
                label: '内存使用 (GB)',
                data: [8.2, 9.4, 12.6, 14.8, 15.2, 15.8, 16.0, 15.4, 14.2, 12.8, 13.5, 14.2],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.5)',
                yAxisID: 'y1',
                tension: 0.4
            }
        ]
    };
    
    new Chart(ctx, {
        type: 'line',
        data: serverData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    type: 'linear',
                    position: 'left',
                    title: {
                        display: true,
                        text: '使用率 (%)'
                    },
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                },
                y1: {
                    type: 'linear',
                    position: 'right',
                    title: {
                        display: true,
                        text: '内存 (GB)'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            }
        }
    });
}

// 训练指标图表
let metricChart;
function initMetricChart() {
    const ctx = document.getElementById('metricChart').getContext('2d');
    
    // 初始数据为损失值
    const metricData = {
        labels: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
        datasets: [
            {
                label: '训练损失',
                data: [0.82, 0.61, 0.45, 0.36, 0.31, 0.29, 0.26, 0.24, 0.22, 0.21, 0.20],
                borderColor: '#1976d2',
                backgroundColor: 'rgba(25, 118, 210, 0.1)',
                fill: true,
                tension: 0.4
            },
            {
                label: '验证损失',
                data: [0.85, 0.65, 0.52, 0.46, 0.42, 0.41, 0.39, 0.38, 0.37, 0.36, 0.36],
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                fill: true,
                tension: 0.4
            }
        ]
    };
    
    metricChart = new Chart(ctx, {
        type: 'line',
        data: metricData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '损失值'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '迭代次数 (Epoch)'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            }
        }
    });
}

// 更新训练指标图表
function updateMetricChart(metricType) {
    let label1, label2, data1, data2, yAxisLabel;
    
    switch(metricType) {
        case 'loss':
            label1 = '训练损失';
            label2 = '验证损失';
            data1 = [0.82, 0.61, 0.45, 0.36, 0.31, 0.29, 0.26, 0.24, 0.22, 0.21, 0.20];
            data2 = [0.85, 0.65, 0.52, 0.46, 0.42, 0.41, 0.39, 0.38, 0.37, 0.36, 0.36];
            yAxisLabel = '损失值';
            break;
        case 'accuracy':
            label1 = '训练准确率';
            label2 = '验证准确率';
            data1 = [0.45, 0.62, 0.73, 0.80, 0.84, 0.86, 0.88, 0.90, 0.91, 0.92, 0.93];
            data2 = [0.42, 0.58, 0.68, 0.74, 0.78, 0.80, 0.82, 0.83, 0.84, 0.85, 0.86];
            yAxisLabel = '准确率';
            break;
        case 'precision':
            label1 = '训练精确率';
            label2 = '验证精确率';
            data1 = [0.48, 0.65, 0.75, 0.82, 0.86, 0.88, 0.90, 0.91, 0.92, 0.93, 0.94];
            data2 = [0.44, 0.60, 0.70, 0.76, 0.80, 0.82, 0.84, 0.85, 0.86, 0.87, 0.88];
            yAxisLabel = '精确率';
            break;
        case 'recall':
            label1 = '训练召回率';
            label2 = '验证召回率';
            data1 = [0.42, 0.60, 0.72, 0.79, 0.83, 0.85, 0.87, 0.89, 0.90, 0.91, 0.92];
            data2 = [0.40, 0.56, 0.67, 0.72, 0.76, 0.78, 0.80, 0.81, 0.82, 0.83, 0.84];
            yAxisLabel = '召回率';
            break;
    }
    
    metricChart.data.datasets[0].label = label1;
    metricChart.data.datasets[0].data = data1;
    metricChart.data.datasets[1].label = label2;
    metricChart.data.datasets[1].data = data2;
    
    metricChart.options.scales.y.title.text = yAxisLabel;
    
    metricChart.update();
}

// 类别分布图表
function initCategoryChart() {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    
    const categoryData = {
        labels: ['人', '车', '自行车', '摩托车', '交通灯', '交通标志', '狗', '猫'],
        datasets: [{
            label: '标注数量',
            data: [8452, 6324, 3541, 2187, 1845, 2348, 1102, 1074],
            backgroundColor: [
                '#1976d2',
                '#2ecc71',
                '#e74c3c',
                '#f39c12',
                '#9b59b6',
                '#3498db',
                '#1abc9c',
                '#f1c40f'
            ],
            borderWidth: 0
        }]
    };
    
    new Chart(ctx, {
        type: 'bar',
        data: categoryData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '标注数量'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '类别'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `数量: ${context.parsed.y} (${((context.parsed.y / 26873) * 100).toFixed(1)}%)`;
                        }
                    }
                }
            }
        }
    });
}

// 移动端菜单切换
document.querySelector('.menu-icon').addEventListener('click', function() {
    document.querySelector('.sidebar').classList.toggle('open');
}); 