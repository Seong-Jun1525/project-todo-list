// 할 일 추가 버튼 클릭 시 유효성 검사하기
$(document).ready(function() {
    console.log("todo!");
    checkInputTitleCount();
    checkInputContentCount();
    clickRegisterBtn();
    doneAllCheck();
    submitCompletedTodoBtn();
});

// 제목 글자 수 제한
const checkInputTitleCount = () => {
    $("#todoTitle").keyup((e) => {
        let count = e.target.value.length;

        if(count > 20) {
            const title = e.target.value.slice(0, 20);
            Swal.fire({
                title: "제목 글자 수 제한",
                icon: "warning",
                text: "제목 글자 수는 20자 이하입니다."
            })
            e.target.value = title;
        } else {
            $("#todoTitleCount").text(count);
        }
    });
}

// 내용 글자 수 제한
const checkInputContentCount = () => {
    $("#todoContent").keyup((e) => {
        let count = e.target.value.length;

        if(count > 100) {
            const content = e.target.value.slice(0, 100);
            Swal.fire({
                title: "내용 글자 수 제한",
                icon: "warning",
                text: "내용 글자 수는 100자 이하입니다."
            })
            e.target.value = content;
        } else {    
            $("#todoContentCount").text(count);
        }
    });
}

// 등록 버튼 클릭 이벤트
const clickRegisterBtn = () => {
    $("#registerTodoBtn").click(() => {
        const $todoTitleValue = $("#todoTitle").val();
        const $todoContentValue = $("#todoContent").val();

        console.log($todoTitleValue.length);
        console.log($todoContentValue.length);
        
        if($todoTitleValue === "") {
            Swal.fire({
                title: "할 일 등록",
                icon: "warning",
                text: "제목을 입력해주세요"
            }).then((result) => {
                if(result.isConfirmed) {
                    $("#todoTitle").focused = true;
                }
            });
        } else if($todoContentValue === "") {
            Swal.fire({
                title: "할 일 등록",
                icon: "warning",
                text: "내용을 입력해주세요"
            }).then((result) => {
                if(result.isConfirmed) {
                    $("#todoContent").focused = true;
                }
            }); 
        } else if($todoTitleValue.length > 20 || $todoContentValue.length > 100) {
            console.log("글자 수 넘었다");
        } else {
            // console.log($todoTitleValue);
            // console.log($todoContentValue);
            $.ajax({
                url: "/todo/todos",
                method: "post",
                data: {
                    title: $todoTitleValue,
                    content: $todoContentValue
                },
                success: (data) => {
                    Swal.fire({
                        title: "할 일 등록",
                        icon: "success",
                        text: "할 일을 등록했습니다!"
                    }).then((result) => {
                        if(result.isConfirmed) {
                            location.reload(true);
                        }
                    })
                },
                error: (error) => {
                    Swal.fire({
                        title: "할 일 등록",
                        icon: "error",
                        text: "오류입니다!"
                    });
                }
            });
        }
    });
}  

// 전체 선택 혹은 전체 해제 기능 버튼
const doneAllCheck = () => {
    $("#selectAll").click((e) => {
        // console.log("전체선택");
        let $checkBoxList = $("#todoListForm .doneCheck");
        console.log($("#todoListForm .doneCheck"));
        let checkFlag = false;

        for(let item of $checkBoxList) {
            if(!item.checked) {
                checkFlag = true;
                break;
            }
        }

        checkFun(checkFlag, $checkBoxList);
    });
}

// 체크박스 체크 함수
function checkFun(checkFlag, $checkBoxList) {
    if(checkFlag) {
        Swal.fire({
            title: "할 일 전체 선택",
            icon: "question",
            text: "할 일을 전체 선택하시겠습니까?",
            confirmButtonText : "전체 선택",
            showCancelButton : true,
            cancelButtonText : "취소"
        }).then((result) => {
            if(result.isConfirmed) {
                for(let item of $checkBoxList) {
                    if(!item.checked) item.checked = true;
                }
                return;
            }
        });
    } else {
        Swal.fire({
            title: "할 일 전체 해제",
            icon: "question",
            text: "할 일을 전체 해제하시겠습니까?",
            confirmButtonText : "전체 해제",
            showCancelButton : true,
            cancelButtonText : "취소"
        }).then((result) => {
            if(result.isConfirmed) {
                for(let item of $checkBoxList) {
                    if(item.checked) item.checked = false;
                }
                return;
            }
        });
    }
}

const submitCompletedTodoBtn = () => {
    $("#submitCompletedTodoBtn").click(() => {
        let updateTodoList = $("#todoListForm tbody input[type=checkbox]:checked");

        let no = [];

        for(let item of updateTodoList) no.push(item.value);

        $.ajax({
            url: "todos",
            method: "put",
            data: {
                no: no
            },
            success: (data) => {
                console.log("성공");
            },
            error: (error) => {
                console.log(error);
            }
        })
    });
}