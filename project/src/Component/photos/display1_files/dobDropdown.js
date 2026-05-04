(function() {

    function checkDate(e) {
        if(yearSelect.value == currentDate.getFullYear()) {
            for(var i = 0, l = monthSelect.children.length; i < l; i++) {
                if(monthSelect.children[i].value > currentDate.getMonth()+1) {
                    monthSelect.children[i].setAttribute('disabled',1);
                    if(monthSelect.children[i].selected) {
                        monthSelect.value = '';
                    }
                }
            }
            if(monthSelect.value == currentDate.getMonth()+1) {
                for(var i = 0, l = daySelect.children.length; i < l; i++) {
                    if(daySelect.children[i].value > currentDate.getDate()) {
                        daySelect.children[i].setAttribute('disabled',1);
                        if(daySelect.children[i].selected) {
                            daySelect.value = '';
                        }       
                    }
                }
            } else {
                for(var i = 0, l = daySelect.children.length; i < l; i++) {
                    daySelect.children[i].removeAttribute('disabled');
                }
            }
        } else {
            for(var i = 0, l = monthSelect.children.length; i < l; i++) {
                monthSelect.children[i].removeAttribute('disabled');
            }
            for(var i = 0, l = daySelect.children.length; i < l; i++) {
                daySelect.children[i].removeAttribute('disabled');
            }
        }
    }
    var yearSelect = document.getElementById('dob-year'),
        monthSelect = document.getElementById('dob-month'),
        daySelect = document.getElementById('dob-day'),
        currentDate = new Date();
    yearSelect.addEventListener('change',checkDate);
    monthSelect.addEventListener('change',checkDate);
    daySelect.addEventListener('change',checkDate);
})();