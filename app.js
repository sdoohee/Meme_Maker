const fillTextBtn = document.getElementById("fill-text-btn");
const strokeTextBtn = document.getElementById("stroke-text-btn");
const fontSelect = document.getElementById("font-select");
const textSizeInput = document.getElementById("font-size");


const canvas = document.querySelector("canvas");
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
// 페인트 브러쉬
const ctx = canvas.getContext("2d");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// ctx.rect(50, 50, 100, 100);
// ctx.rect(150, 150, 100, 100);
// ctx.rect(250, 250, 100, 100);
// ctx.fill();

// ctx.beginPath();
// ctx.rect(350, 350, 100, 100);
// ctx.rect(450, 450, 100, 100);
// ctx.fillStyle = "red";
// // setTimeout(() => {ctx.fill();}, 5000);
// ctx.fill();
const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");

// 9-1. 
const fileInput = document.getElementById("file");
// 4-1.
const modeBtn = document.getElementById("mode-btn");

// 5-1. 자바스크립트에서 destroy-btn을 가져와서 이벤트리스너를 추가하고
const destroyBtn = document.getElementById("destroy-btn");

// 6-1. 자바스크립트에서 eraser-btn을 가져와서, 이벤트리스너를 추가하고
const eraserBtn = document.getElementById("eraser-btn");
// 3-1. 자바스크립트로 가서 div를 한꺼번에 찾아올 수 있어
// 얘네는 HTMLCollection 요소들을 리턴해 array가 아니야
// 그러나 여기서는 forEach함수를 사용해야하기 때문에 배열이 필요해 그래서 Array.from()으로 collection을 배열로 바꿨어 
// 그랬더니 colorOptions가 Element의 배열이 되었어 
const colorOptions = Array.from(
    document.getElementsByClassName("color-option")
);
// 2-1.
const color = document.getElementById("color");
// 1-1. 
const lineWidth = document.getElementById("line-width");
// 유저가 마우스를 클릭한 채로 움직일 때 그리도록
// 클릭은 마우스를 눌렀다가 뗏을 때 발생해
// mousedown은 마우스를 누른채로 있는 것만 얘기해

// canvas가 로드됐을 때 -> html이 로드 되고 자바스크립트가 로드 됐을 때, input은 default로 value를 5로 가지게 돼
// 왜냐면 자바스크립트보다 html element가 먼저 로드돼. 그러니까 자바스크립트가 실행될 때, ctx.lineWidth를 input의 기본값으로 초기화해줘야 해
ctx.lineCap = "round";
ctx.lineWidth = lineWidth.value;
let isPainting = false;
let isFilling = false;

function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX, event.offsetY);   // 마우스가 클릭한 내부좌표를 의미해
        ctx.stroke();
        return;
    }
    // 사용자가 마우스를 움직일 때, 새로운 path를 시작하게 될거야
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
};
function startPainting(){
    isPainting = true;
}
function cancelPainting(){
    isPainting = false;
};
// 1-1. input값이 바뀔 때마나 이 함수를 실행시키도록 이벤트리스너를 추가해줬어
// 여기서 하는 것은 ctx의 lineWidth를 변경해주는게 다야
function onLineWidthChange(event){
    ctx.lineWidth = event.target.value;
};

// 2-1. 색깔이 바뀌면 선의 색깔을 나타내는 strokeStyle을 바꿔주고, 채우는 색깔을 나타내는 fillStyle도 바꿔줘.
function onColorChange(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
};

// 3-1. 이제 누군가 색깔 박스를 클릭하면, data 어트리뷰트에서 color을 가져오도록 할거야
// 사용자가 컬러를 클릭하면 라인의 색깔을 바꾸고, 채우기 색깔도 해당 색깔로 바꿀거야 그리고 color input의 값도 바꿔줄거야
// color input값도 바꿔주는 이유는 사용자의 편리성을 위해서야
function onColorClick(event) {
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
};

// 4-1. 만약, 사용자가 채우기 모드일 때 이 버튼을 클릭한다면, 채우기 모드를 멈추고, modeBtn의 텍스트를 Fill로 바꿔줘서 사용자에게 모드가 바뀌었다는걸 알려줄거야
// 만약 사용자가 버튼을 클릭했을 때 채우기 모드가 아니면, 채우기 모드로 바꾸고 싶다는 거니까 isFilling은 true가 되고, 버튼의 텍스트도 바꿔주게 돼
function onModeClick(){
    if(isFilling){
        isFilling = false;
        modeBtn.innerText = "Fill";
    } else {
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
};

// 4-1. isFilling이 true이면, 우리는 사각형을 그릴건데, 좌표 x, y가 0, 0이고, 그리고 캔버스의 가로, 세로 길이만큼 사각형을 그릴거야
// 여기서 fillRect를 사용하고 있는데, 현재 선택된 색깔로 그린다는 거야
function onCanvasClick(){
    if(isFilling){
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
};

// 5-1. 사용자가 destroy-btn을 클릭하면, 무조건 fillStyle을 하얀색으로 채워줄거야
// fillStyle은 채울 때 사용하는 색깔이야 여기서는 강제로 하얀색으로 만들었고, 사각형도 만들거야 0,0에서 시작하고 캔버스 크기만큼의 사각형을 말이야
function onDestroyClick(){
    alert('Delete all Paintbrushes. did you check?');
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};

// 6-1. 사용자가 클릭할 때, 라인을 말하는 strokeStyle을 하얀색으로 바꿔주고, isFilling을 false로 해주면 끝이야 그리고 mode 버튼을 Fill로 바꿔줄거야
function onEraserClick(){
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill";
};

// 7-1. 이 함수가 실행되면 우선 input에 있는 파일을 읽어와 아래 보다시피 이건 파일 배열이야 그 배열에서 첫번째 파일을 가져와
// 이게 파일 배열인 이유는, input에 multiple 속성을 추가할 수 있기 때문이야 multiple 속성을 html에서 추가하면 유저가 파일을 여러 개 업로드 할 수 있어
// 여기서는 유저는 하나의 이미지만 불러오면 되기 때문에 파일 배열에서 첫번째 파일만 필요한거야
// 그러고 나서 createObjectURL이라는 메소드를 호출해 유저가 업로드한 파일은 이미 브라우저의 메모리 안에 있어 하지만 우리는 URL을 통해서 해당 파일에 접근하려고 하는거야
// 이 메소드를 이용하면 해당 파일의 브라우저 메모리 URL을 알아낼 수 있어 유저가 파일을 업로드한 브라우저 안에서만 사용할 수 있는 URL인 거지
// 그 다음 이걸로 이미지를 불러오는데 이건 document.createElement("img")랑 똑같은 거야
// 그럼 이제 img 태그의 src 속성을 브라우저에서 불러온 url로 설정해줘
// 그 다음에 이벤트 리스너를 추가해주는데 지금까지 해왔던 방식과는 약간 다르게 리스너를 더해줬어 지금까지는 그냥 이벤트 이름이랑 실행할 함수 이름만 추가했어
// 이건 이벤트를 추가할 수 있는 또 다른 방법이야 이는 하나에 여러 개의 함수를 더해줄 수 있기 떄문이야 
// 이미지 load가 끝나면 ctx.drawImage 메소드를 호출해 
// 이미지를 불러와서 0,0 좌표에 그려주고 이미지 크기를 설정해주는거야 
// 마지막으로 input에 있는 파일을 비워주면 끝이야 다른 파일을 불러올 준비도 끝낸거야
function onFileChange(){
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = null;
    };
};

// 8-1. textInput에서 값을 불러온 다음에 텍스트값이 비어있지 않다면 현재 ctx의 상태를 저장해
// 기억해야 할 점은, ctx를 수정하는 것은 모든 것에 영향을 미친다는 거야 이 함수가 호출되기 전에 유저가 뭐든 변경했을 수 있어 유저가 ctx를 변경했기 때문에 그 상태를 저장해주고 싶은거야
// 저장해준 뒤에 다음 두 줄에서 ctx를 변경해주고나서 유저가 캔버스에 더블클릭한 그 위치에 텍스트를 배치해주는 거야
// 이 단계가 다 끝나고 나면 콘텍스트를 복구해주면 끝이야
function onDoubleClick(event){
    const text = textInput.value;
    const fontsize = textSizeInput.value;
    const selectedFont = fontSelect.value;
    if (text !== "") {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font = `${fontsize}px ${selectedFont}`;
        if (fillTextBtn.classList.contains('active')){
            ctx.fillText(text, event.offsetX, event.offsetY);
        } else if (strokeTextBtn.classList.contains('active')){
            ctx.strokeText(text, event.offsetX, event.offsetY);
        }
        ctx.restore();
    }    
};

function onFillTextClick(){
    fillTextBtn.classList.add('active');
    strokeTextBtn.classList.remove('active');
};

function onStrokeTextClick(){
    strokeTextBtn.classList.add('active');
    fillTextBtn.classList.remove('active');
};

// 9-1. 우선 ctx가 아니라 canvas에서 메소드를 하나 불러올 거야 캔버스에 있는 그림 데이터를 URL로 변경해주는 메소드야
// 간단히 말해서 우리가 그린 그림을 문자열로 표현한 거야 
// 그 다음 링크를 생성해주는데 
// 이 링크는 웹사이트로 가는 게 아니라 캔버스에서 불러온 이미지 URL으로 가는거야 
// 그리고 a 태그에 download 속성을 더해줬어 이 속성은 브라우저에게 href에 있는 콘텐츠를 다운로드 하라고 알리는 역할을 해
// download 속성으로 파일 이름을 설정할 수 있고 그리고 나서 가짜로 a 태그를 클릭해주는 거야 
// 가짜 클릭으로 파일 다운로드 창을 띄워주는 거야 파일 이름 "myDrawing.png"는 바로 여기에 적어준 파일 이름이야
function onSaveClick() {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}

function onFontChange(){
    selectedFont = fontSelect.value;
}

// 8-1. 이벤트리스너를 추가하는 대신에 canvas에 리스너를 추가했어
// 이 이벤트는 유저가 마우스 버튼을 빠르게 두 번 눌렀다 똇다를 반복할 때만 함수를 실행시켜주는 매우 유용한 이벤트야
canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);

// 4-1. 사용자가 캔버스를 클릭했을 때 이 함수가 실행돼, click은 mousedown과 달라 click은 mousedown과 mouseup이 같이 실행된걸 의미해
canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("mouseup", cancelPainting);

// canvas밖으로 나갈 때까지 마우스를 누르고 있으면 mouseup 이벤트는 실행되지 않아, isPainting = true인채로 유지되는거지
// 첫번째 방법은 canvas.addEventListener를 해주고 마우스가 떠났을 때를 감지하는 것
canvas.addEventListener("mouseleave", cancelPainting);
// 다른 방법은 document에 mouseup 이벤트를 주는것, isPainting = false로 만드는거지

lineWidth.addEventListener("change", onLineWidthChange);

// 2-1. 
color.addEventListener("change", onColorChange);

// 3-1. forEach를 사용해 onColorClick함수를 가진 클릭 이벤트리스너를 추가했어
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

// 4-1. 우리가 이 버튼을 클릭할 떄, 두 가지 일이 일어날거야
modeBtn.addEventListener("click", onModeClick);
// 5-1.
destroyBtn.addEventListener("click", onDestroyClick);
// 6-1. 
eraserBtn.addEventListener("click", onEraserClick);
// 7-1. 
fileInput.addEventListener("change", onFileChange);
// 9-1. 
saveBtn.addEventListener("click", onSaveClick);

fontSelect.addEventListener("change", onFontChange);
fillTextBtn.addEventListener("click", onFillTextClick);
strokeTextBtn.addEventListener("click", onStrokeTextClick);