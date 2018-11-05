var urlprefix="/dubbomock";

function modifyCondition(conIdList,i) {
    var conId=conIdList.get(i);
    var conS=document.getElementById(i).value;
    var url=urlprefix+"/mocker/MockConditionSetting/type=modify&detailId=0&conditionId="+conId+"&conditionS="+conS;
    $.get(url,function (list1) {
        if(list1.indexOf("1")>-1){
            alert("修改失败！条件的格式必须为：A=B");
        }else if(list1.indexOf("2")>-1){
            alert("修改失败！已有mock场景设置了此条件");
        }else{
            alert("修改成功！");
            window.close();
        }
    })
}

function deleteCondition(conIdList,i) {
    var msg = "确认删除？";
    if (confirm(msg) == true) {
        var conId = conIdList.get(i).replace("\"", "");
        var url =urlprefix+"/mocker/MockConditionSetting/type=delete&detailId=0&conditionId=" + conId + "&conditionS=0";
        $.get(url, function (list1) {
            alert("提交成功！");
            window.close();
        })
        return true;
    }else
        {
            return false;
        }
    }

function newConditionPage(detailid) {
    var url="createCondition.html?detailId="+detailid;
    window.open(url);
}
function addCondition() {
    var loc = location.search;
    var loc1=loc.replace("?","");
    var locArray=loc1.split("&amp;");
    var detailId=locArray[0].split("=")[1];
    var conS=document.getElementById("mockCondition").value;
    var url=urlprefix+"/mocker/MockConditionSetting/type=add&detailId="+detailId+"&conditionId=0&conditionS="+"\""+encodeURI(conS)+"\"";
    $.get(url,function (list1) {
        if(list1.indexOf("1")>-1){
            alert("创建失败！条件的格式必须为：A=B");
        }else if(list1.indexOf("2")>-1){
            alert("创建失败！已有mock场景设置了此条件");
        }else{
            alert("创建成功！");
            window.close();
        }
    })
}

function createDetailSubmit() {
    var mockCaseName=document.getElementById("mockCaseName").value;
    var mock_timeout=document.getElementById("mockTimeout").value;
    var conditionselect=document.getElementById("conditionParaList");
    var index = conditionselect.selectedIndex; // 选中索引
    var conditionselectname = conditionselect.options[index].text; // 选中值
    var conditioninputvalue=document.getElementById("conditionValue").value;
    if(mockCaseName.length==0||mock_timeout.length==0||conditioninputvalue.length==0){
        alert("必填项不能为空！");
        return false;
    }
    var mockCondition=conditionselectname+"="+conditioninputvalue;
    var responseParaListCount=document.getElementById("responseParaList").childElementCount;
    var mockMsg="";
    for(var i=0;i<responseParaListCount/4;i++){
        var responseselectstring="select"+i;
        var responsevaluestring="value"+i;
        var responseselectName=document.getElementById(responseselectstring).options[0].text;
        var responseinputvalue=document.getElementById(responsevaluestring).value;
        if(responseinputvalue.length==0){
            alert("必填项不能为空！");
            return false;
        }
        mockMsg+=responseselectName+"="+responseinputvalue+"|";
    }

    var url = location.search; //获取url中"?"符后的字串
    var name="";
    var APIName="";
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        name = decodeURI(strs[0].split("=")[1]);
        APIName = strs[1].split("=")[1];
    }

    var url = urlprefix+"/mocker/MockDetailCreate";
    var data = {
        "mockAPI": APIName,
        "name": name,
        "mockType": "返回数据",
        "mockCaseName": mockCaseName,
        "mock_timeout": mock_timeout,
        "mockMsg":mockMsg,
        "mockCondition":mockCondition,
    };
    $.post(url, data, function (list1) {
        if (list1.indexOf("1") > -1) {
            alert("创建失败！请检查数据后重试！");
        } else {
            alert("创建成功！");
            window.close();
        }
    })
}

function modifySubmit(id,mockCondition2) {
    var detailid=id;
    var mockCaseName=document.getElementById("mockCaseName2").value;
    var mock_timeout=document.getElementById("mockTimeout2").value;
    var conditionselect=document.getElementById("conditionParaList");
    var index = conditionselect.selectedIndex; // 选中索引
    var conditionselectname = conditionselect.options[index].text; // 选中值
    var conditioninputvalue=document.getElementById("conditionValue").value;
    if(mockCaseName.length==0||mock_timeout.length==0||conditioninputvalue.length==0){
        alert("必填项不能为空！");
        return false;
    }
    var mockCondition=conditionselectname+"="+conditioninputvalue;
    var responseParaListCount=document.getElementById("responseParaList").childElementCount;
    var mockMsg="";
    for(var i=0;i<responseParaListCount/4;i++){
        var responseselectstring="select"+i;
        var responsevaluestring="value"+i;
        var responseselectName=document.getElementById(responseselectstring).options[0].text;
        var responseinputvalue=document.getElementById(responsevaluestring).value;
        if(responseinputvalue.length==0){
            alert("必填项不能为空！");
            return false;
        }
        mockMsg+=responseselectName+"="+responseinputvalue+"|";
    }
    var modifySubmiturl = urlprefix+"/mocker/ModifySubmit";
    var oldCondition=mockCondition2.replace("\"","");
    var data = {
        'detailid': detailid,
        "mockCaseName": mockCaseName,
        "mock_timeout": mock_timeout,
        "mockMsg":mockMsg,
        "mockCondition":mockCondition,
        "oldCondition":oldCondition,
    };
    $.post(modifySubmiturl, data, function (list1) {
        if (list1.indexOf("1") > -1) {
            alert("修改失败！请检查数据后重试！");
        } else {
            alert("修改成功！");
            window.close();
        }
    })
}

function createAuthorSubmit() {
    var department = document.getElementById("department").value;
    var name = document.getElementById("username").value;
    var url = urlprefix+"/mocker/MockAuthorCreate";
    if (department.length==0||name.length==0) {
        alert("必填项不能为空！");
    } else {
        var data = {"department": department, "name": name};
        $.post(url, data, function (list1) {
            if (list1.indexOf("0") > -1) {
                alert("创建成功！");
                window.close();
            } else {
                alert("该部门姓名已存在！");
            }
        })
}
}
function createAPISubmit(){
    var server=document.getElementById("server").value;
    var API=document.getElementById("API").value;
    var url=urlprefix+"/mocker/MockAPICreate";
    if (server.length==0||API.length==0) {
        alert("必填项不能为空！");
    } else {
        var data = {"server": server, "API": API};
        $.post(url, data, function (list1) {
            if (list1.indexOf("1") > -1) {
                alert("该接口已存在！");
            }
            if (list1.indexOf("2") > -1) {
                alert("接口必须以“/”开头！");
            }
            if (list1.indexOf("0") > -1) {
                alert("创建成功！");
                window.close();
            }
        })
    }
}