const convert = (val, from, to) => {
    let k;
    if (from === 'C') k = val + 273.15;
    else if (from === 'F') k = (val - 32) * 5/9 + 273.15;
    else k = val;

    let res;
    if (to === 'C') res = k - 273.15;
    else if (to === 'F') res = (k - 273.15) * 9/5 + 32;
    else res = k;
    
    return Math.round(res * 100) / 100;
};

const input = document.getElementById('tempInput');
const btn = document.getElementById('convertBtn');
const result = document.getElementById('resultDisplay');
const historyList = document.getElementById('historyList');

const addHistory = (val, from, res, to) => {
    const item = document.createElement('div');
    item.className = 'history-item';
    item.innerHTML = `<span>${val}°${from} → ${res}°${to}</span> <span style="color: #64748b;">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>`;
    
    if (historyList.querySelector('.empty-state')) historyList.innerHTML = '';
    historyList.prepend(item);
};


btn.addEventListener('click', () => {
    const val = parseFloat(input.value);
    const from = document.getElementById('fromUnit').value;
    const to = document.getElementById('toUnit').value;

    if (isNaN(val)) {
        gsap.to("#errorMsg", { opacity: 1, y: -5, duration: 0.3 });
        return;
    }
    gsap.to("#errorMsg", { opacity: 0, duration: 0.3 });

    const output = convert(val, from, to);
    
  
    result.innerText = `${output}°${to}`;
    gsap.fromTo(result, { scale: 0.9 }, { scale: 1, duration: 0.2 });

    addHistory(val, from, output, to);
});


document.getElementById('swapUnits').addEventListener('click', () => {
    const from = document.getElementById('fromUnit');
    const to = document.getElementById('toUnit');
    const temp = from.value;
    from.value = to.value;
    to.value = temp;
});


document.getElementById('copyBtn').addEventListener('click', () => {
    navigator.clipboard.writeText(result.innerText);
    const originalText = document.getElementById('copyBtn').innerText;
    document.getElementById('copyBtn').innerText = "Copied!";
    setTimeout(() => {
        document.getElementById('copyBtn').innerText = originalText;
    }, 2000);
});


document.getElementById('clearHistory').addEventListener('click', () => {
    historyList.innerHTML = '<div class="empty-state">No conversions yet</div>';
})