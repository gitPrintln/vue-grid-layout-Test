<template>
    <div>
        <button onclick="window.print()">인쇄하기</button>
    </div>
    <hr/>
    <div ref="pdfContent" class="pdf-content">
      <h1>Vue3에서 PDF 내보내기 예제</h1>
      <p>이 부분이 PDF로 저장됩니다.</p>
    </div>
    <button @click="downloadPdf">PDF 저장하기</button>
    <hr/>
    <button @click="nowTime"></button>
    <hr/>
    <div style="width:100%;">
        <div>
            <div class="layoutJSON">
                Displayed as <code>[x, y, w, h]</code>:
                <div class="columns">
                    <div class="layoutItem" v-for="item in layout" :key="item.i">
                        <b>{{ item.i }}</b>: [{{ item.x }}, {{ item.y }}, {{ item.w }}, {{ item.h }}]
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <button @click="decreaseWidth">Decrease Width</button>
            <button @click="increaseWidth">Increase Width</button>
            <button @click="addItem">Add an item</button>
            <input type="checkbox" v-model="compact"/> Compact
            <br/>
            <grid-layout v-model:layout="layout"
                         :col-num="12"
                         :row-height="30"
                         :is-draggable="draggable"
                         :is-resizable="resizable"
                         :vertical-compact="compact"
                         :use-css-transforms="true"
            >
                <grid-item v-for="item in layout" :key="item.i"
                           :x="item.x"
                           :y="item.y"
                           :w="item.w"
                           :h="item.h"
                           :i="item.i"
                >
                    <span class="text">{{ item.i }}</span>
                    <span class="remove" @click="removeItem(item.i)">x</span>
                </grid-item>
            </grid-layout>
        </div>
    </div>
    <div>
        <div>
            <button @click="goToAbout">다운로드 페이지로 이동</button>
        </div>
    </div>
    <v-app>
        <v-main>
            <v-container>
                <v-data-table
                :headers="headers"
                :items="users"
                class="elevation-1"
                ></v-data-table>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import TestElement from './components/TestElement.vue';
import { jsPDF } from 'jspdf';
import moment from 'moment';
import 'moment/locale/ko';   // 한국어 로케일 가져오기

moment.locale('ko');
console.log('현재 로케일:', moment.locale()); // ko
console.log('요일:', moment().format('dddd')); // 수요일
console.log('전체:', moment().format('LLLL')); // 2025년 5월 28일 수요일 오후 ...


const headers = [
  { text: '이름', value: 'name' },
  { text: '이메일', value: 'email' },
  { text: '가입일', value: 'joined' }
]

const users = [
  { name: '홍길동', email: 'hong@example.com', joined: '2024-01-01' },
  { name: '김철수', email: 'kim@example.com', joined: '2024-02-10' }
]

const testLayout = [
    {"x":0,"y":0,"w":2,"h":2,"i":"0"},
    {"x":2,"y":0,"w":2,"h":4,"i":"1"},
    {"x":4,"y":0,"w":2,"h":5,"i":"2"},
    {"x":6,"y":0,"w":2,"h":3,"i":"3"},
    {"x":8,"y":0,"w":2,"h":3,"i":"4"},
    {"x":10,"y":0,"w":2,"h":3,"i":"5"},
    {"x":0,"y":5,"w":2,"h":5,"i":"6"},
    {"x":2,"y":5,"w":2,"h":5,"i":"7"},
    {"x":4,"y":5,"w":2,"h":5,"i":"8"},
    {"x":6,"y":4,"w":2,"h":4,"i":"9"},
    {"x":8,"y":4,"w":2,"h":4,"i":"10"},
];


export default {
    name: 'App',
    components: {
        TestElement
    },
    data() {
        return {
            layout: JSON.parse(JSON.stringify(testLayout)),
            colNum: 0,
            index: 0,
            draggable: true,
            resizable: true,
            compact: true,

            selectedTab: null,
        }
    },
    // setup() {
    //     const pdfContent = ref(null);

    //     const generatePdf = () => {
    //     if (!pdfContent.value) return;

    //     html2pdf()
    //         .from(pdfContent.value)
    //         .save();
    //     };

    //     return { pdfContent, generatePdf };
    // },
    setup() {
        const downloadPdf = () => {
        const doc = new jsPDF();
        doc.text("Vue3에서 jsPDF 테스트!", 10, 10);
        doc.save("example.pdf");
        };

        return { downloadPdf };
    },
    mounted() {
        this.index = this.layout.length;
    },
    watch: {
    },
    methods: {
        increaseWidth: function() {
            let width = document.getElementById("content").offsetWidth;
            width += 20;
            document.getElementById("content").style.width = width+"px";
        },
        decreaseWidth: function() {
            let width = document.getElementById("content").offsetWidth;
            width -= 20;
            document.getElementById("content").style.width = width+"px";
        },
        removeItem: function(i) {
            console.log("### REMOVE " + i);
            const index = this.layout.map(item => item.i).indexOf(i);
            this.layout.splice(index, 1);
        },
        addItem: function() {
            // const self = this;
            //console.log("### LENGTH: " + this.layout.length);
            const item = {"x":0,"y":0,"w":2,"h":2,"i":this.index+"", whatever: "bbb"};
            this.index++;
            this.layout.push(item);
        },
        nowTime(){
            return moment
        },
        goToAbout() {
            this.$router.push('/download');
        }
    },
}
</script>

<style>

.content {
    width: 100%;
}

.vue-grid-layout {
    background: #eee;
}

.layoutJSON {
    background: #ddd;
    border: 1px solid black;
    margin-top: 10px;
    padding: 10px;
}

.columns {
    -moz-columns: 120px;
    -webkit-columns: 120px;
    columns: 120px;
}


.vue-resizable-handle {
    z-index: 5000;
    position: absolute;
    width: 20px;
    height: 20px;
    bottom: 0;
    right: 0;
    background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg08IS0tIEdlbmVyYXRvcjogQWRvYmUgRmlyZXdvcmtzIENTNiwgRXhwb3J0IFNWRyBFeHRlbnNpb24gYnkgQWFyb24gQmVhbGwgKGh0dHA6Ly9maXJld29ya3MuYWJlYWxsLmNvbSkgLiBWZXJzaW9uOiAwLjYuMSAgLS0+DTwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DTxzdmcgaWQ9IlVudGl0bGVkLVBhZ2UlMjAxIiB2aWV3Qm94PSIwIDAgNiA2IiBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmMDAiIHZlcnNpb249IjEuMSINCXhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiDQl4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjZweCIgaGVpZ2h0PSI2cHgiDT4NCTxnIG9wYWNpdHk9IjAuMzAyIj4NCQk8cGF0aCBkPSJNIDYgNiBMIDAgNiBMIDAgNC4yIEwgNCA0LjIgTCA0LjIgNC4yIEwgNC4yIDAgTCA2IDAgTCA2IDYgTCA2IDYgWiIgZmlsbD0iIzAwMDAwMCIvPg0JPC9nPg08L3N2Zz4=');
    background-position: bottom right;
    padding: 0 3px 3px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: se-resize;
}

.vue-grid-item:not(.vue-grid-placeholder) {
    background: #ccc;
    border: 1px solid black;
}

.vue-grid-item.resizing {
    opacity: 0.9;
}

.vue-grid-item.static {
    background: #cce;
}

.vue-grid-item .text {
    font-size: 24px;
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 24px;
}

.vue-grid-item .minMax {
    font-size: 12px;
}

.vue-grid-item .add {
    cursor: pointer;
}

.remove {
    position: absolute;
    right: 2px;
    top: 0;
    cursor: pointer;
}
</style>
