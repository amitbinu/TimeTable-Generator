var express = require('express');
var router = express.Router();
//selectedCourses=['PHYSICS-1E03','ENGINEER-1P03','PHYSICS-1D03','CHEM-1E03','MATH-1ZA3','MATH-1ZC3','MATH-1ZB3','MATLS-1M03','ENGINEER-1C03','ENGINEER-1D04','ECON-1BB3','ECON-1B03'];


router.post('/remove/:courseId',function (req, res, next) {
    console.log("\n \n REMOVING \n \n");
    selectedCourses.splice(selectedCourses.indexOf(req.params.courseId),1);
    res.end();
});

function check(selectedCourses){
    var courses = require('../index').macCourses;
    for (var i = 0; i < selectedCourses.length; i++) {
        var course = selectedCourses[i];
            if(courses.indexOf(course) < 0){
                return false;
            }
            else{
                if (selectedCourses.multiIndexOf(course).length > 1){
                    selectedCourses.splice(i,1);  
                }   
            }
    }
    return true;
    
}

router.post('/submit/:courses',function (req, res, next) {
    var selectedCourses = req.params.courses;
    try{
    selectedCourses = selectedCourses.split(',');
}
    catch(Exception){
        res.send('hacking');
        res.end();
        return
    }
    if(selectedCourses.length === 0){
        res.send('error');
        res.end();
        return;
    }
    if(check(selectedCourses) === false){
        res.send('hacking');
        res.end();
        return
    }
    module.exports.finalCourses = selectedCourses;
    res.end();
});


router.post('/:courseId',function (req, res, next) {
   
});

router.get('/showCourses',function (req,res,next) {
    res.status(200);
    if (selectedCourses.length < 1){
        res.send("<h4 id='info'>Added courses will appear here </h4>");
    }
    else{
        res.render('check',{"value":selectedCourses});
    }
    res.end();
});

Array.prototype.multiIndexOf = function (el) {
    var idxs = [];
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] === el) {
            idxs.unshift(i);
        }
    }
    return idxs;
};

module.exports = router;
module.exports.reloadReset = function () {
    selectedCourses = [];
};