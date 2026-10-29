export const navigation = [
 {label:'鹅绒系列',href:'#collections'}, {label:'核心科技',href:'#technology'},
 {label:'品牌世界',href:'#brand'}, {label:'探索故事',href:'#stories'}, {label:'购买渠道',href:'#channels'}
];
export const warmth = ['轻暖','中暖面包','御寒','极寒'];
export const families = ['雪花泡芙','云壳系列','校服神器运动鹅绒'];
import productData from './products.json';
export const products = productData;
export const scenes = [
 {id:'campus',label:'校园',title:'从教室，走向更大的世界。',text:'校服之外，也有自己的穿衣语言。关注外套与校服的层次、肩袖活动空间，以及日常穿脱的便利。',detail:'搭配思路 · 校服 / 鹅绒外套',image:'dark',alt:'深色鹅绒服搭配红色长裤的少年棚拍形象'},
 {id:'city',label:'城市通勤',title:'日常的路，也值得探索。',text:'走路、等车、穿过熟悉的街角。让穿着回到日常节奏，以自己喜欢的廓形与色彩，开始新的一天。',detail:'搭配思路 · 羊毛 T 恤 / 鹅绒外套 / 软壳裤',image:'green',alt:'橄榄绿色鹅绒服与深色裤装的半身棚拍形象'},
 {id:'snow',label:'雪地',title:'向冬天，多走一步。',text:'去看雪，也认真准备。出发前结合当地天气、活动强度和停留时长，核对具体款式与叠穿需求。',detail:'场景提案 · 不构成滑雪装备或具体温度承诺',image:'blue',alt:'浅蓝色鹅绒服与靴子的全身棚拍形象'},
 {id:'family',label:'亲子探索',title:'并肩出发，各有自己的步调。',text:'亲子的默契，不必是完全相同。用相近的色彩与不同的穿搭，留住一起探索的时刻。',detail:'场景提案 · 成人款式与同款关系待确认',image:'blue',alt:'浅蓝色鹅绒服少年形象，非亲子实景照片'}
];
export const channelConfig: {url:string|null;name:string} = {url:null,name:'官方购买渠道'};
