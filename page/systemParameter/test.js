var name;//名字
var age;//年龄
var sex;//性别
var classR;//班级
var garden;//体重
var run;//十米往返跑
var longJump;// 立定跳远
var throwR;//网球投掷
var twoJump;//双脚连续跳
var oneJump;//单脚连续跳
var balance;//平衡能力
var singleLeg;//闭眼单足立
var bodyFlexion;//坐卧体前屈
var handsUp;//双手正撑s
var xueqi;//双手正撑s
$(function () {
    $("#click").click(function (e) {
        initData();
    });

    $("#reset").click(function (e) {
        location.reload();
    });

});
var runScore;
var longJumpScore;
var throwScore;
var twoJumpScore;
var oneJumpScore;
var balanceScore;
var singleLegScore;
var bodyFlexionScore;
var handsUpScore;


var flexibility; //柔韧性
var upperLimbStrength; //上肢力量
var lowerLimbStrength; //下肢力量
var balanceAbility; //平衡能力
var sensitiveQuality; //灵敏素质

function initData() {

    name = $("#name").val();
    age = $('#age option:selected').val();
    sex = $('input[name="sex"]:checked').val();
    classR = $("#class").val();
    garden = $("#garden").val();
    run = $("#run").val();
    longJump = $("#longJump").val();
    throwR = $("#throw").val();
    twoJump = $("#twoJump").val();
    oneJump = $("#oneJump").val();
    balance = $("#balance").val();
    bodyFlexion = $("#bodyFlexion").val();
    handsUp = $("#handsUp").val();
    singleLeg = $("#singleLeg").val();
    xueqi = $("#xueqi").val();
    $("#reportContent").css("display", "block");
    getScope();
    getTNEvaluation();
    getActivityPlan();
    getSensitiveQuality();
    echart2();

}

// 0 男 1 女
function getSex() {
    if (sex === '男') {
        return 0;
    } else {
        return 1;
    }
}

function getScope() {
    runScore = getRun();
    longJumpScore = getLongJump();
    throwScore = getThrowR();
    bodyFlexionScore = getBodyFlexion();
    balanceScore = getBalance();
    oneJumpScore = getOneJump();
    twoJumpScore = getTwoJump();
    handsUpScore = gethandsUp();
    singleLegScore = getSingleLeg();

    $("#username").text(name);
    $("#userage").text(age + "岁");
    $("#usersex").text(sex);
    $("#usergarden").text(garden);
    $("#userclass").text(classR);
    $("#xueqitd").text(xueqi);
    $("#runScope").text(round(run).toFixed(1) + " s");
    $("#runScope").next().text(runScore + " 分");

    $("#longJumpScore").text(round(longJump).toFixed(1) + " cm");
    $("#longJumpScore").next().text(longJumpScore + " 分");

    if (age >= 5) {
        $("#oneJumpScore").text(round(oneJump).toFixed(1) + " s");
        $("#oneJumpScore").next().text(oneJumpScore + " 分");
    }


    $("#twoJumpScore").text(round(twoJump).toFixed(1) + " s");
    $("#twoJumpScore").next().text(twoJumpScore + " 分");

    $("#bodyFlexionScore").text(round(bodyFlexion).toFixed(1) + " cm");
    $("#bodyFlexionScore").next().text(bodyFlexionScore + " 分");


    $("#balanceScore").text(round(balance).toFixed(1) + " s");
    $("#balanceScore").next().text(balanceScore + " 分");


    $("#throwScore").text(round(throwR).toFixed(1) + " m");
    $("#throwScore").next().text(throwScore + " 分");

    $("#handsUpScore").text(round(handsUp).toFixed(1) + " s");
    $("#handsUpScore").next().text(handsUpScore + " 分");

    $("#singleLegScore").text(round(singleLeg).toFixed(1) + " s");
    $("#singleLegScore").next().text(singleLegScore + " 分");

    flexibility = bodyFlexionScore * 20;
    upperLimbStrength = (parseInt(throwScore) + parseInt(handsUpScore)) / 2 * 20;
    if (age >= 5) {
        lowerLimbStrength = (parseInt(runScore) + parseInt(longJumpScore) + parseInt(oneJumpScore) + parseInt(twoJumpScore)) / 4 * 20;
        sensitiveQuality = (parseInt(runScore) + parseInt(longJumpScore) + parseInt(throwScore) + parseInt(oneJumpScore) + parseInt(twoJumpScore) + parseInt(singleLegScore)
            + parseInt(balanceScore) + parseInt(handsUpScore) + parseInt(bodyFlexionScore)) / 9 * 20;
    } else {
        lowerLimbStrength = (parseInt(runScore) + parseInt(longJumpScore) + parseInt(twoJumpScore)) / 3 * 20;
        sensitiveQuality = (parseInt(runScore) + parseInt(longJumpScore) + parseInt(throwScore) + parseInt(twoJumpScore) + parseInt(singleLegScore)
            + parseInt(balanceScore) + parseInt(handsUpScore) + parseInt(bodyFlexionScore)) / 8 * 20;
        $("#oneJumpDiv").remove();
    }

    balanceAbility = (parseInt(balanceScore) + parseInt(singleLegScore)) / 2 * 20;
    flexibility = flexibility.toFixed(0);
    upperLimbStrength = upperLimbStrength.toFixed(0);
    lowerLimbStrength = lowerLimbStrength.toFixed(0);
    sensitiveQuality = sensitiveQuality.toFixed(0);
    balanceAbility = balanceAbility.toFixed(0);

    $("#flexibility").text(flexibility + "分");
    $("#flexibility").next().text(getFormatScore(flexibility));
    $("#upperLimbStrength").text(upperLimbStrength + "分");
    $("#upperLimbStrength").next().text(getFormatScore(upperLimbStrength));
    $("#lowerLimbStrength").text(lowerLimbStrength + "分");
    $("#lowerLimbStrength").next().text(getFormatScore(lowerLimbStrength));
    $("#balanceAbility").text(balanceAbility + "分");
    $("#balanceAbility").next().text(getFormatScore(balanceAbility));
    $("#sensitiveQuality").text(sensitiveQuality + "分");
    $("#sensitiveQuality").next().text(getFormatScoreLM(sensitiveQuality));
}

function getRun() {
    if (getSex() === 0) {
        if (age === '3') {
            if (round(run).toFixed(1) < 8.0) {
                return 5;
            } else if (round(run).toFixed(1) >= 8.0 && round(run).toFixed(1) <= 9.0) {
                return 4;
            } else if (round(run).toFixed(1) >= 9.1 && round(run).toFixed(1) <= 10.2) {
                return 3;
            } else if (round(run).toFixed(1) >= 10.3 && round(run).toFixed(1) <= 12.8) {
                return 2;
            } else if (round(run).toFixed(1) >= 12.9) {
                return 1;
            }
        } else if (age === '3.5') {
            if (round(run).toFixed(1) < 7.5) {
                return 5;
            } else if (round(run).toFixed(1) >= 7.5 && round(run).toFixed(1) <= 8.3) {
                return 4;
            } else if (round(run).toFixed(1) >= 8.4 && round(run).toFixed(1) <= 9.4) {
                return 3;
            } else if (round(run).toFixed(1) >= 9.5 && round(run).toFixed(1) <= 11.3) {
                return 2;
            } else if (round(run).toFixed(1) >= 11.4) {
                return 1;
            }
        } else if (age === '4') {
            if (round(run).toFixed(1) < 6.9) {
                return 5;
            } else if (round(run).toFixed(1) >= 6.9 && round(run).toFixed(1) <= 7.6) {
                return 4;
            } else if (round(run).toFixed(1) >= 7.7 && round(run).toFixed(1) <= 8.5) {
                return 3;
            } else if (round(run).toFixed(1) >= 8.6 && round(run).toFixed(1) <= 10.1) {
                return 2;
            } else if (round(run).toFixed(1) >= 10.2) {
                return 1;
            }
        } else if (age === '4.5') {
            if (round(run).toFixed(1) < 6.7) {
                return 5;
            } else if (round(run).toFixed(1) >= 6.7 && round(run).toFixed(1) <= 7.2) {
                return 4;
            } else if (round(run).toFixed(1) >= 7.3 && round(run).toFixed(1) <= 8.0) {
                return 3;
            } else if (round(run).toFixed(1) >= 8.1 && round(run).toFixed(1) <= 9.7) {
                return 2;
            } else if (round(run).toFixed(1) >= 9.8) {
                return 1;
            }
        } else if (age === '5') {
            if (round(run).toFixed(1) < 6.4) {
                return 5;
            } else if (round(run).toFixed(1) >= 6.4 && round(run).toFixed(1) <= 6.9) {
                return 4;
            } else if (round(run).toFixed(1) >= 7.0 && round(run).toFixed(1) <= 7.6) {
                return 3;
            } else if (round(run).toFixed(1) >= 7.7 && round(run).toFixed(1) <= 8.9) {
                return 2;
            } else if (round(run).toFixed(1) >= 9.0) {
                return 1;
            }
        } else if (age === '5.5') {
            if (round(run).toFixed(1) < 6.2) {
                return 5;
            } else if (round(run).toFixed(1) >= 6.2 && round(run).toFixed(1) <= 6.7) {
                return 4;
            } else if (round(run).toFixed(1) >= 6.8 && round(run).toFixed(1) <= 7.3) {
                return 3;
            } else if (round(run).toFixed(1) >= 7.4 && round(run).toFixed(1) <= 8.5) {
                return 2;
            } else if (round(run).toFixed(1) >= 8.6) {
                return 1;
            }
        } else if (age === '6') {
            if (round(run).toFixed(1) < 5.8) {
                return 5;
            } else if (round(run).toFixed(1) >= 5.8 && round(run).toFixed(1) <= 6.2) {
                return 4;
            } else if (round(run).toFixed(1) >= 6.3 && round(run).toFixed(1) <= 6.8) {
                return 3;
            } else if (round(run).toFixed(1) >= 6.9 && round(run).toFixed(1) <= 7.9) {
                return 2;
            } else if (round(run).toFixed(1) >= 8.0) {
                return 1;
            }
        }
    } else {
        if (age === '3') {
            if (round(run).toFixed(1) < 8.2) {
                return 5;
            } else if (round(run).toFixed(1) >= 8.2 && round(run).toFixed(1) <= 9.3) {
                return 4;
            } else if (round(run).toFixed(1) >= 9.4 && round(run).toFixed(1) <= 10.5) {
                return 3;
            } else if (round(run).toFixed(1) >= 10.6 && round(run).toFixed(1) <= 13.4) {
                return 2;
            } else if (round(run).toFixed(1) >= 13.5) {
                return 1;
            }
        } else if (age === '3.5') {
            if (round(run).toFixed(1) < 7.7) {
                return 5;
            } else if (round(run).toFixed(1) >= 7.7 && round(run).toFixed(1) <= 8.6) {
                return 4;
            } else if (round(run).toFixed(1) >= 8.7 && round(run).toFixed(1) <= 9.7) {
                return 3;
            } else if (round(run).toFixed(1) >= 9.8 && round(run).toFixed(1) <= 12.0) {
                return 2;
            } else if (round(run).toFixed(1) >= 12.1) {
                return 1;
            }
        } else if (age === '4') {
            if (round(run).toFixed(1) < 7.2) {
                return 5;
            } else if (round(run).toFixed(1) >= 7.2 && round(run).toFixed(1) <= 8.0) {
                return 4;
            } else if (round(run).toFixed(1) >= 8.1 && round(run).toFixed(1) <= 9.0) {
                return 3;
            } else if (round(run).toFixed(1) >= 9.1 && round(run).toFixed(1) <= 10.8) {
                return 2;
            } else if (round(run).toFixed(1) >= 10.9) {
                return 1;
            }
        } else if (age === '4.5') {
            if (round(run).toFixed(1) < 7.0) {
                return 5;
            } else if (round(run).toFixed(1) >= 7.0 && round(run).toFixed(1) <= 7.6) {
                return 4;
            } else if (round(run).toFixed(1) >= 7.7 && round(run).toFixed(1) <= 8.5) {
                return 3;
            } else if (round(run).toFixed(1) >= 8.6 && round(run).toFixed(1) <= 10.2) {
                return 2;
            } else if (round(run).toFixed(1) >= 10.3) {
                return 1;
            }
        } else if (age === '5') {
            if (round(run).toFixed(1) < 6.7) {
                return 5;
            } else if (round(run).toFixed(1) >= 6.7 && round(run).toFixed(1) <= 7.2) {
                return 4;
            } else if (round(run).toFixed(1) >= 7.3 && round(run).toFixed(1) <= 8.0) {
                return 3;
            } else if (round(run).toFixed(1) >= 8.1 && round(run).toFixed(1) <= 9.6) {
                return 2;
            } else if (round(run).toFixed(1) >= 9.7) {
                return 1;
            }
        } else if (age === '5.5') {
            if (round(run).toFixed(1) < 6.4) {
                return 5;
            } else if (round(run).toFixed(1) >= 6.4 && round(run).toFixed(1) <= 6.9) {
                return 4;
            } else if (round(run).toFixed(1) >= 7.0 && round(run).toFixed(1) <= 7.6) {
                return 3;
            } else if (round(run).toFixed(1) >= 7.7 && round(run).toFixed(1) <= 9.0) {
                return 2;
            } else if (round(run).toFixed(1) >= 9.1) {
                return 1;
            }
        } else if (age === '6') {
            if (round(run).toFixed(1) < 6.1) {
                return 5;
            } else if (round(run).toFixed(1) >= 6.1 && round(run).toFixed(1) <= 6.5) {
                return 4;
            } else if (round(run).toFixed(1) >= 6.6 && round(run).toFixed(1) <= 7.2) {
                return 3;
            } else if (round(run).toFixed(1) >= 7.3 && round(run).toFixed(1) <= 8.5) {
                return 2;
            } else if (round(run).toFixed(1) >= 8.6) {
                return 1;
            }
        }
    }
}

function getLongJump() {
    if (getSex() === 0) {
        if (age === '3') {
            if (round(longJump).toFixed(0) > 76) {
                return 5;
            } else if (round(longJump).toFixed(0) <= 76 && round(longJump).toFixed(0) >= 59) {
                return 4;
            } else if (round(longJump).toFixed(0) <= 58 && round(longJump).toFixed(0) >= 43) {
                return 3;
            } else if (round(longJump).toFixed(0) <= 42 && round(longJump).toFixed(0) >= 30) {
                return 2;
            } else if (round(longJump).toFixed(0) < 30) {
                return 1;
            }
        } else if (age === '3.5') {
            if (round(longJump).toFixed(0) > 84) {
                return 5;
            } else if (round(longJump).toFixed(0) <= 84 && round(longJump).toFixed(0) >= 70) {
                return 4;
            } else if (round(longJump).toFixed(0) <= 69 && round(longJump).toFixed(0) >= 53) {
                return 3;
            } else if (round(longJump).toFixed(0) <= 52 && round(longJump).toFixed(0) >= 35) {
                return 2;
            } else if (round(longJump).toFixed(0) < 35) {
                return 1;
            }
        } else if (age === '4') {
            if (round(longJump).toFixed(0) > 95) {
                return 5;
            } else if (round(longJump).toFixed(0) <= 95 && round(longJump).toFixed(0) >= 80) {
                return 4;
            } else if (round(longJump).toFixed(0) <= 79 && round(longJump).toFixed(0) >= 65) {
                return 3;
            } else if (round(longJump).toFixed(0) <= 65 && round(longJump).toFixed(0) >= 47) {
                return 2;
            } else if (round(longJump).toFixed(0) < 47) {
                return 1;
            }
        } else if (age === '4.5') {
            if (round(longJump).toFixed(0) > 102) {
                return 5;
            } else if (round(longJump).toFixed(0) <= 102 && round(longJump).toFixed(0) >= 89) {
                return 4;
            } else if (round(longJump).toFixed(0) <= 88 && round(longJump).toFixed(0) >= 73) {
                return 3;
            } else if (round(longJump).toFixed(0) <= 72 && round(longJump).toFixed(0) >= 55) {
                return 2;
            } else if (round(longJump).toFixed(0) < 55) {
                return 1;
            }
        } else if (age === '5') {
            if (round(longJump).toFixed(0) > 110) {
                return 5;
            } else if (round(longJump).toFixed(0) <= 110 && round(longJump).toFixed(0) >= 96) {
                return 4;
            } else if (round(longJump).toFixed(0) <= 95 && round(longJump).toFixed(0) >= 80) {
                return 3;
            } else if (round(longJump).toFixed(0) <= 79 && round(longJump).toFixed(0) >= 65) {
                return 2;
            } else if (round(longJump).toFixed(0) < 65) {
                return 1;
            }
        } else if (age === '5.5') {
            if (round(longJump).toFixed(0) > 119) {
                return 5;
            } else if (round(longJump).toFixed(0) <= 119 && round(longJump).toFixed(0) >= 103) {
                return 4;
            } else if (round(longJump).toFixed(0) <= 102 && round(longJump).toFixed(0) >= 90) {
                return 3;
            } else if (round(longJump).toFixed(0) <= 89 && round(longJump).toFixed(0) >= 70) {
                return 2;
            } else if (round(longJump).toFixed(0) < 70) {
                return 1;
            }
        } else if (age === '6') {
            if (round(longJump).toFixed(0) > 127) {
                return 5;
            } else if (round(longJump).toFixed(0) <= 127 && round(longJump).toFixed(0) >= 111) {
                return 4;
            } else if (round(longJump).toFixed(0) <= 110 && round(longJump).toFixed(0) >= 95) {
                return 3;
            } else if (round(longJump).toFixed(0) <= 94 && round(longJump).toFixed(0) >= 79) {
                return 2;
            } else if (round(longJump).toFixed(0) < 79) {
                return 1;
            }
        }
    } else {
        if (age === '3') {
            if (round(longJump).toFixed(0) > 71) {
                return 5;
            } else if (round(longJump).toFixed(0) <= 71 && round(longJump).toFixed(0) >= 55) {
                return 4;
            } else if (round(longJump).toFixed(0) <= 54 && round(longJump).toFixed(0) >= 40) {
                return 3;
            } else if (round(longJump).toFixed(0) <= 39 && round(longJump).toFixed(0) >= 29) {
                return 2;
            } else if (round(longJump).toFixed(0) < 29) {
                return 1;
            }
        } else if (age === '3.5') {
            if (round(longJump).toFixed(0) > 81) {
                return 5;
            } else if (round(longJump).toFixed(0) <= 81 && round(longJump).toFixed(0) >= 65) {
                return 4;
            } else if (round(longJump).toFixed(0) <= 64 && round(longJump).toFixed(0) >= 50) {
                return 3;
            } else if (round(longJump).toFixed(0) <= 49 && round(longJump).toFixed(0) >= 34) {
                return 2;
            } else if (round(longJump).toFixed(0) < 34) {
                return 1;
            }
        } else if (age === '4') {
            if (round(longJump).toFixed(0) > 89) {
                return 5;
            } else if (round(longJump).toFixed(0) <= 89 && round(longJump).toFixed(0) >= 74) {
                return 4;
            } else if (round(longJump).toFixed(0) <= 73 && round(longJump).toFixed(0) >= 60) {
                return 3;
            } else if (round(longJump).toFixed(0) <= 59 && round(longJump).toFixed(0) >= 44) {
                return 2;
            } else if (round(longJump).toFixed(0) < 44) {
                return 1;
            }
        } else if (age === '4.5') {
            if (round(longJump).toFixed(0) > 96) {
                return 5;
            } else if (round(longJump).toFixed(0) <= 96 && round(longJump).toFixed(0) >= 81) {
                return 4;
            } else if (round(longJump).toFixed(0) <= 80 && round(longJump).toFixed(0) >= 68) {
                return 3;
            } else if (round(longJump).toFixed(0) <= 67 && round(longJump).toFixed(0) >= 50) {
                return 2;
            } else if (round(longJump).toFixed(0) < 50) {
                return 1;
            }
        } else if (age === '5') {
            if (round(longJump).toFixed(0) > 102) {
                return 5;
            } else if (round(longJump).toFixed(0) <= 102 && round(longJump).toFixed(0) >= 89) {
                return 4;
            } else if (round(longJump).toFixed(0) <= 88 && round(longJump).toFixed(0) >= 75) {
                return 3;
            } else if (round(longJump).toFixed(0) <= 74 && round(longJump).toFixed(0) >= 60) {
                return 2;
            } else if (round(longJump).toFixed(0) < 60) {
                return 1;
            }
        } else if (age === '5.5') {
            if (round(longJump).toFixed(0) > 109) {
                return 5;
            } else if (round(longJump).toFixed(0) <= 109 && round(longJump).toFixed(0) >= 96) {
                return 4;
            } else if (round(longJump).toFixed(0) <= 95 && round(longJump).toFixed(0) >= 82) {
                return 3;
            } else if (round(longJump).toFixed(0) <= 81 && round(longJump).toFixed(0) >= 66) {
                return 2;
            } else if (round(longJump).toFixed(0) < 66) {
                return 1;
            }
        } else if (age === '6') {
            if (round(longJump).toFixed(0) > 116) {
                return 5;
            } else if (round(longJump).toFixed(0) <= 116 && round(longJump).toFixed(0) >= 101) {
                return 4;
            } else if (round(longJump).toFixed(0) <= 100 && round(longJump).toFixed(0) >= 87) {
                return 3;
            } else if (round(longJump).toFixed(0) <= 86 && round(longJump).toFixed(0) >= 71) {
                return 2;
            } else if (round(longJump).toFixed(0) < 71) {
                return 1;
            }
        }
    }
}

function getThrowR() {
    if (getSex() === 0) {
        if (age === '3') {
            if (round(throwR).toFixed(1) > 5.5) {
                return 5;
            } else if (round(throwR).toFixed(1) <= 5.5 && round(throwR).toFixed(1) >= 4.0) {
                return 4;
            } else if (round(throwR).toFixed(1) <= 3.9 && round(throwR).toFixed(1) >= 3.0) {
                return 3;
            } else if (round(throwR).toFixed(1) <= 2.9 && round(throwR).toFixed(1) >= 2.0) {
                return 2;
            } else if (round(throwR).toFixed(1) < 2.0) {
                return 1;
            }
        } else if (age === '3.5') {
            if (round(throwR).toFixed(1) > 5.5) {
                return 5;
            } else if (round(throwR).toFixed(1) <= 5.5 && round(throwR).toFixed(1) >= 4.5) {
                return 4;
            } else if (round(throwR).toFixed(1) <= 4.4 && round(throwR).toFixed(1) >= 3.0) {
                return 3;
            } else if (round(throwR).toFixed(1) <= 2.9 && round(throwR).toFixed(1) >= 2.0) {
                return 2;
            } else if (round(throwR).toFixed(1) < 2.0) {
                return 1;
            }
        } else if (age === '4') {
            if (round(throwR).toFixed(1) > 6.0) {
                return 5;
            } else if (round(throwR).toFixed(1) <= 6.0 && round(throwR).toFixed(1) >= 5.0) {
                return 4;
            } else if (round(throwR).toFixed(1) <= 4.9 && round(throwR).toFixed(1) >= 4.0) {
                return 3;
            } else if (round(throwR).toFixed(1) <= 3.9 && round(throwR).toFixed(1) >= 3.0) {
                return 2;
            } else if (round(throwR).toFixed(1) < 3.0) {
                return 1;
            }
        } else if (age === '4.5') {
            if (round(throwR).toFixed(1) > 8.0) {
                return 5;
            } else if (round(throwR).toFixed(1) <= 8.0 && round(throwR).toFixed(1) >= 6.5) {
                return 4;
            } else if (round(throwR).toFixed(1) <= 6.4 && round(throwR).toFixed(1) >= 4.5) {
                return 3;
            } else if (round(throwR).toFixed(1) <= 4.4 && round(throwR).toFixed(1) >= 3.0) {
                return 2;
            } else if (round(throwR).toFixed(1) < 3.0) {
                return 1;
            }
        } else if (age === '5') {
            if (round(throwR).toFixed(1) > 9.0) {
                return 5;
            } else if (round(throwR).toFixed(1) <= 9.0 && round(throwR).toFixed(1) >= 7.5) {
                return 4;
            } else if (round(throwR).toFixed(1) <= 7.4 && round(throwR).toFixed(1) >= 5.5) {
                return 3;
            } else if (round(throwR).toFixed(1) <= 5.4 && round(throwR).toFixed(1) >= 4.0) {
                return 2;
            } else if (round(throwR).toFixed(1) < 4.0) {
                return 1;
            }
        } else if (age === '5.5') {
            if (round(throwR).toFixed(1) > 10.0) {
                return 5;
            } else if (round(throwR).toFixed(1) <= 10.0 && round(throwR).toFixed(1) >= 8.0) {
                return 4;
            } else if (round(throwR).toFixed(1) <= 7.9 && round(throwR).toFixed(1) >= 6.0) {
                return 3;
            } else if (round(throwR).toFixed(1) <= 5.9 && round(throwR).toFixed(1) >= 4.0) {
                return 2;
            } else if (round(throwR).toFixed(1) < 4.0) {
                return 1;
            }
        } else if (age === '6') {
            if (round(throwR).toFixed(1) > 12.0) {
                return 5;
            } else if (round(throwR).toFixed(1) <= 12.0 && round(throwR).toFixed(1) >= 9.5) {
                return 4;
            } else if (round(throwR).toFixed(1) <= 9.4 && round(throwR).toFixed(1) >= 7.0) {
                return 3;
            } else if (round(throwR).toFixed(1) <= 6.9 && round(throwR).toFixed(1) >= 4.5) {
                return 2;
            } else if (round(throwR).toFixed(1) < 4.5) {
                return 1;
            }
        }
    } else {
        if (age === '3') {
            if (round(throwR).toFixed(1) > 5.0) {
                return 5;
            } else if (round(throwR).toFixed(1) <= 5.0 && round(throwR).toFixed(1) >= 3.5) {
                return 4;
            } else if (round(throwR).toFixed(1) <= 3.4 && round(throwR).toFixed(1) >= 2.5) {
                return 3;
            } else if (round(throwR).toFixed(1) <= 2.4 && round(throwR).toFixed(1) >= 1.5) {
                return 2;
            } else if (round(throwR).toFixed(1) < 1.5) {
                return 1;
            }
        } else if (age === '3.5') {
            if (round(throwR).toFixed(1) > 5.0) {
                return 5;
            } else if (round(throwR).toFixed(1) <= 5.0 && round(throwR).toFixed(1) >= 4.0) {
                return 4;
            } else if (round(throwR).toFixed(1) <= 3.9 && round(throwR).toFixed(1) >= 3.0) {
                return 3;
            } else if (round(throwR).toFixed(1) <= 2.9 && round(throwR).toFixed(1) >= 2.0) {
                return 2;
            } else if (round(throwR).toFixed(1) < 2.0) {
                return 1;
            }
        } else if (age === '4') {
            if (round(throwR).toFixed(1) > 5.0) {
                return 5;
            } else if (round(throwR).toFixed(1) <= 5.0 && round(throwR).toFixed(1) >= 4.5) {
                return 4;
            } else if (round(throwR).toFixed(1) <= 4.4 && round(throwR).toFixed(1) >= 3.5) {
                return 3;
            } else if (round(throwR).toFixed(1) <= 3.4 && round(throwR).toFixed(1) >= 2.5) {
                return 2;
            } else if (round(throwR).toFixed(1) < 2.5) {
                return 1;
            }
        } else if (age === '4.5') {
            if (round(throwR).toFixed(1) > 5.5) {
                return 5;
            } else if (round(throwR).toFixed(1) <= 5.5 && round(throwR).toFixed(1) >= 4.5) {
                return 4;
            } else if (round(throwR).toFixed(1) <= 4.4 && round(throwR).toFixed(1) >= 3.5) {
                return 3;
            } else if (round(throwR).toFixed(1) <= 3.4 && round(throwR).toFixed(1) >= 2.5) {
                return 2;
            } else if (round(throwR).toFixed(1) < 2.5) {
                return 1;
            }
        } else if (age === '5') {
            if (round(throwR).toFixed(1) > 8.5) {
                return 5;
            } else if (round(throwR).toFixed(1) <= 8.5 && round(throwR).toFixed(1) >= 6.0) {
                return 4;
            } else if (round(throwR).toFixed(1) <= 5.9 && round(throwR).toFixed(1) >= 4.5) {
                return 3;
            } else if (round(throwR).toFixed(1) <= 4.4 && round(throwR).toFixed(1) >= 3.5) {
                return 2;
            } else if (round(throwR).toFixed(1) < 3.5) {
                return 1;
            }
        } else if (age === '5.5') {
            if (round(throwR).toFixed(1) > 8.5) {
                return 5;
            } else if (round(throwR).toFixed(1) <= 8.5 && round(throwR).toFixed(1) >= 6.5) {
                return 4;
            } else if (round(throwR).toFixed(1) <= 6.4 && round(throwR).toFixed(1) >= 5.0) {
                return 3;
            } else if (round(throwR).toFixed(1) <= 4.9 && round(throwR).toFixed(1) >= 3.5) {
                return 2;
            } else if (round(throwR).toFixed(1) < 3.5) {
                return 1;
            }
        } else if (age === '6') {
            if (round(throwR).toFixed(1) > 8.0) {
                return 5;
            } else if (round(throwR).toFixed(1) <= 8.0 && round(throwR).toFixed(1) >= 6.5) {
                return 4;
            } else if (round(throwR).toFixed(1) <= 6.4 && round(throwR).toFixed(1) >= 5.0) {
                return 3;
            } else if (round(throwR).toFixed(1) <= 4.9 && round(throwR).toFixed(1) >= 3.5) {
                return 2;
            } else if (round(throwR).toFixed(1) < 3.5) {
                return 1;
            }
        }
    }
}

function getBodyFlexion() {
    if (getSex() === 0) {
        if (age === '3') {
            if (round(bodyFlexion).toFixed(1) > 14.3) {
                return 5;
            } else if (round(bodyFlexion).toFixed(1) <= 14.3 && round(bodyFlexion).toFixed(1) >= 10.5) {
                return 4;
            } else if (round(bodyFlexion).toFixed(1) <= 10.4 && round(bodyFlexion).toFixed(1) >= 7.1) {
                return 3;
            } else if (round(bodyFlexion).toFixed(1) <= 7.0 && round(bodyFlexion).toFixed(1) >= 3.2) {
                return 2;
            } else if (round(bodyFlexion).toFixed(1) < 3.2) {
                return 1;
            }
        } else if (age === '3.5') {
            if (round(bodyFlexion).toFixed(1) > 14.3) {
                return 5;
            } else if (round(bodyFlexion).toFixed(1) <= 14.3 && round(bodyFlexion).toFixed(1) >= 11.0) {
                return 4;
            } else if (round(bodyFlexion).toFixed(1) <= 10.9 && round(bodyFlexion).toFixed(1) >= 7.6) {
                return 3;
            } else if (round(bodyFlexion).toFixed(1) <= 7.5 && round(bodyFlexion).toFixed(1) >= 3.3) {
                return 2;
            } else if (round(bodyFlexion).toFixed(1) < 3.3) {
                return 1;
            }
        } else if (age === '4') {
            if (round(bodyFlexion).toFixed(1) > 14.3) {
                return 5;
            } else if (round(bodyFlexion).toFixed(1) <= 14.3 && round(bodyFlexion).toFixed(1) >= 11.0) {
                return 4;
            } else if (round(bodyFlexion).toFixed(1) <= 10.9 && round(bodyFlexion).toFixed(1) >= 7.6) {
                return 3;
            } else if (round(bodyFlexion).toFixed(1) <= 7.5 && round(bodyFlexion).toFixed(1) >= 3.5) {
                return 2;
            } else if (round(bodyFlexion).toFixed(1) < 3.5) {
                return 1;
            }
        } else if (age === '4.5') {
            if (round(bodyFlexion).toFixed(1) > 14.3) {
                return 5;
            } else if (round(bodyFlexion).toFixed(1) <= 14.3 && round(bodyFlexion).toFixed(1) >= 11.0) {
                return 4;
            } else if (round(bodyFlexion).toFixed(1) <= 10.9 && round(bodyFlexion).toFixed(1) >= 8.0) {
                return 3;
            } else if (round(bodyFlexion).toFixed(1) <= 7.9 && round(bodyFlexion).toFixed(1) >= 4.2) {
                return 2;
            } else if (round(bodyFlexion).toFixed(1) < 4.2) {
                return 1;
            }
        } else if (age === '5') {
            if (round(bodyFlexion).toFixed(1) > 14.8) {
                return 5;
            } else if (round(bodyFlexion).toFixed(1) <= 14.8 && round(bodyFlexion).toFixed(1) >= 11.5) {
                return 4;
            } else if (round(bodyFlexion).toFixed(1) <= 11.4 && round(bodyFlexion).toFixed(1) >= 8.5) {
                return 3;
            } else if (round(bodyFlexion).toFixed(1) <= 8.4 && round(bodyFlexion).toFixed(1) >= 4.5) {
                return 2;
            } else if (round(bodyFlexion).toFixed(1) < 4.5) {
                return 1;
            }
        } else if (age === '5.5') {
            if (round(bodyFlexion).toFixed(1) > 14.8) {
                return 5;
            } else if (round(bodyFlexion).toFixed(1) <= 14.8 && round(bodyFlexion).toFixed(1) >= 11.6) {
                return 4;
            } else if (round(bodyFlexion).toFixed(1) <= 11.5 && round(bodyFlexion).toFixed(1) >= 8.5) {
                return 3;
            } else if (round(bodyFlexion).toFixed(1) <= 8.4 && round(bodyFlexion).toFixed(1) >= 4.7) {
                return 2;
            } else if (round(bodyFlexion).toFixed(1) < 4.7) {
                return 1;
            }
        } else if (age === '6') {
            if (round(bodyFlexion).toFixed(1) > 14.8) {
                return 5;
            } else if (round(bodyFlexion).toFixed(1) <= 14.8 && round(bodyFlexion).toFixed(1) >= 11.7) {
                return 4;
            } else if (round(bodyFlexion).toFixed(1) <= 11.6 && round(bodyFlexion).toFixed(1) >= 8.6) {
                return 3;
            } else if (round(bodyFlexion).toFixed(1) <= 8.5 && round(bodyFlexion).toFixed(1) >= 4.9) {
                return 2;
            } else if (round(bodyFlexion).toFixed(1) < 4.9) {
                return 1;
            }
        }
    } else {
        if (age === '3') {
            if (round(bodyFlexion).toFixed(1) > 15.8) {
                return 5;
            } else if (round(bodyFlexion).toFixed(1) <= 15.8 && round(bodyFlexion).toFixed(1) >= 13.0) {
                return 4;
            } else if (round(bodyFlexion).toFixed(1) <= 12.9 && round(bodyFlexion).toFixed(1) >= 10.0) {
                return 3;
            } else if (round(bodyFlexion).toFixed(1) <= 9.9 && round(bodyFlexion).toFixed(1) >= 6.3) {
                return 2;
            } else if (round(bodyFlexion).toFixed(1) < 6.3) {
                return 1;
            }
        } else if (age === '3.5') {
            if (round(bodyFlexion).toFixed(1) > 15.8) {
                return 5;
            } else if (round(bodyFlexion).toFixed(1) <= 15.8 && round(bodyFlexion).toFixed(1) >= 13.0) {
                return 4;
            } else if (round(bodyFlexion).toFixed(1) <= 12.9 && round(bodyFlexion).toFixed(1) >= 10.0) {
                return 3;
            } else if (round(bodyFlexion).toFixed(1) <= 9.9 && round(bodyFlexion).toFixed(1) >= 6.3) {
                return 2;
            } else if (round(bodyFlexion).toFixed(1) < 6.3) {
                return 1;
            }
        } else if (age === '4') {
            if (round(bodyFlexion).toFixed(1) > 15.9) {
                return 5;
            } else if (round(bodyFlexion).toFixed(1) <= 15.9 && round(bodyFlexion).toFixed(1) >= 13.5) {
                return 4;
            } else if (round(bodyFlexion).toFixed(1) <= 13.4 && round(bodyFlexion).toFixed(1) >= 11.0) {
                return 3;
            } else if (round(bodyFlexion).toFixed(1) <= 10.9 && round(bodyFlexion).toFixed(1) >= 7.0) {
                return 2;
            } else if (round(bodyFlexion).toFixed(1) < 7.0) {
                return 1;
            }
        } else if (age === '4.5') {
            if (round(bodyFlexion).toFixed(1) > 15.9) {
                return 5;
            } else if (round(bodyFlexion).toFixed(1) <= 15.9 && round(bodyFlexion).toFixed(1) >= 13.5) {
                return 4;
            } else if (round(bodyFlexion).toFixed(1) <= 13.4 && round(bodyFlexion).toFixed(1) >= 11.0) {
                return 3;
            } else if (round(bodyFlexion).toFixed(1) <= 10.9 && round(bodyFlexion).toFixed(1) >= 7.0) {
                return 2;
            } else if (round(bodyFlexion).toFixed(1) < 7.0) {
                return 1;
            }
        } else if (age === '5') {
            if (round(bodyFlexion).toFixed(1) > 16.5) {
                return 5;
            } else if (round(bodyFlexion).toFixed(1) <= 16.5 && round(bodyFlexion).toFixed(1) >= 13.9) {
                return 4;
            } else if (round(bodyFlexion).toFixed(1) <= 13.8 && round(bodyFlexion).toFixed(1) >= 11.5) {
                return 3;
            } else if (round(bodyFlexion).toFixed(1) <= 11.4 && round(bodyFlexion).toFixed(1) >= 7.3) {
                return 2;
            } else if (round(bodyFlexion).toFixed(1) < 7.3) {
                return 1;
            }
        } else if (age === '5.5') {
            if (round(bodyFlexion).toFixed(1) > 16.6) {
                return 5;
            } else if (round(bodyFlexion).toFixed(1) <= 16.6 && round(bodyFlexion).toFixed(1) >= 14.0) {
                return 4;
            } else if (round(bodyFlexion).toFixed(1) <= 13.9 && round(bodyFlexion).toFixed(1) >= 11.8) {
                return 3;
            } else if (round(bodyFlexion).toFixed(1) <= 11.7 && round(bodyFlexion).toFixed(1) >= 7.5) {
                return 2;
            } else if (round(bodyFlexion).toFixed(1) < 7.5) {
                return 1;
            }
        } else if (age === '6') {
            if (round(bodyFlexion).toFixed(1) > 16.6) {
                return 5;
            } else if (round(bodyFlexion).toFixed(1) <= 16.6 && round(bodyFlexion).toFixed(1) >= 14.0) {
                return 4;
            } else if (round(bodyFlexion).toFixed(1) <= 13.9 && round(bodyFlexion).toFixed(1) >= 11.8) {
                return 3;
            } else if (round(bodyFlexion).toFixed(1) <= 11.7 && round(bodyFlexion).toFixed(1) >= 7.5) {
                return 2;
            } else if (round(bodyFlexion).toFixed(1) < 7.5) {
                return 1;
            }
        }
    }
}


function getBalance() {
    if (getSex() === 0) {
        if (age === '3') {
            if (round(balance).toFixed(1) < 6.6) {
                return 5;
            } else if (round(balance).toFixed(1) >= 6.6 && round(balance).toFixed(1) <= 10.5) {
                return 4;
            } else if (round(balance).toFixed(1) >= 10.6 && round(balance) <= 16.8) {
                return 3;
            } else if (round(balance).toFixed(1) >= 16.9 && round(balance).toFixed(1) <= 30.0) {
                return 2;
            } else if (round(balance).toFixed(1) > 30.0) {
                return 1;
            }
        } else if (age === '3.5') {
            if (round(balance).toFixed(1) < 5.9) {
                return 5;
            } else if (round(balance).toFixed(1) >= 5.9 && round(balance).toFixed(1) <= 9.3) {
                return 4;
            } else if (round(balance).toFixed(1) >= 9.4 && round(balance).toFixed(1) <= 15.0) {
                return 3;
            } else if (round(balance).toFixed(1) >= 15.1 && round(balance).toFixed(1) <= 27.0) {
                return 2;
            } else if (round(balance).toFixed(1) > 27.0) {
                return 1;
            }
        } else if (age === '4') {
            if (round(balance).toFixed(1) < 4.9) {
                return 5;
            } else if (round(balance).toFixed(1) >= 4.9 && round(balance).toFixed(1) <= 7.3) {
                return 4;
            } else if (round(balance).toFixed(1) >= 7.4 && round(balance).toFixed(1) <= 11.5) {
                return 3;
            } else if (round(balance).toFixed(1) >= 11.6 && round(balance).toFixed(1) <= 21.5) {
                return 2;
            } else if (round(balance).toFixed(1) > 21.5) {
                return 1;
            }
        } else if (age === '4.5') {
            if (round(balance).toFixed(1) < 4.3) {
                return 5;
            } else if (round(balance).toFixed(1) >= 4.3 && round(balance).toFixed(1) <= 6.2) {
                return 4;
            } else if (round(balance).toFixed(1) >= 6.3 && round(balance).toFixed(1) <= 9.6) {
                return 3;
            } else if (round(balance).toFixed(1) >= 9.7 && round(balance).toFixed(1) <= 17.8) {
                return 2;
            } else if (round(balance).toFixed(1) > 17.8) {
                return 1;
            }
        } else if (age === '5') {
            if (round(balance).toFixed(1) < 3.7) {
                return 5;
            } else if (round(balance).toFixed(1) >= 3.7 && round(balance).toFixed(1) <= 5.2) {
                return 4;
            } else if (round(balance).toFixed(1) >= 5.3 && round(balance).toFixed(1) <= 7.8) {
                return 3;
            } else if (round(balance).toFixed(1) >= 7.9 && round(balance).toFixed(1) <= 14.0) {
                return 2;
            } else if (round(balance).toFixed(1) > 14.0) {
                return 1;
            }
        } else if (age === '5.5') {
            if (round(balance).toFixed(1) < 3.3) {
                return 5;
            } else if (round(balance).toFixed(1) >= 3.3 && round(balance).toFixed(1) <= 4.5) {
                return 4;
            } else if (round(balance).toFixed(1) >= 4.6 && round(balance).toFixed(1) <= 6.7) {
                return 3;
            } else if (round(balance).toFixed(1) >= 6.8 && round(balance).toFixed(1) <= 12.0) {
                return 2;
            } else if (round(balance).toFixed(1) > 12.0) {
                return 1;
            }
        } else if (age === '6') {
            if (round(balance).toFixed(1) < 2.7) {
                return 5;
            } else if (round(balance).toFixed(1) >= 2.7 && round(balance).toFixed(1) <= 3.7) {
                return 4;
            } else if (round(balance).toFixed(1) >= 3.8 && round(balance).toFixed(1) <= 5.3) {
                return 3;
            } else if (round(balance).toFixed(1) >= 5.4 && round(balance).toFixed(1) <= 9.3) {
                return 2;
            } else if (round(balance).toFixed(1) > 9.3) {
                return 1;
            }
        }
    } else {
        if (age === '3') {
            if (round(balance).toFixed(1) < 6.9) {
                return 5;
            } else if (round(balance).toFixed(1) >= 6.9 && round(balance).toFixed(1) <= 10.7) {
                return 4;
            } else if (round(balance).toFixed(1) >= 10.7 && round(balance).toFixed(1) <= 17.3) {
                return 3;
            } else if (round(balance).toFixed(1) >= 17.4 && round(balance).toFixed(1) <= 32.4) {
                return 2;
            } else if (round(balance).toFixed(1) > 32.4) {
                return 1;
            }
        } else if (age === '3.5') {
            if (round(balance).toFixed(1) < 6.1) {
                return 5;
            } else if (round(balance).toFixed(1) >= 6.1 && round(balance).toFixed(1) <= 9.6) {
                return 4;
            } else if (round(balance).toFixed(1) >= 9.7 && round(balance).toFixed(1) <= 15.0) {
                return 3;
            } else if (round(balance).toFixed(1) >= 15.1 && round(balance).toFixed(1) <= 27.4) {
                return 2;
            } else if (round(balance).toFixed(1) > 27.4) {
                return 1;
            }
        } else if (age === '4') {
            if (round(balance).toFixed(1) < 5.3) {
                return 5;
            } else if (round(balance).toFixed(1) >= 5.3 && round(balance).toFixed(1) <= 8.1) {
                return 4;
            } else if (round(balance).toFixed(1) >= 8.2 && round(balance).toFixed(1) <= 12.2) {
                return 3;
            } else if (round(balance).toFixed(1) >= 12.3 && round(balance).toFixed(1) <= 22.5) {
                return 2;
            } else if (round(balance).toFixed(1) > 22.5) {
                return 1;
            }
        } else if (age === '4.5') {
            if (round(balance).toFixed(1) < 4.7) {
                return 5;
            } else if (round(balance).toFixed(1) >= 4.7 && round(balance).toFixed(1) <= 6.9) {
                return 4;
            } else if (round(balance).toFixed(1) >= 7.0 && round(balance).toFixed(1) <= 10.1) {
                return 3;
            } else if (round(balance).toFixed(1) >= 10.2 && round(balance).toFixed(1) <= 18.6) {
                return 2;
            } else if (round(balance).toFixed(1) > 18.6) {
                return 1;
            }
        } else if (age === '5') {
            if (round(balance).toFixed(1) < 4.1) {
                return 5;
            } else if (round(balance).toFixed(1) >= 4.1 && round(balance).toFixed(1) <= 5.7) {
                return 4;
            } else if (round(balance).toFixed(1) >= 5.8 && round(balance).toFixed(1) <= 8.2) {
                return 3;
            } else if (round(balance).toFixed(1) >= 8.3 && round(balance).toFixed(1) <= 14.0) {
                return 2;
            } else if (round(balance).toFixed(1) > 14.0) {
                return 1;
            }
        } else if (age === '5.5') {
            if (round(balance).toFixed(1) < 3.6) {
                return 5;
            } else if (round(balance).toFixed(1) >= 3.6 && round(balance).toFixed(1) <= 5.0) {
                return 4;
            } else if (round(balance).toFixed(1) >= 5.1 && round(balance).toFixed(1) <= 7.4) {
                return 3;
            } else if (round(balance).toFixed(1) >= 7.5 && round(balance).toFixed(1) <= 12.5) {
                return 2;
            } else if (round(balance).toFixed(1) > 12.5) {
                return 1;
            }
        } else if (age === '6') {
            if (round(balance).toFixed(1) < 3.0) {
                return 5;
            } else if (round(balance).toFixed(1) >= 3.0 && round(balance).toFixed(1) <= 4.2) {
                return 4;
            } else if (round(balance).toFixed(1) >= 4.3 && round(balance).toFixed(1) <= 6.1) {
                return 3;
            } else if (round(balance).toFixed(1) >= 6.2 && round(balance).toFixed(1) <= 10.7) {
                return 2;
            } else if (round(balance).toFixed(1) > 10.7) {
                return 1;
            }
        }
    }
}

function getOneJump() {
    if (getSex() === 0) {
        if (age === '3') {
            if (round(oneJump).toFixed(1) < 6.6) {
                return 5;
            } else if (round(oneJump).toFixed(1) >= 6.6 && round(oneJump).toFixed(1) <= 9.1) {
                return 4;
            } else if (round(oneJump).toFixed(1) >= 9.2 && round(oneJump).toFixed(1) <= 13.0) {
                return 3;
            } else if (round(oneJump).toFixed(1) >= 13.1 && round(oneJump).toFixed(1) <= 19.6) {
                return 2;
            } else if (round(oneJump).toFixed(1) >= 19.7) {
                return 1;
            }
        } else if (age === '3.5') {
            if (round(oneJump).toFixed(1) < 6.1) {
                return 5;
            } else if (round(oneJump).toFixed(1) >= 6.1 && round(oneJump).toFixed(1) <= 8.2) {
                return 4;
            } else if (round(oneJump).toFixed(1) >= 8.3 && round(oneJump).toFixed(1) <= 11.1) {
                return 3;
            } else if (round(oneJump).toFixed(1) >= 11.2 && round(oneJump).toFixed(1) <= 16.9) {
                return 2;
            } else if (round(oneJump).toFixed(1) >= 17.0) {
                return 1;
            }
        } else if (age === '4') {
            if (round(oneJump).toFixed(1) < 5.6) {
                return 5;
            } else if (round(oneJump).toFixed(1) >= 5.6 && round(oneJump).toFixed(1) <= 7.0) {
                return 4;
            } else if (round(oneJump).toFixed(1) >= 7.1 && round(oneJump).toFixed(1) <= 9.1) {
                return 3;
            } else if (round(oneJump).toFixed(1) >= 9.2 && round(oneJump).toFixed(1) <= 13.1) {
                return 2;
            } else if (round(oneJump).toFixed(1) >= 13.2) {
                return 1;
            }
        } else if (age === '4.5') {
            if (round(oneJump).toFixed(1) < 5.3) {
                return 5;
            } else if (round(oneJump).toFixed(1) >= 5.3 && round(oneJump).toFixed(1) <= 6.4) {
                return 4;
            } else if (round(oneJump).toFixed(1) >= 6.5 && round(oneJump).toFixed(1) <= 8.1) {
                return 3;
            } else if (round(oneJump).toFixed(1) >= 8.2 && round(oneJump).toFixed(1) <= 11.2) {
                return 2;
            } else if (round(oneJump).toFixed(1) >= 11.3) {
                return 1;
            }
        } else if (age === '5') {
            if (round(oneJump).toFixed(1) < 5.1) {
                return 5;
            } else if (round(oneJump).toFixed(1) >= 5.1 && round(oneJump).toFixed(1) <= 5.9) {
                return 4;
            } else if (round(oneJump).toFixed(1) >= 6.0 && round(oneJump).toFixed(1) <= 7.2) {
                return 3;
            } else if (round(oneJump).toFixed(1) >= 7.3 && round(oneJump).toFixed(1) <= 9.8) {
                return 2;
            } else if (round(oneJump).toFixed(1) >= 9.9) {
                return 1;
            }
        } else if (age === '5.5') {
            if (round(oneJump).toFixed(1) < 4.9) {
                return 5;
            } else if (round(oneJump).toFixed(1) >= 4.9 && round(oneJump).toFixed(1) <= 5.6) {
                return 4;
            } else if (round(oneJump).toFixed(1) >= 5.7 && round(oneJump).toFixed(1) <= 6.8) {
                return 3;
            } else if (round(oneJump).toFixed(1) >= 6.9 && round(oneJump).toFixed(1) <= 9.3) {
                return 2;
            } else if (round(oneJump).toFixed(1) >= 9.4) {
                return 1;
            }
        } else if (age === '6') {
            if (round(oneJump).toFixed(1) < 4.4) {
                return 5;
            } else if (round(oneJump).toFixed(1) >= 4.4 && round(oneJump).toFixed(1) <= 5.1) {
                return 4;
            } else if (round(oneJump).toFixed(1) >= 5.2 && round(oneJump).toFixed(1) <= 6.1) {
                return 3;
            } else if (round(oneJump).toFixed(1) >= 6.2 && round(oneJump).toFixed(1) <= 8.2) {
                return 2;
            } else if (round(oneJump).toFixed(1) >= 8.3) {
                return 1;
            }
        }
    } else {
        if (age === '3') {
            if (round(oneJump).toFixed(1) < 7.1) {
                return 5;
            } else if (round(oneJump).toFixed(1) >= 7.1 && round(oneJump).toFixed(1) <= 9.7) {
                return 4;
            } else if (round(oneJump).toFixed(1) >= 9.8 && round(oneJump).toFixed(1) <= 13.4) {
                return 3;
            } else if (round(oneJump).toFixed(1) >= 13.5 && round(oneJump).toFixed(1) <= 20.0) {
                return 2;
            } else if (round(oneJump).toFixed(1) >= 20.1) {
                return 1;
            }
        } else if (age === '3.5') {
            if (round(oneJump).toFixed(1) < 6.2) {
                return 5;
            } else if (round(oneJump).toFixed(1) >= 6.2 && round(oneJump).toFixed(1) <= 8.4) {
                return 4;
            } else if (round(oneJump).toFixed(1) >= 8.5 && round(oneJump).toFixed(1) <= 11.2) {
                return 3;
            } else if (round(oneJump).toFixed(1) >= 11.3 && round(oneJump).toFixed(1) <= 17.0) {
                return 2;
            } else if (round(oneJump).toFixed(1) >= 17.1) {
                return 1;
            }
        } else if (age === '4') {
            if (round(oneJump).toFixed(1) < 5.9) {
                return 5;
            } else if (round(oneJump).toFixed(1) >= 5.9 && round(oneJump).toFixed(1) <= 7.3) {
                return 4;
            } else if (round(oneJump).toFixed(1) >= 7.4 && round(oneJump).toFixed(1) <= 9.5) {
                return 3;
            } else if (round(oneJump).toFixed(1) >= 9.6 && round(oneJump).toFixed(1) <= 13.4) {
                return 2;
            } else if (round(oneJump).toFixed(1) >= 13.5) {
                return 1;
            }
        } else if (age === '4.5') {
            if (round(oneJump).toFixed(1) < 5.5) {
                return 5;
            } else if (round(oneJump).toFixed(1) >= 5.5 && round(oneJump).toFixed(1) <= 6.7) {
                return 4;
            } else if (round(oneJump).toFixed(1) >= 6.8 && round(oneJump).toFixed(1) <= 8.5) {
                return 3;
            } else if (round(oneJump).toFixed(1) >= 8.6 && round(oneJump).toFixed(1) <= 11.9) {
                return 2;
            } else if (round(oneJump).toFixed(1) >= 12.0) {
                return 1;
            }
        } else if (age === '5') {
            if (round(oneJump).toFixed(1) < 5.2) {
                return 5;
            } else if (round(oneJump).toFixed(1) >= 5.2 && round(oneJump).toFixed(1) <= 6.1) {
                return 4;
            } else if (round(oneJump).toFixed(1) >= 6.2 && round(oneJump).toFixed(1) <= 7.5) {
                return 3;
            } else if (round(oneJump).toFixed(1) >= 7.6 && round(oneJump).toFixed(1) <= 10.0) {
                return 2;
            } else if (round(oneJump).toFixed(1) >= 10.1) {
                return 1;
            }
        } else if (age === '5.5') {
            if (round(oneJump).toFixed(1) < 4.9) {
                return 5;
            } else if (round(oneJump).toFixed(1) >= 4.9 && round(oneJump).toFixed(1) <= 5.7) {
                return 4;
            } else if (round(oneJump).toFixed(1) >= 5.8 && round(oneJump).toFixed(1) <= 6.9) {
                return 3;
            } else if (round(oneJump).toFixed(1) >= 7.0 && round(oneJump).toFixed(1) <= 9.2) {
                return 2;
            } else if (round(oneJump).toFixed(1) >= 9.3) {
                return 1;
            }
        } else if (age === '6') {
            if (round(oneJump).toFixed(1) < 4.6) {
                return 5;
            } else if (round(oneJump).toFixed(1) >= 4.6 && round(oneJump).toFixed(1) <= 5.2) {
                return 4;
            } else if (round(oneJump).toFixed(1) >= 5.3 && round(oneJump).toFixed(1) <= 6.2) {
                return 3;
            } else if (round(oneJump).toFixed(1) >= 6.3 && round(oneJump).toFixed(1) <= 8.3) {
                return 2;
            } else if (round(oneJump).toFixed(1) >= 8.4) {
                return 1;
            }
        }
    }
}

function getTwoJump() {
    if (getSex() === 0) {
        if (age === '3') {
            if (round(twoJump).toFixed(1) < 6.6) {
                return 5;
            } else if (round(twoJump).toFixed(1) >= 6.6 && round(twoJump).toFixed(1) <= 9.1) {
                return 4;
            } else if (round(twoJump).toFixed(1) >= 9.2 && round(twoJump).toFixed(1) <= 13.0) {
                return 3;
            } else if (round(twoJump).toFixed(1) >= 13.1 && round(twoJump).toFixed(1) <= 19.6) {
                return 2;
            } else if (round(twoJump).toFixed(1) >= 19.7) {
                return 1;
            }
        } else if (age === '3.5') {
            if (round(twoJump).toFixed(1) < 6.1) {
                return 5;
            } else if (round(twoJump).toFixed(1) >= 6.1 && round(twoJump).toFixed(1) <= 8.2) {
                return 4;
            } else if (round(twoJump).toFixed(1) >= 8.3 && round(twoJump).toFixed(1) <= 11.1) {
                return 3;
            } else if (round(twoJump).toFixed(1) >= 11.2 && round(twoJump).toFixed(1) <= 16.9) {
                return 2;
            } else if (round(twoJump).toFixed(1) >= 17.0) {
                return 1;
            }
        } else if (age === '4') {
            if (round(twoJump).toFixed(1) < 5.6) {
                return 5;
            } else if (round(twoJump).toFixed(1) >= 5.6 && round(twoJump).toFixed(1) <= 7.0) {
                return 4;
            } else if (round(twoJump).toFixed(1) >= 7.1 && round(twoJump).toFixed(1) <= 9.1) {
                return 3;
            } else if (round(twoJump).toFixed(1) >= 9.2 && round(twoJump).toFixed(1) <= 13.1) {
                return 2;
            } else if (round(twoJump).toFixed(1) >= 13.2) {
                return 1;
            }
        } else if (age === '4.5') {
            if (round(twoJump).toFixed(1) < 5.3) {
                return 5;
            } else if (round(twoJump).toFixed(1) >= 5.3 && round(twoJump).toFixed(1) <= 6.4) {
                return 4;
            } else if (round(twoJump).toFixed(1) >= 6.5 && round(twoJump).toFixed(1) <= 8.1) {
                return 3;
            } else if (round(twoJump).toFixed(1) >= 8.2 && round(twoJump).toFixed(1) <= 11.2) {
                return 2;
            } else if (round(twoJump).toFixed(1) >= 11.3) {
                return 1;
            }
        } else if (age === '5') {
            if (round(twoJump).toFixed(1) < 5.1) {
                return 5;
            } else if (round(twoJump).toFixed(1) >= 5.1 && round(twoJump).toFixed(1) <= 5.9) {
                return 4;
            } else if (round(twoJump).toFixed(1) >= 6.0 && round(twoJump).toFixed(1) <= 7.2) {
                return 3;
            } else if (round(twoJump).toFixed(1) >= 7.3 && round(twoJump).toFixed(1) <= 9.8) {
                return 2;
            } else if (round(twoJump).toFixed(1) >= 9.9) {
                return 1;
            }
        } else if (age === '5.5') {
            if (round(twoJump).toFixed(1) < 4.9) {
                return 5;
            } else if (round(twoJump).toFixed(1) >= 4.9 && round(twoJump).toFixed(1) <= 5.6) {
                return 4;
            } else if (round(twoJump).toFixed(1) >= 5.7 && round(twoJump).toFixed(1) <= 6.8) {
                return 3;
            } else if (round(twoJump).toFixed(1) >= 6.9 && round(twoJump).toFixed(1) <= 9.3) {
                return 2;
            } else if (round(twoJump).toFixed(1) >= 9.4) {
                return 1;
            }
        } else if (age === '6') {
            if (round(twoJump).toFixed(1) < 4.4) {
                return 5;
            } else if (round(twoJump).toFixed(1) >= 4.4 && round(twoJump).toFixed(1) <= 5.1) {
                return 4;
            } else if (round(twoJump).toFixed(1) >= 5.2 && round(twoJump).toFixed(1) <= 6.1) {
                return 3;
            } else if (round(twoJump).toFixed(1) >= 6.2 && round(twoJump).toFixed(1) <= 8.2) {
                return 2;
            } else if (round(twoJump).toFixed(1) >= 8.3) {
                return 1;
            }
        }
    } else {
        if (age === '3') {
            if (round(twoJump).toFixed(1) < 7.1) {
                return 5;
            } else if (round(twoJump).toFixed(1) >= 7.1 && round(twoJump).toFixed(1) <= 9.7) {
                return 4;
            } else if (round(twoJump).toFixed(1) >= 9.8 && round(twoJump).toFixed(1) <= 13.4) {
                return 3;
            } else if (round(twoJump).toFixed(1) >= 13.5 && round(twoJump).toFixed(1) <= 20.0) {
                return 2;
            } else if (round(twoJump).toFixed(1) >= 20.1) {
                return 1;
            }
        } else if (age === '3.5') {
            if (round(twoJump).toFixed(1) < 6.2) {
                return 5;
            } else if (round(twoJump).toFixed(1) >= 6.2 && round(twoJump).toFixed(1) <= 8.4) {
                return 4;
            } else if (round(twoJump).toFixed(1) >= 8.5 && round(twoJump).toFixed(1) <= 11.2) {
                return 3;
            } else if (round(twoJump).toFixed(1) >= 11.3 && round(twoJump).toFixed(1) <= 17.0) {
                return 2;
            } else if (round(twoJump).toFixed(1) >= 17.1) {
                return 1;
            }
        } else if (age === '4') {
            if (round(twoJump).toFixed(1) < 5.9) {
                return 5;
            } else if (round(twoJump).toFixed(1) >= 5.9 && round(twoJump).toFixed(1) <= 7.3) {
                return 4;
            } else if (round(twoJump).toFixed(1) >= 7.4 && round(twoJump).toFixed(1) <= 9.5) {
                return 3;
            } else if (round(twoJump).toFixed(1) >= 9.6 && round(twoJump).toFixed(1) <= 13.4) {
                return 2;
            } else if (round(twoJump).toFixed(1) >= 13.5) {
                return 1;
            }
        } else if (age === '4.5') {
            if (round(twoJump).toFixed(1) < 5.5) {
                return 5;
            } else if (round(twoJump).toFixed(1) >= 5.5 && round(twoJump).toFixed(1) <= 6.7) {
                return 4;
            } else if (round(twoJump).toFixed(1) >= 6.8 && round(twoJump).toFixed(1) <= 8.5) {
                return 3;
            } else if (round(twoJump).toFixed(1) >= 8.6 && round(twoJump).toFixed(1) <= 11.9) {
                return 2;
            } else if (round(twoJump).toFixed(1) >= 12.0) {
                return 1;
            }
        } else if (age === '5') {
            if (round(twoJump).toFixed(1) < 5.2) {
                return 5;
            } else if (round(twoJump).toFixed(1) >= 5.2 && round(twoJump).toFixed(1) <= 6.1) {
                return 4;
            } else if (round(twoJump).toFixed(1) >= 6.2 && round(twoJump).toFixed(1) <= 7.5) {
                return 3;
            } else if (round(twoJump).toFixed(1) >= 7.6 && round(twoJump).toFixed(1) <= 10.0) {
                return 2;
            } else if (round(twoJump).toFixed(1) >= 10.1) {
                return 1;
            }
        } else if (age === '5.5') {
            if (round(twoJump).toFixed(1) < 4.9) {
                return 5;
            } else if (round(twoJump).toFixed(1) >= 4.9 && round(twoJump).toFixed(1) <= 5.7) {
                return 4;
            } else if (round(twoJump).toFixed(1) >= 5.8 && round(twoJump).toFixed(1) <= 6.9) {
                return 3;
            } else if (round(twoJump).toFixed(1) >= 7.0 && round(twoJump).toFixed(1) <= 9.2) {
                return 2;
            } else if (round(twoJump).toFixed(1) >= 9.3) {
                return 1;
            }
        } else if (age === '6') {
            if (round(twoJump).toFixed(1) < 4.6) {
                return 5;
            } else if (round(twoJump).toFixed(1) >= 4.6 && round(twoJump).toFixed(1) <= 5.2) {
                return 4;
            } else if (round(twoJump).toFixed(1) >= 5.3 && round(twoJump).toFixed(1) <= 6.2) {
                return 3;
            } else if (round(twoJump).toFixed(1) >= 6.3 && round(twoJump).toFixed(1) <= 8.3) {
                return 2;
            } else if (round(twoJump).toFixed(1) >= 8.4) {
                return 1;
            }
        }
    }
}

function gethandsUp() {
    if (getSex() === 0) {
        if (age === '3') {
            if (round(handsUp).toFixed(0) > 40) {
                return 5;
            } else if (round(handsUp).toFixed(0) <= 40 && round(handsUp).toFixed(0) >= 19) {
                return 4;
            } else if (round(handsUp).toFixed(0) <= 18 && round(handsUp).toFixed(0) >= 7) {
                return 3;
            } else if (round(handsUp).toFixed(0) <= 6 && round(handsUp).toFixed(0) >= 2) {
                return 2;
            } else if (round(handsUp).toFixed(0) < 2) {
                return 1;
            }
        } else if (age === '3.5') {
            if (round(handsUp).toFixed(0) > 60) {
                return 5;
            } else if (round(handsUp).toFixed(0) <= 60 && round(handsUp).toFixed(0) >= 30) {
                return 4;
            } else if (round(handsUp).toFixed(0) <= 29 && round(handsUp).toFixed(0) >= 12) {
                return 3;
            } else if (round(handsUp).toFixed(0) <= 11 && round(handsUp).toFixed(0) >= 4) {
                return 2;
            } else if (round(handsUp).toFixed(0) < 4) {
                return 1;
            }
        } else if (age === '4') {
            if (round(handsUp).toFixed(0) > 73) {
                return 5;
            } else if (round(handsUp).toFixed(0) <= 73 && round(handsUp).toFixed(0) >= 38) {
                return 4;
            } else if (round(handsUp).toFixed(0) <= 37 && round(handsUp).toFixed(0) >= 17) {
                return 3;
            } else if (round(handsUp).toFixed(0) <= 16 && round(handsUp).toFixed(0) >= 5) {
                return 2;
            } else if (round(handsUp).toFixed(0) < 5) {
                return 1;
            }
        } else if (age === '4.5') {
            if (round(handsUp).toFixed(0) > 108) {
                return 5;
            } else if (round(handsUp).toFixed(0) <= 108 && round(handsUp).toFixed(0) >= 54) {
                return 4;
            } else if (round(handsUp).toFixed(0) <= 53 && round(handsUp).toFixed(0) >= 25) {
                return 3;
            } else if (round(handsUp).toFixed(0) <= 24 && round(handsUp).toFixed(0) >= 9) {
                return 2;
            } else if (round(handsUp).toFixed(0) < 9) {
                return 1;
            }
        } else if (age === '5') {
            if (round(handsUp).toFixed(0) > 125) {
                return 5;
            } else if (round(handsUp).toFixed(0) <= 125 && round(handsUp).toFixed(0) >= 64) {
                return 4;
            } else if (round(handsUp).toFixed(0) <= 63 && round(handsUp).toFixed(0) >= 31) {
                return 3;
            } else if (round(handsUp).toFixed(0) <= 30 && round(handsUp).toFixed(0) >= 11) {
                return 2;
            } else if (round(handsUp).toFixed(0) < 11) {
                return 1;
            }
        } else if (age === '5.5') {
            if (round(handsUp).toFixed(0) > 153) {
                return 5;
            } else if (round(handsUp).toFixed(0) <= 153 && round(handsUp).toFixed(0) >= 76) {
                return 4;
            } else if (round(handsUp).toFixed(0) <= 75 && round(handsUp).toFixed(0) >= 36) {
                return 3;
            } else if (round(handsUp).toFixed(0) <= 35 && round(handsUp).toFixed(0) >= 14) {
                return 2;
            } else if (round(handsUp).toFixed(0) < 14) {
                return 1;
            }
        } else if (age === '6') {
            if (round(handsUp).toFixed(0) > 163) {
                return 5;
            } else if (round(handsUp).toFixed(0) <= 163 && round(handsUp).toFixed(0) >= 86) {
                return 4;
            } else if (round(handsUp).toFixed(0) <= 85 && round(handsUp).toFixed(0) >= 41) {
                return 3;
            } else if (round(handsUp).toFixed(0) <= 40 && round(handsUp).toFixed(0) >= 17) {
                return 2;
            } else if (round(handsUp).toFixed(0) < 17) {
                return 1;
            }
        }
    } else {
        if (age === '3') {
            if (round(handsUp).toFixed(0) > 41) {
                return 5;
            } else if (round(handsUp).toFixed(0) <= 41 && round(handsUp).toFixed(0) >= 19) {
                return 4;
            } else if (round(handsUp).toFixed(0) <= 18 && round(handsUp).toFixed(0) >= 7) {
                return 3;
            } else if (round(handsUp).toFixed(0) <= 6 && round(handsUp).toFixed(0) >= 2) {
                return 2;
            } else if (round(handsUp).toFixed(0) < 2) {
                return 1;
            }
        } else if (age === '3.5') {
            if (round(handsUp).toFixed(0) > 61) {
                return 5;
            } else if (round(handsUp).toFixed(0) <= 61 && round(handsUp).toFixed(0) >= 29) {
                return 4;
            } else if (round(handsUp).toFixed(0) <= 28 && round(handsUp).toFixed(0) >= 12) {
                return 3;
            } else if (round(handsUp).toFixed(0) <= 11 && round(handsUp).toFixed(0) >= 4) {
                return 2;
            } else if (round(handsUp).toFixed(0) < 4) {
                return 1;
            }
        } else if (age === '4') {
            if (round(handsUp).toFixed(0) > 77) {
                return 5;
            } else if (round(handsUp).toFixed(0) <= 77 && round(handsUp).toFixed(0) >= 36) {
                return 4;
            } else if (round(handsUp).toFixed(0) <= 35 && round(handsUp).toFixed(0) >= 16) {
                return 3;
            } else if (round(handsUp).toFixed(0) <= 15 && round(handsUp).toFixed(0) >= 5) {
                return 2;
            } else if (round(handsUp).toFixed(0) < 5) {
                return 1;
            }
        } else if (age === '4.5') {
            if (round(handsUp).toFixed(0) > 102) {
                return 5;
            } else if (round(handsUp).toFixed(0) <= 102 && round(handsUp).toFixed(0) >= 53) {
                return 4;
            } else if (round(handsUp).toFixed(0) <= 52 && round(handsUp).toFixed(0) >= 25) {
                return 3;
            } else if (round(handsUp).toFixed(0) <= 24 && round(handsUp).toFixed(0) >= 9) {
                return 2;
            } else if (round(handsUp).toFixed(0) < 9) {
                return 1;
            }
        } else if (age === '5') {
            if (round(handsUp).toFixed(0) > 125) {
                return 5;
            } else if (round(handsUp).toFixed(0) <= 125 && round(handsUp).toFixed(0) >= 64) {
                return 4;
            } else if (round(handsUp).toFixed(0) <= 63 && round(handsUp).toFixed(0) >= 32) {
                return 3;
            } else if (round(handsUp).toFixed(0) <= 31 && round(handsUp).toFixed(0) >= 13) {
                return 2;
            } else if (round(handsUp).toFixed(0) < 13) {
                return 1;
            }
        } else if (age === '5.5') {
            if (round(handsUp).toFixed(0) > 138) {
                return 5;
            } else if (round(handsUp).toFixed(0) <= 138 && round(handsUp).toFixed(0) >= 68) {
                return 4;
            } else if (round(handsUp).toFixed(0) <= 67 && round(handsUp).toFixed(0) >= 35) {
                return 3;
            } else if (round(handsUp).toFixed(0) <= 34 && round(handsUp).toFixed(0) >= 15) {
                return 2;
            } else if (round(handsUp).toFixed(0) < 15) {
                return 1;
            }
        } else if (age === '6') {
            if (round(handsUp).toFixed(0) > 148) {
                return 5;
            } else if (round(handsUp).toFixed(0) <= 148 && round(handsUp).toFixed(0) >= 72) {
                return 4;
            } else if (round(handsUp).toFixed(0) <= 71 && round(handsUp).toFixed(0) >= 38) {
                return 3;
            } else if (round(handsUp).toFixed(0) <= 37 && round(handsUp).toFixed(0) >= 17) {
                return 2;
            } else if (round(handsUp).toFixed(0) < 17) {
                return 1;
            }
        }
    }

}

function getSingleLeg() {
    if (getSex() === 0) {
        if (age === '3') {
            if (round(singleLeg).toFixed(0) > 20) {
                return 5;
            } else if (round(singleLeg).toFixed(0) <= 20 && round(singleLeg).toFixed(0) >= 11) {
                return 4;
            } else if (round(singleLeg).toFixed(0) <= 10 && round(singleLeg).toFixed(0) >= 7) {
                return 3;
            } else if (round(singleLeg).toFixed(0) <= 6 && round(singleLeg).toFixed(0) >= 2) {
                return 2;
            } else if (round(singleLeg).toFixed(0) < 2) {
                return 1;
            }
        } else if (age === '3.5') {
            if (round(singleLeg).toFixed(0) > 40) {
                return 5;
            } else if (round(singleLeg).toFixed(0) <= 40 && round(singleLeg).toFixed(0) >= 23) {
                return 4;
            } else if (round(singleLeg).toFixed(0) <= 22 && round(singleLeg).toFixed(0) >= 12) {
                return 3;
            } else if (round(singleLeg).toFixed(0) <= 11 && round(singleLeg).toFixed(0) >= 4) {
                return 2;
            } else if (round(singleLeg).toFixed(0) < 4) {
                return 1;
            }
        } else if (age === '4') {
            if (round(singleLeg).toFixed(0) > 54) {
                return 5;
            } else if (round(singleLeg).toFixed(0) <= 53 && round(singleLeg).toFixed(0) >= 38) {
                return 4;
            } else if (round(singleLeg).toFixed(0) <= 37 && round(singleLeg).toFixed(0) >= 16) {
                return 3;
            } else if (round(singleLeg).toFixed(0) <= 15 && round(singleLeg).toFixed(0) >= 5) {
                return 2;
            } else if (round(singleLeg).toFixed(0) < 5) {
                return 1;
            }
        } else if (age === '4.5') {
            if (round(singleLeg).toFixed(0) > 68) {
                return 5;
            } else if (round(singleLeg).toFixed(0) <= 68 && round(singleLeg).toFixed(0) >= 44) {
                return 4;
            } else if (round(singleLeg).toFixed(0) <= 43 && round(singleLeg).toFixed(0) >= 25) {
                return 3;
            } else if (round(singleLeg).toFixed(0) <= 24 && round(singleLeg).toFixed(0) >= 9) {
                return 2;
            } else if (round(singleLeg).toFixed(0) < 9) {
                return 1;
            }
        } else if (age === '5') {
            if (round(singleLeg).toFixed(0) > 85) {
                return 5;
            } else if (round(singleLeg).toFixed(0) <= 85 && round(singleLeg).toFixed(0) >= 54) {
                return 4;
            } else if (round(singleLeg).toFixed(0) <= 53 && round(singleLeg).toFixed(0) >= 31) {
                return 3;
            } else if (round(singleLeg).toFixed(0) <= 30 && round(singleLeg).toFixed(0) >= 11) {
                return 2;
            } else if (round(singleLeg).toFixed(0) < 11) {
                return 1;
            }
        } else if (age === '5.5') {
            if (round(singleLeg).toFixed(0) > 93) {
                return 5;
            } else if (round(singleLeg).toFixed(0) <= 93 && round(singleLeg).toFixed(0) >= 66) {
                return 4;
            } else if (round(singleLeg).toFixed(0) <= 65 && round(singleLeg).toFixed(0) >= 36) {
                return 3;
            } else if (round(singleLeg).toFixed(0) <= 35 && round(singleLeg).toFixed(0) >= 14) {
                return 2;
            } else if (round(singleLeg).toFixed(0) < 14) {
                return 1;
            }
        } else if (age === '6') {
            if (round(singleLeg).toFixed(0) > 103) {
                return 5;
            } else if (round(singleLeg).toFixed(0) <= 103 && round(singleLeg).toFixed(0) >= 76) {
                return 4;
            } else if (round(singleLeg).toFixed(0) <= 75 && round(singleLeg).toFixed(0) >= 41) {
                return 3;
            } else if (round(singleLeg).toFixed(0) <= 40 && round(singleLeg).toFixed(0) >= 17) {
                return 2;
            } else if (round(singleLeg).toFixed(0) < 17) {
                return 1;
            }
        }
    } else {
        if (age === '3') {
            if (round(singleLeg).toFixed(0) > 21) {
                return 5;
            } else if (round(singleLeg).toFixed(0) <= 21 && round(singleLeg).toFixed(0) >= 11) {
                return 4;
            } else if (round(singleLeg).toFixed(0) <= 10 && round(singleLeg).toFixed(0) >= 7) {
                return 3;
            } else if (round(singleLeg).toFixed(0) <= 6 && round(singleLeg).toFixed(0) >= 2) {
                return 2;
            } else if (round(singleLeg).toFixed(0) < 2) {
                return 1;
            }
        } else if (age === '3.5') {
            if (round(singleLeg).toFixed(0) > 41) {
                return 5;
            } else if (round(singleLeg).toFixed(0) <= 41 && round(singleLeg).toFixed(0) >= 21) {
                return 4;
            } else if (round(singleLeg).toFixed(0) <= 20 && round(singleLeg).toFixed(0) >= 12) {
                return 3;
            } else if (round(singleLeg).toFixed(0) <= 11 && round(singleLeg).toFixed(0) >= 4) {
                return 2;
            } else if (round(singleLeg).toFixed(0) < 4) {
                return 1;
            }
        } else if (age === '4') {
            if (round(singleLeg).toFixed(0) > 57) {
                return 5;
            } else if (round(singleLeg).toFixed(0) <= 57 && round(singleLeg).toFixed(0) >= 36) {
                return 4;
            } else if (round(singleLeg).toFixed(0) <= 35 && round(singleLeg).toFixed(0) >= 17) {
                return 3;
            } else if (round(singleLeg).toFixed(0) <= 16 && round(singleLeg).toFixed(0) >= 5) {
                return 2;
            } else if (round(singleLeg).toFixed(0) < 5) {
                return 1;
            }
        } else if (age === '4.5') {
            if (round(singleLeg).toFixed(0) > 62) {
                return 5;
            } else if (round(singleLeg).toFixed(0) <= 62 && round(singleLeg).toFixed(0) >= 43) {
                return 4;
            } else if (round(singleLeg).toFixed(0) <= 42 && round(singleLeg).toFixed(0) >= 25) {
                return 3;
            } else if (round(singleLeg).toFixed(0) <= 24 && round(singleLeg).toFixed(0) >= 9) {
                return 2;
            } else if (round(singleLeg).toFixed(0) < 9) {
                return 1;
            }
        } else if (age === '5') {
            if (round(singleLeg).toFixed(0) > 71) {
                return 5;
            } else if (round(singleLeg).toFixed(0) <= 71 && round(singleLeg).toFixed(0) >= 54) {
                return 4;
            } else if (round(singleLeg).toFixed(0) <= 53 && round(singleLeg).toFixed(0) >= 31) {
                return 3;
            } else if (round(singleLeg).toFixed(0) <= 30 && round(singleLeg).toFixed(0) >= 11) {
                return 2;
            } else if (round(singleLeg).toFixed(0) < 11) {
                return 1;
            }
        } else if (age === '5.5') {
            if (round(singleLeg).toFixed(0) > 77) {
                return 5;
            } else if (round(singleLeg).toFixed(0) <= 77 && round(singleLeg).toFixed(0) >= 64) {
                return 4;
            } else if (round(singleLeg).toFixed(0) <= 63 && round(singleLeg).toFixed(0) >= 36) {
                return 3;
            } else if (round(singleLeg).toFixed(0) <= 35 && round(singleLeg).toFixed(0) >= 14) {
                return 2;
            } else if (round(singleLeg).toFixed(0) < 14) {
                return 1;
            }
        } else if (age === '6') {
            if (round(singleLeg).toFixed(0) > 88) {
                return 5;
            } else if (round(singleLeg).toFixed(0) <= 88 && round(singleLeg).toFixed(0) >= 66) {
                return 4;
            } else if (round(singleLeg).toFixed(0) <= 65 && round(singleLeg).toFixed(0) >= 38) {
                return 3;
            } else if (round(singleLeg).toFixed(0) <= 37 && round(singleLeg).toFixed(0) >= 17) {
                return 2;
            } else if (round(singleLeg).toFixed(0) < 17) {
                return 1;
            }
        }
    }
}

//综合评定分
function getFormatScore(temp) {
    if (parseInt(temp) >= 80) {
        return "表现优秀, 望继续保持。";
    } else if (parseInt(temp) <= 79 && parseInt(temp) >= 60) {
        return "表现良好, 望继续保持。";
    } else if (parseInt(temp) <= 59 && parseInt(temp) >= 40) {
        return "表现正常, 有待进一步提高，并进行针对性的长期练习。";
    } else if (parseInt(temp) <= 39 && parseInt(temp) >= 20) {
        return "发展稍弱, 需进行针对性的长期练习。";
    }else if (parseInt(temp) <20) {
        return "发展较弱, 需进行针对性的长期练习。";
    }
}

//综合评定分
function getFormatScoreLM(temp) {
    if (parseInt(temp) >= 80) {
        return "表现优秀, 望继续保持。";
    } else if (parseInt(temp) <= 79 && parseInt(temp) >= 60) {
        return "表现良好, 望继续保持。";
    } else if (parseInt(temp) <= 59 && parseInt(temp) >= 40) {
        return "表现正常, 有待进一步提高，并进行综合性全面练习。";
    } else if (parseInt(temp) <= 39 && parseInt(temp) >= 20) {
        return "表现稍弱，需进行综合性全面练习。";
    }else if (parseInt(temp) <20) {
        return "表现较弱，需进行综合性全面练习。";
    }
}

function getTNEvaluation() {
    var str = '<li>从测试各项测试结果来看，' + name + '小朋友:</li>';
    var YXtemp = "";
    if (parseInt(runScore) > 4) {
        YXtemp += "十米往返跑、";
    }
    if (parseInt(longJumpScore) > 4) {
        YXtemp += "立定跳远、";
    }
    if (parseInt(throwScore) > 4) {
        YXtemp += "网球投掷、";
    }
    if (parseInt(twoJumpScore) > 4) {
        YXtemp += "双脚连续跳、";
    }
    if(age>=5){
        if (parseInt(oneJumpScore) > 4) {
            YXtemp += "单脚连续跳、";
        }
    }
    if (parseInt(balanceScore) > 4) {
        YXtemp += "走平衡木、";
    }
    if (parseInt(singleLegScore) > 4) {
        YXtemp += "闭眼单足立、";
    }
    if (parseInt(bodyFlexionScore) > 4) {
        YXtemp += "坐卧体前屈、";
    }
    if (parseInt(handsUpScore) > 4) {
        YXtemp += "双手正撑、";
    }
    if (YXtemp != "") {
        str += '<li><span style="font-weight: bold">' + YXtemp.substr(0, YXtemp.length - 1) + '</span>达到优秀水平;</li>';
    }


    var LHtemp = "";
    if (parseInt(runScore) == 4) {
        LHtemp += "十米往返跑、";
    }
    if (parseInt(longJumpScore) == 4) {
        LHtemp += "立定跳远、";
    }
    if (parseInt(throwScore) == 4) {
        LHtemp += "网球投掷、";
    }
    if (parseInt(twoJumpScore) == 4) {
        LHtemp += "双脚连续跳、";
    }
    if(age>=5){
        if (parseInt(oneJumpScore) == 4) {
            LHtemp += "单脚连续跳、";
        }
    }
    if (parseInt(balanceScore) == 4) {
        LHtemp += "走平衡木、";
    }
    if (parseInt(singleLegScore) == 4) {
        LHtemp += "闭眼单足立、";
    }
    if (parseInt(bodyFlexionScore) == 4) {
        LHtemp += "坐卧体前屈、";
    }
    if (parseInt(handsUpScore) == 4) {
        LHtemp += "双手正撑、";
    }
    if (LHtemp != "") {
        str += '<li><span style="font-weight: bold">' + LHtemp.substr(0, LHtemp.length - 1) + '</span>达到良好水平;</li>';
    }

    var HGtemp = "";
    if (parseInt(runScore) == 3) {
        HGtemp += "十米往返跑、";
    }
    if (parseInt(longJumpScore) == 3) {
        HGtemp += "立定跳远、";
    }
    if (parseInt(throwScore) == 3) {
        HGtemp += "网球投掷、";
    }
    if (parseInt(twoJumpScore) == 3) {
        HGtemp += "双脚连续跳、";
    }
    if(age>=5){
        if (parseInt(oneJumpScore) == 3) {
            HGtemp += "单脚连续跳、";
        }
    }
    if (parseInt(balanceScore) == 3) {
        HGtemp += "走平衡木、";
    }
    if (parseInt(singleLegScore) == 3) {
        HGtemp += "闭眼单足立、";
    }
    if (parseInt(bodyFlexionScore) == 3) {
        HGtemp += "坐卧体前屈、";
    }
    if (parseInt(handsUpScore) == 3) {
        HGtemp += "双手正撑、";
    }
    if (HGtemp != "") {
        str += '<li><span style="font-weight: bold">' + HGtemp.substr(0, HGtemp.length - 1) + '</span>达到合格水平;</li>';
    }


    var Dtemp = "";
    if (parseInt(runScore) <= 2) {
        Dtemp += "十米往返跑、";
    }
    if (parseInt(longJumpScore) <= 2) {
        Dtemp += "立定跳远、";
    }
    if (parseInt(throwScore) <= 2) {
        Dtemp += "网球投掷、";
    }
    if (parseInt(twoJumpScore) <= 2) {
        Dtemp += "双脚连续跳、";
    }
    if(age>=5){
        if (parseInt(oneJumpScore) <= 2) {
            Dtemp += "单脚连续跳、";
        }
    }
    if (parseInt(balanceScore) <= 2) {
        Dtemp += "走平衡木、";
    }
    if (parseInt(singleLegScore) <= 2) {
        Dtemp += "闭眼单足立、";
    }
    if (parseInt(bodyFlexionScore) <= 2) {
        Dtemp += "坐卧体前屈、";
    }
    if (parseInt(handsUpScore) <= 2) {
        Dtemp += "双手正撑、";
    }
    if (Dtemp != "") {
        str += '<li><span style="font-weight: bold">' + Dtemp.substr(0, Dtemp.length - 1) + '</span>分数略低，该幼儿还需努力并加强相应项目练习。</li>';
    }

    var XLnengli = "";

    if (flexibility < 60) {
        XLnengli += "柔韧性、";
    }
    if (upperLimbStrength < 60) {
        XLnengli += "上肢力量、";
    }
    if (lowerLimbStrength < 60) {
        XLnengli += "下肢力量、";
    }
    if (balanceAbility < 60) {
        XLnengli += "走平衡木、";
    }

    $("#TNEvaluation").html(str);
}


function getActivityPlan() {
    var XLnengli = "";
    var temp = "";
    if (flexibility < 60) {
        XLnengli += '<li>前滚翻、足跟竞走、劈叉拍球</li>';
        temp += "柔韧性、";
    }
    if (upperLimbStrength < 60) {
        XLnengli += '<li>跳马、投掷、正撑拉车</li>';
        temp += "上肢力量、";
    }
    if (lowerLimbStrength < 60) {
        XLnengli += '<li>青蛙屈膝跳、仰卧蹬球、慢跑</li>';
        temp += "下肢力量、";
    }
    if (balanceAbility < 60) {
        XLnengli += '<li>单脚跳、闭眼单足立、走平衡木</li>';
        temp += "平衡能力、";
    }
    if (XLnengli == "") {
        XLnengli += '<li>该幼儿各项测试均达标，体能发展较为正常。在下学期，望家长积极配合幼儿园，共同帮助幼儿提高身体素质，让幼儿体能得到适当、充分的发展。</li>';
        $("#ActivityPlan").html(XLnengli);
    } else {
        XLnengli += '<li>在下学期，我们将针对该幼儿的<span style="font-weight: bold">' + temp.substr(0, temp.length - 1) + '</span>进行着重训练。</li>';
        XLnengli += '<li>望家长积极配合幼儿园，共同帮助幼儿提高身体素质，让幼儿体能得到适当、充分的发展。</li>';
        $("#ActivityPlan").html(XLnengli);
    }

}

function getSensitiveQuality() {
    var list = ['【无机盐】如牛奶、动物肝脏、绿色蔬菜、豆制品、紫菜等。', '【维生素】如柑橘、苹果、猕猴桃、西红柿、萝卜等。', '【有机化合物、矿物质、微量元素】合理搭配粗、杂粮。', '【钙质食物】如芝麻、黄花菜、萝卜、海带、芥菜、虾皮等。以及排骨汤或骨头汤。'];
    var XLnengli = "";
    if (sensitiveQuality >= 80) {
        XLnengli = '<li>' + list[1] + '</li><li>' + list[3] + '</li>';
    } else if (sensitiveQuality >= 60 && sensitiveQuality <= 79) {
        XLnengli = '<li>' + list[2] + '</li><li>' + list[3] + '</li>';
    } else if (sensitiveQuality >= 40 && sensitiveQuality <= 59) {
        XLnengli = '<li>' + list[1] + '</li><li>' + list[2] + '</li><li>' + list[3] + '</li>';
    } else if (sensitiveQuality <= 39) {
        XLnengli = '<li>' + list[0] + '</li><li>' + list[1] + '</li><li>' + list[2] + '</li><li>' + list[3] + '</li>';
    }

    $("#NutritionAdvice").html(XLnengli);
}


function echart() {
    var myChart = echarts.init(document.getElementById('main'));
    option = {
        title: {
            text: '综合评定分析'
        },
        tooltip: {},
        radar: {
            // shape: 'circle',
            name: {
                textStyle: {
                    color: '#fff',
                    backgroundColor: '#999',
                    borderRadius: 3,
                    padding: [3, 5]
                }
            },
            indicator: [
                {name: '柔韧性', max: 100},
                {name: '下肢力量', max: 100},
                {name: '平衡素质', max: 100},
                {name: '灵敏素质', max: 100},
                {name: '上肢力量', max: 100}
            ]
        },
        series: [{
            name: '综合评定分析',
            type: 'radar',
            // areaStyle: {normal: {}},
            data: [
                {
                    value: [flexibility, lowerLimbStrength, balanceAbility, sensitiveQuality, upperLimbStrength],
                    name: '综合评定分析'
                }
            ]
        }]
    };

    //使用制定的配置项和数据显示图表
    myChart.setOption(option);

    setTimeout(function () {
        download("#reportContent");
    }, 500)
}

function echart2() {
    var myChart = echarts.init(document.getElementById('main'));
    option = {
        tooltip: {
            trigger: 'axis'
        },
        radar: [
            {
                indicator: [
                    {name: '柔韧性', max: 100},
                    {name: '灵敏素质', max: 100},
                    {name: '平衡素质', max: 100},
                    {name: '下肢力量', max: 100},
                    {name: '上肢力量', max: 100}
                ],
                center: ['50%', '40%'],
                radius: 100,
                splitLine: {
                    lineStyle: {
                        width: 4,
                        color: '#080808' // 图表背景网格线的颜色
                    }
                },
                axisLine: {
                    lineStyle: {
                        width: 4,
                        color: '#080808'
                    }
                }
            }
        ],
        series: [
            {
                type: 'radar',
                tooltip: {
                    trigger: 'item'
                },
                itemStyle: {
                    normal: {
                        color: "#080808", areaStyle: {type: 'default'}, lineStyle: {
                            color: "white"
                            // 图表中各个图区域的边框线颜色
                        }
                    }
                },
                data: [
                    {
                        value: [flexibility, sensitiveQuality, balanceAbility, lowerLimbStrength, upperLimbStrength],
                        name: '综合评定分析'
                    }
                ],
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: 'default',
                            opacity: 0.8, // 图表中各个图区域的透明度
                            color: "#ed9578" // 图表中各个图区域的颜色
                        }

                    }

                },
            }
        ]
    };

    //使用制定的配置项和数据显示图表
    myChart.setOption(option);

    setTimeout(function () {
        download("#reportContent");
    }, 500)
}


function round(number){
    return Math.round(number * 10) / 10;
}




