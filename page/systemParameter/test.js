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
$(function () {
    $("#click").click(function (e) {
        initData();
    });

    $("#reset").click(function (e) {
        $("#resetForm")[0].reset();
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
    $("#runScope").text(parseFloat(run).toFixed(2) + " s");
    $("#runScope").next().text(runScore + " 分");

    $("#longJumpScore").text(parseFloat(longJump).toFixed(2) + " cm");
    $("#longJumpScore").next().text(longJumpScore + " 分");

    if (age >= 5) {
        $("#oneJumpScore").text(parseFloat(oneJump).toFixed(2) + " s");
        $("#oneJumpScore").next().text(oneJumpScore + " 分");
    }


    $("#twoJumpScore").text(parseFloat(twoJump).toFixed(2) + " s");
    $("#twoJumpScore").next().text(twoJumpScore + " 分");

    $("#bodyFlexionScore").text(parseFloat(bodyFlexion).toFixed(2) + " cm");
    $("#bodyFlexionScore").next().text(bodyFlexionScore + " 分");


    $("#balanceScore").text(parseFloat(balance).toFixed(2) + " s");
    $("#balanceScore").next().text(balanceScore + " 分");


    $("#throwScore").text(parseFloat(throwR).toFixed(2) + " m");
    $("#throwScore").next().text(throwScore + " 分");

    $("#handsUpScore").text(parseFloat(handsUp).toFixed(2) + " s");
    $("#handsUpScore").next().text(handsUpScore + " 分");

    $("#singleLegScore").text(parseFloat(singleLeg).toFixed(2) + " s");
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
            if (parseFloat(run).toFixed(1) < 8.0) {
                return 5;
            } else if (parseFloat(run).toFixed(1) >= 8.0 && parseFloat(run).toFixed(1) <= 9.0) {
                return 4;
            } else if (parseFloat(run).toFixed(1) >= 9.1 && parseFloat(run).toFixed(1) <= 10.2) {
                return 3;
            } else if (parseFloat(run).toFixed(1) >= 10.3 && parseFloat(run).toFixed(1) <= 12.8) {
                return 2;
            } else if (parseFloat(run).toFixed(1) >= 12.9) {
                return 1;
            }
        } else if (age === '3.5') {
            if (parseFloat(run).toFixed(1) < 7.5) {
                return 5;
            } else if (parseFloat(run).toFixed(1) >= 7.5 && parseFloat(run).toFixed(1) <= 8.3) {
                return 4;
            } else if (parseFloat(run).toFixed(1) >= 8.4 && parseFloat(run).toFixed(1) <= 9.4) {
                return 3;
            } else if (parseFloat(run).toFixed(1) >= 9.5 && parseFloat(run).toFixed(1) <= 11.3) {
                return 2;
            } else if (parseFloat(run).toFixed(1) >= 11.4) {
                return 1;
            }
        } else if (age === '4') {
            if (parseFloat(run).toFixed(1) < 6.9) {
                return 5;
            } else if (parseFloat(run).toFixed(1) >= 6.9 && parseFloat(run).toFixed(1) <= 7.6) {
                return 4;
            } else if (parseFloat(run).toFixed(1) >= 7.7 && parseFloat(run).toFixed(1) <= 8.5) {
                return 3;
            } else if (parseFloat(run).toFixed(1) >= 8.6 && parseFloat(run).toFixed(1) <= 10.1) {
                return 2;
            } else if (parseFloat(run).toFixed(1) >= 10.2) {
                return 1;
            }
        } else if (age === '4.5') {
            if (parseFloat(run).toFixed(1) < 6.7) {
                return 5;
            } else if (parseFloat(run).toFixed(1) >= 6.7 && parseFloat(run).toFixed(1) <= 7.2) {
                return 4;
            } else if (parseFloat(run).toFixed(1) >= 7.3 && parseFloat(run).toFixed(1) <= 8.0) {
                return 3;
            } else if (parseFloat(run).toFixed(1) >= 8.1 && parseFloat(run).toFixed(1) <= 9.7) {
                return 2;
            } else if (parseFloat(run).toFixed(1) >= 9.8) {
                return 1;
            }
        } else if (age === '5') {
            if (parseFloat(run).toFixed(1) < 6.4) {
                return 5;
            } else if (parseFloat(run).toFixed(1) >= 6.4 && parseFloat(run).toFixed(1) <= 6.9) {
                return 4;
            } else if (parseFloat(run).toFixed(1) >= 7.0 && parseFloat(run).toFixed(1) <= 7.6) {
                return 3;
            } else if (parseFloat(run).toFixed(1) >= 7.7 && parseFloat(run).toFixed(1) <= 8.9) {
                return 2;
            } else if (parseFloat(run).toFixed(1) >= 9.0) {
                return 1;
            }
        } else if (age === '5.5') {
            if (parseFloat(run).toFixed(1) < 6.2) {
                return 5;
            } else if (parseFloat(run).toFixed(1) >= 6.2 && parseFloat(run).toFixed(1) <= 6.7) {
                return 4;
            } else if (parseFloat(run).toFixed(1) >= 6.8 && parseFloat(run).toFixed(1) <= 7.3) {
                return 3;
            } else if (parseFloat(run).toFixed(1) >= 7.4 && parseFloat(run).toFixed(1) <= 8.5) {
                return 2;
            } else if (parseFloat(run).toFixed(1) >= 8.6) {
                return 1;
            }
        } else if (age === '6') {
            if (parseFloat(run).toFixed(1) < 5.8) {
                return 5;
            } else if (parseFloat(run).toFixed(1) >= 5.8 && parseFloat(run).toFixed(1) <= 6.2) {
                return 4;
            } else if (parseFloat(run).toFixed(1) >= 6.3 && parseFloat(run).toFixed(1) <= 6.8) {
                return 3;
            } else if (parseFloat(run).toFixed(1) >= 6.9 && parseFloat(run).toFixed(1) <= 7.9) {
                return 2;
            } else if (parseFloat(run).toFixed(1) >= 8.0) {
                return 1;
            }
        }
    } else {
        if (age === '3') {
            if (parseFloat(run).toFixed(1) < 8.2) {
                return 5;
            } else if (parseFloat(run).toFixed(1) >= 8.2 && parseFloat(run).toFixed(1) <= 9.3) {
                return 4;
            } else if (parseFloat(run).toFixed(1) >= 9.4 && parseFloat(run).toFixed(1) <= 10.5) {
                return 3;
            } else if (parseFloat(run).toFixed(1) >= 10.6 && parseFloat(run).toFixed(1) <= 13.4) {
                return 2;
            } else if (parseFloat(run).toFixed(1) >= 13.5) {
                return 1;
            }
        } else if (age === '3.5') {
            if (parseFloat(run).toFixed(1) < 7.7) {
                return 5;
            } else if (parseFloat(run).toFixed(1) >= 7.7 && parseFloat(run).toFixed(1) <= 8.6) {
                return 4;
            } else if (parseFloat(run).toFixed(1) >= 8.7 && parseFloat(run).toFixed(1) <= 9.7) {
                return 3;
            } else if (parseFloat(run).toFixed(1) >= 9.8 && parseFloat(run).toFixed(1) <= 12.0) {
                return 2;
            } else if (parseFloat(run).toFixed(1) >= 12.1) {
                return 1;
            }
        } else if (age === '4') {
            if (parseFloat(run).toFixed(1) < 7.2) {
                return 5;
            } else if (parseFloat(run).toFixed(1) >= 7.2 && parseFloat(run).toFixed(1) <= 8.0) {
                return 4;
            } else if (parseFloat(run).toFixed(1) >= 8.1 && parseFloat(run).toFixed(1) <= 9.0) {
                return 3;
            } else if (parseFloat(run).toFixed(1) >= 9.1 && parseFloat(run).toFixed(1) <= 10.8) {
                return 2;
            } else if (parseFloat(run).toFixed(1) >= 10.9) {
                return 1;
            }
        } else if (age === '4.5') {
            if (parseFloat(run).toFixed(1) < 7.0) {
                return 5;
            } else if (parseFloat(run).toFixed(1) >= 7.0 && parseFloat(run).toFixed(1) <= 7.6) {
                return 4;
            } else if (parseFloat(run).toFixed(1) >= 7.7 && parseFloat(run).toFixed(1) <= 8.5) {
                return 3;
            } else if (parseFloat(run).toFixed(1) >= 8.6 && parseFloat(run).toFixed(1) <= 10.2) {
                return 2;
            } else if (parseFloat(run).toFixed(1) >= 10.3) {
                return 1;
            }
        } else if (age === '5') {
            if (parseFloat(run).toFixed(1) < 6.7) {
                return 5;
            } else if (parseFloat(run).toFixed(1) >= 6.7 && parseFloat(run).toFixed(1) <= 7.2) {
                return 4;
            } else if (parseFloat(run).toFixed(1) >= 7.3 && parseFloat(run).toFixed(1) <= 8.0) {
                return 3;
            } else if (parseFloat(run).toFixed(1) >= 8.1 && parseFloat(run).toFixed(1) <= 9.6) {
                return 2;
            } else if (parseFloat(run).toFixed(1) >= 9.7) {
                return 1;
            }
        } else if (age === '5.5') {
            if (parseFloat(run).toFixed(1) < 6.4) {
                return 5;
            } else if (parseFloat(run).toFixed(1) >= 6.4 && parseFloat(run).toFixed(1) <= 6.9) {
                return 4;
            } else if (parseFloat(run).toFixed(1) >= 7.0 && parseFloat(run).toFixed(1) <= 7.6) {
                return 3;
            } else if (parseFloat(run).toFixed(1) >= 7.7 && parseFloat(run).toFixed(1) <= 9.0) {
                return 2;
            } else if (parseFloat(run).toFixed(1) >= 9.1) {
                return 1;
            }
        } else if (age === '6') {
            if (parseFloat(run).toFixed(1) < 6.1) {
                return 5;
            } else if (parseFloat(run).toFixed(1) >= 6.1 && parseFloat(run).toFixed(1) <= 6.5) {
                return 4;
            } else if (parseFloat(run).toFixed(1) >= 6.6 && parseFloat(run).toFixed(1) <= 7.2) {
                return 3;
            } else if (parseFloat(run).toFixed(1) >= 7.3 && parseFloat(run).toFixed(1) <= 8.5) {
                return 2;
            } else if (parseFloat(run).toFixed(1) >= 8.6) {
                return 1;
            }
        }
    }
}

function getLongJump() {
    if (getSex() === 0) {
        if (age === '3') {
            if (parseInt(longJump) > 76) {
                return 5;
            } else if (parseInt(longJump) <= 76 && parseInt(longJump) >= 59) {
                return 4;
            } else if (parseInt(longJump) <= 58 && parseInt(longJump) >= 43) {
                return 3;
            } else if (parseInt(longJump) <= 42 && parseInt(longJump) >= 30) {
                return 2;
            } else if (parseInt(longJump) < 30) {
                return 1;
            }
        } else if (age === '3.5') {
            if (parseInt(longJump) > 84) {
                return 5;
            } else if (parseInt(longJump) <= 84 && parseInt(longJump) >= 70) {
                return 4;
            } else if (parseInt(longJump) <= 69 && parseInt(longJump) >= 53) {
                return 3;
            } else if (parseInt(longJump) <= 52 && parseInt(longJump) >= 35) {
                return 2;
            } else if (parseInt(longJump) < 35) {
                return 1;
            }
        } else if (age === '4') {
            if (parseInt(longJump) > 95) {
                return 5;
            } else if (parseInt(longJump) <= 95 && parseInt(longJump) >= 80) {
                return 4;
            } else if (parseInt(longJump) <= 79 && parseInt(longJump) >= 65) {
                return 3;
            } else if (parseInt(longJump) <= 65 && parseInt(longJump) >= 47) {
                return 2;
            } else if (parseInt(longJump) < 47) {
                return 1;
            }
        } else if (age === '4.5') {
            if (parseInt(longJump) > 102) {
                return 5;
            } else if (parseInt(longJump) <= 102 && parseInt(longJump) >= 89) {
                return 4;
            } else if (parseInt(longJump) <= 88 && parseInt(longJump) >= 73) {
                return 3;
            } else if (parseInt(longJump) <= 72 && parseInt(longJump) >= 55) {
                return 2;
            } else if (parseInt(longJump) < 55) {
                return 1;
            }
        } else if (age === '5') {
            if (parseInt(longJump) > 110) {
                return 5;
            } else if (parseInt(longJump) <= 110 && parseInt(longJump) >= 96) {
                return 4;
            } else if (parseInt(longJump) <= 95 && parseInt(longJump) >= 80) {
                return 3;
            } else if (parseInt(longJump) <= 79 && parseInt(longJump) >= 65) {
                return 2;
            } else if (parseInt(longJump) < 65) {
                return 1;
            }
        } else if (age === '5.5') {
            if (parseInt(longJump) > 119) {
                return 5;
            } else if (parseInt(longJump) <= 119 && parseInt(longJump) >= 103) {
                return 4;
            } else if (parseInt(longJump) <= 102 && parseInt(longJump) >= 90) {
                return 3;
            } else if (parseInt(longJump) <= 89 && parseInt(longJump) >= 70) {
                return 2;
            } else if (parseInt(longJump) < 70) {
                return 1;
            }
        } else if (age === '6') {
            if (parseInt(longJump) > 127) {
                return 5;
            } else if (parseInt(longJump) <= 127 && parseInt(longJump) >= 111) {
                return 4;
            } else if (parseInt(longJump) <= 110 && parseInt(longJump) >= 95) {
                return 3;
            } else if (parseInt(longJump) <= 94 && parseInt(longJump) >= 79) {
                return 2;
            } else if (parseInt(longJump) < 79) {
                return 1;
            }
        }
    } else {
        if (age === '3') {
            if (parseInt(longJump) > 71) {
                return 5;
            } else if (parseInt(longJump) <= 71 && parseInt(longJump) >= 55) {
                return 4;
            } else if (parseInt(longJump) <= 54 && parseInt(longJump) >= 40) {
                return 3;
            } else if (parseInt(longJump) <= 39 && parseInt(longJump) >= 29) {
                return 2;
            } else if (parseInt(longJump) < 29) {
                return 1;
            }
        } else if (age === '3.5') {
            if (parseInt(longJump) > 81) {
                return 5;
            } else if (parseInt(longJump) <= 81 && parseInt(longJump) >= 65) {
                return 4;
            } else if (parseInt(longJump) <= 64 && parseInt(longJump) >= 50) {
                return 3;
            } else if (parseInt(longJump) <= 49 && parseInt(longJump) >= 34) {
                return 2;
            } else if (parseInt(longJump) < 34) {
                return 1;
            }
        } else if (age === '4') {
            if (parseInt(longJump) > 89) {
                return 5;
            } else if (parseInt(longJump) <= 89 && parseInt(longJump) >= 74) {
                return 4;
            } else if (parseInt(longJump) <= 73 && parseInt(longJump) >= 60) {
                return 3;
            } else if (parseInt(longJump) <= 59 && parseInt(longJump) >= 44) {
                return 2;
            } else if (parseInt(longJump) < 44) {
                return 1;
            }
        } else if (age === '4.5') {
            if (parseInt(longJump) > 96) {
                return 5;
            } else if (parseInt(longJump) <= 96 && parseInt(longJump) >= 81) {
                return 4;
            } else if (parseInt(longJump) <= 80 && parseInt(longJump) >= 68) {
                return 3;
            } else if (parseInt(longJump) <= 67 && parseInt(longJump) >= 50) {
                return 2;
            } else if (parseInt(longJump) < 50) {
                return 1;
            }
        } else if (age === '5') {
            if (parseInt(longJump) > 102) {
                return 5;
            } else if (parseInt(longJump) <= 102 && parseInt(longJump) >= 89) {
                return 4;
            } else if (parseInt(longJump) <= 88 && parseInt(longJump) >= 75) {
                return 3;
            } else if (parseInt(longJump) <= 74 && parseInt(longJump) >= 60) {
                return 2;
            } else if (parseInt(longJump) < 60) {
                return 1;
            }
        } else if (age === '5.5') {
            if (parseInt(longJump) > 109) {
                return 5;
            } else if (parseInt(longJump) <= 109 && parseInt(longJump) >= 96) {
                return 4;
            } else if (parseInt(longJump) <= 95 && parseInt(longJump) >= 82) {
                return 3;
            } else if (parseInt(longJump) <= 81 && parseInt(longJump) >= 66) {
                return 2;
            } else if (parseInt(longJump) < 66) {
                return 1;
            }
        } else if (age === '6') {
            if (parseInt(longJump) > 116) {
                return 5;
            } else if (parseInt(longJump) <= 116 && parseInt(longJump) >= 101) {
                return 4;
            } else if (parseInt(longJump) <= 100 && parseInt(longJump) >= 87) {
                return 3;
            } else if (parseInt(longJump) <= 86 && parseInt(longJump) >= 71) {
                return 2;
            } else if (parseInt(longJump) < 71) {
                return 1;
            }
        }
    }
}

function getThrowR() {
    if (getSex() === 0) {
        if (age === '3') {
            if (parseFloat(throwR).toFixed(1) > 5.5) {
                return 5;
            } else if (parseFloat(throwR).toFixed(1) <= 5.5 && parseFloat(throwR).toFixed(1) >= 4.0) {
                return 4;
            } else if (parseFloat(throwR).toFixed(1) <= 3.5 && parseFloat(throwR).toFixed(1) >= 3.0) {
                return 3;
            } else if (parseFloat(throwR).toFixed(1) <= 2.5 && parseFloat(throwR).toFixed(1) >= 2.0) {
                return 2;
            } else if (parseFloat(throwR).toFixed(1) < 2.0) {
                return 1;
            }
        } else if (age === '3.5') {
            if (parseFloat(throwR).toFixed(1) > 5.5) {
                return 5;
            } else if (parseFloat(throwR).toFixed(1) <= 5.5 && parseFloat(throwR).toFixed(1) >= 4.5) {
                return 4;
            } else if (parseFloat(throwR).toFixed(1) <= 4.0 && parseFloat(throwR).toFixed(1) >= 3.0) {
                return 3;
            } else if (parseFloat(throwR).toFixed(1) <= 2.5 && parseFloat(throwR).toFixed(1) >= 2.0) {
                return 2;
            } else if (parseFloat(throwR).toFixed(1) < 2.0) {
                return 1;
            }
        } else if (age === '4') {
            if (parseFloat(throwR).toFixed(1) > 6.0) {
                return 5;
            } else if (parseFloat(throwR).toFixed(1) <= 6.0 && parseFloat(throwR).toFixed(1) >= 5.0) {
                return 4;
            } else if (parseFloat(throwR).toFixed(1) <= 4.5 && parseFloat(throwR).toFixed(1) >= 4.0) {
                return 3;
            } else if (parseFloat(throwR).toFixed(1) <= 3.5 && parseFloat(throwR).toFixed(1) >= 3.0) {
                return 2;
            } else if (parseFloat(throwR).toFixed(1) < 3.0) {
                return 1;
            }
        } else if (age === '4.5') {
            if (parseFloat(throwR).toFixed(1) > 8.0) {
                return 5;
            } else if (parseFloat(throwR).toFixed(1) <= 8.0 && parseFloat(throwR).toFixed(1) >= 6.5) {
                return 4;
            } else if (parseFloat(throwR).toFixed(1) <= 6.0 && parseFloat(throwR).toFixed(1) >= 4.5) {
                return 3;
            } else if (parseFloat(throwR).toFixed(1) <= 4.0 && parseFloat(throwR).toFixed(1) >= 3.0) {
                return 2;
            } else if (parseFloat(throwR).toFixed(1) < 3.0) {
                return 1;
            }
        } else if (age === '5') {
            if (parseFloat(throwR).toFixed(1) > 9.0) {
                return 5;
            } else if (parseFloat(throwR).toFixed(1) <= 9.0 && parseFloat(throwR).toFixed(1) >= 7.5) {
                return 4;
            } else if (parseFloat(throwR).toFixed(1) <= 7.0 && parseFloat(throwR).toFixed(1) >= 5.5) {
                return 3;
            } else if (parseFloat(throwR).toFixed(1) <= 5.0 && parseFloat(throwR).toFixed(1) >= 4.0) {
                return 2;
            } else if (parseFloat(throwR).toFixed(1) < 4.0) {
                return 1;
            }
        } else if (age === '5.5') {
            if (parseFloat(throwR).toFixed(1) > 10.0) {
                return 5;
            } else if (parseFloat(throwR).toFixed(1) <= 10.0 && parseFloat(throwR).toFixed(1) >= 8.0) {
                return 4;
            } else if (parseFloat(throwR).toFixed(1) <= 7.5 && parseFloat(throwR).toFixed(1) >= 6.0) {
                return 3;
            } else if (parseFloat(throwR).toFixed(1) <= 5.5 && parseFloat(throwR).toFixed(1) >= 4.0) {
                return 2;
            } else if (parseFloat(throwR).toFixed(1) < 4.0) {
                return 1;
            }
        } else if (age === '6') {
            if (parseFloat(throwR).toFixed(1) > 12.0) {
                return 5;
            } else if (parseFloat(throwR).toFixed(1) <= 12.0 && parseFloat(throwR).toFixed(1) >= 9.5) {
                return 4;
            } else if (parseFloat(throwR).toFixed(1) <= 9.0 && parseFloat(throwR).toFixed(1) >= 7.0) {
                return 3;
            } else if (parseFloat(throwR).toFixed(1) <= 6.5 && parseFloat(throwR).toFixed(1) >= 4.5) {
                return 2;
            } else if (parseFloat(throwR).toFixed(1) < 4.5) {
                return 1;
            }
        }
    } else {
        if (age === '3') {
            if (parseFloat(throwR).toFixed(1) > 5.0) {
                return 5;
            } else if (parseFloat(throwR).toFixed(1) <= 5.0 && parseFloat(throwR).toFixed(1) >= 3.5) {
                return 4;
            } else if (parseFloat(throwR).toFixed(1) <= 3.0 && parseFloat(throwR).toFixed(1) >= 2.5) {
                return 3;
            } else if (parseFloat(throwR).toFixed(1) <= 2.0 && parseFloat(throwR).toFixed(1) >= 1.5) {
                return 2;
            } else if (parseFloat(throwR).toFixed(1) < 1.5) {
                return 1;
            }
        } else if (age === '3.5') {
            if (parseFloat(throwR).toFixed(1) > 5.0) {
                return 5;
            } else if (parseFloat(throwR).toFixed(1) <= 5.0 && parseFloat(throwR).toFixed(1) >= 4.0) {
                return 4;
            } else if (parseFloat(throwR).toFixed(1) <= 3.5 && parseFloat(throwR).toFixed(1) >= 3.0) {
                return 3;
            } else if (parseFloat(throwR).toFixed(1) <= 2.5 && parseFloat(throwR).toFixed(1) >= 2.0) {
                return 2;
            } else if (parseFloat(throwR).toFixed(1) < 2.0) {
                return 1;
            }
        } else if (age === '4') {
            if (parseFloat(throwR).toFixed(1) > 5.0) {
                return 5;
            } else if (parseFloat(throwR).toFixed(1) <= 5.0 && parseFloat(throwR).toFixed(1) >= 4.5) {
                return 4;
            } else if (parseFloat(throwR).toFixed(1) <= 4.0 && parseFloat(throwR).toFixed(1) >= 3.5) {
                return 3;
            } else if (parseFloat(throwR).toFixed(1) <= 3.0 && parseFloat(throwR).toFixed(1) >= 2.5) {
                return 2;
            } else if (parseFloat(throwR).toFixed(1) < 2.5) {
                return 1;
            }
        } else if (age === '4.5') {
            if (parseFloat(throwR).toFixed(1) > 5.5) {
                return 5;
            } else if (parseFloat(throwR).toFixed(1) <= 5.5 && parseFloat(throwR).toFixed(1) >= 4.5) {
                return 4;
            } else if (parseFloat(throwR).toFixed(1) <= 4.0 && parseFloat(throwR).toFixed(1) >= 3.5) {
                return 3;
            } else if (parseFloat(throwR).toFixed(1) <= 3.0 && parseFloat(throwR).toFixed(1) >= 2.5) {
                return 2;
            } else if (parseFloat(throwR).toFixed(1) < 2.5) {
                return 1;
            }
        } else if (age === '5') {
            if (parseFloat(throwR).toFixed(1) > 8.5) {
                return 5;
            } else if (parseFloat(throwR).toFixed(1) <= 8.5 && parseFloat(throwR).toFixed(1) >= 6.0) {
                return 4;
            } else if (parseFloat(throwR).toFixed(1) <= 5.5 && parseFloat(throwR).toFixed(1) >= 4.5) {
                return 3;
            } else if (parseFloat(throwR).toFixed(1) <= 4.0 && parseFloat(throwR).toFixed(1) >= 3.5) {
                return 2;
            } else if (parseFloat(throwR).toFixed(1) < 3.5) {
                return 1;
            }
        } else if (age === '5.5') {
            if (parseFloat(throwR).toFixed(1) > 8.5) {
                return 5;
            } else if (parseFloat(throwR).toFixed(1) <= 8.5 && parseFloat(throwR).toFixed(1) >= 6.5) {
                return 4;
            } else if (parseFloat(throwR).toFixed(1) <= 6.0 && parseFloat(throwR).toFixed(1) >= 5.0) {
                return 3;
            } else if (parseFloat(throwR).toFixed(1) <= 4.5 && parseFloat(throwR).toFixed(1) >= 3.5) {
                return 2;
            } else if (parseFloat(throwR).toFixed(1) < 3.5) {
                return 1;
            }
        } else if (age === '6') {
            if (parseFloat(throwR).toFixed(1) > 8.0) {
                return 5;
            } else if (parseFloat(throwR).toFixed(1) <= 8.0 && parseFloat(throwR).toFixed(1) >= 6.5) {
                return 4;
            } else if (parseFloat(throwR).toFixed(1) <= 6.0 && parseFloat(throwR).toFixed(1) >= 5.0) {
                return 3;
            } else if (parseFloat(throwR).toFixed(1) <= 4.5 && parseFloat(throwR).toFixed(1) >= 3.5) {
                return 2;
            } else if (parseFloat(throwR).toFixed(1) < 3.5) {
                return 1;
            }
        }
    }
}

function getBodyFlexion() {
    if (getSex() === 0) {
        if (age === '3') {
            if (parseFloat(bodyFlexion).toFixed(1) > 14.3) {
                return 5;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 14.3 && parseFloat(bodyFlexion).toFixed(1) >= 10.5) {
                return 4;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 10.4 && parseFloat(bodyFlexion).toFixed(1) >= 7.1) {
                return 3;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 7.0 && parseFloat(bodyFlexion).toFixed(1) >= 3.2) {
                return 2;
            } else if (parseFloat(bodyFlexion).toFixed(1) < 3.2) {
                return 1;
            }
        } else if (age === '3.5') {
            if (parseFloat(bodyFlexion).toFixed(1) > 14.3) {
                return 5;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 14.3 && parseFloat(bodyFlexion).toFixed(1) >= 11.0) {
                return 4;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 10.9 && parseFloat(bodyFlexion).toFixed(1) >= 7.6) {
                return 3;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 7.5 && parseFloat(bodyFlexion).toFixed(1) >= 3.3) {
                return 2;
            } else if (parseFloat(bodyFlexion).toFixed(1) < 3.3) {
                return 1;
            }
        } else if (age === '4') {
            if (parseFloat(bodyFlexion).toFixed(1) > 14.3) {
                return 5;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 14.3 && parseFloat(bodyFlexion).toFixed(1) >= 11.0) {
                return 4;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 10.9 && parseFloat(bodyFlexion).toFixed(1) >= 7.6) {
                return 3;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 7.5 && parseFloat(bodyFlexion).toFixed(1) >= 3.5) {
                return 2;
            } else if (parseFloat(bodyFlexion).toFixed(1) < 3.5) {
                return 1;
            }
        } else if (age === '4.5') {
            if (parseFloat(bodyFlexion).toFixed(1) > 14.3) {
                return 5;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 14.3 && parseFloat(bodyFlexion).toFixed(1) >= 11.0) {
                return 4;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 10.9 && parseFloat(bodyFlexion).toFixed(1) >= 8.0) {
                return 3;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 7.9 && parseFloat(bodyFlexion).toFixed(1) >= 4.2) {
                return 2;
            } else if (parseFloat(bodyFlexion).toFixed(1) < 4.2) {
                return 1;
            }
        } else if (age === '5') {
            if (parseFloat(bodyFlexion).toFixed(1) > 14.8) {
                return 5;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 14.8 && parseFloat(bodyFlexion).toFixed(1) >= 11.5) {
                return 4;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 11.4 && parseFloat(bodyFlexion).toFixed(1) >= 8.5) {
                return 3;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 8.4 && parseFloat(bodyFlexion).toFixed(1) >= 4.5) {
                return 2;
            } else if (parseFloat(bodyFlexion).toFixed(1) < 4.5) {
                return 1;
            }
        } else if (age === '5.5') {
            if (parseFloat(bodyFlexion).toFixed(1) > 14.8) {
                return 5;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 14.8 && parseFloat(bodyFlexion).toFixed(1) >= 11.6) {
                return 4;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 11.5 && parseFloat(bodyFlexion).toFixed(1) >= 8.5) {
                return 3;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 8.4 && parseFloat(bodyFlexion).toFixed(1) >= 4.7) {
                return 2;
            } else if (parseFloat(bodyFlexion).toFixed(1) < 4.7) {
                return 1;
            }
        } else if (age === '6') {
            if (parseFloat(bodyFlexion).toFixed(1) > 14.8) {
                return 5;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 14.8 && parseFloat(bodyFlexion).toFixed(1) >= 11.7) {
                return 4;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 11.6 && parseFloat(bodyFlexion).toFixed(1) >= 8.6) {
                return 3;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 8.5 && parseFloat(bodyFlexion).toFixed(1) >= 4.9) {
                return 2;
            } else if (parseFloat(bodyFlexion).toFixed(1) < 4.9) {
                return 1;
            }
        }
    } else {
        if (age === '3') {
            if (parseFloat(bodyFlexion).toFixed(1) > 15.8) {
                return 5;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 15.8 && parseFloat(bodyFlexion).toFixed(1) >= 13.0) {
                return 4;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 12.9 && parseFloat(bodyFlexion).toFixed(1) >= 10.0) {
                return 3;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 9.9 && parseFloat(bodyFlexion).toFixed(1) >= 6.3) {
                return 2;
            } else if (parseFloat(bodyFlexion).toFixed(1) < 6.3) {
                return 1;
            }
        } else if (age === '3.5') {
            if (parseFloat(bodyFlexion).toFixed(1) > 15.8) {
                return 5;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 15.8 && parseFloat(bodyFlexion).toFixed(1) >= 13.0) {
                return 4;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 12.9 && parseFloat(bodyFlexion).toFixed(1) >= 10.0) {
                return 3;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 9.9 && parseFloat(bodyFlexion).toFixed(1) >= 6.3) {
                return 2;
            } else if (parseFloat(bodyFlexion).toFixed(1) < 6.3) {
                return 1;
            }
        } else if (age === '4') {
            if (parseFloat(bodyFlexion).toFixed(1) > 15.9) {
                return 5;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 15.9 && parseFloat(bodyFlexion).toFixed(1) >= 13.5) {
                return 4;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 13.4 && parseFloat(bodyFlexion).toFixed(1) >= 11.0) {
                return 3;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 10.9 && parseFloat(bodyFlexion).toFixed(1) >= 7.0) {
                return 2;
            } else if (parseFloat(bodyFlexion).toFixed(1) < 7.0) {
                return 1;
            }
        } else if (age === '4.5') {
            if (parseFloat(bodyFlexion).toFixed(1) > 15.9) {
                return 5;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 15.9 && parseFloat(bodyFlexion).toFixed(1) >= 13.5) {
                return 4;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 13.4 && parseFloat(bodyFlexion).toFixed(1) >= 11.0) {
                return 3;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 10.9 && parseFloat(bodyFlexion).toFixed(1) >= 7.0) {
                return 2;
            } else if (parseFloat(bodyFlexion).toFixed(1) < 7.0) {
                return 1;
            }
        } else if (age === '5') {
            if (parseFloat(bodyFlexion).toFixed(1) > 16.5) {
                return 5;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 16.5 && parseFloat(bodyFlexion).toFixed(1) >= 13.9) {
                return 4;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 13.8 && parseFloat(bodyFlexion).toFixed(1) >= 11.5) {
                return 3;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 11.4 && parseFloat(bodyFlexion).toFixed(1) >= 7.3) {
                return 2;
            } else if (parseFloat(bodyFlexion).toFixed(1) < 7.3) {
                return 1;
            }
        } else if (age === '5.5') {
            if (parseFloat(bodyFlexion).toFixed(1) > 16.6) {
                return 5;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 16.6 && parseFloat(bodyFlexion).toFixed(1) >= 14.0) {
                return 4;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 13.9 && parseFloat(bodyFlexion).toFixed(1) >= 11.8) {
                return 3;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 11.7 && parseFloat(bodyFlexion).toFixed(1) >= 7.5) {
                return 2;
            } else if (parseFloat(bodyFlexion).toFixed(1) < 7.5) {
                return 1;
            }
        } else if (age === '6') {
            if (parseFloat(bodyFlexion).toFixed(1) > 16.6) {
                return 5;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 16.6 && parseFloat(bodyFlexion).toFixed(1) >= 14.0) {
                return 4;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 13.9 && parseFloat(bodyFlexion).toFixed(1) >= 11.8) {
                return 3;
            } else if (parseFloat(bodyFlexion).toFixed(1) <= 11.7 && parseFloat(bodyFlexion).toFixed(1) >= 7.5) {
                return 2;
            } else if (parseFloat(bodyFlexion).toFixed(1) < 7.5) {
                return 1;
            }
        }
    }
}


function getBalance() {
    if (getSex() === 0) {
        if (age === '3') {
            if (parseFloat(balance).toFixed(1) < 6.6) {
                return 5;
            } else if (parseFloat(balance).toFixed(1) >= 6.6 && parseFloat(balance).toFixed(1) <= 10.5) {
                return 4;
            } else if (parseFloat(balance).toFixed(1) >= 10.6 && parseFloat(twoJump) <= 16.8) {
                return 3;
            } else if (parseFloat(balance).toFixed(1) >= 16.9 && parseFloat(balance).toFixed(1) <= 30.0) {
                return 2;
            } else if (parseFloat(balance).toFixed(1) > 30.0) {
                return 1;
            }
        } else if (age === '3.5') {
            if (parseFloat(balance).toFixed(1) < 5.9) {
                return 5;
            } else if (parseFloat(balance).toFixed(1) >= 5.9 && parseFloat(balance).toFixed(1) <= 9.3) {
                return 4;
            } else if (parseFloat(balance).toFixed(1) >= 9.4 && parseFloat(balance).toFixed(1) <= 15.0) {
                return 3;
            } else if (parseFloat(balance).toFixed(1) >= 15.1 && parseFloat(balance).toFixed(1) <= 27.0) {
                return 2;
            } else if (parseFloat(balance).toFixed(1) > 27.0) {
                return 1;
            }
        } else if (age === '4') {
            if (parseFloat(balance).toFixed(1) < 4.9) {
                return 5;
            } else if (parseFloat(balance).toFixed(1) >= 4.9 && parseFloat(balance).toFixed(1) <= 7.3) {
                return 4;
            } else if (parseFloat(balance).toFixed(1) >= 7.4 && parseFloat(balance).toFixed(1) <= 11.5) {
                return 3;
            } else if (parseFloat(balance).toFixed(1) >= 11.6 && parseFloat(balance).toFixed(1) <= 21.5) {
                return 2;
            } else if (parseFloat(balance).toFixed(1) > 21.5) {
                return 1;
            }
        } else if (age === '4.5') {
            if (parseFloat(balance).toFixed(1) < 4.3) {
                return 5;
            } else if (parseFloat(balance).toFixed(1) >= 4.3 && parseFloat(balance).toFixed(1) <= 6.2) {
                return 4;
            } else if (parseFloat(balance).toFixed(1) >= 6.3 && parseFloat(balance).toFixed(1) <= 9.6) {
                return 3;
            } else if (parseFloat(balance).toFixed(1) >= 9.7 && parseFloat(balance).toFixed(1) <= 17.8) {
                return 2;
            } else if (parseFloat(balance).toFixed(1) > 17.8) {
                return 1;
            }
        } else if (age === '5') {
            if (parseFloat(balance).toFixed(1) < 3.7) {
                return 5;
            } else if (parseFloat(balance).toFixed(1) >= 3.7 && parseFloat(balance).toFixed(1) <= 5.2) {
                return 4;
            } else if (parseFloat(balance).toFixed(1) >= 5.3 && parseFloat(balance).toFixed(1) <= 7.8) {
                return 3;
            } else if (parseFloat(balance).toFixed(1) >= 7.9 && parseFloat(balance).toFixed(1) <= 14.0) {
                return 2;
            } else if (parseFloat(balance).toFixed(1) > 14.0) {
                return 1;
            }
        } else if (age === '5.5') {
            if (parseFloat(balance).toFixed(1) < 3.3) {
                return 5;
            } else if (parseFloat(balance).toFixed(1) >= 3.3 && parseFloat(balance).toFixed(1) <= 4.5) {
                return 4;
            } else if (parseFloat(balance).toFixed(1) >= 4.6 && parseFloat(balance).toFixed(1) <= 6.7) {
                return 3;
            } else if (parseFloat(balance).toFixed(1) >= 6.8 && parseFloat(balance).toFixed(1) <= 12.0) {
                return 2;
            } else if (parseFloat(balance).toFixed(1) > 12.0) {
                return 1;
            }
        } else if (age === '6') {
            if (parseFloat(balance).toFixed(1) < 2.7) {
                return 5;
            } else if (parseFloat(balance).toFixed(1) >= 2.7 && parseFloat(balance).toFixed(1) <= 3.7) {
                return 4;
            } else if (parseFloat(balance).toFixed(1) >= 3.8 && parseFloat(balance).toFixed(1) <= 5.3) {
                return 3;
            } else if (parseFloat(balance).toFixed(1) >= 5.4 && parseFloat(balance).toFixed(1) <= 9.3) {
                return 2;
            } else if (parseFloat(balance).toFixed(1) > 9.3) {
                return 1;
            }
        }
    } else {
        if (age === '3') {
            if (parseFloat(balance).toFixed(1) < 6.9) {
                return 5;
            } else if (parseFloat(balance).toFixed(1) >= 6.9 && parseFloat(balance).toFixed(1) <= 10.7) {
                return 4;
            } else if (parseFloat(balance).toFixed(1) >= 10.7 && parseFloat(balance).toFixed(1) <= 17.3) {
                return 3;
            } else if (parseFloat(balance).toFixed(1) >= 17.4 && parseFloat(balance).toFixed(1) <= 32.4) {
                return 2;
            } else if (parseFloat(balance).toFixed(1) > 32.4) {
                return 1;
            }
        } else if (age === '3.5') {
            if (parseFloat(balance).toFixed(1) < 6.1) {
                return 5;
            } else if (parseFloat(balance).toFixed(1) >= 6.1 && parseFloat(balance).toFixed(1) <= 9.6) {
                return 4;
            } else if (parseFloat(balance).toFixed(1) >= 9.7 && parseFloat(balance).toFixed(1) <= 15.0) {
                return 3;
            } else if (parseFloat(balance).toFixed(1) >= 15.1 && parseFloat(balance).toFixed(1) <= 27.4) {
                return 2;
            } else if (parseFloat(balance).toFixed(1) > 27.4) {
                return 1;
            }
        } else if (age === '4') {
            if (parseFloat(balance).toFixed(1) < 5.3) {
                return 5;
            } else if (parseFloat(balance).toFixed(1) >= 5.3 && parseFloat(balance).toFixed(1) <= 8.1) {
                return 4;
            } else if (parseFloat(balance).toFixed(1) >= 8.2 && parseFloat(balance).toFixed(1) <= 12.2) {
                return 3;
            } else if (parseFloat(balance).toFixed(1) >= 12.3 && parseFloat(balance).toFixed(1) <= 22.5) {
                return 2;
            } else if (parseFloat(balance).toFixed(1) > 22.5) {
                return 1;
            }
        } else if (age === '4.5') {
            if (parseFloat(balance).toFixed(1) < 4.7) {
                return 5;
            } else if (parseFloat(balance).toFixed(1) >= 4.7 && parseFloat(balance).toFixed(1) <= 6.9) {
                return 4;
            } else if (parseFloat(balance).toFixed(1) >= 7.0 && parseFloat(balance).toFixed(1) <= 10.1) {
                return 3;
            } else if (parseFloat(balance).toFixed(1) >= 10.2 && parseFloat(balance).toFixed(1) <= 18.6) {
                return 2;
            } else if (parseFloat(balance).toFixed(1) > 18.6) {
                return 1;
            }
        } else if (age === '5') {
            if (parseFloat(balance).toFixed(1) < 4.1) {
                return 5;
            } else if (parseFloat(balance).toFixed(1) >= 4.1 && parseFloat(balance).toFixed(1) <= 5.7) {
                return 4;
            } else if (parseFloat(balance).toFixed(1) >= 5.8 && parseFloat(balance).toFixed(1) <= 8.2) {
                return 3;
            } else if (parseFloat(balance).toFixed(1) >= 8.3 && parseFloat(balance).toFixed(1) <= 14.0) {
                return 2;
            } else if (parseFloat(balance).toFixed(1) > 14.0) {
                return 1;
            }
        } else if (age === '5.5') {
            if (parseFloat(balance).toFixed(1) < 3.6) {
                return 5;
            } else if (parseFloat(balance).toFixed(1) >= 3.6 && parseFloat(balance).toFixed(1) <= 5.0) {
                return 4;
            } else if (parseFloat(balance).toFixed(1) >= 5.1 && parseFloat(balance).toFixed(1) <= 7.4) {
                return 3;
            } else if (parseFloat(balance).toFixed(1) >= 7.5 && parseFloat(balance).toFixed(1) <= 12.5) {
                return 2;
            } else if (parseFloat(balance).toFixed(1) > 12.5) {
                return 1;
            }
        } else if (age === '6') {
            if (parseFloat(balance).toFixed(1) < 3.0) {
                return 5;
            } else if (parseFloat(balance).toFixed(1) >= 3.0 && parseFloat(balance).toFixed(1) <= 4.2) {
                return 4;
            } else if (parseFloat(balance).toFixed(1) >= 4.3 && parseFloat(balance).toFixed(1) <= 6.1) {
                return 3;
            } else if (parseFloat(balance).toFixed(1) >= 6.2 && parseFloat(balance).toFixed(1) <= 10.7) {
                return 2;
            } else if (parseFloat(balance).toFixed(1) > 10.7) {
                return 1;
            }
        }
    }
}

function getOneJump() {
    if (getSex() === 0) {
        if (age === '3') {
            if (parseFloat(oneJump).toFixed(1) < 6.6) {
                return 5;
            } else if (parseFloat(oneJump).toFixed(1) >= 6.6 && parseFloat(oneJump).toFixed(1) <= 9.1) {
                return 4;
            } else if (parseFloat(oneJump).toFixed(1) >= 9.2 && parseFloat(oneJump).toFixed(1) <= 13.0) {
                return 3;
            } else if (parseFloat(oneJump).toFixed(1) >= 13.1 && parseFloat(oneJump).toFixed(1) <= 19.6) {
                return 2;
            } else if (parseFloat(oneJump).toFixed(1) >= 19.7) {
                return 1;
            }
        } else if (age === '3.5') {
            if (parseFloat(oneJump).toFixed(1) < 6.1) {
                return 5;
            } else if (parseFloat(oneJump).toFixed(1) >= 6.1 && parseFloat(oneJump).toFixed(1) <= 8.2) {
                return 4;
            } else if (parseFloat(oneJump).toFixed(1) >= 8.3 && parseFloat(oneJump).toFixed(1) <= 11.1) {
                return 3;
            } else if (parseFloat(oneJump).toFixed(1) >= 11.2 && parseFloat(oneJump).toFixed(1) <= 16.9) {
                return 2;
            } else if (parseFloat(oneJump).toFixed(1) >= 17.0) {
                return 1;
            }
        } else if (age === '4') {
            if (parseFloat(oneJump).toFixed(1) < 5.6) {
                return 5;
            } else if (parseFloat(oneJump).toFixed(1) >= 5.6 && parseFloat(oneJump).toFixed(1) <= 7.0) {
                return 4;
            } else if (parseFloat(oneJump).toFixed(1) >= 7.1 && parseFloat(oneJump).toFixed(1) <= 9.1) {
                return 3;
            } else if (parseFloat(oneJump).toFixed(1) >= 9.2 && parseFloat(oneJump).toFixed(1) <= 13.1) {
                return 2;
            } else if (parseFloat(oneJump).toFixed(1) >= 13.2) {
                return 1;
            }
        } else if (age === '4.5') {
            if (parseFloat(oneJump).toFixed(1) < 5.3) {
                return 5;
            } else if (parseFloat(oneJump).toFixed(1) >= 5.3 && parseFloat(oneJump).toFixed(1) <= 6.4) {
                return 4;
            } else if (parseFloat(oneJump).toFixed(1) >= 6.5 && parseFloat(oneJump).toFixed(1) <= 8.1) {
                return 3;
            } else if (parseFloat(oneJump).toFixed(1) >= 8.2 && parseFloat(oneJump).toFixed(1) <= 11.2) {
                return 2;
            } else if (parseFloat(oneJump).toFixed(1) >= 11.3) {
                return 1;
            }
        } else if (age === '5') {
            if (parseFloat(oneJump).toFixed(1) < 5.1) {
                return 5;
            } else if (parseFloat(oneJump).toFixed(1) >= 5.1 && parseFloat(oneJump).toFixed(1) <= 5.9) {
                return 4;
            } else if (parseFloat(oneJump).toFixed(1) >= 6.0 && parseFloat(oneJump).toFixed(1) <= 7.2) {
                return 3;
            } else if (parseFloat(oneJump).toFixed(1) >= 7.3 && parseFloat(oneJump).toFixed(1) <= 9.8) {
                return 2;
            } else if (parseFloat(oneJump).toFixed(1) >= 9.9) {
                return 1;
            }
        } else if (age === '5.5') {
            if (parseFloat(oneJump).toFixed(1) < 4.9) {
                return 5;
            } else if (parseFloat(oneJump).toFixed(1) >= 4.9 && parseFloat(oneJump).toFixed(1) <= 5.6) {
                return 4;
            } else if (parseFloat(oneJump).toFixed(1) >= 5.7 && parseFloat(oneJump).toFixed(1) <= 6.8) {
                return 3;
            } else if (parseFloat(oneJump).toFixed(1) >= 6.9 && parseFloat(oneJump).toFixed(1) <= 9.3) {
                return 2;
            } else if (parseFloat(oneJump).toFixed(1) >= 9.4) {
                return 1;
            }
        } else if (age === '6') {
            if (parseFloat(oneJump).toFixed(1) < 4.4) {
                return 5;
            } else if (parseFloat(oneJump).toFixed(1) >= 4.4 && parseFloat(oneJump).toFixed(1) <= 5.1) {
                return 4;
            } else if (parseFloat(oneJump).toFixed(1) >= 5.2 && parseFloat(oneJump).toFixed(1) <= 6.1) {
                return 3;
            } else if (parseFloat(oneJump).toFixed(1) >= 6.2 && parseFloat(oneJump).toFixed(1) <= 8.2) {
                return 2;
            } else if (parseFloat(oneJump).toFixed(1) >= 8.3) {
                return 1;
            }
        }
    } else {
        if (age === '3') {
            if (parseFloat(oneJump).toFixed(1) < 7.1) {
                return 5;
            } else if (parseFloat(oneJump).toFixed(1) >= 7.1 && parseFloat(oneJump).toFixed(1) <= 9.7) {
                return 4;
            } else if (parseFloat(oneJump).toFixed(1) >= 9.8 && parseFloat(oneJump).toFixed(1) <= 13.4) {
                return 3;
            } else if (parseFloat(oneJump).toFixed(1) >= 13.5 && parseFloat(oneJump).toFixed(1) <= 20.0) {
                return 2;
            } else if (parseFloat(oneJump).toFixed(1) >= 20.1) {
                return 1;
            }
        } else if (age === '3.5') {
            if (parseFloat(oneJump).toFixed(1) < 6.2) {
                return 5;
            } else if (parseFloat(oneJump).toFixed(1) >= 6.2 && parseFloat(oneJump).toFixed(1) <= 8.4) {
                return 4;
            } else if (parseFloat(oneJump).toFixed(1) >= 8.5 && parseFloat(oneJump).toFixed(1) <= 11.2) {
                return 3;
            } else if (parseFloat(oneJump).toFixed(1) >= 11.3 && parseFloat(oneJump).toFixed(1) <= 17.0) {
                return 2;
            } else if (parseFloat(oneJump).toFixed(1) >= 17.1) {
                return 1;
            }
        } else if (age === '4') {
            if (parseFloat(oneJump).toFixed(1) < 5.9) {
                return 5;
            } else if (parseFloat(oneJump).toFixed(1) >= 5.9 && parseFloat(oneJump).toFixed(1) <= 7.3) {
                return 4;
            } else if (parseFloat(oneJump).toFixed(1) >= 7.4 && parseFloat(oneJump).toFixed(1) <= 9.5) {
                return 3;
            } else if (parseFloat(oneJump).toFixed(1) >= 9.6 && parseFloat(oneJump).toFixed(1) <= 13.4) {
                return 2;
            } else if (parseFloat(oneJump).toFixed(1) >= 13.5) {
                return 1;
            }
        } else if (age === '4.5') {
            if (parseFloat(oneJump).toFixed(1) < 5.5) {
                return 5;
            } else if (parseFloat(oneJump).toFixed(1) >= 5.5 && parseFloat(oneJump).toFixed(1) <= 6.7) {
                return 4;
            } else if (parseFloat(oneJump).toFixed(1) >= 6.8 && parseFloat(oneJump).toFixed(1) <= 8.5) {
                return 3;
            } else if (parseFloat(oneJump).toFixed(1) >= 8.6 && parseFloat(oneJump).toFixed(1) <= 11.9) {
                return 2;
            } else if (parseFloat(oneJump).toFixed(1) >= 12.0) {
                return 1;
            }
        } else if (age === '5') {
            if (parseFloat(oneJump).toFixed(1) < 5.2) {
                return 5;
            } else if (parseFloat(oneJump).toFixed(1) >= 5.2 && parseFloat(oneJump).toFixed(1) <= 6.1) {
                return 4;
            } else if (parseFloat(oneJump).toFixed(1) >= 6.2 && parseFloat(oneJump).toFixed(1) <= 7.5) {
                return 3;
            } else if (parseFloat(oneJump).toFixed(1) >= 7.6 && parseFloat(oneJump).toFixed(1) <= 10.0) {
                return 2;
            } else if (parseFloat(oneJump).toFixed(1) >= 10.1) {
                return 1;
            }
        } else if (age === '5.5') {
            if (parseFloat(oneJump).toFixed(1) < 4.9) {
                return 5;
            } else if (parseFloat(oneJump).toFixed(1) >= 4.9 && parseFloat(oneJump).toFixed(1) <= 5.7) {
                return 4;
            } else if (parseFloat(oneJump).toFixed(1) >= 5.8 && parseFloat(oneJump).toFixed(1) <= 6.9) {
                return 3;
            } else if (parseFloat(oneJump).toFixed(1) >= 7.0 && parseFloat(oneJump).toFixed(1) <= 9.2) {
                return 2;
            } else if (parseFloat(oneJump).toFixed(1) >= 9.3) {
                return 1;
            }
        } else if (age === '6') {
            if (parseFloat(oneJump).toFixed(1) < 4.6) {
                return 5;
            } else if (parseFloat(oneJump).toFixed(1) >= 4.6 && parseFloat(oneJump).toFixed(1) <= 5.2) {
                return 4;
            } else if (parseFloat(oneJump).toFixed(1) >= 5.3 && parseFloat(oneJump).toFixed(1) <= 6.2) {
                return 3;
            } else if (parseFloat(oneJump).toFixed(1) >= 6.3 && parseFloat(oneJump).toFixed(1) <= 8.3) {
                return 2;
            } else if (parseFloat(oneJump).toFixed(1) >= 8.4) {
                return 1;
            }
        }
    }
}

function getTwoJump() {
    if (getSex() === 0) {
        if (age === '3') {
            if (parseFloat(twoJump).toFixed(1) < 6.6) {
                return 5;
            } else if (parseFloat(twoJump).toFixed(1) >= 6.6 && parseFloat(twoJump).toFixed(1) <= 9.1) {
                return 4;
            } else if (parseFloat(twoJump).toFixed(1) >= 9.2 && parseFloat(twoJump).toFixed(1) <= 13.0) {
                return 3;
            } else if (parseFloat(twoJump).toFixed(1) >= 13.1 && parseFloat(twoJump).toFixed(1) <= 19.6) {
                return 2;
            } else if (parseFloat(twoJump).toFixed(1) >= 19.7) {
                return 1;
            }
        } else if (age === '3.5') {
            if (parseFloat(twoJump).toFixed(1) < 6.1) {
                return 5;
            } else if (parseFloat(twoJump).toFixed(1) >= 6.1 && parseFloat(twoJump).toFixed(1) <= 8.2) {
                return 4;
            } else if (parseFloat(twoJump).toFixed(1) >= 8.3 && parseFloat(twoJump).toFixed(1) <= 11.1) {
                return 3;
            } else if (parseFloat(twoJump).toFixed(1) >= 11.2 && parseFloat(twoJump).toFixed(1) <= 16.9) {
                return 2;
            } else if (parseFloat(twoJump).toFixed(1) >= 17.0) {
                return 1;
            }
        } else if (age === '4') {
            if (parseFloat(twoJump).toFixed(1) < 5.6) {
                return 5;
            } else if (parseFloat(twoJump).toFixed(1) >= 5.6 && parseFloat(twoJump).toFixed(1) <= 7.0) {
                return 4;
            } else if (parseFloat(twoJump).toFixed(1) >= 7.1 && parseFloat(twoJump).toFixed(1) <= 9.1) {
                return 3;
            } else if (parseFloat(twoJump).toFixed(1) >= 9.2 && parseFloat(twoJump).toFixed(1) <= 13.1) {
                return 2;
            } else if (parseFloat(twoJump).toFixed(1) >= 13.2) {
                return 1;
            }
        } else if (age === '4.5') {
            if (parseFloat(twoJump).toFixed(1) < 5.3) {
                return 5;
            } else if (parseFloat(twoJump).toFixed(1) >= 5.3 && parseFloat(twoJump).toFixed(1) <= 6.4) {
                return 4;
            } else if (parseFloat(twoJump).toFixed(1) >= 6.5 && parseFloat(twoJump).toFixed(1) <= 8.1) {
                return 3;
            } else if (parseFloat(twoJump).toFixed(1) >= 8.2 && parseFloat(twoJump).toFixed(1) <= 11.2) {
                return 2;
            } else if (parseFloat(twoJump).toFixed(1) >= 11.3) {
                return 1;
            }
        } else if (age === '5') {
            if (parseFloat(twoJump).toFixed(1) < 5.1) {
                return 5;
            } else if (parseFloat(twoJump).toFixed(1) >= 5.1 && parseFloat(twoJump).toFixed(1) <= 5.9) {
                return 4;
            } else if (parseFloat(twoJump).toFixed(1) >= 6.0 && parseFloat(twoJump).toFixed(1) <= 7.2) {
                return 3;
            } else if (parseFloat(twoJump).toFixed(1) >= 7.3 && parseFloat(twoJump).toFixed(1) <= 9.8) {
                return 2;
            } else if (parseFloat(twoJump).toFixed(1) >= 9.9) {
                return 1;
            }
        } else if (age === '5.5') {
            if (parseFloat(twoJump).toFixed(1) < 4.9) {
                return 5;
            } else if (parseFloat(twoJump).toFixed(1) >= 4.9 && parseFloat(twoJump).toFixed(1) <= 5.6) {
                return 4;
            } else if (parseFloat(twoJump).toFixed(1) >= 5.7 && parseFloat(twoJump).toFixed(1) <= 6.8) {
                return 3;
            } else if (parseFloat(twoJump).toFixed(1) >= 6.9 && parseFloat(twoJump).toFixed(1) <= 9.3) {
                return 2;
            } else if (parseFloat(twoJump).toFixed(1) >= 9.4) {
                return 1;
            }
        } else if (age === '6') {
            if (parseFloat(twoJump).toFixed(1) < 4.4) {
                return 5;
            } else if (parseFloat(twoJump).toFixed(1) >= 4.4 && parseFloat(twoJump).toFixed(1) <= 5.1) {
                return 4;
            } else if (parseFloat(twoJump).toFixed(1) >= 5.2 && parseFloat(twoJump).toFixed(1) <= 6.1) {
                return 3;
            } else if (parseFloat(twoJump).toFixed(1) >= 6.2 && parseFloat(twoJump).toFixed(1) <= 8.2) {
                return 2;
            } else if (parseFloat(twoJump).toFixed(1) >= 8.3) {
                return 1;
            }
        }
    } else {
        if (age === '3') {
            if (parseFloat(twoJump).toFixed(1) < 7.1) {
                return 5;
            } else if (parseFloat(twoJump).toFixed(1) >= 7.1 && parseFloat(twoJump).toFixed(1) <= 9.7) {
                return 4;
            } else if (parseFloat(twoJump).toFixed(1) >= 9.8 && parseFloat(twoJump).toFixed(1) <= 13.4) {
                return 3;
            } else if (parseFloat(twoJump).toFixed(1) >= 13.5 && parseFloat(twoJump).toFixed(1) <= 20.0) {
                return 2;
            } else if (parseFloat(twoJump).toFixed(1) >= 20.1) {
                return 1;
            }
        } else if (age === '3.5') {
            if (parseFloat(twoJump).toFixed(1) < 6.2) {
                return 5;
            } else if (parseFloat(twoJump).toFixed(1) >= 6.2 && parseFloat(twoJump).toFixed(1) <= 8.4) {
                return 4;
            } else if (parseFloat(twoJump).toFixed(1) >= 8.5 && parseFloat(twoJump).toFixed(1) <= 11.2) {
                return 3;
            } else if (parseFloat(twoJump).toFixed(1) >= 11.3 && parseFloat(twoJump).toFixed(1) <= 17.0) {
                return 2;
            } else if (parseFloat(twoJump).toFixed(1) >= 17.1) {
                return 1;
            }
        } else if (age === '4') {
            if (parseFloat(twoJump).toFixed(1) < 5.9) {
                return 5;
            } else if (parseFloat(twoJump).toFixed(1) >= 5.9 && parseFloat(twoJump).toFixed(1) <= 7.3) {
                return 4;
            } else if (parseFloat(twoJump).toFixed(1) >= 7.4 && parseFloat(twoJump).toFixed(1) <= 9.5) {
                return 3;
            } else if (parseFloat(twoJump).toFixed(1) >= 9.6 && parseFloat(twoJump).toFixed(1) <= 13.4) {
                return 2;
            } else if (parseFloat(twoJump).toFixed(1) >= 13.5) {
                return 1;
            }
        } else if (age === '4.5') {
            if (parseFloat(twoJump).toFixed(1) < 5.5) {
                return 5;
            } else if (parseFloat(twoJump).toFixed(1) >= 5.5 && parseFloat(twoJump).toFixed(1) <= 6.7) {
                return 4;
            } else if (parseFloat(twoJump).toFixed(1) >= 6.8 && parseFloat(twoJump).toFixed(1) <= 8.5) {
                return 3;
            } else if (parseFloat(twoJump).toFixed(1) >= 8.6 && parseFloat(twoJump).toFixed(1) <= 11.9) {
                return 2;
            } else if (parseFloat(twoJump).toFixed(1) >= 12.0) {
                return 1;
            }
        } else if (age === '5') {
            if (parseFloat(twoJump).toFixed(1) < 5.2) {
                return 5;
            } else if (parseFloat(twoJump).toFixed(1) >= 5.2 && parseFloat(twoJump).toFixed(1) <= 6.1) {
                return 4;
            } else if (parseFloat(twoJump).toFixed(1) >= 6.2 && parseFloat(twoJump).toFixed(1) <= 7.5) {
                return 3;
            } else if (parseFloat(twoJump).toFixed(1) >= 7.6 && parseFloat(twoJump).toFixed(1) <= 10.0) {
                return 2;
            } else if (parseFloat(twoJump).toFixed(1) >= 10.1) {
                return 1;
            }
        } else if (age === '5.5') {
            if (parseFloat(twoJump).toFixed(1) < 4.9) {
                return 5;
            } else if (parseFloat(twoJump).toFixed(1) >= 4.9 && parseFloat(twoJump).toFixed(1) <= 5.7) {
                return 4;
            } else if (parseFloat(twoJump).toFixed(1) >= 5.8 && parseFloat(twoJump).toFixed(1) <= 6.9) {
                return 3;
            } else if (parseFloat(twoJump).toFixed(1) >= 7.0 && parseFloat(twoJump).toFixed(1) <= 9.2) {
                return 2;
            } else if (parseFloat(twoJump).toFixed(1) >= 9.3) {
                return 1;
            }
        } else if (age === '6') {
            if (parseFloat(twoJump).toFixed(1) < 4.6) {
                return 5;
            } else if (parseFloat(twoJump).toFixed(1) >= 4.6 && parseFloat(twoJump).toFixed(1) <= 5.2) {
                return 4;
            } else if (parseFloat(twoJump).toFixed(1) >= 5.3 && parseFloat(twoJump).toFixed(1) <= 6.2) {
                return 3;
            } else if (parseFloat(twoJump).toFixed(1) >= 6.3 && parseFloat(twoJump).toFixed(1) <= 8.3) {
                return 2;
            } else if (parseFloat(twoJump).toFixed(1) >= 8.4) {
                return 1;
            }
        }
    }
}

function gethandsUp() {
    if (getSex() === 0) {
        if (age === '3') {
            if (parseInt(singleLeg) > 40) {
                return 5;
            } else if (parseInt(singleLeg) <= 40 && parseInt(singleLeg) >= 19) {
                return 4;
            } else if (parseInt(singleLeg) <= 18 && parseInt(singleLeg) >= 7) {
                return 3;
            } else if (parseInt(singleLeg) <= 6 && parseInt(singleLeg) >= 2) {
                return 2;
            } else if (parseInt(singleLeg) < 2) {
                return 1;
            }
        } else if (age === '3.5') {
            if (parseInt(singleLeg) > 60) {
                return 5;
            } else if (parseInt(singleLeg) <= 60 && parseInt(singleLeg) >= 30) {
                return 4;
            } else if (parseInt(singleLeg) <= 29 && parseInt(singleLeg) >= 12) {
                return 3;
            } else if (parseInt(singleLeg) <= 11 && parseInt(singleLeg) >= 4) {
                return 2;
            } else if (parseInt(singleLeg) < 4) {
                return 1;
            }
        } else if (age === '4') {
            if (parseInt(singleLeg) > 73) {
                return 5;
            } else if (parseInt(singleLeg) <= 73 && parseInt(singleLeg) >= 38) {
                return 4;
            } else if (parseInt(singleLeg) <= 37 && parseInt(singleLeg) >= 17) {
                return 3;
            } else if (parseInt(singleLeg) <= 16 && parseInt(singleLeg) >= 5) {
                return 2;
            } else if (parseInt(singleLeg) < 5) {
                return 1;
            }
        } else if (age === '4.5') {
            if (parseInt(singleLeg) > 108) {
                return 5;
            } else if (parseInt(singleLeg) <= 108 && parseInt(singleLeg) >= 54) {
                return 4;
            } else if (parseInt(singleLeg) <= 53 && parseInt(singleLeg) >= 25) {
                return 3;
            } else if (parseInt(singleLeg) <= 24 && parseInt(singleLeg) >= 9) {
                return 2;
            } else if (parseInt(singleLeg) < 9) {
                return 1;
            }
        } else if (age === '5') {
            if (parseInt(singleLeg) > 125) {
                return 5;
            } else if (parseInt(singleLeg) <= 125 && parseInt(singleLeg) >= 64) {
                return 4;
            } else if (parseInt(singleLeg) <= 63 && parseInt(singleLeg) >= 31) {
                return 3;
            } else if (parseInt(singleLeg) <= 30 && parseInt(singleLeg) >= 11) {
                return 2;
            } else if (parseInt(singleLeg) < 11) {
                return 1;
            }
        } else if (age === '5.5') {
            if (parseInt(singleLeg) > 153) {
                return 5;
            } else if (parseInt(singleLeg) <= 153 && parseInt(singleLeg) >= 76) {
                return 4;
            } else if (parseInt(singleLeg) <= 75 && parseInt(singleLeg) >= 36) {
                return 3;
            } else if (parseInt(singleLeg) <= 35 && parseInt(singleLeg) >= 14) {
                return 2;
            } else if (parseInt(singleLeg) < 14) {
                return 1;
            }
        } else if (age === '6') {
            if (parseInt(singleLeg) > 163) {
                return 5;
            } else if (parseInt(singleLeg) <= 163 && parseInt(singleLeg) >= 86) {
                return 4;
            } else if (parseInt(singleLeg) <= 85 && parseInt(singleLeg) >= 41) {
                return 3;
            } else if (parseInt(singleLeg) <= 40 && parseInt(singleLeg) >= 17) {
                return 2;
            } else if (parseInt(singleLeg) < 17) {
                return 1;
            }
        }
    } else {
        if (age === '3') {
            if (parseInt(singleLeg) > 41) {
                return 5;
            } else if (parseInt(singleLeg) <= 41 && parseInt(singleLeg) >= 19) {
                return 4;
            } else if (parseInt(singleLeg) <= 18 && parseInt(singleLeg) >= 7) {
                return 3;
            } else if (parseInt(singleLeg) <= 6 && parseInt(singleLeg) >= 2) {
                return 2;
            } else if (parseInt(singleLeg) < 2) {
                return 1;
            }
        } else if (age === '3.5') {
            if (parseInt(singleLeg) > 61) {
                return 5;
            } else if (parseInt(singleLeg) <= 61 && parseInt(singleLeg) >= 29) {
                return 4;
            } else if (parseInt(singleLeg) <= 28 && parseInt(singleLeg) >= 12) {
                return 3;
            } else if (parseInt(singleLeg) <= 11 && parseInt(singleLeg) >= 4) {
                return 2;
            } else if (parseInt(singleLeg) < 4) {
                return 1;
            }
        } else if (age === '4') {
            if (parseInt(singleLeg) > 77) {
                return 5;
            } else if (parseInt(singleLeg) <= 77 && parseInt(singleLeg) >= 36) {
                return 4;
            } else if (parseInt(singleLeg) <= 35 && parseInt(singleLeg) >= 16) {
                return 3;
            } else if (parseInt(singleLeg) <= 15 && parseInt(singleLeg) >= 5) {
                return 2;
            } else if (parseInt(singleLeg) < 5) {
                return 1;
            }
        } else if (age === '4.5') {
            if (parseInt(singleLeg) > 102) {
                return 5;
            } else if (parseInt(singleLeg) <= 102 && parseInt(singleLeg) >= 53) {
                return 4;
            } else if (parseInt(singleLeg) <= 52 && parseInt(singleLeg) >= 25) {
                return 3;
            } else if (parseInt(singleLeg) <= 24 && parseInt(singleLeg) >= 9) {
                return 2;
            } else if (parseInt(singleLeg) < 9) {
                return 1;
            }
        } else if (age === '5') {
            if (parseInt(singleLeg) > 125) {
                return 5;
            } else if (parseInt(singleLeg) <= 125 && parseInt(singleLeg) >= 64) {
                return 4;
            } else if (parseInt(singleLeg) <= 63 && parseInt(singleLeg) >= 32) {
                return 3;
            } else if (parseInt(singleLeg) <= 31 && parseInt(singleLeg) >= 13) {
                return 2;
            } else if (parseInt(singleLeg) < 13) {
                return 1;
            }
        } else if (age === '5.5') {
            if (parseInt(singleLeg) > 138) {
                return 5;
            } else if (parseInt(singleLeg) <= 138 && parseInt(singleLeg) >= 68) {
                return 4;
            } else if (parseInt(singleLeg) <= 67 && parseInt(singleLeg) >= 35) {
                return 3;
            } else if (parseInt(singleLeg) <= 34 && parseInt(singleLeg) >= 15) {
                return 2;
            } else if (parseInt(singleLeg) < 15) {
                return 1;
            }
        } else if (age === '6') {
            if (parseInt(singleLeg) > 148) {
                return 5;
            } else if (parseInt(singleLeg) <= 148 && parseInt(singleLeg) >= 72) {
                return 4;
            } else if (parseInt(singleLeg) <= 71 && parseInt(singleLeg) >= 38) {
                return 3;
            } else if (parseInt(singleLeg) <= 37 && parseInt(singleLeg) >= 17) {
                return 2;
            } else if (parseInt(singleLeg) < 17) {
                return 1;
            }
        }
    }

}

function getSingleLeg() {
    if (getSex() === 0) {
        if (age === '3') {
            if (parseInt(singleLeg) > 20) {
                return 5;
            } else if (parseInt(singleLeg) <= 20 && parseInt(singleLeg) >= 11) {
                return 4;
            } else if (parseInt(singleLeg) <= 10 && parseInt(singleLeg) >= 7) {
                return 3;
            } else if (parseInt(singleLeg) <= 6 && parseInt(singleLeg) >= 2) {
                return 2;
            } else if (parseInt(singleLeg) < 2) {
                return 1;
            }
        } else if (age === '3.5') {
            if (parseInt(singleLeg) > 40) {
                return 5;
            } else if (parseInt(singleLeg) <= 40 && parseInt(singleLeg) >= 23) {
                return 4;
            } else if (parseInt(singleLeg) <= 22 && parseInt(singleLeg) >= 12) {
                return 3;
            } else if (parseInt(singleLeg) <= 11 && parseInt(singleLeg) >= 4) {
                return 2;
            } else if (parseInt(singleLeg) < 4) {
                return 1;
            }
        } else if (age === '4') {
            if (parseInt(singleLeg) > 54) {
                return 5;
            } else if (parseInt(singleLeg) <= 53 && parseInt(singleLeg) >= 38) {
                return 4;
            } else if (parseInt(singleLeg) <= 37 && parseInt(singleLeg) >= 16) {
                return 3;
            } else if (parseInt(singleLeg) <= 15 && parseInt(singleLeg) >= 5) {
                return 2;
            } else if (parseInt(singleLeg) < 5) {
                return 1;
            }
        } else if (age === '4.5') {
            if (parseInt(singleLeg) > 68) {
                return 5;
            } else if (parseInt(singleLeg) <= 68 && parseInt(singleLeg) >= 44) {
                return 4;
            } else if (parseInt(singleLeg) <= 43 && parseInt(singleLeg) >= 25) {
                return 3;
            } else if (parseInt(singleLeg) <= 24 && parseInt(singleLeg) >= 9) {
                return 2;
            } else if (parseInt(singleLeg) < 9) {
                return 1;
            }
        } else if (age === '5') {
            if (parseInt(singleLeg) > 85) {
                return 5;
            } else if (parseInt(singleLeg) <= 85 && parseInt(singleLeg) >= 54) {
                return 4;
            } else if (parseInt(singleLeg) <= 53 && parseInt(singleLeg) >= 31) {
                return 3;
            } else if (parseInt(singleLeg) <= 30 && parseInt(singleLeg) >= 11) {
                return 2;
            } else if (parseInt(singleLeg) < 11) {
                return 1;
            }
        } else if (age === '5.5') {
            if (parseInt(singleLeg) > 93) {
                return 5;
            } else if (parseInt(singleLeg) <= 93 && parseInt(singleLeg) >= 66) {
                return 4;
            } else if (parseInt(singleLeg) <= 65 && parseInt(singleLeg) >= 36) {
                return 3;
            } else if (parseInt(singleLeg) <= 35 && parseInt(singleLeg) >= 14) {
                return 2;
            } else if (parseInt(singleLeg) < 14) {
                return 1;
            }
        } else if (age === '6') {
            if (parseInt(singleLeg) > 103) {
                return 5;
            } else if (parseInt(singleLeg) <= 103 && parseInt(singleLeg) >= 76) {
                return 4;
            } else if (parseInt(singleLeg) <= 75 && parseInt(singleLeg) >= 41) {
                return 3;
            } else if (parseInt(singleLeg) <= 40 && parseInt(singleLeg) >= 17) {
                return 2;
            } else if (parseInt(singleLeg) < 17) {
                return 1;
            }
        }
    } else {
        if (age === '3') {
            if (parseInt(singleLeg) > 21) {
                return 5;
            } else if (parseInt(singleLeg) <= 21 && parseInt(singleLeg) >= 11) {
                return 4;
            } else if (parseInt(singleLeg) <= 10 && parseInt(singleLeg) >= 7) {
                return 3;
            } else if (parseInt(singleLeg) <= 6 && parseInt(singleLeg) >= 2) {
                return 2;
            } else if (parseInt(singleLeg) < 2) {
                return 1;
            }
        } else if (age === '3.5') {
            if (parseInt(singleLeg) > 41) {
                return 5;
            } else if (parseInt(singleLeg) <= 41 && parseInt(singleLeg) >= 21) {
                return 4;
            } else if (parseInt(singleLeg) <= 20 && parseInt(singleLeg) >= 12) {
                return 3;
            } else if (parseInt(singleLeg) <= 11 && parseInt(singleLeg) >= 4) {
                return 2;
            } else if (parseInt(singleLeg) < 4) {
                return 1;
            }
        } else if (age === '4') {
            if (parseInt(singleLeg) > 57) {
                return 5;
            } else if (parseInt(singleLeg) <= 57 && parseInt(singleLeg) >= 36) {
                return 4;
            } else if (parseInt(singleLeg) <= 35 && parseInt(singleLeg) >= 17) {
                return 3;
            } else if (parseInt(singleLeg) <= 16 && parseInt(singleLeg) >= 5) {
                return 2;
            } else if (parseInt(singleLeg) < 5) {
                return 1;
            }
        } else if (age === '4.5') {
            if (parseInt(singleLeg) > 62) {
                return 5;
            } else if (parseInt(singleLeg) <= 62 && parseInt(singleLeg) >= 43) {
                return 4;
            } else if (parseInt(singleLeg) <= 42 && parseInt(singleLeg) >= 25) {
                return 3;
            } else if (parseInt(singleLeg) <= 24 && parseInt(singleLeg) >= 9) {
                return 2;
            } else if (parseInt(singleLeg) < 9) {
                return 1;
            }
        } else if (age === '5') {
            if (parseInt(singleLeg) > 71) {
                return 5;
            } else if (parseInt(singleLeg) <= 71 && parseInt(singleLeg) >= 54) {
                return 4;
            } else if (parseInt(singleLeg) <= 53 && parseInt(singleLeg) >= 31) {
                return 3;
            } else if (parseInt(singleLeg) <= 30 && parseInt(singleLeg) >= 11) {
                return 2;
            } else if (parseInt(singleLeg) < 11) {
                return 1;
            }
        } else if (age === '5.5') {
            if (parseInt(singleLeg) > 77) {
                return 5;
            } else if (parseInt(singleLeg) <= 77 && parseInt(singleLeg) >= 64) {
                return 4;
            } else if (parseInt(singleLeg) <= 63 && parseInt(singleLeg) >= 36) {
                return 3;
            } else if (parseInt(singleLeg) <= 35 && parseInt(singleLeg) >= 14) {
                return 2;
            } else if (parseInt(singleLeg) < 14) {
                return 1;
            }
        } else if (age === '6') {
            if (parseInt(singleLeg) > 88) {
                return 5;
            } else if (parseInt(singleLeg) <= 88 && parseInt(singleLeg) >= 66) {
                return 4;
            } else if (parseInt(singleLeg) <= 65 && parseInt(singleLeg) >= 38) {
                return 3;
            } else if (parseInt(singleLeg) <= 37 && parseInt(singleLeg) >= 17) {
                return 2;
            } else if (parseInt(singleLeg) < 17) {
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
        return "表现正常, 望继续保持，并进行针对性的长期练习。";
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
        return "表现正常, 望继续保持，并进行综合性全面练习。";
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
    if (parseInt(oneJumpScore) > 4) {
        YXtemp += "单脚连续跳、";
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
        str += '<li><span style="font-weight: bold">' + YXtemp.substr(0, YXtemp.length - 1) + '</span>达到优秀水平</li>';
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
    if (parseInt(oneJumpScore) == 4) {
        LHtemp += "单脚连续跳、";
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
        str += '<li><span style="font-weight: bold">' + LHtemp.substr(0, LHtemp.length - 1) + '</span>达到良好水平</li>';
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
    if (parseInt(oneJumpScore) == 3) {
        HGtemp += "单脚连续跳、";
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
        str += '<li><span style="font-weight: bold">' + HGtemp.substr(0, HGtemp.length - 1) + '</span>达到合格水平</li>';
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
    if (parseInt(oneJumpScore) <= 2) {
        Dtemp += "单脚连续跳、";
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
        str += '<li><span style="font-weight: bold">' + Dtemp.substr(0, Dtemp.length - 1) + '</span>分数略低，该幼儿还需努力并加强相应项目练习</li>';
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
        XLnengli += '<li>前滚翻、足跟竞走、劈叉排球</li>';
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
        XLnengli += '<li>在下学期，我们将针对该幼儿的<span style="font-weight: bold">' + temp.substr(0, XLnengli.length - 1) + '</span>进行着重训练。</li>';
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
                center: ['50%', '55%'],
                radius: 150,
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





