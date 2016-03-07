function exercise1(nums) {

    var sumSoFar = 0,
        a = 0;

    //using forEach loop

    nums.forEach(function(value) {
        sumSoFar = sumSoFar + value;
    });
    a = sumSoFar / nums.length;
    return a;
}

function exercise2(nums) {

    var l = nums[0];

    //using forEach loop

    nums.forEach(function(value) {
        if (value > l) {
            l = value;
        }
    });

    return l;
}


function exercise3(nums) {

    var l = false;

    //using forEach loop

    nums.forEach(function(value) {
        if (value % 2 === 0) {
            l = true;
            return l;
        }
    });

    return l;
}


function exercise4(nums) {

    var l = true;

    //using forEach loop

    nums.forEach(function(value) {
        if (value % 2 !== 0) {
            l = false;
            return l;
        }
    });

    return l;
}

function arrayContains(array1, str) {
    var f = false;
    array1.forEach(function(value) {
        if (value === str) {
            f = true;
            return f;
        }
    });
    return f;
}


function arrayContainsTwo(array1, str) {
    var f = false,
        count = 0;
    array1.forEach(function(value) {
        if (value === str) {
            count = count + 1;
            if (count === 2) {
                f = true;
                return f;
            }
        }
    });
    return f;
}

function arrayContainsThree(array1, str) {
    var f = false,
        count = 0;
    array1.forEach(function(value) {
        if (value === str) {
            count = count + 1;
            if (count === 3) {
                f = true;
                return f;
            }
        }
    });
    return f;
}


function arrayContainsNTimes(array1, str, n) {
    var f = false,
        count = 0;
    array1.forEach(function(value) {
        if (value === str) {
            count = count + 1;
            if (count === n) {
                f = true;
                return f;
            }
        }
    });
    return f;
}

function exercise2under(nums) {

    var l;

    l = _.max(nums);

    return l;
}


function exercise3under(nums) {

    var l;

    l = _.some(nums, function(num) {
        return num % 2 === 0;
    });

    return l;
}


function exercise4under(nums) {
    var l;

    l = _.every(nums, function(num) {
        return num % 2 === 0;
    });

    return l;

}

document.getElementById("1").innerHTML = exercise1([1, 2, 3, 4]);
document.getElementById("2").innerHTML = exercise2([1, 2, 3, 4]);
document.getElementById("3").innerHTML = exercise3([1, 2, 3, 4]);
document.getElementById("4").innerHTML = exercise4([1, 2, 3, 4]);
document.getElementById("5").innerHTML = arrayContains(["hello", "world"], "hello");
document.getElementById("6").innerHTML = arrayContainsTwo(["a", "b", "c", "d"], "a");
document.getElementById("7").innerHTML = arrayContainsThree(["a", "b", "c", "d", "a", "a"], "a");
document.getElementById("8").innerHTML = arrayContainsNTimes(["a", "b", "c", "d"], "a", 1);
document.getElementById("9").innerHTML = exercise2under([1, 2, 3, 4]);
document.getElementById("10").innerHTML = exercise3under([1, 2, 3, 4]);
document.getElementById("11").innerHTML = exercise4under([4, 2, 6, 8]);
