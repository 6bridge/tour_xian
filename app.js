// 长沙市中心坐标
const CHANGSHA_CENTER = [112.982279, 28.19409];

// 景点数据
const attractions = [
    {
        name: "岳麓山",
        location: [112.936, 28.186],
        type: "natural",
        crowdLevel: {
            morning: "low",
            afternoon: "medium",
            evening: "low"
        },
        description: "长沙著名的自然风景区，适合徒步和观光"
    },
    {
        name: "橘子洲头",
        location: [112.961, 28.195],
        type: "natural",
        crowdLevel: {
            morning: "low",
            afternoon: "high",
            evening: "medium"
        },
        description: "湘江中的著名景点，毛泽东青年艺术雕塑所在地"
    },
    {
        name: "湖南省博物馆",
        location: [112.996, 28.211],
        type: "cultural",
        crowdLevel: {
            morning: "medium",
            afternoon: "high",
            evening: "low"
        },
        description: "展示湖南历史文化的综合性博物馆"
    },
    {
        name: "太平街",
        location: [112.976, 28.196],
        type: "historical",
        crowdLevel: {
            morning: "low",
            afternoon: "high",
            evening: "high"
        },
        description: "长沙保存最完整的历史文化街区"
    },
    {
        name: "天心阁",
        location: [112.982, 28.191],
        type: "historical",
        crowdLevel: {
            morning: "low",
            afternoon: "medium",
            evening: "low"
        },
        description: "长沙古城的重要历史遗迹"
    }
];

let map;
let markers = [];

// 初始化地图
function initMap() {
    map = new AMap.Map('map', {
        zoom: 12,
        center: CHANGSHA_CENTER,
        viewMode: '3D'
    });

    // 添加控件
    map.addControl(new AMap.Scale());
    map.addControl(new AMap.ToolBar());
}

// 清除所有标记
function clearMarkers() {
    markers.forEach(marker => {
        map.remove(marker);
    });
    markers = [];
}

// 添加景点标记
function addAttractionMarker(attraction) {
    const marker = new AMap.Marker({
        position: attraction.location,
        title: attraction.name,
        map: map
    });

    // 添加信息窗口
    const infoWindow = new AMap.InfoWindow({
        content: `
            <div style="padding: 10px;">
                <h4>${attraction.name}</h4>
                <p>${attraction.description}</p>
                <p>人流情况：${getCrowdLevelText(attraction.crowdLevel[getCurrentTimeSlot()])}</p>
            </div>
        `,
        offset: new AMap.Pixel(0, -30)
    });

    marker.on('click', () => {
        infoWindow.open(map, marker.getPosition());
    });

    markers.push(marker);
}

// 获取当前选择的时间段
function getCurrentTimeSlot() {
    return document.getElementById('timeSlot').value;
}

// 获取当前选择的景点类型
function getCurrentAttractionType() {
    return document.getElementById('attractionType').value;
}

// 获取人流等级文本
function getCrowdLevelText(level) {
    const levels = {
        low: "较少",
        medium: "适中",
        high: "拥挤"
    };
    return levels[level] || "未知";
}

// 更新推荐列表
function updateRecommendations() {
    const timeSlot = getCurrentTimeSlot();
    const type = getCurrentAttractionType();
    const container = document.getElementById('recommendations');
    container.innerHTML = '';

    const filteredAttractions = attractions.filter(attraction => {
        if (type !== 'all' && attraction.type !== type) {
            return false;
        }
        return true;
    });

    // 按人流情况排序
    filteredAttractions.sort((a, b) => {
        const levels = { low: 0, medium: 1, high: 2 };
        return levels[a.crowdLevel[timeSlot]] - levels[b.crowdLevel[timeSlot]];
    });

    filteredAttractions.forEach(attraction => {
        const div = document.createElement('div');
        div.className = 'attraction-item';
        div.innerHTML = `
            <h6>${attraction.name}</h6>
            <p>${attraction.description}</p>
            <span class="crowd-level ${attraction.crowdLevel[timeSlot]}">
                人流: ${getCrowdLevelText(attraction.crowdLevel[timeSlot])}
            </span>
        `;
        div.onclick = () => {
            map.setCenter(attraction.location);
            map.setZoom(15);
        };
        container.appendChild(div);
    });
}

// 搜索按钮点击事件
document.getElementById('searchBtn').addEventListener('click', () => {
    clearMarkers();
    const timeSlot = getCurrentTimeSlot();
    const type = getCurrentAttractionType();

    attractions.forEach(attraction => {
        if (type === 'all' || attraction.type === type) {
            addAttractionMarker(attraction);
        }
    });

    updateRecommendations();
});

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    updateRecommendations();
}); 