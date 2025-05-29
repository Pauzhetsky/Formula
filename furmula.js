// Базовая стоимость изделий
const productPrices = {
	tshirt: { baseCost: 500 },
	hoodie: { baseCost: 1200 },
	shorts: { baseCost: 700 },
	shirt: { baseCost: 900 },
}

// Стоимость тканей (за м²)
const fabricPrices = {
	cotton: 300,
	polyester: 250,
	blend: 200,
}

// Стоимость нанесения
const printPrices = {
	none: { base: 0, colorPrice: 0, areaPrice: 0 },
	silk: { base: 200, colorPrice: 50, areaPrice: 2 },
	embroidery: { base: 500, colorPrice: 100, areaPrice: 5 },
	sublimation: { base: 300, colorPrice: 0, areaPrice: 3 },
}

// Показать/скрыть поле количества цветов
document.getElementById('print-type').addEventListener('change', function () {
	const colorsGroup = document.getElementById('colors-group')
	colorsGroup.style.display = this.value === 'none' ? 'none' : 'block'
})

function calculateCost() {
	// Получаем значения из формы
	const productType = document.getElementById('product-type').value
	const fabricType = document.getElementById('fabric-type').value
	const printType = document.getElementById('print-type').value
	const colors = parseInt(document.getElementById('colors').value) || 0
	const area = parseInt(document.getElementById('area').value) || 0
	const hasZipper = document.getElementById('zipper').checked
	const hasPocket = document.getElementById('pocket').checked
	const margin = parseInt(document.getElementById('margin').value) || 0

	// Рассчитываем составляющие стоимости
	const baseCost = productPrices[productType].baseCost
	const fabricCost = fabricPrices[fabricType]

	let printCost = printPrices[printType].base
	printCost += colors * printPrices[printType].colorPrice
	printCost += area * printPrices[printType].areaPrice

	let additions = 0
	if (hasZipper) additions += 150
	if (hasPocket) additions += 100

	// Итоговый расчет
	const subtotal = baseCost + fabricCost + printCost + additions
	const total = subtotal * (1 + margin / 100)

	// Выводим результат
	document.getElementById('total-cost').textContent = total.toFixed(2) + ' руб.'

	// Детализация стоимости
	let breakdown = `
                <p>Базовая стоимость: ${baseCost} руб.</p>
                <p>Ткань: ${fabricCost} руб.</p>
                <p>Нанесение: ${printCost.toFixed(2)} руб.</p>
                <p>Доп. элементы: ${additions} руб.</p>
                <p>Сумма: ${subtotal} руб.</p>
                <p>Наценка ${margin}%: ${((subtotal * margin) / 100).toFixed(
		2
	)} руб.</p>
            `

	document.getElementById('breakdown').innerHTML = breakdown
	document.getElementById('result').style.display = 'block'
}
