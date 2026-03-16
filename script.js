// --- Budget Summary Page Logic ---
if (document.getElementById('summaryPieChart')) {
    // Get budget data
    const data = JSON.parse(localStorage.getItem('budgetData') || '{}');
    // Calculate values
    function sum(keys) {
        return keys.map(k => Number(data[k] || 0)).reduce((a, b) => a + b, 0);
    }
    const housing = sum(['mortgage','rent','housingInsurance','utilities','tvInternet','phone','customHousing', ...Object.keys(data).filter(k => k.startsWith('custom_housing_'))]);
    const transportation = sum(['carPayment','carInsurance','repairs','gas','customTransport', ...Object.keys(data).filter(k => k.startsWith('custom_transportation_'))]);
    const education = sum(['tuition','studentLoans','supplies','customEducation', ...Object.keys(data).filter(k => k.startsWith('custom_education_'))]);
    const personal = sum(['groceries','clothing','entertainment','medical','customPersonal', ...Object.keys(data).filter(k => k.startsWith('custom_personal_'))]);
    const savings = sum(['emergency','investments','retirement','customSavings', ...Object.keys(data).filter(k => k.startsWith('custom_savings_'))]);
    // Income
    let income = Number(data.grossIncome || data.salaryWages || 0);
    function calculateFederalTax(income){
        let tax = 0;
        if(income <= 12400){ tax = income * 0.10; }
        else if(income <= 50400){ tax = (12400 * 0.10) + ((income - 12400) * 0.12); }
        else{ tax = (12400 * 0.10) + ((50400 - 12400) * 0.12) + ((income - 50400) * 0.22); }
        return tax;
    }
    function calculateTaxes(income){
        const medicare = income * 0.0145;
        const socialSecurity = income * 0.062;
        const stateTax = income * 0.04;
        const federal = calculateFederalTax(income);
        return medicare + socialSecurity + stateTax + federal;
    }
    function calculateMonthlyNet(income){
        const taxes = calculateTaxes(income);
        const netAnnual = income - taxes;
        return netAnnual / 12;
    }
    const netMonthly = calculateMonthlyNet(income);
    const totalExpenses = housing + transportation + education + personal + savings;
    const remaining = netMonthly - totalExpenses;

    // Pie chart
    const ctx = document.getElementById('summaryPieChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Housing', 'Transportation', 'Education', 'Personal', 'Savings'],
            datasets: [{
                data: [housing, transportation, education, personal, savings],
                backgroundColor: [
                    '#ff0055',
                    '#26b5d9',
                    '#57e35b',
                    '#4a455a',
                    '#f1e64c'
                ]
            }]
        },
        options: {
            plugins: {
                legend: { display: true, position: 'right' }
            }
        }
    });
    // Update values
    document.getElementById('summaryNet').textContent = `Net Income: $${netMonthly.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`;
    document.getElementById('summaryExpenses').textContent = `$${totalExpenses.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`;
    document.getElementById('summaryRemaining').textContent = `$${remaining.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`;
    // Summary text
    const summaryText = document.getElementById('summaryText');
    summaryText.innerHTML = `With a total net income of <strong>$${netMonthly.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</strong>, your current budget successfully covers all <span class="amount">$${totalExpenses.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span> in expenses while leaving a <span class="surplus">healthy surplus of $${remaining.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span>. Your spending is primarily driven by housing and education, which account for <strong>${((housing+education)/totalExpenses*100).toFixed(0)}%</strong> of your total allocation.`;
    // Home button
    document.getElementById('summaryHomeBtn').onclick = () => { window.location.href = 'Index.html'; };
}
if (document.getElementById('summaryPieChart')) {
    const data = JSON.parse(localStorage.getItem('budgetData') || '{}');
    const housing = sum(['mortgage', 'rent', 'housingInsurance', 'utilities', 'tvInternet', 'phone', 'customHousing', ...Object.keys(data).filter(k => k.startsWith('custom_housing_'))]); const transportation = sum(['carPayment', 'carInsurance', 'repairs', 'gas', 'customTransport', ...Object.keys(data).filter(k => k.startsWith('custom_transportation_'))]); const education = sum(['tuition', 'studentLoans', 'supplies', 'customEducation', ...Object.keys(data).filter(k => k.startsWith('custom_education_'))]); const personal = sum(['groceries', 'clothing', 'entertainment', 'medical', 'customPersonal', ...Object.keys(data).filter(k => k.startsWith('custom_personal_'))]); const savings = sum(['emergency', 'investments', 'retirement', 'customSavings', ...Object.keys(data).filter(k => k.startsWith('custom_savings_'))]);

    let income = Number(data.grossIncome || data.salaryWages || 0);
    function calculateFederalTax(income) {
        let tax = 0;
        if (income <= 12400) { tax = income * 0.10; }
        else if (income <= 50400) { tax = (12400 * 0.10) + ((income - 12400) * 0.12); }
        else { tax = (12400 * 0.10) + ((50400 - 12400) * 0.12) + ((income - 50400) * 0.22); }
        return tax;
    }
    function calculateTaxes(income) {
        const medicare = income * 0.0145;
        const socialSecurity = income * 0.062;
        const stateTax = income * 0.04;
        const federal = calculateFederalTax(income);
        return medicare + socialSecurity + stateTax + federal;
    }
    function calculateMonthlyNet(income) {
        const taxes = calculateTaxes(income);
        const netAnnual = income - taxes;
        return netAnnual / 12;
    }
    const netMonthly = calculateMonthlyNet(income);
    const totalExpenses = housing + transportation + education + personal + savings;
    const remaining = netMonthly - totalExpenses;

    const ctx = document.getElementById('summaryPieChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Housing', 'Transportation', 'Education', 'Personal', 'Savings'],
            datasets: [{
                data: [housing, transportation, education, personal, savings],
                backgroundColor: [
                    '#ff0055',
                    '#26b5d9',
                    '#57e35b',
                    '#4a455a',
                    '#f1e64c'
                ]
            }]
        },
        options: {
            plugins: {
                legend: { display: true, position: 'right' }
            }
        }
    });
    document.getElementById('summaryNet').textContent = `Net Income: $${netMonthly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById('summaryExpenses').textContent = `$${totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById('summaryRemaining').textContent = `$${remaining.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    const summaryText = document.getElementById('summaryText');
    summaryText.innerHTML = `With a total net income of <strong>$${netMonthly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>, your current budget successfully covers all <span class="amount">$${totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span> in expenses while leaving a <span class="surplus">healthy surplus of $${remaining.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>. Your spending is primarily driven by housing and education, which account for <strong>${((housing + education) / totalExpenses * 100).toFixed(0)}%</strong> of your total allocation.`;
    document.getElementById('summaryHomeBtn').onclick = () => { window.location.href = 'Index.html'; };
}

function getBudgetData() {
    return JSON.parse(localStorage.getItem('budgetData') || '{}');
}

function setBudgetData(data) {
    localStorage.setItem('budgetData', JSON.stringify(data));
}

const incomeInput = document.querySelector('input[placeholder="Gross Annual income"]');
const careerInput = document.querySelector('input[placeholder="Career Selection"]');

const pageInputs = [
    // Index.html
    { selector: 'input[placeholder="Gross Annual income"]', key: 'grossIncome' },
    { selector: 'input[placeholder="Salary/Wages"]', key: 'salaryWages' },
    { selector: 'input[placeholder="Side Income"]', key: 'sideIncome' },
    { selector: 'input[placeholder="Benefits"]', key: 'benefits' },
    { selector: 'input[placeholder="Add Custom Item"]', key: 'customIncome' },
    // Housing.html
    { selector: 'input[placeholder="Mortgage"]', key: 'mortgage' },
    { selector: 'input[placeholder="Rent"]', key: 'rent' },
    { selector: 'input[placeholder="Insurance"]', key: 'housingInsurance' },
    { selector: 'input[placeholder="Utilities"]', key: 'utilities' },
    { selector: 'input[placeholder="TV/Internet"]', key: 'tvInternet' },
    { selector: 'input[placeholder="Phone"]', key: 'phone' },
    { selector: 'input[placeholder="Add Custom Item"]', key: 'customHousing' },
    // Transportation.html
    { selector: 'input[placeholder="Car Payment"]', key: 'carPayment' },
    { selector: 'input[placeholder="Insurance"]:not([placeholder="housingInsurance"]):not([placeholder="Insurance"])', key: 'carInsurance' },
    { selector: 'input[placeholder="Repairs"]', key: 'repairs' },
    { selector: 'input[placeholder="Gas"]', key: 'gas' },
    { selector: 'input[placeholder="Add Custom Item"]', key: 'customTransport' },
    // Education.html
    { selector: 'input[placeholder="Tuition"]', key: 'tuition' },
    { selector: 'input[placeholder="Student Loans"]', key: 'studentLoans' },
    { selector: 'input[placeholder="Supplies"]', key: 'supplies' },
    { selector: 'input[placeholder="Add Custom Item"]', key: 'customEducation' },
    // Personal.html
    { selector: 'input[placeholder="Groceries"]', key: 'groceries' },
    { selector: 'input[placeholder="Clothing"]', key: 'clothing' },
    { selector: 'input[placeholder="Entertainment"]', key: 'entertainment' },
    { selector: 'input[placeholder="Medical"]', key: 'medical' },
    { selector: 'input[placeholder="Add Custom Item"]', key: 'customPersonal' },
    // Savings.html
    { selector: 'input[placeholder="Emergency"]', key: 'emergency' },
    { selector: 'input[placeholder="Investments"]', key: 'investments' },
    { selector: 'input[placeholder="Retirement"]', key: 'retirement' },
    { selector: 'input[placeholder="Add Custom Item"]', key: 'customSavings' },
];
document.querySelectorAll('#secondary-button').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        const form = btn.closest('form');
        if (!form) return;
        const customInputs = form.querySelectorAll('.custom-item-input');
        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.placeholder = 'Custom Item';
        newInput.className = 'custom-item-input';
        const page = window.location.pathname.split('/').pop().replace('.html', '').toLowerCase();
        const key = `custom_${page}_${customInputs.length + 1}`;
        newInput.dataset.budgetKey = key;
        btn.parentNode.insertBefore(newInput, btn);
        newInput.addEventListener('input', () => {
            const d = getBudgetData();
            d[key] = newInput.value;
            setBudgetData(d);
            updateBudget();
        });
    });
});

pageInputs.forEach(({ selector, key }) => {
    const input = document.querySelector(selector);
    if (input) {
        const data = getBudgetData();
        if (data[key]) input.value = data[key];
        input.addEventListener('input', () => {
            const d = getBudgetData();
            d[key] = input.value;
            setBudgetData(d);
            updateBudget();
        });
    }
});

let careers = [];
if (careerInput) {
    async function loadCareers() {
        const response = await fetch("https://eecu-data-server.vercel.app/data");
        const data = await response.json();
        careers = data;
        const keys = Object.keys(data[0]);
        const careerKey = keys.find(k => k.toLowerCase().includes("career") || k.toLowerCase().includes("title"));
        const salaryKey = keys.find(k => k.toLowerCase().includes("salary"));
        let oldDatalist = document.getElementById("careerList");
        if (oldDatalist) oldDatalist.remove();
        const datalist = document.createElement("datalist");
        datalist.id = "careerList";
        data.forEach(job => {
            const option = document.createElement("option");
            let title = job[careerKey];
            if (typeof title === 'undefined') {
                title = job['Job Title'] || job['Title'] || job['Career'] || job['Occupation'] || '';
            }
            option.value = title;
            datalist.appendChild(option);
        });
        if (careerInput.parentNode) {
            careerInput.parentNode.appendChild(datalist);
        } else {
            document.body.appendChild(datalist);
        }
        careerInput.setAttribute("list", "careerList");

        const newCareerInput = careerInput.cloneNode(true);
        careerInput.parentNode.replaceChild(newCareerInput, careerInput);
        newCareerInput.addEventListener("input", () => {
            let selected = careers.find(job => job[careerKey] === newCareerInput.value);
            if (!selected) {
                selected = careers.find(job => {
                    let title = job[careerKey];
                    if (typeof title === 'undefined') {
                        title = job['Job Title'] || job['Title'] || job['Career'] || job['Occupation'] || '';
                    }
                    return String(title).toLowerCase() === newCareerInput.value.toLowerCase();
                });
            }
            if (selected && incomeInput) {
                let salary = selected[salaryKey];
                if (typeof salary === 'undefined') {
                    salary = selected['Annual Salary'] || selected['Salary'] || selected['Wage'] || selected['Income'] || '';
                }
                incomeInput.value = salary;
                const d = getBudgetData();
                d['grossIncome'] = salary;
                setBudgetData(d);
                updateBudget();
            }
        });
    }
    loadCareers();
}

function calculateFederalTax(income) {

    let tax = 0;

    if (income <= 12400) {
        tax = income * 0.10;
    }

    else if (income <= 50400) {
        tax = (12400 * 0.10) +
            ((income - 12400) * 0.12);
    }

    else {
        tax = (12400 * 0.10) +
            ((50400 - 12400) * 0.12) +
            ((income - 50400) * 0.22);
    }

    return tax;
}

function calculateTaxes(income) {

    const medicare = income * 0.0145;
    const socialSecurity = income * 0.062;
    const stateTax = income * 0.04;

    const federal = calculateFederalTax(income);

    return medicare + socialSecurity + stateTax + federal;

}

function calculateMonthlyNet(income) {

    const taxes = calculateTaxes(income);

    const netAnnual = income - taxes;

    return netAnnual / 12;

}


let chart = null;
const ctx = document.getElementById("budgetChart");
if (ctx) {
    chart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: [
                "Housing",
                "Transportation",
                "Education",
                "Personal",
                "Savings"
            ],
            datasets: [{
                data: [0, 0, 0, 0, 0],
                backgroundColor: [
                    '#ff0055',
                    '#26b5d9',
                    '#57e35b',
                    '#4a455a',
                    '#f1e64c'
                ],
                borderWidth: 0
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}



function updateBudget() {
    const data = getBudgetData();
    let income = Number(data.grossIncome || data.salaryWages || 0);
    if (!income) {
        if (typeof incomeInput !== 'undefined' && incomeInput && incomeInput.value) {
            income = Number(incomeInput.value);
        }
    }
    if (!income || !chart) return;

    const taxesMonthly = calculateTaxes(income) / 12;
    const netMonthly = calculateMonthlyNet(income);
    const housing = [
        'mortgage', 'rent', 'housingInsurance', 'utilities', 'tvInternet', 'phone', 'customHousing',
        ...Object.keys(data).filter(k => k.startsWith('custom_housing_'))
    ].map(k => Number(data[k] || 0)).reduce((a, b) => a + b, 0);
    const transportation = [
        'carPayment', 'carInsurance', 'repairs', 'gas', 'customTransport',
        ...Object.keys(data).filter(k => k.startsWith('custom_transportation_'))
    ].map(k => Number(data[k] || 0)).reduce((a, b) => a + b, 0);
    const education = [
        'tuition', 'studentLoans', 'supplies', 'customEducation',
        ...Object.keys(data).filter(k => k.startsWith('custom_education_'))
    ].map(k => Number(data[k] || 0)).reduce((a, b) => a + b, 0);
    const personal = [
        'groceries', 'clothing', 'entertainment', 'medical', 'customPersonal',
        ...Object.keys(data).filter(k => k.startsWith('custom_personal_'))
    ].map(k => Number(data[k] || 0)).reduce((a, b) => a + b, 0);
    const savings = [
        'emergency', 'investments', 'retirement', 'customSavings',
        ...Object.keys(data).filter(k => k.startsWith('custom_savings_'))
    ].map(k => Number(data[k] || 0)).reduce((a, b) => a + b, 0);

    const totalExpenses = housing + transportation + education + personal + savings;
    const remaining = netMonthly - totalExpenses;

    const netDisplay = document.querySelector('.net-income');
    if (netDisplay) {
        netDisplay.textContent = `Net Income: $${netMonthly.toFixed(2)}`;
    }

    chart.data.datasets[0].data = [
        housing,
        transportation,
        education,
        personal,
        savings
    ];
    chart.data.labels = [
        "Housing",
        "Transportation",
        "Education",
        "Personal",
        "Savings"
    ];
    chart.update();
}

if (chart) {
    updateBudget();
}