// // 初始化地图
// const map = L.map('map').setView([20.0, 0.0], 2); // 初始视角：世界地图中心

const map = L.map('map', {
  scrollWheelZoom: true,
  wheelDebounceTime: 80,     // 默认 40，调大可减少频繁触发
  wheelPxPerZoomLevel: 120,  // 默认 60，调大=滚轮更“钝”，缩放次数减少
  zoomSnap: 1,               // 保持整数缩放级别（减少非必要重算）
  zoomDelta: 1
}).setView([20.0, 0.0], 2);


// 添加基础地图层
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap',
    maxZoom: 10
}).addTo(map);

// 定义去过和没去过的城市数据
const cities = [
    { name: "东京", coords: [35.6895, 139.6917], visited: false, photos: ["path/to/tokyo1.jpg", "path/to/tokyo2.jpg"] },
    { name: "巴黎", coords: [48.8566, 2.3522], visited: false, photos: ["path/to/paris1.jpg", "path/to/paris2.jpg"] },
    { name: "纽约", coords: [40.7128, -74.0060], visited: false, photos: [] },
    { name: "悉尼", coords: [-33.8688, 151.2093], visited: false, photos: [] },
    { name: "北京", coords: [39.9042, 116.4074], visited: false, url: "/DD-MEIMEI/cities/Beijing/" },
    { name: "伦敦", coords: [51.5074, -0.1278], visited: false, photos: [] },
    { name: "莫斯科", coords: [55.7558, 37.6173], visited: false, photos: [] },
    { name: "开罗", coords: [30.0444, 31.2357], visited: false, photos: ["path/to/cairo1.jpg"] },
    { name: "新德里", coords: [28.6139, 77.2090], visited: false, photos: [] },
    { name: "布宜诺斯艾利斯", coords: [-34.6037, -58.3816], visited: false, photos: [] },
    { name: "中山", coords: [22.5159, 113.3926], visited: true, url: "cities/ZhongShan/index.html" },
    { name: "珠海", coords: [22.2707, 113.5767], visited: true, url: "cities/ZhuHai/index.html" },

    // 添加新城市
    { name: "南京", coords: [32.0603, 118.7969], visited: false, url: "cities/Nanjing" },
    { name: "六合（南京）", coords: [32.3463, 118.8482], visited: false, photos: ["path/to/liuhe1.jpg"] },
    { name: "香港", coords: [22.3193, 114.1694], visited: false, url: "/DD-MEIMEI/cities/Hong Kong"},
    { name: "长春", coords: [43.8171, 125.3235], visited: false, photos: ["path/to/changchun1.jpg"] },
    { name: "哈尔滨", coords: [45.8038, 126.5350], visited: false, photos: [] },
    { name: "广州", coords: [23.1291, 113.2644], visited: false, photos: ["path/to/guangzhou1.jpg"] },
    { name: "深圳", coords: [22.5431, 114.0579], visited: true, url: "/DD-family/cities/ShenZhen/index.html" },
    { name: "长沙", coords: [28.2278, 112.9389], visited: false, photos: [] },
    { name: "高邮", coords: [32.7852, 119.4432], visited: false, photos: ["path/to/gaoyou1.jpg"] },

{ name: "上海", coords: [31.2304, 121.4737], visited: false, photos: ["path/to/shanghai1.jpg"] },
{ name: "苏州", coords: [31.2989, 120.5853], visited: false, photos: ["path/to/suzhou1.jpg"] }
];

// 添加所有城市到地图
cities.forEach(city => {
    // 设置去过和没去过的样式
    const marker = L.circleMarker(city.coords, {
        radius: 5, // 圆直径
        color: city.visited ? 'green' : 'gray', // 绿色表示去过，灰色表示未去过
        fillColor: city.visited ? 'lightgreen' : 'lightgray',
        fillOpacity: 0.8
    }).addTo(map);

    if (city.visited && city.url) {
        // 去过的城市，添加点击跳转功能
        marker.on('click', () => {
            window.location.href = city.url; // 跳转到指定链接
        });
    } else if (city.visited) {
        // 去过但没有 URL 的城市，显示图片弹窗
        marker.bindPopup(`
            <b>${city.name}</b><br>
            ${city.photos.map(photo => `<img src="${photo}" class="popup-img" alt="${city.name}" />`).join('')}
        `);
    } else {
        // 未去过的城市显示提示
        marker.bindPopup(`<b>${city.name}</b><br>未去过`);
    }
});
