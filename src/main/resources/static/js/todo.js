// 할 일 추가 버튼 클릭 시 유효성 검사하기
$(document).ready(function() {
    console.log("todo!");
    checkInputTitleCount();
    checkInputContentCount();
    clickRegisterBtn();
    doneAllCheck();
    submitCompletedTodoBtn();
    detailModalFunc();
    deleteTodoFunc();
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
                url: "/todo/api/todos",
                method: "post",
                data: {
                    title: $todoTitleValue,
                    content: $todoContentValue
                },
                success: (data) => {
                    if(data === "success") {
                        Swal.fire({
                            title: "할 일 등록",
                            icon: "success",
                            text: "할 일을 등록했습니다!"
                        }).then((result) => {
                            if(result.isConfirmed) {
                                location.reload(true);
                            }
                        });
                    } else {
                        Swal.fire({
                            title: "할 일 등록",
                            icon: "error",
                            text: "오류입니다!"
                        });
                    }
                },
                error: (error) => {
                    console.log("error");
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

// 할 일 완료 처리 기능
const submitCompletedTodoBtn = () => {
    $("#submitCompletedTodoBtn").click(() => {
        let updateTodoList = $("#todoListForm tbody input[type=checkbox]:checked");

        let no = [];

        // for(let item of updateTodoList) no.push(item.value);
        for(let item of updateTodoList) {
            if(!item.hasAttribute("disabled")) {
                no.push(item.value);
            }
        }

        $.ajax({
            url: "/todo/api/todos",
            method: "patch",
            data: {
                no: no,
                status: 'Y'
            },
            success: (data) => {
                if(data === "success") {
                    Swal.fire({
                        title: "할 일 완료",
                        icon: "success",
                        text: "할 일 완료 처리가 되었습니다."
                    }).then((result) => {    
                        if(result.isConfirmed) location.reload(true); 
                    });
                }
            },
            error: (error) => {
                if(error === "failed") {
                    Swal.fire({
                        title: "오류",
                        icon: "error",
                        text: "오류입니다."
                    }).then((result) => {       
                        if(result.isConfirmed) location.reload(true); 
                    });
                }
            }
        });
    });
}

// 
const detailModalFunc = () => {
    const $todoList = $("#todoTable tbody tr td[data-url]");
    console.log($todoList);
    for(let item of $todoList) {
        // console.log(item);
        item.addEventListener("click", (e) => {
            // console.log("click");
            // console.log(e.target.getAttribute("data-url"));
            const todoNo = `${e.target.getAttribute("data-url")}`;
            $.ajax({
                url: "/todo/todos",
                method: "get",
                data: {
                    no: `${todoNo}`
                },
                success: (data) => {
                    console.log(data);
                    $("#todoModal .todo-no").text(data.no);
                    $("#todoModal .todo-title").text(data.title);
                    $("#todoModal .todo-content").text(data.content);
                    $("#todoModal .todo-reg-date").text(data.regDate);

                    if(data.done === "Y") {
                        $("#todoModal #modifyBtn").attr("disabled", true);
                    }

                },
                error: (error) => {
                    console.log("error " + error);
                }
            });
        });
    }
}

// 할일 삭제
const deleteTodoFunc = () => {
    $("#todoModal #deleteBtn").click(() => {
        console.log("click");
        $.ajax({
            url: "/todo/api/todos",
            method: "delete",
            data: {
                no: $("#todoModal .todo-no").text(),
            },
            success: (data) => {
                console.log("success");
                if(data === "success") {
                    Swal.fire({
                        title: "할 일 삭제",
                        icon: "success",
                        text: "할 일 삭제 처리가 완료되었습니다."
                    }).then((result) => {       
                        if(result.isConfirmed) location.reload(true); 
                    });
                }
            },
            error: (error) => {
                console.log("error : " + error);
                if(error === "failed") {
                    Swal.fire({
                        title: "오류",
                        icon: "error",
                        text: "오류입니다."
                    }).then((result) => {       
                        if(result.isConfirmed) location.reload(true); 
                    });
                }
            }
        });
    });
}