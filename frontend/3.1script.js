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






const saveBtn = document.getElementById('save_entry');
const showBtn = document.getElementById('show_progress');
const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');
const bmiResult = document.getElementById('bmi_result');
const infoSpan = document.getElementById('calculator_container_info');
const chartCanvas = document.getElementById('bmiChart');


let bmiChart = null;

// دالة لحساب BMI (تستخدم نفس دالتك)
function calculateBMIValue() {
  const h = Number(heightInput.value) / 100;
  const w = Number(weightInput.value);
  if (!h || !w) return null;
  return Number((w / (h * h)).toFixed(2));
}

// تنبيه المستخدم لو لم يدخل بيانات صحيحة
function validateAndShow() {
  const val = calculateBMIValue();
  if (val === null) {
    infoSpan.innerText = "Please enter valid height and weight!";
    bmiResult.value = '';
    return null;
  }
  bmiResult.value = val;
  // نفس رسائل الحالة
  if (val < 18.5) infoSpan.innerText = "You are underweight, eat more nutritious food!";
  else if (val <= 24.9) infoSpan.innerText = "You have a normal weight, good job!";
  else if (val <= 29.9) infoSpan.innerText = "You are overweight, consider exercising more!";
  else infoSpan.innerText = "You have Obesity, please consult a doctor for advice!";
  return val;
}

// استدعاء عند الضغط على Compute BMI
document.getElementById('calculate_button').addEventListener('click', validateAndShow);

// دالة مساعدة لتنسيق التاريخ dd/mm/yyyy
function formatDate(d = new Date()) {
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

// حفظ السجل في localStorage
function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem('bmi_history') || '[]');
  } catch {
    return [];
  }
}
function saveHistory(history) {
  localStorage.setItem('bmi_history', JSON.stringify(history));
}

// زر Save Entry
saveBtn.addEventListener('click', () => {
  const val = validateAndShow();
  if (val === null) return;
  const history = loadHistory();
  history.push({ date: formatDate(), bmi: val });
  saveHistory(history);
  infoSpan.innerText = "Entry saved ✅";
});

// رسم الرسم البياني باستخدام Chart.js
function renderChart() {
  const history = loadHistory();
  if (!history.length) {
    infoSpan.innerText = "No saved entries yet. Use Save Entry to add today's BMI.";
    return;
  }
  // ترتيب حسب التاريخ لو احتجت (هنا نفترض الإدخالات بالترتيب)
  const labels = history.map(h => h.date);
  const data = history.map(h => h.bmi);

  const cfg = {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'BMI over time',
        data,
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25,118,210,0.1)',
        tension: 0.25,
        fill: true,
        pointRadius: 4
      }]
    },
    options: {
      scales: {
        y: {
          title: { display: true, text: 'BMI' },
          suggestedMin: 10,
          suggestedMax: 40
        },
        x: {
          title: { display: true, text: 'Date' }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: { mode: 'index', intersect: false }
      },
      responsive: true,
      maintainAspectRatio: false
    }
  };

  if (bmiChart) {
    bmiChart.data.labels = labels;
    bmiChart.data.datasets[0].data = data;
    bmiChart.update();
  } else {
    bmiChart = new Chart(chartCanvas.getContext('2d'), cfg);
  }
  infoSpan.innerText = `Showing ${history.length} saved entries.`;
}

// زر Show Progress
showBtn.addEventListener('click', renderChart);

// عند تحميل الصفحة، حاول عرض أي نتيجة سابقة خفيفة
window.addEventListener('load', () => {
  const history = loadHistory();
  if (history.length) renderChart();
});
