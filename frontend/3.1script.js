const _calculate_button = document.getElementById('calculate_button');

const _bmi_result = document.getElementById('bmi_result');
const _weight_condition = document.getElementById("calculator_container_info");


function calculateBMI() {
    console.log("button clicked");

    const _height_value = document.getElementById('height').value / 100; // cm → m
    const _weight_value = document.getElementById('weight').value;
    if(!_height_value || !_weight_value){
        _weight_condition.innerText = "Please enter valid height and weight!";
        return;
    }
    /*bmi = kg/m2*/
    const bmi_result = (_weight_value / (_height_value * _height_value)).toFixed(2);
    _bmi_result.value = bmi_result;



    /*Doctors and Medical professional Says the:*/
    if(bmi_result < 18.5){
        _weight_condition.innerText = "You are underweight, eat more nutritious food!";
    }else if(bmi_result >= 18.5 && bmi_result <= 24.9){
        _weight_condition.innerText = "You have a normal weight, good job!";
    }else if(bmi_result >= 25 && bmi_result <= 29.9){
        _weight_condition.innerText = "You are overweight, consider exercising more!";
    }else if(bmi_result >= 30){
        _weight_condition.innerText = "You have Obesity, please consult a doctor for advice!";
    }    
}


_calculate_button.addEventListener('click', calculateBMI)